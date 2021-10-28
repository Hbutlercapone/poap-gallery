import { createSlice, combineReducers, configureStore, createAsyncThunk, current  } from '@reduxjs/toolkit';
import {getIndexPageData, getEventPageData, getActivityPageData} from './mutations';

const initialEventsState = {
  events: [],
  event: {},
  transfers: [],
  mostClaimed: undefined,
  upcoming: undefined,
  mostRecent: undefined,
  status: 'idle',
  error: null,
  eventStatus: 'idle',
  eventError: null,
  tokens: [],
  tokenId: null,
  apiSkip: 0,
  mainnetSkip: 0,
  xdaiSkip: 0,
  page: 0,
  totalEvents: 0,
}

export const fetchIndexData = createAsyncThunk('events/fetchIndexEvents',
    async ({orderBy, reset, privateEvents = undefined}, thunkAPI) => getIndexPageData(orderBy, reset, privateEvents, thunkAPI.getState()))
export const fetchEventPageData = createAsyncThunk('events/fetchEventPageData', async ({eventId, first, skip}) => getEventPageData(eventId, first, skip))
export const fetchActivityPageData = createAsyncThunk('events/fetchActivityPageData', async ({}) => getActivityPageData())


const eventsSlice = createSlice({
  name: 'events',
  initialState: initialEventsState,
  reducers: {},
  extraReducers: {
    [fetchIndexData.pending]: (state, action) => {
      const reset = action.meta.arg.reset //TODO: check if this is good practice
      if (reset) {
        state.status = 'loading'
      } else {
        state.status = 'loadingMore'
      }
    },
    [fetchIndexData.fulfilled]: (state, action) => {
      const { poapEvents, apiSkip, mainnetSkip, xdaiSkip, total, page } = action.payload

      if (page === 0) {
        state.events = poapEvents
        state.page = 1
      } else {
        state.events = current(state.events).concat(poapEvents)
        state.page++
      }

      state.apiSkip = apiSkip //TODO: use these skips
      state.mainnetSkip = mainnetSkip
      state.xdaiSkip = xdaiSkip
      state.totalEvents = total //TODO: may not need it, check
      state.status = 'succeeded'
    },
    [fetchIndexData.rejected]: (state, action) => {
      state.eventError = action.error.message
      state.status = 'failed'
      console.warn(action.error)
    },
    [fetchEventPageData.pending]: (state, action) => {
      state.eventStatus = 'loading'
    },
    [fetchEventPageData.fulfilled]: (state, action) => {
      if (state.tokenId === action.payload.id) {
        state.tokens = current(state.tokens).concat(action.payload.tokens)
      } else {
        state.tokens = action.payload.tokens
      }

      state.tokenId = action.payload.id
      state.event = action.payload.event
      state.eventStatus = 'succeeded'
    },
    [fetchEventPageData.rejected]: (state, action) => {
      state.eventError = action.error.message
      state.eventStatus = 'failed'
      console.warn(action.error)
    },
    [fetchActivityPageData.pending]: (state, action) => {
      // state.eventStatus = 'loading'
    },
    [fetchActivityPageData.fulfilled]: (state, action) => {
      const { mostRecent, mostClaimed, upcoming } = action.payload
      state.upcoming = upcoming
      state.mostRecent = mostRecent
      state.mostClaimed = mostClaimed
    },
    [fetchActivityPageData.rejected]: (state, action) => {
      // state.eventError = action.error.message
      // state.eventStatus = 'failed'
      console.warn(action.error)
    }
  }
})

export const selectEventStatus = state => state.events.status
export const selectEventError = state => state.events.error

export const selectRecentEvents = state => state.events.events.filter(event => {
  // don't show future events
  if ((new Date(event.start_date.replace(/-/g, ' ')).getTime() > new Date().getTime() + (24 * 60 * 60 * 1000))) {
    return false
  }
  // don't show events without a claimed token
  if (event.tokenCount !== undefined && event.tokenCount === 0) {
    return false
  }
  return true
})

export const selectMostRecent = state => state.events.mostRecent
export const selectMostClaimed = state => state.events.mostClaimed
export const selectUpcoming = state => state.events.upcoming

const rootReducer = combineReducers({
  events: eventsSlice.reducer,
})

const store = configureStore({
  reducer: rootReducer
})

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept(rootReducer, () => {
    const newRootReducer = rootReducer
    store.replaceReducer(newRootReducer)
  })
}

export default store
