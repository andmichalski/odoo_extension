setForm();

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


function setStorage(){
  chrome.storage.sync.set({checkIn: "09:00:00", checkOut: "17:20:00", empolyeeId: "376"}, function() {
    console.log('Value is set to ' + empolyeeId);
    alert("Storage is set!!");
  });
};
