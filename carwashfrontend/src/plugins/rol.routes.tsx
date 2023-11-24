import { Routes, Route, BrowserRouter } from "react-router-dom";
import RolePage from "../components/Rol/TableRol";

function RoutesRol() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/rol" element={<RolePage></RolePage>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default RoutesRol;
