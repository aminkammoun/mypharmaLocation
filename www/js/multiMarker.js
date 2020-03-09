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
    option: {
      zoom: 13,
      center: { lat: 35.8060493, lng: 10.6106043 }
    },
    items: [
      { icon: "mdi-contacts", text: "Contacts" },
      { icon: "mdi-content-copy", text: "Pharma" }
    ],
    places: [],
    src: "",
    des: "",
    pos: [],
    closest: Number,
    map: "",
    distance: "",
    load: true,
    text: "",
    snackbar: false,
    ouvert: false,
    midNight: true
  },
  created() {
    this.getPlaces();
    setTimeout(() => {
      this.load = false;
    }, 2000);
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
      var currentdate = new Date();
      var datetime =
        currentdate.getHours() +
        ":" +
        currentdate.getMinutes() +
        ":" +
        currentdate.getSeconds();
      var ouv = 8 + ":" + 00 + ":" + 00;
      var fer = "19:30:00";

      a = datetime.split(":");
      b = ouv.split(":");
      c = fer.split(":");

      var seconds = +a[0] * 60 * 60 + +a[1] * 60 + +a[2];
      var seconds1 = +b[0] * 60 * 60 + +b[1] * 60 + +b[2];
      var seconds2 = +c[0] * 60 * 60 + +c[1] * 60 + +c[2];

      if (seconds > seconds1 && seconds < seconds2) {
        this.ouvert = true;
        this.midNight = false;
      }

      for (i = 0; i < this.places.length; i++) {
        if (this.places[i].ouvre != 24) {
          var touvert = this.places[i].ouvre;
          var tferme = this.places[i].ferme;
          d = touvert.split(":");
          e = tferme.split(":");
          var seconds3 = +d[0] * 60 * 60 + +d[1] * 60;
          var seconds4 = +e[0] * 60 * 60 + +e[1] * 60;
          if (seconds > seconds3 && seconds < seconds4 && this.ouvert) {
            this.markerFun(
              this.places[i].x,
              this.places[i].y,
              this.map,
              this.places[i].name,
              "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
            );
          } else if (
            seconds < seconds3 &&
            seconds < seconds4 &&
            this.places[i].cat == "nuit"
          ) {
            this.markerFun(
              this.places[i].x,
              this.places[i].y,
              this.map,
              this.places[i].name,
              "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
            );
          }else if (
            seconds > seconds3 &&
            seconds > seconds4 &&
            this.places[i].cat == "nuit"
          ) {
            this.markerFun(
              this.places[i].x,
              this.places[i].y,
              this.map,
              this.places[i].name,
              "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
            );
          } else {
            this.markerFun(
              this.places[i].x,
              this.places[i].y,
              this.map,
              this.places[i].name,
              "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
            );
          }
        } else {
          this.markerFun(
            this.places[i].x,
            this.places[i].y,
            this.map,
            this.places[i].name,
            "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png"
          );
        }

        this.infoWindow();
      }

      navigator.geolocation.getCurrentPosition(position => {
        this.src = position.coords.latitude;
        this.des = position.coords.longitude;
        this.markerFun(
          this.src,
          this.des,
          this.map,
          "current position",
          "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
        );
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
      this.snackbar = true;
      this.text =
        "la pharmacie de " +
        this.places[this.closest].name +
        " a la moin courte distance de  " +
        this.distance +
        "km ";
      console.log(this.places);

      this.markerFun(
        this.places[this.closest].x,
        this.places[this.closest].y,
        this.map,
        this.places[this.closest].name,
        "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
      );

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
    },
    markerFun(a, b, c, d, str) {
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(a, b),
        map: c,
        title: "pharmacie " + d,
        icon: str
      });
    }
    // calculRoute() {
    //   var directionDisplay = new google.maps.DirectionsRenderer();
    //   var directionService = new google.maps.DirectionsService();

    //   var ss = new google.maps.LatLng(this.src, this.des);

    //   var dd = new google.maps.LatLng(
    //     this.places[this.closest].x,
    //     this.places[this.closest].y
    //   );

    //   var request = {
    //     origin: ss,
    //     destination: dd,
    //     travelMode: "DRIVING"
    //   };
    //   directionService.route(request, function(result, request) {
    //     console.log(result, request);
    //   });
    // }
  }
});
