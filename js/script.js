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
	console.log(address);
	if ( address.length > 0 ) {
		$greeting.text("These are the info related to " + address + ".");
		$body.append('<img class = "bgimg" src="' + googleStreetViewURL + address + '">');
	}
	else {
		$greeting.text("No address found. Please enter a new address.")
	}
	
	var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
	url += '?' + $.param({
		'api-key': nytApiKey,
		'q': address
		});
	
	$.getJSON(url, function(result){
		$nytHeaderElem.text("New York Times Articles about " + cityStr);
		var docs = result.response.docs;
		var nytArticles = '';
 		for( var i = 0; i < docs.length; i++ ){
			if ( docs[i].document_type != "topic" ){
				nytArticles += `<li class="article"><a href="${docs[i].web_url}">${docs[i].headline.main}</a><p>${docs[i].snippet}</p></li>`;
			}
		}
		$nytElem.append(nytArticles);
	});
	
	return false;
};

$('#form-container').submit(loadData);
