letweatherStatus = "";
let cityName = document.querySelector(".city-search-name");
let inputsqr = document.querySelector(".searchpad");
let elementMoreInfo = document.querySelector(".moreInfo");

const debounce = (fn, ms) => {
  let timeout;
  return function () {
    const fnCall = () => {
      fn.apply(this, arguments);
    };
    clearTimeout(timeout);
    timeout = setTimeout(fnCall, ms);
  };
};

inputsqr.addEventListener("input", function (e) {
  cityName.innerHTML = '"' + e.target.value + '"';
  console.log(e.target.value);
});

async function getWeatherData(city) {
  const result = await fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=ff758b35e56af34e8073d2b3508c535e`
  ).then(function (resp) {
    return resp.json();
  });
  return result;
}

const onInputDebounced = debounce(async (e) => {
  const weatherData = await getWeatherData(e.target.value);
  console.log(weatherData);
  let baseIconUrl = "http://openweathermap.org/img/wn/";
  const tempCounter = document.querySelector(".forTemp");
  const firstIconDiv = document.querySelector(".firstIcon");
  const firstvalueDiv = document.querySelector(".firstValue");
  const newIcon = document.createElement("img");
  const newIcon1 = document.createElement("img");
  // const AddInfo1Icon = document.createElement("div");
  // const AddInfo2Icon = document.createElement("div");
  // const AddInfo1Value = document.createElement("div");
  // const AddInfo2Value = document.createElement("div");
  const iconDiv = document.querySelector(".forIcon");
  const country = document.querySelector(".forCity");
  const weatherStatus = document.querySelector(".forWeatherStatus");
  const aditionalInfoIcons = document.querySelector(".icons");
  const aditionalInfoValues = document.querySelector(".value");
  const elementMoreInfo = document.querySelector(".moreInfo");
  const signForEvent = document.querySelector(".sign");
  const timeLine = document.querySelector(".timeInfo");
  if (!AddInfo1Icon) {
    AddInfo1Icon = document.createElement("div");
    AddInfo1Icon.classList.add("icon1");
    aditionalInfoIcons.appendChild(AddInfo1Icon);
  }

  if (!AddInfo2Icon) {
    AddInfo2Icon = document.createElement("div");
    AddInfo2Icon.classList.add("icon2");
    aditionalInfoIcons.appendChild(AddInfo2Icon);
  }

  if (!AddInfo1Value) {
    AddInfo1Value = document.createElement("div");
    AddInfo1Value.classList.add("value1");
    aditionalInfoValues.appendChild(AddInfo1Value);
  }

  if (!AddInfo2Value) {
    AddInfo2Value = document.createElement("div");
    AddInfo2Value.classList.add("value2");
    aditionalInfoValues.appendChild(AddInfo2Value);
  }

  // =======================================================================================
  firstIconDiv.innerHTML = "lon,lat";
  firstvalueDiv.innerHTML = `${weatherData.coord.lon}, ${weatherData.coord.lat}`;
  //======================================================================================
  aditionalInfoIcons.innerHTML = "";
  aditionalInfoValues.innerHTML = "";
  aditionalInfoIcons.appendChild(AddInfo1Icon);
  AddInfo1Icon.classList.add("icon1");
  aditionalInfoValues.appendChild(AddInfo1Value);
  AddInfo1Value.classList.add("value1");
  AddInfo1Icon.innerHTML = `<img src="https://cdn-icons-png.flaticon.com/512/1185/1185475.png" style="width:24px; height:20px;" />`;
  AddInfo1Value.innerHTML = Math.round(weatherData.wind.speed) + "m/s";
  //=======================================================================================
  aditionalInfoIcons.appendChild(AddInfo2Icon);
  AddInfo2Icon.classList.add("icon2");
  aditionalInfoValues.appendChild(AddInfo2Value);
  AddInfo2Value.classList.add("value2");
  AddInfo2Icon.innerHTML = `<img src="https://cdn-icons-png.flaticon.com/512/2635/2635102.png" style="width:24px; height:20px;" />`;
  AddInfo2Value.innerHTML = `${weatherData.main.humidity}%`;
  // =======================================================================================
  iconDiv.innerHTML = "";
  newIcon.src = baseIconUrl + weatherData.weather[0].icon + "@2x.png";
  iconDiv.appendChild(newIcon);
  aditionalInfoIcons.appendChild(newIcon1);
  country.innerHTML = weatherData.sys.country + "," + weatherData.name;
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  weatherStatus.innerHTML =
    capitalizeFirstLetter(weatherData.weather[0].description) + "...";
  tempCounter.innerHTML =
    Math.round(weatherData.main.temp) - 273 + "&deg;" + "C";
  // ==========================================================================================
  signForEvent.addEventListener("click", () => {
    elementMoreInfo.classList.toggle("moreInfoHiden");
  });
  // ================================================================================================
  let newDate = new Date(weatherData.dt * 1000);
  timeLine.innerHTML =
    "Updated:" +
    " " +
    `${newDate.getDate()}` +
    "." +
    `${newDate.getMonth()}` +
    "." +
    `${newDate.getFullYear()}` +
    " " +
    `${newDate.getHours()}` +
    ":" +
    `${newDate.getMinutes()}`;
}, 3000);

inputsqr.addEventListener("input", onInputDebounced);
