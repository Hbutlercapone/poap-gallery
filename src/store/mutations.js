import {
  getEvent,
  getMainnetEvents, getMainnetEventsByIds,
  getMainnetOwners,
  getMainnetTokens, getPaginatedEvents,
  getxDaiEvents, getxDaiEventsByIds,
  getXDaiOwners,
  getxDaiTokens, OrderDirection, OrderOption, PAGE_LIMIT
} from './api'
import {ensABI} from './abis';
import _, {uniqBy} from 'lodash'
import {ethers} from 'ethers';
import namehash from 'eth-ens-namehash';
import {sortInt} from "../utilities/utilities";

const {REACT_APP_RPC_PROVIDER_URL, REACT_APP_ENS_CONTRACT} = process.env;
const provider = new ethers.providers.StaticJsonRpcProvider(REACT_APP_RPC_PROVIDER_URL);
const ReverseRecords = new ethers.Contract(REACT_APP_ENS_CONTRACT, ensABI, provider)

// TODO: Refactor to render as it returns data rather than waiting all in batch
export async function getEnsData(ownerIds){
  const chunked = _.chunk(ownerIds, 50)
  let allnames = []
  for (let i = 0; i < chunked.length; i++) {
    const chunk = chunked[i];
    let names
    try{
      // TODO: Figure out why some call throws error
      names = await ReverseRecords.getNames(chunk)
    }catch(e){
      // Fallback to null if problem fetching Reverse record
      console.log(e)
      names = chunk.map(a => null)
    }
    const validNames = names.map(name => {
      try {
        return (namehash.normalize(name) === name && name !== '') && name
      } catch (e) {
        console.error('Couldn\'t parse ENS name. ', e)
        return false
      }
    } )
    allnames = _.concat(allnames, validNames);
  }
  return allnames
}

function pushEvent(events, event) {
  const sameEvent = events.find(e => e.id === event.id)
  if (sameEvent) {
    sameEvent.tokenCount += event.tokenCount
    sameEvent.transferCount += event.transferCount
  } else {
    events.push(event)
  }
}

function reduceSubgraphEvents(mainnetEvents, xdaiEvents) {
  mainnetEvents = mainnetEvents.data.events.sort(sortInt)
  xdaiEvents = xdaiEvents.data.events.sort(sortInt)

  let subgraphEvents = [], mainnetIndex = 0, xdaiIndex = 0, canKeepIterating = true
  while (canKeepIterating) {
    if (subgraphEvents.length === PAGE_LIMIT || (mainnetIndex >= mainnetEvents.length && xdaiIndex >= xdaiEvents.length)) {
      break
    }

    const mainnetEvent = mainnetIndex < mainnetEvents.length ? mainnetEvents[mainnetIndex] : null
    const xdaiEvent = xdaiIndex < xdaiEvents.length ? xdaiEvents[xdaiIndex] : null
    if (mainnetEvent === null && xdaiEvent) {
      pushEvent(subgraphEvents, xdaiEvent)
      xdaiIndex++
    } else if (xdaiEvent === null && mainnetEvent) {
      pushEvent(subgraphEvents, mainnetEvent)
      mainnetIndex++
    } else if (mainnetEvent.id > xdaiEvent.id) {
      pushEvent(subgraphEvents, mainnetEvent)
      mainnetIndex++
    } else {
      pushEvent(subgraphEvents, xdaiEvent)
      xdaiIndex++
    }
  }
  return {
    subgraphEvents,
    mainnetIndex,
    xdaiIndex
  }
}

function aggregateEventsData(events, subgraphEvents) {
  let lastValidEventIndex = 0
  const _events = events.map((e, index) => {
    const subgraphMatch = subgraphEvents.find(s => parseInt(s.id) === e.id)
    if (subgraphMatch) {
      lastValidEventIndex = index
      return {...e, tokenCount: parseInt(subgraphMatch.tokenCount), transferCount: parseInt(subgraphMatch.transferCount)}
    }
    return false
  })
  return {
    filteredEvents: _events.filter(e => e),
    apiIndex: lastValidEventIndex,
  }
}

function getTop3Events() {
  //TODO: change all of this with custom server call
  let mostRecent, mostClaimed, upcoming, events = []
  let isMostRecent = false
  for (let i = 0; i < events.length; i++) {
    const event = events[i];
    let now = new Date().getTime()
    let eventDate = new Date(event.start_date.replace(/-/g, ' ')).getTime()
    let eventEndDate = new Date(event.end_date.replace(/-/g, ' ')).getTime()

    if(event.private_event && eventEndDate > now) {
      // No ongoing private event should be shown in the activity's top 3
      continue;
    }

    //TODO: check logic for all 3
    if(eventDate > now ) {
      upcoming = event
    }

    if(eventDate < now && !isMostRecent) {
      isMostRecent = true
      mostRecent = event
    }

    if(!mostClaimed || event.tokenCount > mostClaimed.tokenCount) {
      mostClaimed = event
    }
  }

  if (mostRecent) mostRecent.heading = "Most Recent"
  if (upcoming) upcoming.heading = "Upcoming Event"
  if (mostClaimed) mostClaimed.heading = "Most Claimed Token"

  return {
    mostRecent,
    mostClaimed,
    upcoming,
  }
}

async function getEventsBySubgraphFirst(mainnetSkip, xdaiSkip, orderBy) {
  let [mainnetEvents, xdaiEvents] = await Promise.all([getMainnetEvents(PAGE_LIMIT, mainnetSkip, orderBy), getxDaiEvents(PAGE_LIMIT, xdaiSkip, orderBy)])
  let {subgraphEvents, mainnetIndex, xdaiIndex} = reduceSubgraphEvents(mainnetEvents, xdaiEvents)

  const event_ids = subgraphEvents.map(e => e.id).join(',')
  let paginatedResults = await getPaginatedEvents({event_ids, limit: subgraphEvents.length})
  let {filteredEvents, apiIndex} = aggregateEventsData(paginatedResults.items, subgraphEvents)
  const total = paginatedResults.total

  return {
    _events: filteredEvents,
    mainnetIndex: mainnetIndex,
    xdaiIndex: xdaiIndex,
    _total: total,
  }
}

async function getEventsByApiFirst(apiSkip, orderBy, privateEvents) {
  let events = [], total = 0, offset = apiSkip, batchSize = PAGE_LIMIT*5, apiIndex = 0
  while (events.length < PAGE_LIMIT) {
    let paginatedResults = await getPaginatedEvents({offset: offset, limit: batchSize, orderBy: orderBy, privateEvents: privateEvents})
    offset += batchSize
    let _events = paginatedResults.items
    total = paginatedResults.total
    const event_ids = _events.map(e => e.id)

    const missingAmount = PAGE_LIMIT - events.length
    let [mainnetEvents, xdaiEvents] = await Promise.all([getMainnetEventsByIds(event_ids, missingAmount), getxDaiEventsByIds(event_ids, missingAmount)])
    let {subgraphEvents} = reduceSubgraphEvents(mainnetEvents, xdaiEvents)
    let {filteredEvents, apiIndex: _apiIndex} = aggregateEventsData(_events, subgraphEvents)
    events = events.concat(filteredEvents)
    apiIndex = _apiIndex
  }

  //TODO: verify no more than PAGE_LIMIT events are returned (ex: try putting 3 as batchSize and check if it returns 20 or something like 21)
  return {
    _events: events,
    _total: total,
    apiIndex: apiIndex,
  }
}

export async function getIndexPageData(orderBy, reset, privateEvents, state) {
  let apiSkip, mainnetSkip, xdaiSkip, page
  if (reset) {
    page = 0
    apiSkip = 0
    xdaiSkip = 0
    mainnetSkip = 0
  } else {
    page = state.events.page
    apiSkip = state.events.apiSkip
    xdaiSkip = state.events.xdaiSkip
    mainnetSkip = state.events.mainnetSkip
  }

  let events, total
  if (orderBy.type === OrderOption.tokenCount.val || orderBy.type === OrderOption.transferCount.val) {
    //TODO: investigate duplicate events being fetched (probably skips' issues)
    let {_events, mainnetIndex, xdaiIndex, _total} = await getEventsBySubgraphFirst(mainnetSkip, xdaiSkip, orderBy)
    mainnetSkip += mainnetIndex
    xdaiSkip += xdaiIndex
    events = _events
    total = _total
  } else {
    const {_events, _total, apiIndex} = await getEventsByApiFirst(apiSkip, orderBy, privateEvents)
    events = _events
    total = _total
    apiSkip += apiIndex
  }

  return {
    poapEvents: events.sort((e1, e2) => {
      let comp1, comp2
      switch (orderBy.type) {
        case OrderOption.date.val:
          comp1 = new Date(e1[orderBy.type])
          comp2 = new Date(e2[orderBy.type])
          break
        default:
          comp1 = e1[orderBy.type]
          comp2 = e2[orderBy.type]
      }
      return (comp1 > comp2 ? 1 : -1) * (orderBy.order === OrderDirection.ascending ? 1 : -1)
    }),
    total: total,
    apiSkip: apiSkip,
    mainnetSkip: mainnetSkip,
    xdaiSkip: xdaiSkip,
    page: page
  }
}

export async function getActivityPageData() {

  // const {mostRecent, mostClaimed, upcoming} = getTop3Events() //TODO: this need a custom server call (right now it's making a top 3 of a limited number of events)
  let mostRecent, mostClaimed, upcoming

  return {
    mostRecent: mostRecent,
    mostClaimed: mostClaimed,
    upcoming: upcoming,
  }
}


function processSubgraphEventData(subgraphEvent, apiEvent, owners, tokens) {
  if (subgraphEvent && subgraphEvent.data) {
    if(subgraphEvent.data.tokens && subgraphEvent.data.tokens.length)
      tokens = tokens.concat(subgraphEvent.data.tokens)

    if(subgraphEvent.data.event) {
      if (subgraphEvent.data.event.tokenCount)
        apiEvent.tokenCount += parseInt(subgraphEvent.data.event.tokenCount);
      if (subgraphEvent.data.event.transferCount)
        apiEvent.transferCount += parseInt(subgraphEvent.data.event.transferCount);
    }

    for (let i = 0; i < subgraphEvent.data.tokens.length; i++) {
      const owner = subgraphEvent.data.tokens[i].owner;
      owner.tokensOwned = parseInt(owner.tokensOwned)
      owners[owner.id] = owner;
    }
  }
  return tokens
}

function processCrossChainTokenOwned(chainOwner, crossChainOwner) {
  if (crossChainOwner && crossChainOwner.data && crossChainOwner.data.accounts) {
    for (let i = 0; i < crossChainOwner.data.accounts.length; i++) {
      const owner = crossChainOwner.data.accounts[i];
      chainOwner[owner.id].tokensOwned += parseInt(crossChainOwner.data.accounts.find(({id}) => id === owner.id).tokensOwned)
    }
  }
}


export async function getEventPageData(eventId, first, skip) {
  // Get the tokens info
  let [mainnet, xDai, event] = await Promise.all([getMainnetTokens(eventId, first, skip), getxDaiTokens(eventId, first, skip), getEvent(eventId)])
  let tokens = []
  const xDaiOwners = {};
  const mainnetOwners = {}
  event.tokenCount = 0;
  event.transferCount = 0;

  // Process the data tokens and the owners
  tokens = processSubgraphEventData(mainnet, event, mainnetOwners, tokens);
  tokens = processSubgraphEventData(xDai, event, xDaiOwners, tokens);

  // Get owner's data from the other chain (tokensOwned)
  let [mainnetCallOwners, xDaiCallOwners]  = await Promise.all([
    // Get mainnet data from the xdai owners
    getMainnetOwners(Object.keys(xDaiOwners)),
    // Get xDai data from the mainnet owners
    getXDaiOwners(Object.keys(mainnetOwners))
  ])

  //Sum the tokensOwned (power) for both chains from every owner
  processCrossChainTokenOwned(xDaiOwners, mainnetCallOwners);
  processCrossChainTokenOwned(mainnetOwners, xDaiCallOwners);

  // Add the power to the tokens
  for (let j = 0; j < tokens.length; j++) {
    if (mainnetOwners[tokens[j].owner.id] !== undefined) {
      tokens[j].owner.tokensOwned = mainnetOwners[tokens[j].owner.id].tokensOwned
    } else if (xDaiOwners[tokens[j].owner.id] !== undefined ) {
      tokens[j].owner.tokensOwned = xDaiOwners[tokens[j].owner.id].tokensOwned
    } else {
      console.log("NOT FOUND", tokens[j].owner.id, tokens[j].owner.tokensOwned)
    }
  }
  return { id: eventId, event, tokens: uniqBy(tokens, 'id').sort((a, b) => {
    return parseInt(a.id) - parseInt(b.id)
  }) }
}
