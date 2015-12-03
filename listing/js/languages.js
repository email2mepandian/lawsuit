
function loadLanguage(language){
	//alert(language);
    var len = parseInt(language.length/2);
	var select = document.getElementById("id_language"),option;
	option = document.createElement('option');
	option.setAttribute('value0', "Select Language");
	option.appendChild(document.createTextNode("Select Language"));
	select.appendChild(option);
	for (i=0; i < language.length; i += 2) {
		//alert(language[i]+"("+language[i+1]+")");
    	option = document.createElement('option');
    	option.setAttribute(language[i], language[i]);
    	option.appendChild(document.createTextNode(language[i]+"("+language[i+1]+")"));
    	select.appendChild(option);
	}
}


function loadFilterSelect(name, items, elementid){
	//alert(items);
    var len = parseInt(items.length/2);
	var select = document.getElementById(elementid),option;
	select.options.length=0;
	option = document.createElement('option');
	option.setAttribute('value0', "Select " + name);
	option.appendChild(document.createTextNode("Select " + name));
	select.appendChild(option);
	for (i=0; i < items.length; i += 2) {
			//alert(items[i]+"("+items[i+1]+")");
    		option = document.createElement('option');
    		option.text = items[i]+" ("+items[i+1]+")";
			option.value = items[i];
    		select.appendChild(option);
	}
}


function loadFilterSelectFacetQuery(name, items, elementid){
	//alert(items["{!frange l=0 u=5}geodist()"]);
    var len = parseInt(items.length);
	var select = document.getElementById(elementid),option;
	select.options.length=0;
	option = document.createElement('option');
	option.setAttribute('value0', "Select " + name);
	option.appendChild(document.createTextNode("Select " + name));
	select.appendChild(option);
	
	i =0;
	
	var item0 = items["{!frange l=0 u=15}geodist()"];
	if(item0 > 0) {
		option = document.createElement('option');
		option.text = '0 - 15 miles (' + item0 + ')';
		option.value = '{!frange l=0 u=15}geodist()';
		select.appendChild(option);
		i++;
	}
	
	var item1 = items["{!frange l=15.001 u=25}geodist()"];
	if(item1 > 0) {
		option = document.createElement('option');
		option.text = '15 - 25 miles (' + item1 + ')';
		option.value = '{!frange l=15.001 u=25}geodist()';
		select.appendChild(option);
		i++;
	}
	
	var item2 = items["{!frange l=25.001 u=50}geodist()"];
	if(item2 > 0) {
		option = document.createElement('option');
		option.text = '25 - 50 miles ('+ item2 +')';
		option.value = '{!frange l=25.001 u=50}geodist()';
		select.appendChild(option);
		i++;
	}
	
	var item3 = items["{!frange l=50.001 u=100}geodist()"];
	if(item3 > 0) {
		option = document.createElement('option');
		option.text = '50 - 100 miles (' + item3 + ')';
		option.value = '{!frange l=50.001 u=100}geodist()';
		select.appendChild(option);
		i++;
	}
	
	var item4 = items["{!frange l=100.001 u=200}geodist()"];
	if(item3 > 0) {
		option = document.createElement('option');
		option.text = '100 - 200 miles (' + item4 + ')';
		option.value = '{!frange l=100.001 u=200}geodist()';
		select.appendChild(option);
		i++;
	}
}