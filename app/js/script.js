var ip_address = '157.41.95.184';
var data;
var lat = 19.10;
var lang = 73.0;
var region = 'State of Maharashtra';
var country = 'IN';
var isp = 'Reliance Jio Infocomm Limited';

//Map Initialization
var map = L.map('map').setView([19.10, 73.0], 13);

//osm layer
var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

//water color map
var waterColor = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	subdomains: 'abcd',
	minZoom: 1,
	maxZoom: 16,
	ext: 'jpg'
});

//google street map
var googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});

//google hybrid map

googleHybrid = L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});

//google satellite map
googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});

//google terrain map
googleTerrain = L.tileLayer('http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});

//adding tile to our map
googleStreets.addTo(map);

input_bar = document.getElementById('ip-search');
submit = document.querySelector('.submit-button');

submit.addEventListener('click', function(){
  let match = check_ipv4(input_bar.value);
  if (match) {
    ip_address = match[0];
    console.log(ip_address)
    data = get_location(ip_address);
  } else {
    console.log('please enter correct IP Address');
  }
});
//getting lat lang from ipify
lat = data[0];
lang = data[1];
region = data[2];
country = data[3];
isp = data[4];

//marker
var singleMarker = L.marker([lat, lang], {draggable: true});
map.setView([lat, lang], 13);
singleMarker.addTo(map);

content = `IP Address: ${ip_address}<br>
Location: ${region}<br>
Country: ${country}<br>
ISP: ${isp}`;
// message = 'Sambalpur, ' + singleMarker.getLatLng();
// message = 'IP Address: ' + ip_address;
singleMarker.bindPopup(content).openPopup();

// Check if ip address is correct
const check_ipv4 = function(value) {
  const regex = /(\d{1,3})[.](\d{1,3})[.](\d{1,3})[.](\d{1,3})/;
  let match = value.match(regex);
  if (match && value == match[0]) {
    return match;
  } else {
    return 0;
  }
}

// Finding location details from ip address using ipify
const get_location = function(ip_address) {
  const request = new XMLHttpRequest();

  let url = 'https://geo.ipify.org/api/v2/country,city';
  let api_key = 'at_hhw6rSdaSl7lRXarSjrGYNOOi4D2D';

  let final_url = url + "?apiKey=" + api_key + "&ipAddress=" + ip_address;
  request.open('GET', final_url, true);
  request.send();

  request.onload = function() {
    // Default values;
    if (request.status != 200) {
      console.log(`Error ${request.status} : ${request.statusText}`);
    } else {
      let data = JSON.parse(request.response);
      lat = data.location.lat;
      lang = data.location.lng;
      region = data.location.region;
      country = data.location.country;
      isp = data.isp;
    }
  }
  return [lat, lang, region, country, isp];
}