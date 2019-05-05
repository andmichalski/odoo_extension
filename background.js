getCookies("https://odoo.servocode.com", "session_id", function(id) {
    alert(id);
    console.log(id);
});

function getCookies(domain, name, callback) {
    chrome.cookies.get({"url": domain, "name": name}, function(cookie) {
        if(callback) {
            callback(cookie.value);
        }
    });
}