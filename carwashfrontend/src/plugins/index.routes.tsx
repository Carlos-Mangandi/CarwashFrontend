import { Routes, Route, BrowserRouter } from "react-router-dom";
import RolePage from "../components/Rol/TableRol";
import HomePage from "../components/Home"

function RoutesRol() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/rol" element={<RolePage></RolePage>}></Route>
        <Route path="/" element={<HomePage></HomePage>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default RoutesRol;
