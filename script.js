var searchTerm = "";
var startDate = "";
var endDate = "";
// var startDate = 19000101
// var endDate = 20200101
var apiKey= '1YMUgqoHWYzRiUiIe5FJOjSZGJN87Xwx'
// var facet = '&facet_field=begin_date='+ startDate +'&facet=true&end_date='+ endDate;
var facet = ""
var queryURL = ""
// var queryURL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + searchTerm + facet + '&api-key=' + apiKey;

var facetObject = {
  firstPart: "&facet_field=begin_date=",
  secondPart: "&facet=true&end_date=",
}

var searchWord = $("#searchTerm")
var count = $("#recordCount");
var startYear = $("#startYear");
var endYear = $("#endYear");

function constructFacet(){
  if (startDate.length > 0){
    facetObject.firstPart = facetObject.firstPart+startDate+"0101"
    console.log(facetObject.firstPart)
    facet += facetObject.firstPart
    console.log("facet ", facet);
  }
  if (startDate.length > 0 && endDate.length > 0){
    facetObject.secondPart = facetObject.secondPart+endDate+"0101";
    console.log(facetObject.secondPart);
    facet += facetObject.secondPart;
    console.log("facet ", facet);
  } else {
    facet = "&facet_field=end_date=" + endDate + "0101";
    console.log("facet ", facet);
  }
  return facet
}

function sendSearch(queryURL){

  console.log(queryURL);

  $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      console.log(response);
      var data = response.response.docs;
      console.log(data);
      showResults(data);
  })
}

function showResults(data){

  data.forEach(element => {
    var d = $("<div>");
    var h = $("<h3>");
    var p = $("<p>");
    h.text(element.headline.main);
    p.text(element.abstract);
    d.append(h);
    d.append(p);
    d.attr("href", element.web_url);
    $("#topArticlesDiv").append(d);

  });
  
}

function setQuery(needFacet){
  if(needFacet){
    facet = constructFacet()
  }
  queryURL = encodeURI('https://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + searchTerm + facet + '&api-key=' + apiKey);
  sendSearch(queryURL);
}



$("#search").on("click", function(){

  event.preventDefault();
  
  searchTerm = searchWord.val();

  if(startYear.val().trim().length === 4){
     startDate = startYear.val();
  }
  if(endYear.val().trim().length === 4){
    endDate = endYear.val();
  }
  if(startDate.length && endDate.length === 0){
    facet = ""
    setQuery(false);
    return
  } 

  if(endYear.val().trim().length > 0 && endYear.val().trim().length !== 4 ||
   startYear.val().trim().length > 0 && startYear.val().trim().length !==4){
    alert("Please enter a 4 digit year")
    return
  } else {
    console.log("start, end ", startDate, endDate);
    setQuery(true);
  }

})


