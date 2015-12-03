
function mapload (currentLoc,locations,markerMap) {
   var locArray; 
   for (var key of markerMap.keys()) {
        var value = markerMap.get(key);
        //alert("Key "+String(key)+" Value "+value);
        locArray = value.split(",");
	break;
    }
    //alert(currentLoc,locations);
    //var curLocArray = currentLoc.split(",");	
    //var myLatlng = new google.maps.LatLng(curLocArray[0],curLocArray[1]);
    var myLatlng = new google.maps.LatLng(locArray[0],locArray[1]);
    var myOptions = {
        zoom: 12,
        center: myLatlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    var map = new google.maps.Map(document.getElementById("gmap"), myOptions);

/*
    for(var i=0;i<locations.length;i++)
    {
	//alert(locations[i]);
        var locArray = locations[i].split(",");
        var latlng=new google.maps.LatLng(locArray[0],locArray[1]);
        var marker = new google.maps.Marker({
            position: latlng,
            map: map,
            title: "marker : "+(i+1)
        });
    } 
    */

/*
    for (var key of markerMap.keys()) {
     alert(key);
    }
    */


    for (var key of markerMap.keys()) {
        var value = markerMap.get(key);
        //alert("Key "+String(key)+" Value "+value);
        var locArray = value.split(",");
        var latlng=new google.maps.LatLng(locArray[0],locArray[1]);
        var marker = new google.maps.Marker({
            position: latlng,
            map: map,
            title: key.toString()
        });
    }
    
   
}

