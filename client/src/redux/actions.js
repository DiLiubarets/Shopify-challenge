// export const apiKey = process.env.REACT_APP_OPEN_WEATHER_API_KEY

const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?';
const apiKey = '7e882bb8ed2dcfe85cf3abf5390335b4';

export const getWeatherData = (param1, param2, type) => {
    let apiUrl = type === 'coordinates' 
    ? 
    `${baseUrl}lat=${param1}&lon=${param2}&units=imperial&appid=${apiKey}`
    :
    `${baseUrl}q=${param1},${param2}&appid=${apiKey}&units=imperial`
    return dispatch => {
        fetch(apiUrl)
        .then(resp => resp.json())
        .then(data => dispatch(setWeatherData(data)))
        .then(dispatch(setFetchingFalse()))
    }
}

export const setCurrentLocation = location => {
    return { type: `SET_LOCATION`, payload: location }
}

export const clearLocation = () => {
    return { type: 'CLEAR_LOCATION' }
}

export const setWeatherData = data => {
    console.log(data)
    return { type: 'SET_WEATHER_DATA', payload: data}
}

export const clearWeatherData = () => {
    return { type: 'CLEAR_WEATHER_DATA' }
}

export const setFetchingTrue = () => {
    return { type: 'FETCHING', payload: true}
}

export const setFetchingFalse = () => {
    return { type: 'DONE_FETCHING', payload: false}
}