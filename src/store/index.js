import { createSlice, combineReducers, configureStore, createAsyncThunk, current  } from '@reduxjs/toolkit';
import { getIndexPageData, getEventPageData } from './mutations';

export const FETCH_INFO_STATUS = {
  IDLE: 'IDLE',
  LOADING: 'LOADING',
  SUCCEEDED: 'SUCCEEDED',
  FAILED: 'FAILED'
}
export const FETCH_EVENT_PAGE_INFO_STATUS = {
  ...FETCH_INFO_STATUS
}
export const FETCH_INDEX_PAGE_INFO_STATUS = {
  ...FETCH_INFO_STATUS
}

const initialEventsState = {
  events: [],
  event: {},
  transfers: [],
  mostClaimed: undefined,
  upcoming: undefined,
  mostRecent: undefined,
  status: FETCH_INDEX_PAGE_INFO_STATUS.IDLE,
  eventStatus: FETCH_EVENT_PAGE_INFO_STATUS.IDLE,
  eventError: null,
  tokens: [],
  tokenId: null
}

export const fetchIndexData = createAsyncThunk('events/fetchIndexEvents', getIndexPageData)
export const fetchEventPageData = createAsyncThunk('events/fetchEventPageData', async ({eventId, first, skip}) => getEventPageData(eventId, first, skip))


const eventsSlice = createSlice({
  name: 'events',
  initialState: initialEventsState,
  reducers: {},
  extraReducers: {
    [fetchIndexData.pending]: (state, action) => {
      state.status = FETCH_INDEX_PAGE_INFO_STATUS.LOADING
    },
    [fetchIndexData.fulfilled]: (state, action) => {
      const { poapEvents, mostRecent, mostClaimed, upcoming } = action.payload
      state.events = poapEvents
      state.mostRecent = mostRecent
      state.mostClaimed = mostClaimed
      state.upcoming = upcoming
      state.status = FETCH_INDEX_PAGE_INFO_STATUS.SUCCEEDED
    },
    [fetchIndexData.rejected]: (state, action) => {
      state.eventError = action.error.message
      state.status = FETCH_INDEX_PAGE_INFO_STATUS.FAILED
      console.warn(action.error)
    },
    [fetchEventPageData.pending]: (state, action) => {
      state.eventStatus = FETCH_EVENT_PAGE_INFO_STATUS.LOADING
    },
    [fetchEventPageData.fulfilled]: (state, action) => {
      if (state.tokenId === action.payload.id) {
        state.tokens = current(state.tokens).concat(action.payload.tokens)
      } else {
        state.tokens = action.payload.tokens
      }

      state.tokenId = action.payload.id
      state.event = action.payload.event
      state.eventStatus = FETCH_EVENT_PAGE_INFO_STATUS.SUCCEEDED
    },
    [fetchEventPageData.rejected]: (state, action) => {
      state.eventError = action.error.message
      state.eventStatus = FETCH_EVENT_PAGE_INFO_STATUS.FAILED
    }
  }
})

export const selectIndexFetchStatus = state => state.events.status

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
