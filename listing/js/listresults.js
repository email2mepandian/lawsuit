function loadpage() {
    $(document).ready(function(){

      jQuery.extend({
	
    	getQueryParameters : function(str) {
            return (str || document.location.search).replace(/(^\?)/,'').split("&").map(function(n){return n = n.split("="),this[n[0]] = n[1],this}.bind({}))[0];
    	}

      });
 
      var searchText = $.getQueryParameters()['searchText'];
      var selectedLatLng  = $.getQueryParameters()['latlng'];
      var cityname = decodeURIComponent($.getQueryParameters()['currentLoc']);

	  $("#fl_srch_loc").val(cityname);
	  
      var searchUri =  "https://104.197.28.6:8983/solr/lscore/select?q="+searchText+"&pt="+selectedLatLng+"&sfield=geopoint&d=25&fq={!geofilt}"
      					+"&fl=*&fl=distance:geodist()&rows=100&sort=geodist()%20asc&facet.field=rating&facet.field=practice&facet.field=language&facet=true&"
    					+"facet.mincount=1&wt=json&facet.query={!frange%20l=0%20u=15}geodist()&facet.query={!frange%20l=15.001%20u=25}geodist()&facet.query={!frange%20l=25.001%20u=50}geodist()"
						+"&facet.query={!frange%20l=50.001%20u=100}geodist()&facet.query={!frange%20l=100.001%20u=200}geodist()";
	  
	  displayresults(searchUri, searchText, selectedLatLng, cityname);
	
    });
	
}

function do_search_again(){

	var currentLoc = $("#fl_srch_loc").val();
	var searchText = $("#fl_srch_textbox").val();
	var selectedLatLng = $("#id_latlngfield").val();

	//alert("C "+currentLoc+" ST "+searchText+"LatLng"+selectedLatLng);

	var searchUri = "https://104.197.28.6:8983/solr/lscore/select?q="+searchText+"&pt="+selectedLatLng+"&sfield=geopoint&d=25&fq={!geofilt}"
					+"&fl=*&fl=distance:geodist()&rows=100&sort=geodist()%20asc&facet.field=rating&facet.field=practice&facet.field=language&facet=true&"
					+"facet.mincount=1&wt=json&facet.query={!frange%20l=0%20u=15}geodist()&facet.query={!frange%20l=15.001%20u=25}geodist()&facet.query={!frange%20l=25.001%20u=50}geodist()"
					+"&facet.query={!frange%20l=50.001%20u=100}geodist()&facet.query={!frange%20l=100.001%20u=200}geodist()";

	displayresults(searchUri, searchText, selectedLatLng, currentLoc);
}

function do_search_filters() {
	
	var currentLoc = $("#id_citynamefield").val();
	var searchText = $("#id_searchtextfield").val();
	var selectedLatLng = $("#id_latlngfield").val();
	
	var sortfieldval = $("#id_sortby").val();
	var distancefield = document.getElementById('id_distance');
	var practicefield = document.getElementById('id_practice');
	var languagefield = document.getElementById('id_language');
	var ratingfield = document.getElementById('id_rating');
	
	var distancefieldval = distancefield.options[distancefield.selectedIndex].value;
	var practicefieldval = practicefield.options[practicefield.selectedIndex].value;
	var languagefieldval = languagefield.options[languagefield.selectedIndex].value;
	var ratingfieldval = ratingfield.options[ratingfield.selectedIndex].value;
	
	var searchUri = "https://104.197.28.6:8983/solr/lscore/select?q="+searchText+"&pt="+selectedLatLng+"&sfield=geopoint&d=25&fq={!geofilt}"
					+"&fl=*&fl=distance:geodist()&rows=100&facet.field=rating&facet.field=practice&facet.field=language&facet=true&"
					+"facet.mincount=1&facet.query={!frange%20l=0%20u=15}geodist()&facet.query={!frange%20l=15.001%20u=25}geodist()&facet.query={!frange%20l=25.001%20u=50}geodist()"
					+"&facet.query={!frange%20l=50.001%20u=100}geodist()&facet.query={!frange%20l=100.001%20u=200}geodist()";
				
					if(languagefieldval != 'Select Language') {
						searchUri += "&fq=language:" + languagefieldval;
					}	
					
					if(practicefieldval != 'Select Practice') {
						searchUri += "&fq=practice:\"" + encodeURIComponent(practicefieldval) + "\"";
					}
					
					if(ratingfieldval != 'Select Rating') {
						searchUri += "&fq=rating:" + ratingfieldval;
					}
					
					if(sortfieldval == 'distance') {
						searchUri += "&sort=geodist()%20asc";
					}
					
					if(sortfieldval == 'rating') {
						searchUri += "&sort=rating%20desc";
					}
					
					if(sortfieldval == 'name') {
						searchUri += "&sort=name%20asc";
					}
					
					searchUri += "&wt=json";
	
	displayresults(searchUri, searchText, selectedLatLng, currentLoc);
	
}

function displayresults(searchUri, searchText, selectedLatLng, cityname){
	
	var searchurlfield = document.getElementById('id_searchurlfield');
	var searchtextfield = document.getElementById('id_searchtextfield');
	var citynamefield = document.getElementById('id_citynamefield');
	var latlngfield = document.getElementById('id_latlngfield');
	
	searchurlfield.value = searchUri;
	searchtextfield.value = searchText;
	citynamefield.value = cityname;
	latlngfield.value = selectedLatLng;

    var result;
	
	//alert(searchUri);
	console.log(searchUri);
     
	$.ajax({
        type: "GET",
        url: searchUri,
        dataType: "json",
        contentType: "application/json",
        accepts: "application/json",
        success: function (resp) {
	       generateheader(cityname, searchText, resp.response.numFound);
           var locations= [];
	 	   $("#searchresultsdiv").html("");
       var markerMap = new Map();
           for (i=0; i < resp.response.docs.length; i++) {
                generateresultshtml(resp.response.docs[i]);
                locations.push(resp.response.docs[i].geopoint);
                markerMap.set(resp.response.docs[i].name,resp.response.docs[i].geopoint);
           }
       	   mapload(resp.responseHeader.params.pt,locations,markerMap);
		   loadFilterSelect('Language', resp.facet_counts.facet_fields.language, 'id_language');
		   loadFilterSelect('Rating', resp.facet_counts.facet_fields.rating, 'id_rating');
		   loadFilterSelect('Practice', resp.facet_counts.facet_fields.practice, 'id_practice');
		   loadFilterSelectFacetQuery('Distance', resp.facet_counts.facet_queries, 'id_distance');
        },
        error: function (response, error){
            console.log(response.status);
        }
    });
}

function generateheader(cityname, searchtext, recordscount) {
   var searchheader = '<h3>' + recordscount + ' lawyer(s) found near ' + cityname + ' for "' + decodeURIComponent(searchtext) + '" </h3>';
   $("#searchheader").html("");
   $(searchheader).appendTo('#searchheader'); 
}

function generateresultshtml(lawyer) {

     var searchresults = '<div class="client-details">';
     searchresults = searchresults +'<div class="client-logo"> <img src="images/' + lawyer.profile_picture + '" alt="" /></div>';
     searchresults = searchresults +'<div class="client-desc">';
     searchresults = searchresults +'<h4>' + lawyer.name + '</h4>';
     searchresults = searchresults +'<p>Sed sit amet risus eget mauris sollicitudin posuere. Integer dictum, ligula id feugiat viverra, ex purus euismod nulla</p>';

     if(lawyer.practice.length > 0) {
        searchresults = searchresults +'<h5>';
        for(x=0; x < lawyer.practice.length; x++) {
           searchresults = searchresults + lawyer.practice[x];
           if(x < lawyer.practice.length-1) {
		searchresults = searchresults + ", ";
	   }
        }
        searchresults = searchresults +'</h5>';
     }

     searchresults = searchresults +'<div class="clear block">';

     if(lawyer.language.length > 0) { 
        searchresults = searchresults +'<div class="pull-left">Language : '; 
        for(x=0; x < lawyer.language.length; x++) {
           searchresults = searchresults + lawyer.language[x];
	   if(x < lawyer.language.length-1) {
                searchresults = searchresults + ", ";
           }
        }
        searchresults = searchresults +'</div>';
        searchresults = searchresults +'<div class="star-vote pull-right">';
        searchresults = searchresults +'<ul class="list-inline star-vote">';
     }

     var rating = lawyer.rating;
     var fullstar = Math.floor(rating);
     var starcount = 0;

     for(x=1; x <= fullstar; x++) {
        searchresults = searchresults +'<li><i class="color-blue fa fa-star"></i></li>';
        starcount++;
     }

     var halfstar = Math.ceil(rating-starcount);

     for(x=0; x < halfstar; x++) {
        searchresults = searchresults +'<li><i class="color-blue fa fa-star-half-o"></i></li>';
        starcount++;
     }


     for(x=0; x < 5-starcount; x++) {
        searchresults = searchresults +'<li><i class="color-blue fa fa-star-o"></i></li>';
     }

     searchresults = searchresults +'<li>10 Reviews</li>';
     searchresults = searchresults +'</ul>';
     searchresults = searchresults +'</div>';
     searchresults = searchresults +'</div>';
     searchresults = searchresults +'<div class="pull-left client-contact">';
     searchresults = searchresults +'<ul>';
     searchresults = searchresults +'<li><a href="tel:' + lawyer.phone + '"><i class="fa fa-phone"></i> Call<span class="hidden-xs">   ' + lawyer.phone + '</span></a></li>';
     searchresults = searchresults +'<li><a href="mailto:' + lawyer.email + '"><i class="fa fa-envelope-o"></i> Email</a></li>';
     searchresults = searchresults +'<li><a href="#"><i class="fa fa-desktop"></i> Website</a></li>';
	 searchresults = searchresults +'<li><i class="color-blue">Distance : ' + parseFloat(lawyer.distance).toFixed(2) + ' miles</i></li>';
     searchresults = searchresults +'</ul>';
     searchresults = searchresults +'</div>';
     searchresults = searchresults +'</div>';
     searchresults = searchresults +'</div>';
	 
     $(searchresults).appendTo('#searchresultsdiv');

}

loadpage();
