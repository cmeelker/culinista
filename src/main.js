import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import { Quasar } from "quasar";
import quasarUserOptions from "./quasar-user-options";
import "quasar/dist/quasar.sass";
import { createAuth0 } from "@auth0/auth0-vue";
import { VueQueryPlugin } from "vue-query";

const app = createApp(App);

app.use(Quasar, quasarUserOptions);
app.use(createPinia());
app.use(VueQueryPlugin);
app.use(router);
app.use(
  createAuth0({
    domain: import.meta.env.VITE_APP_AUTH0_DOMAIN,
    client_id: import.meta.env.VITE_APP_AUTH0_CLIENT_ID,
    redirect_uri: window.location.origin,
    audience: import.meta.env.VITE_API_BASE_URL,
    authorizationParams: {
      redirect_uri: window.location.origin,
    },
  })
);

app.mount("#app");
