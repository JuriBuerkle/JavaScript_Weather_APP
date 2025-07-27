const cityEl = document.getElementById("city");
const temperature = document.getElementById("temperature");
const gust = document.getElementById("gusts");
const wind = document.getElementById("wind");

async function fetchWeather() {
  const { data } = await axios.get(
    "https://api.bigdatacloud.net/data/reverse-geocode-client"
  );
  //   console.log(data);
  const { city, latitude, longitude } = data;
  const
  //
  console.log(city, latitude, longitude);

  // Сделайте запрос
  //   https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m&current=temperature_2m,wind_speed_10m,wind_direction_10m,wind_gusts_10m,weather_code
  //  замените координаты и выведите в консоль всю полученную информацию
  const { data: weatherInfo } = await axios.get(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&current=temperature_2m,wind_speed_10m,wind_direction_10m,wind_gusts_10m,weather_code`
  );

  // console.log(weatherInfo);
const { current_units, current} = weatherInfo;
const { temperature_2m, wind_gusts_10m } = current;
}

fetchWeather();
