var apiKey = "AIzaSyDEbGSkMfRjHlj7M4s6QTxN6vi7IMSfLYA";
var googleStreetViewURL = "http://maps.googleapis.com/maps/api/streetview?size=600x300&location=";
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview

    // YOUR CODE GOES HERE!
	var streetStr = $("#street").val();
	var cityStr = $("#city").val();
	var address = "";
	
	if ( streetStr && cityStr ){ address = streetStr + ', ' + cityStr; }
	else if ( streetStr ) { address = streetStr; }
	else if ( cityStr ) { address = cityStr; }
	
	if ( address ) {
		$greeting.text("These are the info related to " + address + ".");
		$body.append('<img class = "bgimg" src="' + googleStreetViewURL + address + '">');
	}
	else {
		$greeting.text("No address found. Please enter a new address.")
	}
    return false;
};

$('#form-container').submit(loadData);
