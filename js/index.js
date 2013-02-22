
$(document).ready(function(){
    var directionsService = new google.maps.DirectionsService();
    var directionsDisplay = new google.maps.DirectionsRenderer();

    // map initializer
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom:7,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    directionsDisplay.setMap(map);
    directionsDisplay.setPanel(document.getElementById('panel'));


    var output = drawRouteGetPoints({
        lat : 24.485079,
        lng : 54.353435
    }, {
        lat : 24.470041,
        lng : 54.377382
    });

    console.log(output);

    function drawRouteGetPoints(start, finish){
        var request = {
            origin:         start.lat + ',' + start.lng,
            destination:    finish.lat + ',' + finish.lng,
            travelMode:     google.maps.DirectionsTravelMode.DRIVING
        };

        return directionsService.route(request, function(response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
                var tmp = response['routes'][0]['overview_path'];
                var arr = [];
                for (var i = 0; i< tmp.length; i++){
                    arr.push({
                        lat : tmp[i]['hb'],
                        lng : tmp[i]['ib']
                    });
                }

                shuffle(arr);

                addMarker(arr[0]['lat'], arr[0]['lng'])
                addMarker(arr[1]['lat'], arr[1]['lng'])


            }
        });
    }

    function addMarker(lat, lng) {
        var location = new google.maps.LatLng(lat, lng);
        marker = new google.maps.Marker({
            position: location,
            map: map
        });
    }

    function shuffle(o){
        for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    };
})
