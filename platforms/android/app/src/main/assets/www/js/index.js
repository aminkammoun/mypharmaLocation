var config = {
  apiKey: "AIzaSyASCbaiHQYvj65R2WAO60S0Od8raeth0So",
  authDomain: "pharmaposition-a230d.firebaseapp.com",
  databaseURL: "https://pharmaposition-a230d.firebaseio.com",
  projectId: "pharmaposition-a230d",
  storageBucket: "pharmaposition-a230d.appspot.com",
  messagingSenderId: "1014214233603",
  appId: "1:1014214233603:web:edb23cb53200911017c836"
};
firebase.initializeApp(config);
new Vue({
  el: "#app",
  vuetify: new Vuetify(),

  data: {
    q: "",
    drawer: false,
    position: {},
    items: [
      { icon: "mdi-contacts", text: "Contacts" },
      { icon: "mdi-content-copy", text: "Pharma" }
    ],
    places: [],
    orderby: []
  },
  created() {
    this.getPlaces();
  },
  methods: {
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
          console.log(this.places);
        },
        data => {
          console.log(data);
        }
      );
      
    },
    getLocation() {
      navigator.geolocation.getCurrentPosition(
        position => {
          this.position = position.coords;
        },
        () => {
          alert("something wrong !! ");
        }
      );
    },

    orderBy() {
      var db = firebase
        .database()
        .ref()
        .child("coord/");

      db.orderByChild("name")
        .equalTo(this.q)
        .on(
          "value",
          data => {
            var orderby = data.val();
            var keys = Object.keys(orderby);
            this.orderby = keys.map(key => {
              return orderby[key];
            });
            console.log(this.orderby);
          },
          data => {
            console.log(data);
          }
        );
    }
  }
});
