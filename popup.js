var checkInStorage, checkOutStorage, empolyeeIdStorage = ""
var progressbar = {};

$(function() {
  chrome.storage.local.get(['checkIn'], function(result) {
    var checkInInput = document.getElementById("checkIn");
    checkInStorage = result.checkIn
    checkInInput.value = checkInStorage;
  });

  chrome.storage.local.get(['checkOut'], function(result) {
    var checkOutInput = document.getElementById("checkOut");
    checkOutStorage = result.checkOut
    checkOutInput.value = checkOutStorage;
  });
  chrome.storage.local.get(['employeeId'], function(result) {
    var employeeIdInput = document.getElementById("employeeId");
    empolyeeIdStorage = result.employeeId
    employeeIdInput.value = empolyeeIdStorage;
  });

  progressbar = {

    progress: 0,
    progress_max: 0,
    $progress_bar: $('#progressbar'),

    set: function (num) {
        if (this.progress_max && num) {
            this.progress = num / this.progress_max * 100;
            this.$progress_bar.width(String(this.progress) + '%');
        }
    },

    fn_wrap: function (num) {
        setTimeout(function() {
            this.set(num);
        }, 0);
    }

    };

})

window.onload=function(){
  document.getElementById('sendAttendance').addEventListener('click', fillAttendance);
}

function fillAttendance() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.executeScript(tabs[0].id, {file: "add.js"});
  });
  var checkInData = document.getElementById("checkIn").value;
  var checkIn = String(Number(checkInData.split(":")[0]) - 2) + checkInData.substr(2)

  var checkOutData = document.getElementById("checkOut").value;
  var checkOut = String(Number(checkOutData.split(":")[0]) - 2) + checkOutData.substr(2)

  var employeeId = document.getElementById("employeeId").value;
  var startDate = new Date(document.getElementById("startDate").value);
  var endDate = new Date(document.getElementById("endDate").value);
  var diffDays = parseInt((endDate - startDate) / (1000 * 60 * 60 * 24));

  progressbar.progress_max = diffDays;

  var i = 0;

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
 setStorage(checkInData, checkOutData, employeeId);
 i++;
 progressbar.set(i);
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

function setStorage(checkIn, checkOut, employeeId) {
  if (checkIn != checkInStorage) {
    chrome.storage.local.set({checkIn: checkIn}, function() {
      console.log('Check In value is set to ' + checkIn);
    });
  }
  if (checkOut != checkOutStorage) {
    chrome.storage.local.set({checkOut: checkOut}, function() {
      console.log('Check Out value is set to ' + checkOut);
    });
  }
  if (employeeId != empolyeeIdStorage) {
    chrome.storage.local.set({employeeId: employeeId}, function() {
      console.log('Empolyee Id value is set to ' + employeeId);
    });
  }
  location.reload();
}

function move() {
  var elem = document.getElementById("progressBar"); 
  var width = 1;
  var id = setInterval(frame, 10);
  function frame() {
    if (width >= 100) {
      clearInterval(id);
    } else {
      width++; 
      elem.style.width = width + '%'; 
    }
  }
}