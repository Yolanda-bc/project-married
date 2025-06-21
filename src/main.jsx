//StrictMode: Es una herramienta de desarrollo de React. Ayuda a detectar problemas potenciales como el uso de APIs obsoletas o malas prácticas. No afecta al comportamiento de la aplicación en producción.
//createRoot: Parte de la nueva API de React 18 para renderizar la aplicación. Reemplaza al antiguo ReactDOM.render.
import { HashRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./components/App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <HashRouter>
    <App />
  </HashRouter>
);
