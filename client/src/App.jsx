import { BrowserRouter as Routers } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Navbarlink from "./Navbarlink";

function App() {

  return (
    <>
      <Routers>
        <div className="wrapper">
          
          <Navbarlink />
          <ToastContainer />        
        </div>
      </Routers>
    </>
  )
}

export default App
