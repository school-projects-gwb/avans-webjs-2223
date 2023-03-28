export default class WeatherHelper {
    constructor() {
        this.apiKey = 'c06c817ec00a4123b54145914232803';
        this.currentCity = 'Amsterdam';
        this.weatherData = {};
    }

    async fetchWeatherData() {
        const url = `https://api.weatherapi.com/v1/current.json?key=${this.apiKey}&q=${this.currentCity}`;
        const response = await fetch(url);
        const data = await response.json();
        const { current: { wind_kph, precip_mm, snow_mm, temp_c } } = data;

        this.weatherData = {
          isWindy: wind_kph > 25,
          isRaining: precip_mm > 0,
          isSnowing: snow_mm > 0,
          temperature: temp_c
        };
    }

    async updateWeatherData() {
        await this.fetchWeatherData();
    }
}