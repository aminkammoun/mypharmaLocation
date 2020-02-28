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
    description: "",
    loader: null,
    loading: false,
    q: "",
    drawer: false,
    load: true
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
    setTimeout(() => {
      this.load = false;
    }, 2000);
  },
  methods: {
    contactForm(e) {
      this.loader = this.loading;
      e.preventDefault();
      var name = document.getElementById("Name").value;
      var lastname = document.getElementById("lastName").value;
      var Email = document.getElementById("Email").value;
      var Decription = document.getElementById("Des").value;
      this.saveForm(name, lastname, Email, Decription);
      emailjs
        .send("gmail", "<template_name>", {
          //template_name is set via emailjs.com dashboard
          content: Email // you can store user data in any such variable
        })
        .then(
          function(response) {
            document.write("Email sent successfully!");
          },
          function(error) {
            document.write("Failed to send email.");
            console.log(error);
          }
        );
    },
    saveForm(name, lastname, Email, Decription) {
      if ((name != "" && lastname != "" && Email != "", Decription != "")) {
        var contactRef = firebase
          .database()
          .ref()
          .child("contactForm");

        contactRef.set({
          Name: name,
          LastName: lastname,
          Email: Email,
          Description: Decription
        });
        alert(name, lastname, Email, Decription);
      } else {
        alert("Please fill all the fields.");
      }
    }
  }
});
