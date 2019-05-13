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




function setForm() {
  var checkIn = document.getElementById("checkIn");
  checkIn.value = "10:00:00"
  var checkOut = document.getElementById("checkOut");
  checkOut.value = "17:20:00"
}

function injectTheScript() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.executeScript(tabs[0].id, {file: "add.js"});
  });
}

window.onload=function(){
  document.getElementById('sendAttendance').addEventListener('click', injectTheScript);
  setForm();
}

    console.log("Attendance is filled!!!");
