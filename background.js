chrome.browserAction.onClicked.addListener(function(tab) {
    // Send a message to the active tab
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      var activeTab = tabs[0];
      chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"});
    });
  });

// getCookies("https://odoo.servocode.com", "session_id", function(id) {
//     alert(id);
//     console.log(id);
// });

// function getCookies(domain, name, callback) {
//     chrome.cookies.get({"url": domain, "name": name}, function(cookie) {
//         if(callback) {
//             callback(cookie.value);
//         }
//     });
// }

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if( request.message === "open_new_tab" ) {
        chrome.tabs.create({"url": request.url});
      }
    }
  );