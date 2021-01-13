import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";


let initialState = {
  fetching: false,
  location: null,
  weather: null, 
  selectedLocation: {
      city: null,
      country: null
  }
}

const currentLocationReducer = (state = initialState.location, action) => {
  switch(action.type) {
      case 'SET_LOCATION':
          return action.payload
      default:
          return state
  }
}

const weatherReducer = (state = initialState.weather, action) => {
  switch(action.type) {
      case 'SET_WEATHER_DATA':
          return action.payload
      case 'CLEAR_WEATHER_DATA':
          return initialState.weather
      default:
          return state
  }
}

const fetchingReducer = (state = initialState.fetching, action) => {
  switch(action.type) {
      case 'FETCHING':
          return action.payload
      case 'DONE_FETCHING':
          return action.payload
      default:
          return state
  }
}

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  location: currentLocationReducer,
    weather: weatherReducer,
    fetching: fetchingReducer
});