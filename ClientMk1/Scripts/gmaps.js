function initMap() {
    var schlat = document.getElementById('schlat').innerHTML;
    var latdble = parseFloat(schlat);
    var schlon = document.getElementById('schlon').innerHTML;
    var lngdble = parseFloat(schlon);
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: { lat: latdble, lng: lngdble } //change initial center;
    });
 
    //var geocoder = new google.maps.Geocoder();
    //var address = document.getElementById('postalcode').innerHTML;
    //address = address.replace(/\s+/g, '');
    //geocoder.geocode({ 'address': address }, function (results, status) {
    //    if (status === 'OK') {
            var marker = new google.maps.Marker({
                map: map,
                position: { lat: latdble, lng: lngdble } //quicker than geocoding eircode and awaiting result i.e. saves time;
            });

            var schName = document.getElementById('schname').innerHTML;
            var address = document.getElementById('schaddress').innerHTML;

            var contentString = '<div>' +
                '<span style="font-size:16px">' + schName + '</span>' +
                '</br>' +
                '<span>Address: ' + address + '</span>' + '</br>' +
                '</div>';

            var infowindow = new google.maps.InfoWindow({
                content: contentString
            });
            marker.addListener('click', function () {
               // map.setZoom(8);
                infowindow.open(map, marker);
                //map.setCenter(marker.getPosition());
            });

        //    var coordInfoWindow = new google.maps.InfoWindow();
        //    coordInfoWindow.setContent(createInfoWindowContent(marker, map.getZoom()));
        //    coordInfoWindow.setPosition(marker);
        //    coordInfoWindow.open(map)
        //    map.addListener('zoom_changed', function() {
        //    coordInfoWindow.setContent(createInfoWindowContent(marker, map.getZoom()));
        //    coordInfoWindow.open(map);
        //});
        //} else {
        //    alert('Geocode was not successful for the following reason: ' + status);
        //}
    //});
}
var TILE_SIZE = 256;

function createInfoWindowContent(latLng, zoom) {
    var scale = 1 << zoom;

    var worldCoordinate = project(latLng);

    var pixelCoordinate = new google.maps.Point(
        Math.floor(worldCoordinate.x * scale),
        Math.floor(worldCoordinate.y * scale));

    var tileCoordinate = new google.maps.Point(
        Math.floor(worldCoordinate.x * scale / TILE_SIZE),
        Math.floor(worldCoordinate.y * scale / TILE_SIZE));

    return 'sdfsfggdfgdhdggd'; 
      
}

// The mapping between latitude, longitude and pixels is defined by the web
// mercator projection.
function project(latLng) {
    var siny = Math.sin(latLng.position.lat() * Math.PI / 180);

    // Truncating to 0.9999 effectively limits latitude to 89.189. This is
    // about a third of a tile past the edge of the world tile.
    siny = Math.min(Math.max(siny, -0.9999), 0.9999);

    return new google.maps.Point(
        TILE_SIZE * (0.5 + latLng.position.lng() / 360),
        TILE_SIZE * (0.5 - Math.log((1 + siny) / (1 - siny)) / (4 * Math.PI)));
}



function drawChart() {
    var girls = document.getElementById('girls2016').innerHTML;
    var girls2016 = parseInt(girls);
    var boys = document.getElementById('boys2016').innerHTML;
    var boys2016 = parseInt(boys);
    var dataz = google.visualization.arrayToDataTable([
      ['Gender', 'Amount'],
      ['Girls', girls2016],
      ['Boys', boys2016],
    ]);

    var options = {
        title: 'Population',
        pieSliceText: 'value',
       
    };

    var chart = new google.visualization.PieChart(document.getElementById('piechart'));

    chart.draw(dataz, options);
}

function SchoolModel(data) {
    //var self = this;
    //self.Name = data.Name;
    //self.school = ko.observable(data);
    //var girls = self.school().Female;
    //var boys = self.school().Male;
    //var boy2015 = self.school().data2015.boys;
    //var girl2015 = self.school().data2015.girls;
    //var boy2014 = self.school().data2014.boys;
    //var girl2014 = self.school().data2014.girls;
    //var boy2013 = self.school().data2013.boys;
    //var girl2013 = self.school().data2013.girls;
    //var boy2012 = self.school().data2012.boys;
    //var girl2012 = self.school().data2012.girls;
    //var boy2011 = self.school().data2011.boys;
    //var girl2011 = self.school().data2011.girls;
    //google.charts.load('current', { 'packages': ['corechart'] });
    //var result = drawChart;
    //google.charts.setOnLoadCallback(result, drawAxisTickColors);
    //google.charts.load('current', { packages: ['corechart', 'line'] });
    //google.charts.setOnLoadCallback(drawAxisTickColors);
}


function drawAxisTickColors() {

    var girls2016 = document.getElementById('girls2016').innerHTML;
    var girls2016 = parseInt(girls2016);
    var boys2016 = document.getElementById('boys2016').innerHTML;
    var boys2016 = parseInt(boys2016);
    var girls2015 = document.getElementById('girls2015').innerHTML;
    var girls2015 = parseInt(girls2015);
    var boys2015 = document.getElementById('boys2015').innerHTML;
    var boys2015 = parseInt(boys2015);
    var girls2014 = document.getElementById('girls2014').innerHTML;
    var girls2014 = parseInt(girls2014);
    var boys2014 = document.getElementById('boys2014').innerHTML;
    var boys2014 = parseInt(boys2014);
    var girls2013 = document.getElementById('girls2013').innerHTML;
    var girls2013 = parseInt(girls2013);
    var boys2013 = document.getElementById('boys2013').innerHTML;
    var boys2013 = parseInt(boys2013);
    var girls2012 = document.getElementById('girls2012').innerHTML;
    var girls2012 = parseInt(girls2012);
    var boys2012 = document.getElementById('boys2012').innerHTML;
    var boys2012 = parseInt(boys2012);
    var girls2011 = document.getElementById('girls2011').innerHTML;
    var girls2011 = parseInt(girls2011);
    var boys2011 = document.getElementById('boys2011').innerHTML;
    var boys2011 = parseInt(boys2011);

 var data = google.visualization.arrayToDataTable([
         ['Year', 'Girls', 'Boys'],
         ['2011', girls2011, boys2011],
         ['12', girls2012, boys2012],
         ['13', girls2013, boys2013],
         ['14', girls2014, boys2014],
         ['15', girls2015, boys2015],
         ['16', girls2016, boys2016]
 ]);

   

    var options = {
        title: 'School Performance',
        curveType: 'function',
        series: {
            0: { color: '#1c91c0' },
            1: { color: '#e2431e' }
        },
        ////hAxis: {
        ////    title: 'Year',
        ////    textStyle: {
        ////        color: '#01579b',
        ////        fontSize: 20,
        ////        fontName: 'Arial',
        ////        bold: true,
        ////        italic: true
        ////    },
        ////    titleTextStyle: {
        ////        color: '#01579b',
        ////        fontSize: 16,
        ////        fontName: 'Arial',
        ////        bold: false,
        ////        italic: true
        ////    }
        ////},
        ////vAxis: {
        //    title: 'Popularity',
        //    textStyle: {
        //        color: '#1a237e',
        //        fontSize: 16,
        //        bold: true
        //    },
        //    titleTextStyle: {
        //        color: '#1a237e',
        //        fontSize: 16,
        //        bold: true
        //    }
        //},
        
        colors: ['#a52714', '#097138'],
 
    };
    var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
    chart.draw(data, options);
}




$(window).on('load', function () { //maybe use document load;
    //settimeout(confirm("are you sure?"), 10);
    google.charts.load('current', { 'packages': ['corechart'] });
    var result = drawChart;
    google.charts.setOnLoadCallback(result, drawAxisTickColors);
    google.charts.load('current', { packages: ['corechart', 'line'] });
    google.charts.setOnLoadCallback(drawAxisTickColors);
});

$(window).resize(function () {
    drawChart();
    drawAxisTickColors();
});
