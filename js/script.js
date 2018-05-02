var googleApiKey = "AIzaSyDEbGSkMfRjHlj7M4s6QTxN6vi7IMSfLYA";
var nytApiKey = "ee7d255929f745f68e7ed0ded40ab29e";
var googleStreetViewURL = "http://maps.googleapis.com/maps/api/streetview?size=600x300&location=";
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
//    $wikiElem.text("");
    $nytElem.text("");

    // load streetview
    // YOUR CODE GOES HERE!
	var streetStr = $("#street").val();
	var cityStr = $("#city").val();
	var address = "";
	
	if ( streetStr && cityStr ){ 
		address = streetStr + ', ' + cityStr; 
	}
	else if ( streetStr ) { address = streetStr; }
	else if ( cityStr ) { address = cityStr; }
	if ( address.length > 0 ) {
		$greeting.text("These are the info related to " + address + ".");
		$body.append('<img class = "bgimg" src="' + googleStreetViewURL + address + '">');
	}
	else {
		$greeting.text("No address found. Please enter a new address.")
	}
	
	var nytUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
	nytUrl += '?' + $.param({
		'api-key': nytApiKey,
		'q': address
		});
	
	$.getJSON(nytUrl, function(result){
		$nytHeaderElem.text("New York Times Articles about " + cityStr);
		var docs = result.response.docs;
		var nytArticles = '';
 		for( var i = 0; i < docs.length; i++ ){
			if ( docs[i].document_type === "article" ){
				nytArticles += `<li class="article"><a href="${docs[i].web_url}">${docs[i].headline.main}</a><p>${docs[i].snippet}</p></li>`;
			}
		}
		$nytElem.append(nytArticles);
	}).error(function(e){
		$nytHeaderElem.text("New York Times Articles Cannot be Loaded!");
	});
	
	var wikiUrl = 'http://en.wikipedia.org/w/api.php?action=opensearch&search=' + cityStr + '&format=json&callback=wikiCallback';
	
	var wikiRequestTimeOut = setTimeout(function(){
		$wikiElem.text("Failed to get wikipedia resources.");
	}, 10000);
	
	$.ajax({
		url: wikiUrl,
		dataType: "jsonp",
		success: function(data){
			var list = data[1];
			var wikiEntries = "";
			for (var i = 0; i < list.length; i++){
				wikiEntries += `<li><a href="http://en.wikipedia.org/wiki/${list[i]}">${list[i]}</a></li>`;
			}
			$wikiElem.append(wikiEntries);
			clearTimeout(wikiRequestTimeOut);
		}
	});
	
	return false;
};

$('#form-container').submit(loadData);
