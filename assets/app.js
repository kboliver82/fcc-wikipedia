function searchWikipedia(searchText) {
  var queryOptions = {
    action: 'query',
    list: 'search',
    format: 'json',
    srsearch: searchText
  };
  
  $.ajax({
    url: 'http://en.wikipedia.org/w/api.php',
    data: queryOptions,
    dataType: 'jsonp',
    success: function (data) {
      updateSearchResults(data.query);
    }
  });
}

function updateSearchResults(queryObject) {
  $('#searchResults').empty();
  queryObject.search.forEach(function(item) {
    $('#searchResults').append(createResultItem(item));
  });
}

function createResultItem(searchObj) {
  var item = $('<li>');
  var title = searchObj.title;
  var snippet = searchObj.snippet;
  
  item.append($('<h3>').text(title));
  item.append($('<p>').html(snippet));
  return item;
}

$(document).ready(function() {
  $('#searchForm').submit(function(event) {
    var searchText = $('#searchText').val();
    console.log('searching for ' + searchText);
    searchWikipedia(searchText);
    event.preventDefault();
  });

});


