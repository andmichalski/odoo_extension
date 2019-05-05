alert("Hello from extension which fill attendances!!!");

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if( request.message === "clicked_browser_action" ) {
  
        console.log("Clicked action");
        chrome.runtime.sendMessage({"message": "open_new_tab", "url": "http://google.com"});
      }
    }
  );
