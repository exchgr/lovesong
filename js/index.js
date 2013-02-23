function p(el){
    console.log(el);
}

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


                var name = getName(response, 2);
                p(name);
                response = setName(response, 2, 'Hello');

                directionsDisplay.setDirections(response);

                var directions = response['routes'][0]['legs'][0]['steps'];
                p(directions);

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


    function getName(response, position){
        return response['routes'][0]['legs'][0]['steps'][position]['instructions'];
    }

    function setName(response, position, name){
        response['routes'][0]['legs'][0]['steps'][position]['instructions'] = name;
        return response;
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
