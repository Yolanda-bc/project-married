import { HashRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./components/App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <HashRouter>
    <App />
  </HashRouter>
);
