// alert("Hello from extension which fill attendances!!!");
var port = chrome.runtime.connect({name: "odoo_extension"});

port.sendMessage({cookie: "need"});

port.onMessage.addListener(function(msg) {
    alert(msg.cookie);
})

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if( request.message === "clicked_browser_action" ) {
        console.log(request.cookie)
  
        console.log("Clicked action");
        chrome.runtime.sendMessage({"message": "open_new_tab", "url": "http://google.com"});
      }
    }
  );
