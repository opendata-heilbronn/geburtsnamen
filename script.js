var nameLists = [
    {
        year: 2015,
        city: 'Heilbronn',
        sourceUrl: 'Namen2015.json'
    },
    {
        year: 2016,
        city: 'Heilbronn',
        sourceUrl: 'Namen2016.json'
    }
];

var requestJsonFile = function (url) {
    return new Promise(function (resolve, reject) {
        var request = new XMLHttpRequest();
        request.open('GET', url, true);

        request.onload = function () {
            if (this.status >= 200 && this.status < 400) {
                var data = JSON.parse(this.response);
                resolve(data);
            } else {
                reject(new Error(this.status));
            }
        };

        request.onerror = reject;

        request.send();
    });
};

var loadNames = function () {
    var promises = nameLists.map(function (nameList) {
        return requestJsonFile(nameList.sourceUrl).then(function (data) {
            nameList.names = data;
        })
    });
    return Promise.all(promises);
};

function ready() {
    return new Promise(function (resolve) {
        if (document.readyState != 'loading') {
            resolve();
        } else {
            document.addEventListener('DOMContentLoaded', resolve);
        }
    });
}

function VorschlaglisteAuffuellen()
{
	var AlleNamen = new Array();
	for(var i = 0; i < nameLists[0].names.length; i++)
	{
		AlleNamen.push(nameLists[0].names[i].vorname);
	}
	for(var i = 0; i < nameLists[1].names.length; i++)
	 if (!AlleNamen.vorhanden(nameLists[1].names[i].vorname)) {
		AlleNamen.push(nameLists[1].names[i].vorname);
	 }
	var Vorschlagliste = "";
	for(var i = 0; i < AlleNamen.length; i++)
	{
		Vorschlagliste += "<option value='" + AlleNamen[i] + "'>";
	}
	document.getElementById("Namensliste").innerHTML = Vorschlagliste;
}

var readyPromises = [ready(), loadNames()];
Promise.all(readyPromises).then(initElements);

function initElements() {
    var onButtonClick = function (event) {
        event.preventDefault();
        var output = "";
        var male = document.getElementById("male").checked
        var female = document.getElementById("female").checked
        var y2015 = document.getElementById("2015").checked
        var y2016 = document.getElementById("2016").checked

        if (y2015) {
            var matchingNameObj = searchName(nameLists[0].names);
            var anzahl2015 = matchingNameObj.anzahl;
            console.log(anzahl2015);
            output += anzahl2015 + ' Neugeborene im Jahr 2015 tragen deinen Namen<br>';
        }
        if (y2016) {
            var matchingNameObj = searchName(nameLists[1].names);
            var anzahl2016 = matchingNameObj.anzahl;
            console.log(anzahl2016);
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
                                beginAtZero: true
                            }
                        }]
                    }
                }
            });
        }
	document.getElementById("Chart_Area").style.display = 'inline-block';
        document.querySelector('.result').innerHTML = output;
    };
    console.log("onButtonClick init");
    document.querySelector('.search-name-form').addEventListener('submit', onButtonClick);
    VorschlaglisteAuffuellen();
}
//----------------------------------------------------------------------------------------------------------
function inHTMLumwandeln(Zeichenkette) {
    var chars = new Array('&', 'à', 'á', 'â', 'ã', 'ä', 'å', 'æ', 'ç', 'è', 'é', 'ê', 'ë', 'ì', 'í', 'î', 'ï', 'ð', 'ñ', 'ò', 'ó', 'ô', 'õ', 'ö', 'ø', 'ù', 'ú', 'û', 'ü', 'ý', 'þ', 'ÿ', 'À', 'Á', 'Â', 'Ã', 'Ä', 'Å', 'Æ', 'Ç', 'È', 'É', 'Ê', 'Ë', 'Ì', 'Í', 'Î', 'Ï', 'Ð', 'Ñ', 'Ò', 'Ó', 'Ô', 'Õ', 'Ö', 'Ø', 'Ù', 'Ú', 'Û', 'Ü', 'Ý', 'Þ', '€', '"', 'ß', '<', '>', '¢', '£', '¤', '¥', '¦', '§', '¨', '©', 'ª', '«', '¬', '­', '®', '¯', '°', '±', '²', '³', '´', 'µ', '¶', '·', '¸', '¹', 'º', '»', '¼', '½', '¾');
    var entities = new Array('amp', 'agrave', 'aacute', 'acirc', 'atilde', 'auml', 'aring', 'aelig', 'ccedil', 'egrave', 'eacute', 'ecirc', 'euml', 'igrave', 'iacute', 'icirc', 'iuml', 'eth', 'ntilde', 'ograve', 'oacute', 'ocirc', 'otilde', 'ouml', 'oslash', 'ugrave', 'uacute', 'ucirc', 'uuml', 'yacute', 'thorn', 'yuml', 'Agrave', 'Aacute', 'Acirc', 'Atilde', 'Auml', 'Aring', 'AElig', 'Ccedil', 'Egrave', 'Eacute', 'Ecirc', 'Euml', 'Igrave', 'Iacute', 'Icirc', 'Iuml', 'ETH', 'Ntilde', 'Ograve', 'Oacute', 'Ocirc', 'Otilde', 'Ouml', 'Oslash', 'Ugrave', 'Uacute', 'Ucirc', 'Uuml', 'Yacute', 'THORN', 'euro', 'quot', 'szlig', 'lt', 'gt', 'cent', 'pound', 'curren', 'yen', 'brvbar', 'sect', 'uml', 'copy', 'ordf', 'laquo', 'not', 'shy', 'reg', 'macr', 'deg', 'plusmn', 'sup2', 'sup3', 'acute', 'micro', 'para', 'middot', 'cedil', 'sup1', 'ordm', 'raquo', 'frac14', 'frac12', 'frac34');
    for (var i = 0; i < chars.length; i++) {
        myRegExp = new RegExp();
        myRegExp.compile(chars[i], 'g')
        Zeichenkette = Zeichenkette.replace(myRegExp, '&' + entities[i] + ';');
    }
    return Zeichenkette;
}

//----------------------------------------------------------------------------------------------------------
function maennlichAusgewaehlt() {
    if (document.getElementById("CheckboxMaennlich").checked) {
        document.getElementById("CheckboxWeiblich").checked = false;
    }
    else {
        document.getElementById("CheckboxWeiblich").checked = true;
    }
}

function WeiblichAusgewaehlt() {
    if (document.getElementById("CheckboxWeiblich").checked) {
        document.getElementById("CheckboxMaennlich").checked = false;
    }
    else {
        document.getElementById("CheckboxMaennlich").checked = true;
    }
}

Array.prototype.vorhanden = function (Zeichenkette) {
    var schonvorhanden = false
    for (var i = 0; i < this.length && !schonvorhanden; i++) {
        if (this[i] == Zeichenkette) {
            schonvorhanden = true;
        }
    }
    return schonvorhanden;
}

function Zufallsname() {
    var maennlichausgewaehlt = document.getElementById("CheckboxMaennlich").checked;
    var weiblichausgewaehlt = document.getElementById("CheckboxWeiblich").checked;
    var datenbank2015 = document.getElementById("CheckboxDatenbanken2015").checked;
    var datenbank2016 = document.getElementById("CheckboxDatenbanken2016").checked;
    var Statistik = document.getElementById("CheckboxStatistik").checked;
    var Ausgabezeile = "";
    var geschlecht;
    if (maennlichausgewaehlt || weiblichausgewaehlt) {
        if (maennlichausgewaehlt) {
            geschlecht = "m";
        }
        else {
            geschlecht = "w";
        }
        if ((datenbank2015 || datenbank2016) && Ausgabezeile == "") {
            var AlleNamen = new Array();
            if (datenbank2015) {
                for (var i = 0; i < nameLists[0].names.length; i++) {
                    if (nameLists[0].names[i].geschlecht == geschlecht) {
                        if (Statistik) {
                            Anzahl = parseInt(nameLists[0].names[i].anzahl);
                            for (var j = 0; j < Anzahl; j++) {
                                AlleNamen.push(nameLists[0].names[i].vorname);
                            }
                        }
                        else {
                            AlleNamen.push(nameLists[0].names[i].vorname);
                        }
                    }
                }
            }
            if (datenbank2016) {
                for (var i = 0; i < nameLists[1].names.length; i++) {
                    if (nameLists[1].names[i].geschlecht == geschlecht) {
                        if (Statistik) {
                            var Anzahl = parseInt(nameLists[1].names[i].anzahl);
                            for (var j = 0; j < Anzahl; j++) {
                                AlleNamen.push(nameLists[1].names[i].vorname);
                            }
                        }
                        else {
                            if (!AlleNamen.vorhanden(nameLists[1].names[i].vorname)) {
                                AlleNamen.push(nameLists[1].names[i].vorname);
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
            if (datenbank2015) {
                var gefunden = false;
                for (var i = 0; i < nameLists[0].names.length && !gefunden; i++) {
                    if (nameLists[0].names[i].vorname == Ausgabename) {
                        gefunden = true;
                        Ausgabezeile += "<br>Dieser Name kommt 2015 " + nameLists[0].names[i].anzahl + " mal vor"
                    }
                }
            }
            if (datenbank2016) {
                var gefunden = false;
                for (var i = 0; i < nameLists[1].names.length && !gefunden; i++) {
                    if (nameLists[1].names[i].vorname == Ausgabename) {
                        gefunden = true;
                        Ausgabezeile += "<br>Dieser Name kommt 2016 " + nameLists[1].names[i].anzahl + " mal vor"
                    }
                }
            }
        }
        else {
            Ausgabezeile = "Es muss mindestens eine Datenbank ausgewählt werden"
        }
    }
    else {
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
    if (!male && !female)
        document.getElementById("male").checked = true;
}

function yearClick() {
    var y2015 = document.getElementById("2015").checked
    var y2016 = document.getElementById("2016").checked
    if (!y2015 && !y2016)
        document.getElementById("2015").checked = true;
}


function searchName(nameObjJSON) {
    var male = document.getElementById("male").checked
    var female = document.getElementById("female").checked
    var inputName = document.querySelector('.input-name').value;
    var matchingNameObj;

    if (male && female) {
        for (var i = 0; i < nameObjJSON.length; i++) {
            var nameObj = nameObjJSON[i];
            if (nameObj.vorname.toLowerCase() == inputName.toLowerCase()) {
                matchingNameObj = nameObj;
                break;
            }
        }
    } else if (male) {
        for (var i = 0; i < nameObjJSON.length; i++) {
            var nameObj = nameObjJSON[i];
            if (nameObj.vorname.toLowerCase() == inputName.toLowerCase() && nameObj.geschlecht == "m") {
                matchingNameObj = nameObj;
                break;
            }
        }
    } else {
        for (var i = 0; i < nameObjJSON.length; i++) {
            var nameObj = nameObjJSON[i];
            if (nameObj.vorname.toLowerCase() == inputName.toLowerCase() && nameObj.geschlecht == "w") {
                matchingNameObj = nameObj;
                break;
            }
        }
    }

    if (matchingNameObj == null) {
        matchingNameObj = {anzahl: 0}
    }

    return matchingNameObj;
}
