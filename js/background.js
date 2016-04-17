chrome.runtime.onInstalled.addListener((details) => {
  fetch('beep', {"method": "POST"}).then((response)=> {
    return response.json();
  }).then((data) => {
    console.log(data);
    localStorage.setItem('token', data.spree_api_key);
    request = new Request(`https://www.urbanladder.com/api/products?per_page=300&token=${data.spree_api_key}`, {"method": "GET"});
    CACHE_KEY = 'urbanladder';
    CACHE_VERSION = 1;
    caches.open(CACHE_KEY + CACHE_VERSION).then((cache) => {
      cache.add(request).then(()=>{
        console.log("added request to cache");
      })
    });
  })
});
