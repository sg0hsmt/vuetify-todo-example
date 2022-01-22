import Vue from "vue";
import VueCompositionAPI from "@vue/composition-api";
import Vuetify from "vuetify";

Vue.use(VueCompositionAPI);
Vue.use(Vuetify);

// see https://github.com/vuetifyjs/vuetify/issues/1210
const app = document.createElement("div");
app.setAttribute("data-app", "true");
document.body.appendChild(app);
