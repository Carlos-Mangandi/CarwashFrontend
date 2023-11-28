import { Routes, Route, BrowserRouter } from "react-router-dom";
import RolePage from "../components/Rol/TableRol";
import UserPage from "../components/User/TableUser";
import Login from "../components/Login/Login"

function RoutesRol() {
  return (
    <BrowserRouter>
      <Routes>        
        <Route path="/" element={<Login></Login>}></Route>
        <Route path="/rol" element={<RolePage></RolePage>}></Route>
        <Route path="/user" element={<UserPage></UserPage>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default RoutesRol;
