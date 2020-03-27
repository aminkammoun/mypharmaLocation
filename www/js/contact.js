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
    name: "",
    lastname: "",
    mail: "",
    items: ["Foo", "Bar", "Fizz", "Buzz"],
    description: "",
    loader: null,
    loading: false,
    q: "",
    drawer: false,
    load: true,
    snackbar: false,
    text: "please fill all the field",
    ouvert: false
  },
  watch: {
    loader() {
      const l = this.loader;
      this[l] = !this[l];

      setTimeout(() => (this[l] = false), 3000);

      this.loader = null;
    }
  },
  created() {
    var currentdate = new Date();
    var datetime =
      currentdate.getHours() +
      ":" +
      currentdate.getMinutes() +
      ":" +
      currentdate.getSeconds();
    var ouv = 8 + ":" + 00 + ":" + 00;
    var fer = 18 + ":" + 00 + ":" + 00;

    a = datetime.split(":");
    b = ouv.split(":");
    c = fer.split(":");
    var seconds = +a[0] * 60 * 60 + +a[1] * 60 + +a[2];
    var seconds1 = +b[0] * 60 * 60 + +b[1] * 60 + +b[2];
    var seconds2 = +c[0] * 60 * 60 + +c[1] * 60 + +c[2];
    if (seconds > seconds1 && seconds < seconds2) {
      this.ouvert = true;
    }

    setTimeout(() => {
      this.load = false;
    }, 3000);
  },
  methods: {
    contactForm(e) {
      e.preventDefault();
      var name = document.getElementById("Name").value;
      var lastname = document.getElementById("lastName").value;
      var Email = document.getElementById("Email").value;
      var Decription = document.getElementById("Des").value;
      this.saveForm(name, lastname, Email, Decription);
    },
    saveForm(name, lastname, Email, Decription) {
      if ((name != "" && lastname != "" && Email != "", Decription != "")) {
        var contactRef = firebase.database().ref("contactForm");
        var data = {
          Name: name,
          LastName: lastname,
          Email: Email,
          Description: Decription
        };

        contactRef.push(data);
        alert(name, lastname, Email, Decription);
      } else {
        this.snackbar = true;
      }
    }
  }
});
