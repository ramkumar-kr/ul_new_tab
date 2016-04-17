$('#google_option').on('click', function () {
  $('#engine_button').text(this.text);
});

$('#urbanladder_option').on('click', function () {
  $('#engine_button').text(this.text);
});

$('#yahoo_option').on('click', function () {
  $('#engine_button').text(this.text);
});

$('#search').on('submit', function () {
  engine = $('#engine_button').text();
  console.log(engine);
  var url = '';
  switch (engine) {
    case 'Google':
      url = `https://www.google.com/search?q=${$('#q').val()}`;
      break;
    case 'Urbanladder':
      url = `https://www.urbanladder.com/products/search?keywords=${$('#q').val()}`;
      break;
    case 'Yahoo':
      url = `https://in.search.yahoo.com/search?p=${$('#q').val()}`;
      break;
    default:
      url = url = `https://www.google.com/search?q=${$('#q').val()}`;
  }
  chrome.tabs.update({"url": url })
});
