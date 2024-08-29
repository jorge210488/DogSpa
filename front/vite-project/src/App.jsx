import "./styles/reset.css"
import "./App.css"
import NavBar from "./components/NavBar";
import Home from "./views/Home";
import Appointments from "./views/MisTurnos";
import Register from "./views/Register";
import Login from "./views/Login"

function App() {

  return (
    <>
    <NavBar />
    {/* <Home /> */}
    {/* <Appointments /> */}
    {/* <Register />  */}
    <Login />
    </>
  )
}

export default App;
