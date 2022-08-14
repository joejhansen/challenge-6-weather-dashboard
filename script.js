// api key = bb4a2cc31f0088381e043273ec374977

var searchButton = $('#searchBtn');
var searchForm = $("#searchForm");
var ulEl = $("#ulEl");
var forecastDiv = $("#forecastDiv")
var searches = []

// the bulk of what's fetching things
function apiFetch(event) {
    var thisCity
    event.preventDefault();
    var thisForm = $(event.target.children[1])
    if (thisForm.val().trim() === ""){
        thisCity = "SAN JOSE"
    } else{
        thisCity = thisForm.val().trim();
    }
    searches.push(thisCity)
    var searchesString = JSON.stringify(searches)
    localStorage.setItem("searches", searchesString)
    var fetchThisWeather = "https://api.openweathermap.org/data/2.5/weather?q=" + thisCity + "&appid=bb4a2cc31f0088381e043273ec374977&units=imperial"
    var fetchThisForecast = "https://api.openweathermap.org/data/2.5/forecast?q=" + thisCity + "&appid=bb4a2cc31f0088381e043273ec374977&units=imperial"
    fetch(fetchThisWeather)
        .then (function (response) {
            return response.json();
        })
        .then(function (data) {
            // console.log(data)
            document.getElementById("cityDisplay").textContent = thisCity.toUpperCase();
            var weatherIcon = data.weather[0].icon
            var weatherIconUrl = "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png"
            var temp = data.main.temp;
            var windSpeed = data.wind.speed
            var humidity = data.main.humidity
            var weather = data.weather
            var shortDescription = data.weather[0].main
            document.getElementById("tempDisplay").textContent = temp
            document.getElementById("windDisplay").textContent = windSpeed
            document.getElementById("humidityDisplay").textContent = humidity
            var historyEntry = document.createElement("div")
            historyEntry.classList.add("historyDivs")
            historyEntry.classList.add("text-center")
            historyEntry.textContent = thisCity.toUpperCase();
            document.getElementById("history").appendChild(historyEntry)
        });
    fetch(fetchThisForecast)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // console.log(data)
            while (document.getElementById("forecastDiv").firstChild) {
                document.getElementById("forecastDiv").removeChild(document.getElementById("forecastDiv").firstChild)
            }
            for (i = 6; i < data.list.length; i = i + 8) {
                var thisDay = data.list[i];
                var temp = thisDay.main.temp
                var wind = thisDay.wind.speed
                var humidity = thisDay.main.humidity
                var weatherIcon = thisDay.weather[0].icon
                var weatherIconUrl = "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png"
                var card = document.createElement('div')
                card.classList.add("card")
                card.classList.add("col")
                card.innerHTML = "<p>" + thisDay.dt_txt.split(' ')[0] + "<p><img src='" + weatherIconUrl + "'><li>Temp: " + temp + "F</li><li>Wind: " + wind + "mph</li><li>Humidity: " + humidity + "%</li>"
                document.getElementById("forecastDiv").appendChild(card)

            }
        })

}

// adding history from stored objects
function init() {
    var searchesString = localStorage.getItem("searches")
    if (searchesString === null) {
        return
    } else {
        searches = JSON.parse(searchesString)
        for (i = 0; i < searches.length; i++) {
            var historyEntry = document.createElement("div")
            historyEntry.classList.add("historyDivs")
            historyEntry.classList.add("text-center")
            historyEntry.textContent = searches[i].toUpperCase();
            document.getElementById("history").appendChild(historyEntry)
        }
    }
}



searchForm.on('submit', apiFetch)

init();

// bubbling for the click event on the history div I repeat myself hear but I couldn't get the data to work in a seperate function so had to keep it as two anonymous ones
document.getElementById("history").addEventListener('click', function (event) {
    var thisCity = event.target.textContent
    var fetchThisWeather = "https://api.openweathermap.org/data/2.5/weather?q=" + thisCity + "&appid=bb4a2cc31f0088381e043273ec374977&units=imperial"
    var fetchThisForecast = "https://api.openweathermap.org/data/2.5/forecast?q=" + thisCity + "&appid=bb4a2cc31f0088381e043273ec374977&units=imperial"
    fetch(fetchThisWeather)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            document.getElementById("cityDisplay").textContent = thisCity.toUpperCase();
            var temp = data.main.temp;
            var windSpeed = data.wind.speed
            var humidity = data.main.humidity
            var weather = data.weather
            var shortDescription = data.weather[0].main
            document.getElementById("tempDisplay").textContent = temp
            document.getElementById("windDisplay").textContent = windSpeed
            document.getElementById("humidityDisplay").textContent = humidity
        });
    fetch(fetchThisForecast)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            while (document.getElementById("forecastDiv").firstChild) {
                document.getElementById("forecastDiv").removeChild(document.getElementById("forecastDiv").firstChild)
            }
            for (i = 6; i < data.list.length; i = i + 8) {
                var thisDay = data.list[i];
                var temp = thisDay.main.temp
                var wind = thisDay.wind.speed
                var humidity = thisDay.main.humidity
                var weatherIcon = thisDay.weather[0].icon
                var weatherIconUrl = "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png"
                var card = document.createElement('div')
                card.classList.add("card")
                card.classList.add("col")
                card.innerHTML = "<p>" + thisDay.dt_txt.split(' ')[0] + "<p><img src='" + weatherIconUrl + "'><li>Temp: " + temp + "F</li><li>Wind: " + wind + "mph</li><li>Humidity: " + humidity + "%</li>"
                document.getElementById("forecastDiv").appendChild(card)

            }
        })
})