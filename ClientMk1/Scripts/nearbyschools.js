// requires that you consent to location sharing when prompted by browser. 
var map; var markers = []; var contentString = []; var infowindow = [];
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 53.56641, lng: -7.8385 }, //set initial map to middle of ireland and zoomed out in case of geocoder error;
        zoom: 7,
        mapTypeControl: false //remove the roadmap/satelite button for own filters;;
    });

    var icons = {
        Secondary: {
            name: 'Secondary',
            icon: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png'
        },
        Primary: {
            name: 'Primary',
            icon: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png'
        },
        Current: {
            name: 'Approx location',
            icon: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png'
        }
    }
    var legend = document.getElementById('legend');
    for (var key in icons) {
        var type = icons[key];
        var name = type.name;
        var icon = type.icon;
        var div = document.createElement('div');
        div.innerHTML = '<img style="height:10px" src="' + icon + '"> ' + name;
        legend.appendChild(div);
    }

    var filterbar = document.getElementById('filterbarnav');

    map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(legend);
    map.controls[google.maps.ControlPosition.LEFT_TOP].push(filterbar);
}

function getmarkers(latitude, longitude, setdistance) {
    var data = {
        lat: latitude,
        lon: longitude,
        setdistance: setdistance
    }
    $.ajax({
        type: "POST",
        url: "https://educationfirst.azurewebsites.net/NearbySchools/schooldistance",
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json",
        success: function (schools) {

            for (var i = 0; i < schools.length; i++) {
                var latdble = parseFloat(schools[i].lat);
                var londble = parseFloat(schools[i].lon);
                var image = 'https://maps.google.com/mapfiles/ms/icons/green-dot.png';
                var LatLngposition = { lat: latdble, lng: londble };
                var redirect;
                if (schools[i].SchoolType === "Primary") {
                    image = "https://maps.google.com/mapfiles/ms/icons/red-dot.png";
                    redirect = "/PrimarySchool/Details?rollno=" + schools[i].RollNo;
                    redirect = redirect.trim();
                }
                else {
                    redirect = "/SecondarySch/Details?rollno=" + schools[i].RollNo;
                    redirect = redirect.trim();
                }

                markers[i] = new google.maps.Marker({
                    map: map,
                    animation: google.maps.Animation.DROP,
                    position: LatLngposition,
                    title: schools[i].SchoolType,
                    icon: image
                });
                markers[i].index = i; //add index property to keep count of markers;
                var school = schools[i];
                contentString[i] = '<div id="content">' +
                '<div id="siteNotice">' +
                '</div>' +
                '<span style="font-size:16px" id="firstHeading" class="firstHeading"><a id="bodyContent" href="' + redirect + '" >' + school.Name +
                '</a>' + '</span>' + '</br>' +
                '<span>Address: ' + school.Address + '</span>' + '</br>' +
                '<span>Religion: ' + school.Religion + '</span>' + '</br>' +
                '<span>Irish subjects: ' + school.Irish + '</span>' + '</br>' +
                '</div>';

                infowindow[i] = new google.maps.InfoWindow({
                    content: contentString[i]
                });

                google.maps.event.addListener(markers[i], 'click', function () {
                    infowindow[this.index].open(map, markers[this.index]);
                    map.panTo(markers[this.index].getPosition());
                });
            }
            alertmessage(i + " schools within " + setdistance + "km of your location");
        }
  , error: function (x) {
      document.getElementById('alertdngr').innerHTML = "Unable to load schools into map.";
      showdngralert();
  }
    });
}

$(document).ready(function () {
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
    }

    //Get the latitude and the longitude;
    function success(position) {
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;
        alertmessage("Location found at " + position.coords.latitude + position.coords.longitude);
        var pos = {
            lat: lat,
            lng: lng
        };
        map.setCenter(pos);
        map.setZoom(12);
        var image = 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png';
        var marker = new google.maps.Marker({
            map: map,
            animation: google.maps.Animation.DROP,
            position: pos,
            icon: image
        });
        
        ko.applyBindings(NearbyschPageModel(lat, lng)); //here so it fires after html elements are loaded in;
        getmarkers(lat, lng, "10");

    }
    function error(x) {
        document.getElementById('alertdngr').innerHTML = x.message;
        showdngralert();
    }
});

function showalert() {
    $("#snoAlertBox").fadeIn();
    closeSnoAlertBox();
};

function showdngralert() {
    $("#alertdngr").fadeIn();
    closeDngrAlertBox();
};

function closeSnoAlertBox() {
    window.setTimeout(function () {
        $("#snoAlertBox").fadeOut(4000)
    }, 4000);
}
function closeDngrAlertBox() {
    window.setTimeout(function () {
        $("#alertdngr").fadeOut(400)
    }, 4000);
}

function alertmessage(message) {
    document.getElementById('snoAlertBox').innerHTML = message;
    showalert();
}

function NearbyschPageModel(lat, lng) {
    var self = this; //to avoid
    var distanceData = [
        { distance: 10 },
        { distance: 20 },
        { distance: 30 },
        { distance: 40 },
        { distance: 50 },
    ];
    var schooltypedata = [
        { Type: "Both" },
        { Type: "Primary" },
        { Type: "Secondary" }
    ];
    self.distances = ko.observableArray(distanceData);
    self.schooltypes = ko.observableArray(schooltypedata);

    self.latitude = ko.observable(lat);
    self.longitude = ko.observable(lng);

    self.updatedistance = function (newdistance) {
        setMapOnAll(null, "Both");
        markers = [];
        getmarkers(self.latitude(), self.longitude(), newdistance.distance);
    }
    self.updatetype = function (params) {
        setMapOnAll(map, params);
    }
}
// Sets the map on all markers in the array.
function setMapOnAll(map, type) {
    var count = 0;
    for (var i = 0; i < markers.length; i++) {
        if (markers[i].title === type.Type || type.Type === "Both")
        { markers[i].setMap(map); count++; }
        else { markers[i].setMap(null); }      
    }
   // alertmessage(count + " schools within " + setdistance + "km of your location");
}



