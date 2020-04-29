var config = {
  apiKey: "AIzaSyASCbaiHQYvj65R2WAO60S0Od8raeth0So",
  authDomain: "pharmaposition-a230d.firebaseapp.com",
  databaseURL: "https://pharmaposition-a230d.firebaseio.com",
  projectId: "pharmaposition-a230d",
  storageBucket: "pharmaposition-a230d.appspot.com",
  messagingSenderId: "1014214233603",
  Id: "1:1014214233603:web:edb23cb53200911017c836",
};
firebase.initializeApp(config);
new Vue({
  el: "#app",
  vuetify: new Vuetify(),
  data: {
    show: false,
    try: "",
    loader: null,
    loading: false,
    q: "",
    id: [],
    drawer: false,
    load: true,
    times: [],
    ouvert: false,
    stocks: [],
    show: false,
  },
  created() {
    this.getpha();

    setTimeout(() => {
      this.load = false;
    }, 1300);
  },
  methods: {
    getStock(num) {
      var db = firebase.database().ref().child(`coord/${num}/stock`);
      db.on("value", (data) => {
        var tab = data.val();
        var keys = Object.keys(tab);
        this.stocks = keys.map((key) => {
          return tab[key];
        });
      });
      var val = JSON.stringify(this.stocks);
      window.localStorage.setItem("key", val);
    },
    getpha() {
      var db = firebase.database().ref().child("coord/");
      db.on("value", (data) => {
        var tab = data.val();
        var keys = Object.keys(tab);

        this.times = keys.map((key) => {
          this.id.push(key);

          return tab[key];
        });
        console.log(this.times);
      });
    },
  },
});
