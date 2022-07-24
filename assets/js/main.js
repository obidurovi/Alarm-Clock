const presentTime = document.querySelector('h1'),
content = document.querySelector('.content'),
selectMenu = document.querySelectorAll('select'),
setAlarmBtn = document.querySelector('button');

let alarmTime, isAlarmSet, ringtone = new Audio('assets/audio/ringtone.mp3');

// Get Hours
for (let i = 12; i > 0; i--) {
    i = i < 10 ? `0${i}` : i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[0].firstElementChild.insertAdjacentHTML('afterend', option);
}

// Get Minutes 
for (let i = 59; i >= 0; i--) {
    i = i < 10 ? `0${i}` : i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[1].firstElementChild.insertAdjacentHTML('afterend', option);
}
// Get  Time Invention
for (let i = 2; i > 0; i--) {
    let ampm = i == 1 ? "AM" : "PM";
    let option = `<option value="${ampm}">${ampm}</option>`;
    selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
}

setInterval (() => {
    // Get Time 
    let date = new Date(),
    hours = date.getHours(),
    minutes = date.getMinutes(),
    seconds = date.getSeconds(),
    ampm = "AM";
    // Get Time Invention
    if(hours >= 12) {
        hours = hours - 12;
        ampm = "PM";
    }
    // Get Present Time
    hours = hours == 0 ? hours = 12 : hours;
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    // Push Time to dom
    presentTime.innerText = `${hours}:${minutes}:${seconds} ${ampm}`;

    // Set Alarm
    if (alarmTime === `${hours}:${minutes} ${ampm}`) {
        ringtone.play();
        ringtone.loop = true;
    }


});

// Pause Alarm
function setAlarm() {
    if (isAlarmSet) {
        alarmTime = "";
        ringtone.pause();
        content.classList.remove("disable");
        setAlarmBtn.innerText = "Set Alarm";
        return isAlarmSet = false;
    }
// Alarm Validation
    let time = `${selectMenu[0].value}:${selectMenu[1].value} ${selectMenu[2].value}`;
    if (time.includes("Hour") || time.includes("Minute") || time.includes("AM/PM")) {
        return alert("Please, Select a valid time to set alarm!");
    }

    // Set Clear Alarm logic
    alarmTime = time;
    isAlarmSet = true;
    content.classList.add("disable");
    setAlarmBtn.innerText = "Clear Alarm";
}

setAlarmBtn.addEventListener('click', setAlarm);

