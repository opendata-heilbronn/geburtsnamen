var namen2015 = new Array();
var namen2016 = new Array();

window.onload = function () {
    req2015 = new XMLHttpRequest();
	req2015.open("get","Namen2015.json", true);
	req2015.onreadystatechange = function(obj){
        if(obj.target.readyState == 4 && obj.target.status == 200)
	    {
		    var antwort;
		    if(window.JSON)
		    {
			    antwort = JSON.parse(obj.target.responseText)
		    }
		    else
		    {
			    antwort = eval("(" + obj.target.responseText + ")")
		    }
		    namen2015 = antwort;
	    }};
	req2015.send();
    req2016 = new XMLHttpRequest();
	req2016.open("get","Namen2016.json", true);
	req2016.onreadystatechange = function(obj){
        if(obj.target.readyState == 4 && obj.target.status == 200)
	    {
		    var antwort;
		    if(window.JSON)
		    {
			    antwort = JSON.parse(obj.target.responseText)
		    }
		    else
		    {
			    antwort = eval("(" + obj.target.responseText + ")")
		    }
		    namen2016 = antwort;
	    }};;
	req2016.send();

	/* START div .name-search */
	
	var onButtonClick = function(event) {
		event.preventDefault();
		var output = "";
		var male = document.getElementById("male").checked
		var female = document.getElementById("female").checked
		var y2015 = document.getElementById("2015").checked
		var y2016 = document.getElementById("2016").checked
		
		if (y2015) { 
			var matchingNameObj = searchName(namen2015);
			output += matchingNameObj.anzahl + ' Neugeborene im Jahr 2015 tragen deinen Namen<br>';
		}
		if (y2016) {
			var matchingNameObj = searchName(namen2016);
			output += matchingNameObj.anzahl + ' Neugeborene im Jahr 2016 tragen deinen Namen<br>';
		}

		document.querySelector('.result').innerHTML = output;
	};
	document.querySelector('.search-name-form').addEventListener('submit', onButtonClick);

	/* END div .name-search */
}

function genderClick() {
	var male = document.getElementById("male").checked
	var female = document.getElementById("female").checked
	if (!male  && !female)
		document.getElementById("male").checked = true;
}

function yearClick() {
	var y2015 = document.getElementById("2015").checked
	var y2016 = document.getElementById("2016").checked
	if (!y2015  && !y2016)
		document.getElementById("2015").checked = true;
}


function searchName (nameObjJSON) {
	var male = document.getElementById("male").checked
	var female = document.getElementById("female").checked
	var inputName = document.querySelector('.input-name').value;
	var matchingNameObj;
	
	if (male && female) {
		for(var i = 0; i < nameObjJSON.length; i++) {
			var nameObj = nameObjJSON[i];
			if(nameObj.vorname.toLowerCase() == inputName.toLowerCase()) {
				matchingNameObj = nameObj;
				break;
			}
		}	
	} else if (male) {
		for(var i = 0; i < nameObjJSON.length; i++) {
			var nameObj = nameObjJSON[i];
			if(nameObj.vorname.toLowerCase() == inputName.toLowerCase() && nameObj.geschlecht == "m") {
				matchingNameObj = nameObj;
				break;
			}	
		}
	} else {
		for(var i = 0; i < nameObjJSON.length; i++) {
			var nameObj = nameObjJSON[i];
			if(nameObj.vorname.toLowerCase() == inputName.toLowerCase() && nameObj.geschlecht == "w") {
				matchingNameObj = nameObj;
				break;
			}	
		}
	}	

	if(matchingNameObj == null) {
		matchingNameObj = { anzahl: 0 }
	}

	return matchingNameObj;
}
