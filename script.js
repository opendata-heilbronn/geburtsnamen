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
    
    //------------------------------------------------------------------------------------------------------
    var onButtonClick = function(event) {
		event.preventDefault();
		var output = "";
		var male = document.getElementById("male").checked
		var female = document.getElementById("female").checked
		var y2015 = document.getElementById("2015").checked
		var y2016 = document.getElementById("2016").checked
		
		if (y2015) { 
			var matchingNameObj = searchName(namen2015);
			var anzahl2015 = matchingNameObj.anzahl;
            console.log (anzahl2015);
            output += anzahl2015 + ' Neugeborene im Jahr 2015 tragen deinen Namen<br>';
		}
		if (y2016) {
			var matchingNameObj = searchName(namen2016);
            var anzahl2016 = matchingNameObj.anzahl;
            console.log (anzahl2016);
			output += anzahl2016 + ' Neugeborene im Jahr 2016 tragen deinen Namen<br>';
		}

        if (y2015 && y2016) {
            var ctx = document.getElementById("myChart");
            var myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ["2015", "2016"],
                    datasets: [{
                        label: 'Anzahl Namen',
                        data: [anzahl2015, anzahl2016],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255,99,132,1)',
                            'rgba(54, 162, 235, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero:true
                            }
                        }]
                    }
                }
            });
        }

		document.querySelector('.result').innerHTML = output;
	};
    console.log("onButtonClick init");
    document.querySelector('.search-name-form').addEventListener('submit', onButtonClick);
}
//----------------------------------------------------------------------------------------------------------
function inHTMLumwandeln(Zeichenkette)
{
  var chars = new Array ('&','à','á','â','ã','ä','å','æ','ç','è','é','ê','ë','ì','í','î','ï','ð','ñ','ò','ó','ô','õ','ö','ø','ù','ú','û','ü','ý','þ','ÿ','À','Á','Â','Ã','Ä','Å','Æ','Ç','È','É','Ê','Ë','Ì','Í','Î','Ï','Ð','Ñ','Ò','Ó','Ô','Õ','Ö','Ø','Ù','Ú','Û','Ü','Ý','Þ','€','"','ß','<','>','¢','£','¤','¥','¦','§','¨','©','ª','«','¬','­','®','¯','°','±','²','³','´','µ','¶','·','¸','¹','º','»','¼','½','¾');
  var entities = new Array ('amp','agrave','aacute','acirc','atilde','auml','aring','aelig','ccedil','egrave','eacute','ecirc','euml','igrave','iacute','icirc','iuml','eth','ntilde','ograve','oacute','ocirc','otilde','ouml','oslash','ugrave','uacute','ucirc','uuml','yacute','thorn','yuml','Agrave','Aacute','Acirc','Atilde','Auml','Aring','AElig','Ccedil','Egrave','Eacute','Ecirc','Euml','Igrave','Iacute','Icirc','Iuml','ETH','Ntilde','Ograve','Oacute','Ocirc','Otilde','Ouml','Oslash','Ugrave','Uacute','Ucirc','Uuml','Yacute','THORN','euro','quot','szlig','lt','gt','cent','pound','curren','yen','brvbar','sect','uml','copy','ordf','laquo','not','shy','reg','macr','deg','plusmn','sup2','sup3','acute','micro','para','middot','cedil','sup1','ordm','raquo','frac14','frac12','frac34');
  for (var i = 0; i < chars.length; i++)
  {
    myRegExp = new RegExp();
    myRegExp.compile(chars[i],'g')
    Zeichenkette = Zeichenkette.replace (myRegExp, '&' + entities[i] + ';');
  }
  return Zeichenkette;
}
//----------------------------------------------------------------------------------------------------------
function maennlichAusgewaehlt()
{
    if(document.getElementById("CheckboxMaennlich").checked)
    {
        document.getElementById("CheckboxWeiblich").checked = false;
    }
    else
    {
        document.getElementById("CheckboxWeiblich").checked = true;
    }
}

function WeiblichAusgewaehlt()
{
    if(document.getElementById("CheckboxWeiblich").checked)
    {
        document.getElementById("CheckboxMaennlich").checked = false;
    }
    else
    {
        document.getElementById("CheckboxMaennlich").checked = true;
    }
}

Array.prototype.vorhanden = function (Zeichenkette)
{
    var schonvorhanden = false
    for(var i = 0; i < this.length && !schonvorhanden; i++)
    {
        if(this[i] == Zeichenkette)
        {
            schonvorhanden = true;
        }
    }
    return schonvorhanden;
}

function Zufallsname()
{
    var maennlichausgewaehlt = document.getElementById("CheckboxMaennlich").checked;
    var weiblichausgewaehlt = document.getElementById("CheckboxWeiblich").checked;
    var datenbank2015 = document.getElementById("CheckboxDatenbanken2015").checked;
    var datenbank2016 = document.getElementById("CheckboxDatenbanken2016").checked;
    var Statistik = document.getElementById("CheckboxStatistik").checked;
    var Ausgabezeile = "";
    var geschlecht;
    if(maennlichausgewaehlt || weiblichausgewaehlt)
    {
        if(maennlichausgewaehlt)
        {
            geschlecht = "m";
        }
        else
        {
            geschlecht = "w";
        }
        if((datenbank2015 || datenbank2016) && Ausgabezeile == "")
        {
            var AlleNamen = new Array();
            if(datenbank2015)
            {
                for(var i = 0; i < namen2015.length; i++)
                {
                    if(namen2015[i].geschlecht == geschlecht)
                    {
                        if(Statistik)
                        {
                            Anzahl = parseInt(namen2015[i].anzahl);
                            for(var j = 0; j < Anzahl; j++)
                            {
                                AlleNamen.push(namen2015[i].vorname);
                            }
                        }
                        else
                        {
                            AlleNamen.push(namen2015[i].vorname);
                        }
                    }
                }
            }
            if(datenbank2016)
            {
                for(var i = 0; i < namen2016.length; i++)
                {
                    if(namen2016[i].geschlecht == geschlecht)
                    {
                        if(Statistik)
                        {
                            var Anzahl = parseInt(namen2016[i].anzahl);
                            for(var j = 0; j < Anzahl; j++)
                            {
                                AlleNamen.push(namen2016[i].vorname);
                            }
                        }
                        else
                        {
                            if(!AlleNamen.vorhanden(namen2016[i].vorname))
                            {
                                AlleNamen.push(namen2016[i].vorname);
                            }
                        }
                    }
                }
            }
            var Zufallszahl = Math.random();
            Zufallszahl = Zufallszahl * 100 * AlleNamen.length;
            Zufallszahl = Math.floor(Zufallszahl);
            Zufallszahl = Zufallszahl % AlleNamen.length;
            var Ausgabename = AlleNamen[Zufallszahl];
            Ausgabezeile = "<b>" + inHTMLumwandeln(Ausgabename) + "</b>";
            if(datenbank2015)
            {
                var gefunden = false;
                for(var i = 0; i < namen2015.length && !gefunden; i++)
                {
                    if(namen2015[i].vorname == Ausgabename)
                    {
                        gefunden = true;
                        Ausgabezeile += "<br>Dieser Name kommt 2015 " + namen2015[i].anzahl + " mal vor"
                    }
                }
            }
            if(datenbank2016)
            {
                var gefunden = false;
                for(var i = 0; i < namen2016.length && !gefunden; i++)
                {
                    if(namen2016[i].vorname == Ausgabename)
                    {
                        gefunden = true;
                        Ausgabezeile += "<br>Dieser Name kommt 2016 " + namen2016[i].anzahl + " mal vor"
                    }
                }
            }
        }
        else
        {
            Ausgabezeile = "Es muss mindestens eine Datenbank ausgewählt werden"
        }
    }
    else
    {
        Ausgabezeile = "Es muss ein Geschlecht ausgewählt werden"
    }
    document.getElementById("Ausgabezeile").innerHTML = Ausgabezeile;
    document.getElementById("Ausgabezeile").style.display = 'inline-block';
}
// ************************************
// Section name-search
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