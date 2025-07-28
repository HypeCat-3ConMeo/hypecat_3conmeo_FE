import ReactDOM from "react-dom/client";
import App from "./App";
import GlobalStyled from "./styles/GlobalStyles";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Quill styles
import "react-quill-new/dist/quill.snow.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <ToastContainer />
    <GlobalStyled>
      <App />
    </GlobalStyled>
  </>
);
