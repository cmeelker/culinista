import iconSet from "@quasar/extras/ionicons-v4/index.js";
import { Dialog, Notify } from "quasar";
import "@quasar/extras/roboto-font/roboto-font.css";
import "@quasar/extras/ionicons-v4/ionicons-v4.css";

export default {
  config: {
    brand: {
      primary: "#cc5945",
      secondary: "#26a69a",
      accent: "#d8804d",
      dark: "#2a3238",
      light: "#f4f1de",
      positive: "#81b29a",
      background: "#eeedec",
    },
  },
  plugins: { Dialog, Notify },
  iconSet: iconSet,
};
