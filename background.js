var cookie = chrome.cookies.get({"url": "https://odoo.servocode.com", "name": "session_id"}, function(cookie) {
  return cookie.value;
})


chrome.browserAction.onClicked.addListener(function(tab) {
    // Send a message to the active tab
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"});
      })
      console.log("Message was sent!!!")

    });


chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if( request.message === "open_new_tab" ) {
        chrome.tabs.create({"url": request.url});
      }
    }
  );


// function getCookies(domain, name, callback) {
//     chrome.cookies.get({"url": domain, "name": name}, function(cookie) {
//         if(callback) {
//             callback(cookie.value);
//         }
//     });
// }
    // getCookies("https://odoo.servocode.com", "session_id", function(id) {
    //     alert(id);
    //     console.log(id);
    // });