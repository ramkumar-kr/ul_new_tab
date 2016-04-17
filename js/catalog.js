CACHE_KEY = 'urbanladder';
CACHE_VERSION = 1;
$(document).ready(function(){
  if(navigator.onLine){
      token = localStorage.getItem('token');
      if(token === null || token == ''){
        fetch('beep', {"method": "POST"}).then((response)=> {
          return response.json();
        }).then((data) => {
          console.log(data);
          localStorage.setItem('token', data.spree_api_key);
        })
      }
      if(token === null){
        $('#catalog').append('Something went wrong. Please reload again<br/>');
      }
      request = new Request(`https://www.urbanladder.com/api/products?per_page=300&token=${token}`, {"method": "GET"});
      caches.open(CACHE_KEY + CACHE_VERSION).then((cache) => {
        cache.match(request)
        .then((response) => {
          if(response == undefined){
            console.log("Response undefined");
            cache.add(request).then(()=> {
              console.log("added to cache");
                $('#catalog').append('Please reload the page to see new products<br/>');
            });
            return fetch(request).then((r)=> {
              return cache.put(request, r).then((x)=> { return r.json(); });
            })
          }
          else {
            return response.json();
          }
        })
        .then((json)=> {
          render_images(shuffle(json.products));
        })
        .catch((x)=> {
          cache.add(request);
          $('#catalog').append('Something went wrong. Please reload again');
          console.log(x);
          return fetch(request).then((r2)=> {return r2.json();})
        });
      });
  }
  else {
    offline_enable();
  }

});


function render_images(data) {
  array_of_names = []
  str = '<div class="card-columns">'
  for (var i = 0, j= 0; (i < data.length && j < 12); i++, j++) {
    if(/^WCUST/.test(data[i].sku) || /None Standard Set/.test(data[i].name)){
      j--;
      continue;
    }

    if (array_of_names.indexOf(data[i].name.split(" ")[0]) != -1) {
      j--;
      continue;
    }
    else {
      array_of_names.push(data[i].name.split(" ")[0]);
    }
    if(data[i].images == null || data[i].images.url == null){
      data[i].images ={"url" : `https://cdn1.urbanladder.com/images/skus/product/${data[i].sku}.jpg`};
    }
    str += `
      <div class='card'>
        <a href="https://www.urbanladder.com/skus/${data[i].sku}">
          <img style="overflow: hidden;" class="card-img-top" src=${data[i].images.url} width="100%" height="inherit"/>
          <div class="card-header">
            ${data[i].name}
          </div>
        </a>
      </div>`;
  }
  str+= '</div>';
  $('#catalog').append(str);
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
