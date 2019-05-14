// const fs = require('fs');

// var dataLogin = fs.readFile('./data.json', 'utf8', (err, fileContents) => {
//   if (err) {
//     console.error(err)
//     return;
//   }
//   try {
//     const data = JSON.parse(fileContents)
//     alert(data);
//     console.log(data);
//   } catch(err) {
//     console.error(err);
//   }
// })

// document.addEventListener('DOMContentLoaded', function() {
//     var link = document.getElementById('sendAttendance');
//     link.addEventListener('click', function() {
//       alert("Send attendance is started");
//       var startDate = $("#startDate").val();
//       var endDate = $("#endDate").val();
//       var empolyeeID = $("#employeeId").val();
//       let dataLogin = require('./data.json');
//       $.getJSON(
//         "./data.json",
//         function(returnedData){
//           alert(returnedData);
//         }
//       )
//     });
// });


$(function() {
  chrome.storage.local.get(['checkIn'], function(result) {
    var checkInInput = document.getElementById("checkIn");
    checkInInput.value = result.checkIn;
  });

  chrome.storage.local.get(['checkOut'], function(result) {
    var checkOutInput = document.getElementById("checkOut");
    checkOutInput.value = result.checkOut;
  });
  chrome.storage.local.get(['employeeId'], function(result) {
    var employeeIdInput = document.getElementById("employeeId");
    employeeIdInput.value = result.employeeId;
  });
})

function injectTheScript() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.executeScript(tabs[0].id, {file: "add.js"});
  });
  var checkIn = document.getElementById("checkIn").value;
  var checkOut = document.getElementById("checkOut").value;
  var employeeId = document.getElementById("employeeId").value;
  var startDate = new Date(document.getElementById("startDate").value);
  var endDate = new Date(document.getElementById("endDate").value);

  for (var date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {


    if (date.getDay() === 0 || date.getDay() === 6) {

      var day = ("0" + (date.getDate() - 1)).slice(-2)   
      var month = ("0" + (date.getMonth() + 1)).slice(-2)  
      var fillDate = month + "-" + day + "-" + date.getFullYear()

      var checkFree = "22:00:00";
      var dayOff = "true";
      addAttendance(checkFree, checkFree, employeeId, fillDate, dayOff);
      console.log("Day is free!!!")

    } else {
      var day = ("0" + (date.getDate())).slice(-2)   
      var month = ("0" + (date.getMonth() + 1)).slice(-2)  
      var fillDate = month + "-" + day + "-" + date.getFullYear()
      console.log("Working day...")
      var dayOff = "false";
      addAttendance(checkIn, checkOut, employeeId, fillDate, dayOff);
    }



 }


}

function addAttendance(checkIn, checkOut, employeeId, date, dayOff) {
  console.log(checkIn);
  fetch("https://odoo.servocode.com/web/dataset/call_kw/hr.attendance/create", 
  {
  "credentials":"include",
  "headers":{
      "accept":"application/json, text/javascript, */*; q=0.01",
      "accept-language":"pl-PL,pl;q=0.9,en-US;q=0.8,en;q=0.7",
      "cache-control":"no-cache",
      "content-type":"application/json",
      "pragma":"no-cache",
      "x-requested-with":"XMLHttpRequest"},
  "referrer":"https://odoo.servocode.com/web?",
  "referrerPolicy":"no-referrer-when-downgrade",
  "body":"{\"jsonrpc\":\"2.0\",\"method\":\"call\",\"params\":{\"model\":\"hr.attendance\",\"method\":\"create\",\"args\":[{\"employee_id\": " + employeeId + ",\"check_in\":\"" + date + " " + checkIn + "\",\"check_out\":\""+ date + " " + checkOut + "\",\"x_day_off\":" + dayOff + "}],\"kwargs\":{\"context\":{\"lang\":\"en_US\",\"tz\":\"Europe/Warsaw\",\"uid\":134,\"search_default_today\":1,\"params\":{\"action\":538}}}},\"id\":137406774}",
  "method":"POST",
  "mode":"cors"
  });

}

window.onload=function(){
  // setForm();
  document.getElementById('sendAttendance').addEventListener('click', injectTheScript);
}

    console.log("Attendance is filled!!!");
