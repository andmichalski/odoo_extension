document.addEventListener('DOMContentLoaded', documentEvents  , false);

function myAction(input) { 
    console.log("input value is : " + input.value);
    alert("The entered data is : " + input.value);
    // do processing with data
    // you need to right click the extension icon and choose "inspect popup"
    // to view the messages appearing on the console.
}

function documentEvents() {    
//   document.getElementById('ok_btn').addEventListener('click', 
    // function() { myAction(document.getElementById('checkIn'));
    myAction(document.getElementById('checkIn'));
  };

  // you can add listeners for other objects ( like other buttons ) here 
// const url = chrome.runtime.getURL('data/data.json');

// fetch(url)
//     .then((response) => response.json()) //assuming file contains json
//     .then((json) => getData(json));

// function getData(json) {
//     var data = JSON.parse(json);
//     console.log(data);
//     alert(data);
// }

    // fetch("https://odoo.servocode.com/web/dataset/call_kw/hr.attendance/create", 
    // {
    // "credentials":"include",
    // "headers":{
    //     "accept":"application/json, text/javascript, */*; q=0.01",
    //     "accept-language":"pl-PL,pl;q=0.9,en-US;q=0.8,en;q=0.7",
    //     "cache-control":"no-cache",
    //     "content-type":"application/json",
    //     "pragma":"no-cache",
    //     "x-requested-with":"XMLHttpRequest"},
    // "referrer":"https://odoo.servocode.com/web?",
    // "referrerPolicy":"no-referrer-when-downgrade",
    // "body":"{\"jsonrpc\":\"2.0\",\"method\":\"call\",\"params\":{\"model\":\"hr.attendance\",\"method\":\"create\",\"args\":[{\"employee_id\":376,\"check_in\":\"2019-05-05 08:58:24\",\"check_out\":\"2019-05-05 08:58:32\",\"x_day_off\":true}],\"kwargs\":{\"context\":{\"lang\":\"en_US\",\"tz\":\"Europe/Warsaw\",\"uid\":134,\"search_default_today\":1,\"params\":{\"action\":538}}}},\"id\":137406774}",
    // "method":"POST",
    // "mode":"cors"
    // });