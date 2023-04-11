
// process.env.REACT_WEATHER_API_KEY
export const weatherOptions = {
  method: 'GET',
  url: 'http://api.weatherapi.com/v1/current.json',
  headers: {
    'key': '932c358674904f35b43105807231104',
  }
};

export const weatherHourlyOptions = {
  method: 'GET',
  url: 'http://api.weatherapi.com/v1/forecast.json',
  headers: {
    'key': '932c358674904f35b43105807231104',
  }
};

export const searchOptions = {
  method: 'GET',
  url: 'http://api.weatherapi.com/v1/search.json',
  headers: {
    'key': '932c358674904f35b43105807231104',
  }
};

