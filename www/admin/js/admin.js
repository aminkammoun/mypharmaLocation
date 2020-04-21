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
    image: "",
    items: [],
    select: "",
    stock: "",
    date: "",
    NomMed: "",
    description: "",
    snackbar: false,
    text: "please fill all the field",
  },

  created() {
    this.getpha();
  },
  methods: {
    stockForm(e) {
      e.preventDefault();

      this.saveStock(
        this.select,
        this.NomMed,
        this.stock,
        this.description
      );
    },

    saveStock(namePha, NomMed, stock, Description) {
      var query = firebase
        .database()
        .ref("/coord")
        .orderByChild("name")
        .equalTo(this.select);
      query.once("value", (data) => {
        data.forEach((userSnapshot) => {
          let key = userSnapshot.key;
          if (
            namePha != "" &&
            NomMed != "" &&
            stock != "" &&
            Description != ""
          ) {
            var contactRef = firebase.database().ref(`coord/${key}/stock`);
            var data = {
              NamePha: namePha,
              NomMed: NomMed,
              Stock: stock,
              Description: Description,
            };

            contactRef.push(data);
          } else {
            this.snackbar = true;
          }
        });
      });
    },

    getpha() {
      var db = firebase.database().ref().child("coord/");
      db.on("value", (data) => {
        var tab = data.val();
        var keys = Object.keys(tab);
        this.items = keys.map((key) => {
          return tab[key].name;
        });
      });
    },
  },
});
