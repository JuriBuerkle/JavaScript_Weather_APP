// Импортируем axios и Chart.js
const cityEl = document.getElementById("city");
const temperature = document.getElementById("temperature");
const gusts = document.getElementById("gusts");
const wind = document.getElementById("wind");
const codeEl = document.getElementById("code");
const ctx = document.getElementById("myChart");

async function fetchWeather() {
  const { data } = await axios.get(
    "https://api.bigdatacloud.net/data/reverse-geocode-client"
  );
  //   console.log(data);
  const { city, latitude, longitude } = data;

  cityEl.textContent = city;
  //
  console.log(city, latitude, longitude);

  // Сделайте запрос
  //   https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m&current=temperature_2m,wind_speed_10m,wind_direction_10m,wind_gusts_10m,weather_code
  //  замените координаты и выведите в консоль всю полученную информацию
  const { data: weatherInfo } = await axios.get(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&current=temperature_2m,wind_speed_10m,wind_direction_10m,wind_gusts_10m,weather_code`
  );

  const { current_units, current, hourly } = weatherInfo;
  const { temperature_2m, wind_gusts_10m, wind_speed_10m, weather_code } =
    current;
  const {
    temperature_2m: tempUnit,
    wind_gusts_10m: gustsUnit,
    wind_speed_10m: speedUnit,
  } = current_units;

  temperature.textContent += temperature_2m + tempUnit;
  gusts.textContent = wind_gusts_10m + gustsUnit;
  wind.textContent = wind_speed_10m + speedUnit;

  codeEl.textContent = interprete(weather_code); // код погоды
  // принимает числовой код -> строка с расшифровкой

//   const { temperature_2m: temperatures, time: times } = hourly;

  new Chart(ctx, {
    type: "line",
    data: {
        labels: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
        datasets: [
            {
                label:"Время, " + "Temperature" + tempUnit,
                data: [1, 20, 21, 22, 13, 24, 25, 6, 27, 28],
                borderWidth: 5,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

function interpreteWeatherCode(code) {}

fetchWeather();

// NaN - это одно из значений типа number

// const codesAndInterpretations = new Map();
// codesAndInterpretations.set(0, "Clear sky");
// codesAndInterpretations.set(1, "Mainly clear");
// codesAndInterpretations.set(2, "Overcast");

// codesAndInterpretations.get(2);

// new Set();

function interprete(code) {
  const codesAndInterpretations = {
    0: "Clear sky",
    1: "Mainly cloudy",
    2: "Partly cloudy",
    3: "Bewölkt",
    45: "Nebel",
    48: "Eisnebel",
    51: "Leichter Nieselregen",
    53: "Mäßiger Nieselregen",
    55: "Starker Nieselregen",
    61: "Leichter Regen",
    63: "Mäßiger Regen",
    65: "Starker Regen",
    66: "Gefrierender leichter Regen",
    67: "Gefrierender starker Regen",
    71: "Leichter Schneefall",
    73: "Mäßiger Schneefall",
    75: "Starker Schneefall",
    77: "Schneekörner",
    80: "Leichter Regenschauer",
    81: "Mäßiger Regenschauer",
    82: "Heftiger Regenschauer",
    85: "Leichter Schneeschauer",
    86: "Heftiger Schneeschauer",
    95: "Gewitter",
    96: "Gewitter mit leichtem Hagel",
    99: "Gewitter mit starkem Hagel",
  };

  return codesAndInterpretations[code] || "Wrong code";
}

// async function getWeather(){
//     const apiKey = '3603bb385cba1812ea388450e7b58c94'; // ключ
//     const city = document.getElementById('city').value;
//     console.log(city);
//     if(!city){
//         alert('Введите название города');
//         return;
//     }
//     const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
//     try{
//         const response = await fetch(url);
//         if(!response.ok){
//             throw new Error("Город не найден");
//         }
//         const data = await response.json();
//         document.getElementById('weather').innerHTML = `
//                     <h2>${data.name}, ${data.sys.country}</h2>
//                     <p>Температура: ${data.main.temp}°C</p>
//                     <p>Погода: ${data.weather[0].description}</p>
//                     <p>Влажность: ${data.main.humidity}%</p>
//                     <p>Ветер: ${data.wind.speed} м/с</p>
//                 `;
//     }
//     catch (error) {
//                 document.getElementById('weather').innerHTML = `<p style="color: red;">Ошибка: ${error.message}</p>`;
//             }

// }
