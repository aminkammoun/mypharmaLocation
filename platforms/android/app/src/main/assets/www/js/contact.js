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
  methods: {}
});
