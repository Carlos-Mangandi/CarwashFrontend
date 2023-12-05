import { Routes, Route, BrowserRouter } from "react-router-dom";
import RolePage from "../components/Rol/TableRol";
import UserPage from "../components/User/TableUser";
import Login from "../components/Login/Login";
import BrandPag from "../views/Brand/tableBrand";
import ModelPage from "../views/Model/tableModel";
import CarPage from "../views/Car/tableCar";
import ClientPage from "../views/Client/tableClient";

function RoutesRol() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login></Login>}></Route>
        <Route path="/rol" element={<RolePage></RolePage>}></Route>
        <Route path="/user" element={<UserPage></UserPage>}></Route>
        <Route path="/brand" element={<BrandPag></BrandPag>} />
        <Route path="/model" element={<ModelPage></ModelPage>} />
        <Route path="/car" element={<CarPage></CarPage>} />
        <Route path="/client" element={<ClientPage></ClientPage>} />
      </Routes>
    </BrowserRouter>
  );
}

export default RoutesRol;