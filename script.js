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
}