document.addEventListener("DOMContentLoaded",function(){document.getElementById("bookmarks").addEventListener("click",function(){chrome.tabs.update({url:"chrome://bookmarks"})})});
document.addEventListener("DOMContentLoaded",function(){document.getElementById("downloads").addEventListener("click",function(){chrome.tabs.update({url:"chrome://downloads"})})});
document.addEventListener("DOMContentLoaded",function(){document.getElementById("settings").addEventListener("click",function(){chrome.tabs.update({url:"chrome://settings"})})});
document.addEventListener("DOMContentLoaded",function(){document.getElementById("apps").addEventListener("click",function(){chrome.tabs.update({url:"chrome://apps"})})});
