function listRoster(sourcepage) {
    var page = "";
    var startsunday = false;
    
    if(sourcepage == "kingsherman") page = "1COzgZ7YLJShT_gnCZIXYXF4CTIA78pzVFjaUT07W-4c";
    if(sourcepage == "fasinations") page = "1oOA8QPY6I_mkMFYbLmTpSkAI8azdiIUx18SN2hU46Fc";
    if(sourcepage == "maxs")        page = "1RmJLXmO_wDiJwinnMfMY7mHvnSyxmOUoJT4s-4hi3So";

    if(sourcepage == "fasinations") startsunday = true;

    if(page.length > 0) {
        $.getJSON( "https://spreadsheets.google.com/feeds/list/" + page + "/od6/public/values?alt=json-in-script&callback=?",
    	    function (data) {	
    		$('div#roster-list').append('<table id="roster" class="items"></table>');
			var daterange = "Up to date as of right now...";

// Head
			var header = "";
			header += "<td></td>";
			if(startsunday) {
			    header += "<th>Sunday</th>";
			}
			header += "<th>Monday</th>";
			header += "<th>Tuesday</th>";
			header += "<th>Wednesday</th>";
			header += "<th>Thursday</th>";
			header += "<th>Friday</th>";
			header += "<th>Saturday</th>";
			if(!startsunday) {
			    header += "<th>Sunday</th>";
			}
			$('#roster.items').append('<thead>' + header + '</thead>');	
// End Head
// Body
			$('#roster.items').append('<tbody>');	
    		$.each(data.feed.entry, function(i,entry) {	
    			var item = '';
    			item += '<th>' + entry.gsx$name.$t + '</th>';
    			if(startsunday) {
    			    item += '<td>' + entry.gsx$sunday.$t + '</td>';
    			}
    			item += '<td>' + entry.gsx$monday.$t + '</td>';
    			item += '<td>' + entry.gsx$tuesday.$t + '</td>';
    			item += '<td>' + entry.gsx$wednesday.$t + '</td>';
    			item += '<td>' + entry.gsx$thursday.$t + '</td>';
    			item += '<td>' + entry.gsx$friday.$t + '</td>';
    			item += '<td>' + entry.gsx$saturday.$t + '</td>';
    			if(!startsunday) {
    			    item += '<td>' + entry.gsx$sunday.$t + '</td>';
    			}
				if (entry.gsx$name.$t == "date_description") {	
				    daterange = entry.gsx$monday.$t;	
    			}
    			else {
        			$('#roster.items').append('<tr>' + item + '</tr>');	
    			}
			});
			$('#roster.items').append('</tbody>');	
// End Body
// Foot
			var footer = "";
			footer += "<td></td>";
			footer += "<th colspan='7'>" + daterange + "</th>";
			$('#roster.items').append('<tfoot>' + footer + '</tfoot>');
// End Foot
		});
	}
}

function listNews(sourcepage) {
    var page = "";

    if(sourcepage == "kingsherman") page = "1MFMKrTnNGXEnaTDDq2GselPpmDhotV3FCOwUCOt53Ag";
    if(sourcepage == "fasinations") page = "14TfF7UDxAx4BGX1kI4iI54W-6xk5pkxcA3DNOUWJgmw";
    if(sourcepage == "maxs")        page = "1lrozgx327PPJuBAEU7bKNl79IpoNFxiAWYY1bX2i5gg";

    if(page.length > 0) {
        $.getJSON( "https://spreadsheets.google.com/feeds/list/" + page + "/od6/public/values?alt=json-in-script&callback=?",
    	    function (data) {	
    		$('div#news-list').append('<table id="news" class="items"></table>');
			var daterange = "Up to date as of right now...";

// Head
			var header = "";
			header += "<td></td>";
			header += "<th></th>";
			$('#news.items').append('<thead>' + header + '</thead>');	
// End Head
// Body
			$('#news.items').append('<tbody>');	
    		$.each(data.feed.entry, function(i,entry) {	
    			var item = '';
    			item += '<th>' + entry.gsx$date.$t + '</th>';
    			item += '<td><b>' + entry.gsx$title.$t + '</b></br>';
    			item += '' + entry.gsx$message.$t + '</td>';
        	
        	$('#news.items').append('<tr>' + item + '</tr>');	
			});
			$('#news.items').append('</tbody>');	
// End Body
// Foot
			var footer = "";
			footer += "<td></td>";
			footer += "<th colspan='2'>" + "" + "</th>";
			$('#news.items').append('<tfoot>' + footer + '</tfoot>');
// End Foot
		});
	}
}

function initializeGMap(sourcepage) {
    var mapPoint = new google.maps.LatLng(0,0);
    var mapMessage = "ooops, something isnt quite right!<br>wrong place! I hope your brought your swimmers, and coconuts, you might need them to bribe the locals!!!";

    if(sourcepage.length > 0)
    {
        switch(sourcepage)
        {
            case "kingsherman":
                mapPoint = new google.maps.LatLng(43.251328,-79.839341);
                mapMessage = "Happiness =)";
                break;
            case "fasinations":
                mapPoint = new google.maps.LatLng(43.088611,-79.144555);
                mapMessage = "Happiness ;)";
                break;
            case "maxs":
                mapPoint = new google.maps.LatLng(42.99154,-79.252752);
                mapMessage = "Happiness :)";
                break;                
        }

        var mapOptions = {
            zoom: 18,
            center: mapPoint
        };
    
        var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
          
        var coordInfoWindow = new google.maps.InfoWindow();
          coordInfoWindow.setContent(mapMessage);
          coordInfoWindow.setPosition(mapPoint);
          coordInfoWindow.open(map);
        
        google.maps.event.addListener(map, 'zoom_changed', function() {
            coordInfoWindow.setContent(mapMessage);
            coordInfoWindow.open(map);
        });
    }
}
