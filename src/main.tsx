import ReactDOM from "react-dom/client";
import App from "./App.tsx";
// import { AuthProvider } from "./context/AuthContext";
//GlobalStyle
import GlobalStyled from "./styles/GlobalStyles/index.tsx";
//toastify
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

//font-family
import OverrideMuiTheme from "./theme/override.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    {/* <AuthProvider> */}
    <ToastContainer
      position="top-center"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
    <GlobalStyled>
      <OverrideMuiTheme>
        <App />
      </OverrideMuiTheme>
    </GlobalStyled>
    {/* </AuthProvider> */}
  </>
);
