setStorage();

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

// for debuging
function setStorage(){
  chrome.storage.local.set({checkIn: "09:00:00", checkOut: "17:20:00", employeeId: "376"}, function() {
  alert("Storage is set")
  });
};