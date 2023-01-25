const wsUri = "wss://echo-ws-service.herokuapp.com";

const btnSend = document.querySelector(".btn-send");
const btnGeo = document.querySelector(".btn-geo");
const output = document.querySelector(".output");
const infoOutput = document.querySelector(".info-output");
const input = document.querySelector(".text-input");
const geoOutput = document.querySelector(".geo-output");

let socket = new WebSocket(wsUri);

socket.onopen = () => {
    infoOutput.innerText = "Соединение установлено";
}

socket.onmessage = (event) => {
    writeToChat(event.data, true);
}

socket.onerror = () => {
    infoOutput.innerText = "При передаче данных произошла ошибка";
}

btnSend.addEventListener("click", sendMessage);

function sendMessage() {
    if (!input.value) return;
    socket.send(input.value);
    writeToChat(input.value, false);
    input.value === "";
}

function writeToChat(message, isRecieved) {
    let messageHTML = `<div class="${isRecieved? "recieved" : "sent"}">${message}</div>`;
    output.innerHTML += messageHTML;
}

const error = () => {
    geoOutput.textContent = "Невозможно определить ваше местоположение";
}

const success = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    geoOutput.textContent = `Широта: ${latitude} °, Долгота: ${longitude} °`;
    const mapLink = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
    sendGeolocation(mapLink);
}

function sendGeolocation(mapLink) {
    let yourPosition = `<div class="${"sent"}"><a href="${mapLink}" target="_blank">Моё местоположение</a></div>`;
    output.innerHTML += yourPosition;
}

btnGeo.addEventListener("click", () => {
    if (!navigator.geolocation) {
        geoOutput.textContent = "Определение местоположения не поддерживается вашим браузером";

    } else {
        geoOutput.textContent = "Подождите, идёт определение местоположения";
        navigator.geolocation.getCurrentPosition(success, error);
    }
})

