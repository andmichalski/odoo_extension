var port = chrome.runtime.connect({name: "odoo_extension"});

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if( request.message === "clicked_browser_action" ) {
        console.log(request.cookie)
  
        console.log("Clicked action");
        chrome.runtime.sendMessage({"message": "open_new_tab", "url": "http://google.com"});
      }
    }
  );