var searchTerm = 'election'
var apiKey= '1YMUgqoHWYzRiUiIe5FJOjSZGJN87Xwx'
var facet = '&facet_field=begin_date=20120101&facet=true&end_date=20130101'
var queryURL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + searchTerm + facet + '&api-key=' + apiKey;

$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response);
    var data = response.docs;
})


