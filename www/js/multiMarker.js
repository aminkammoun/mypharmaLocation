var config = {
  apiKey: "AIzaSyASCbaiHQYvj65R2WAO60S0Od8raeth0So",
  authDomain: "pharmaposition-a230d.firebaseapp.com",
  databaseURL: "https://pharmaposition-a230d.firebaseio.com",
  projectId: "pharmaposition-a230d",
  storageBucket: "pharmaposition-a230d.appspot.com",
  messagingSenderId: "1014214233603",
  Id: "1:1014214233603:web:edb23cb53200911017c836"
};
firebase.initializeApp(config);
new Vue({
  el: "#app",
  vuetify: new Vuetify(),

  data: {
    q: "",
    drawer: false,
    option: { zoom: 13, center: { lat: 35.8060493, lng: 10.6106043 } },
    items: [
      { icon: "mdi-contacts", text: "Contacts"},
      { icon: "mdi-content-copy", text: "Pharma" }
    ],
    places: [],
    src: "",
    des: "",
    pos: [],
    closest: Number,
    img: "../img/pharmacy.png",
    map: "",
    distance: ""
  },
  created() {
    this.getPlaces();
  },
  methods: {
    infoWindow() {
      var inf = new google.maps.InfoWindow();
      google.maps.event.addListener(marker, "click", data => {
        console.log(data);
        inf.setContent("position:<br>" + data.latLng.toUrlValue(5));
        inf.open(this.map, marker);
      });
    },
    initMap() {
      var map = new google.maps.Map(
        document.getElementById("map"),
        this.option
      );
      this.map = map;

      for (i = 0; i < this.places.length; i++) {
        marker = new google.maps.Marker({
          position: new google.maps.LatLng(this.places[i].x, this.places[i].y),
          map: this.map,
          title: "pharmacie " + this.places[i].name,
          icon: "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png"
        });
        this.infoWindow();
      }

      navigator.geolocation.getCurrentPosition(position => {
        this.src = position.coords.latitude;
        this.des = position.coords.longitude;

        var marker = new google.maps.Marker({
          position: new google.maps.LatLng(this.src, this.des),
          title: "current position",
          map: this.map,
          icon:
            "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
        });
      });
    },
    getPlaces() {
      var db = firebase
        .database()
        .ref()
        .child("coord/");
      db.on(
        "value",
        data => {
          var places = data.val();
          var keys = Object.keys(places);
          this.places = keys.map(key => {
            return places[key];
          });
          this.initMap();
        },
        data => {
          console.log(data);
        }
      );
    },
    getClosest() {
      this.NearestCity(this.src, this.des);
      alert(
        "la pharmacie de " +
          this.places[this.closest].name +
          " a la moin courte distance de  " +
          this.distance +
          "m "
      );
      console.log(this.places);

      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(
          this.places[this.closest].x,
          this.places[this.closest].y
        ),
        title: this.places[this.closest].name,
        map: this.map,
        icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
      });
      this.places.splice(this.closest, 1);
      console.log(this.places);
    },
    Deg2Rad(deg) {
      return (deg * Math.PI) / 180;
    },
    PythagorasEquirectangular(lat1, lon1, lat2, lon2) {
      lat1 = this.Deg2Rad(lat1);
      lat2 = this.Deg2Rad(lat2);
      lon1 = this.Deg2Rad(lon1);
      lon2 = this.Deg2Rad(lon2);
      var R = 6371; // km
      var x = (lon2 - lon1) * Math.cos((lat1 + lat2) / 2);
      var y = lat2 - lat1;
      var d = Math.sqrt(x * x + y * y) * R;

      return d;
    },
    NearestCity(latitude, longitude) {
      var minDif = 99999;

      for (index = 0; index < this.places.length; ++index) {
        var dif = this.PythagorasEquirectangular(
          latitude,
          longitude,
          this.places[index].x,
          this.places[index].y
        );
        if (dif < minDif) {
          this.closest = index;
          minDif = dif;
        }
      }
      this.distance = minDif.toFixed(2);
    }
  }
});
