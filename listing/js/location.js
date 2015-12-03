function initLocation(){
  // Create the autocomplete object and associate it with the UI input control.
    // Restrict the search to the default country, and to place type "cities".
    autocomplete = new google.maps.places.Autocomplete(
        /** @type {!HTMLInputElement} */ (
            document.getElementById('main_loc')), {
          types: ['geocode'],
          componentRestrictions: {country: "us"}
        });
		autocomplete.addListener('place_changed', onPlaceChanged);

	
}

function onPlaceChanged() {
  var place = autocomplete.getPlace();
  
  if (place.geometry) {
  $('#main_search_hidden').val(place.geometry.location.lat() + "," + place.geometry.location.lng());
  } else {
    document.getElementById('main_loc').placeholder = 'Enter a city';
  }
}

/** find_lawyer.html **/
function initLoc(){
  // Create the autocomplete object and associate it with the UI input control.
    // Restrict the search to the default country, and to place type "cities".
    autocomplete = new google.maps.places.Autocomplete(
        /** @type {!HTMLInputElement} */ (
            document.getElementById('fl_srch_loc')), {
          types: ['geocode'],
          componentRestrictions: {country: "us"}
        });
    autocomplete.addListener('place_changed', onPlaceChanged2);

  
}

function onPlaceChanged2() {
  var place = autocomplete.getPlace();
  
  if (place.geometry) {
    $("#id_latlngfield").val(place.geometry.location.lat() + "," + place.geometry.location.lng());
  } else {
    document.getElementById('fl_srch_loc').placeholder = 'Enter a city';
  }
}




