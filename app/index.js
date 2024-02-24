import clock from "clock";
import document from "document";
import {battery,charger} from "power";
import { HeartRateSensor } from "heart-rate";
import {me as appbit} from 'appbit';


import { addComma, getDay3, monoDigits, zeroPad } from "../common/utils";

const heartrm = document.getElementById("heartrate");
const batt = document.getElementById("battery");


clock.granularity = "minutes";


const myLabel = document.getElementById("clock-label-hours");
const myLabel1 = document.getElementById("clock-label-minutes");
const myLabel2 = document.getElementById("myLabel2");
const imgBattery = document.getElementById("battery_img");



clock.addEventListener("tick", (evt) => {
  let today = evt.date;
  let hours = zeroPad(today.getHours());
  myLabel.text = `${hours}`
});



clock.addEventListener("tick", (evt) => {
  let today = evt.date;
  let mins = zeroPad(today.getMinutes());
  myLabel1.text = `${mins}`
});


let daytext = "day";
let monthtext = "month";


let $ = id => document.getElementById(id);

clock.ontick =  (evt) => {
  let today = evt.date;
  let days = today.getDay();
  let months = today.getMonth();
  let dates = today.getDate();
  let years = today.getFullYear();
updateScene(days, months, dates, years);


}

function updateScene(days , months , dates , years) {
  
 
  myLabel2.text = " " + daytext + " " + monthtext + " " + dates + " " + years + " ";

 if (months == 0){monthtext = "JAN";}
 else if (months == 1){monthtext =  "FEB";}
 else if (months == 2){monthtext =  "MAR";}
 else if (months == 3){monthtext =  "APR";}
 else if (months == 4){monthtext =  "MAY";}
 else if (months == 5){monthtext =  "JUN";}
 else if (months == 6){monthtext =  "JUL";}
 else if (months == 7){monthtext =  "AUG";}
 else if (months == 8){monthtext =  "SEP";}
 else if (months == 9){monthtext =  "OCT";}
 else if (months == 10){monthtext = "NOV";}
 else if (months == 11){monthtext = "DEC";}
 else {monthtext = "MONTH";}
   
 if (days == 0){daytext =      "Sunday,";}
 else if (days == 1){daytext = "Monday,";}
 else if (days == 2){daytext = "Tuesday,";}
 else if (days == 3){daytext = "Wednesday,";}
 else if (days == 4){daytext = "Thursday,";}
 else if (days == 5){daytext = "Friday,";}
 else if (days == 6){daytext = "Saturday,";}
 else {daytext = "DAY";}
}


let hrm = null;
if (appbit.permissions.granted('access_heart_rate') && HeartRateSensor && !hrm) {
  hrm = new HeartRateSensor({frequency: 1});

  hrm.onreading = function () {
    heartrm.text = `${hrm.heartRate || '--'}`;
  };

  hrm.start();
}

function drawBattery() {

if (charger.connected){
    imgBattery.image="icons/uil--battery-bolt.png";
} else {
    imgBattery.image="icons/uil--battery-empty.png";
}

batt.text = `${battery.chargeLevel || '--'}`;
}



drawBattery();

battery.onchange = drawBattery;
