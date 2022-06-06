import "./styles/quasar.scss";
import iconSet from "@quasar/extras/ionicons-v4/index.js";
import { Dialog, Notify } from "quasar";
//import lang from "quasar/lang/nl.js";
import "@quasar/extras/roboto-font/roboto-font.css";
import "@quasar/extras/ionicons-v4/ionicons-v4.css";

export default {
  config: {},
  plugins: { Dialog, Notify },
  //lang: lang,
  iconSet: iconSet,
};
