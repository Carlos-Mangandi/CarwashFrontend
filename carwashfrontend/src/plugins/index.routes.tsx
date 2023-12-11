import {
  Routes,
  Route,
  Navigate,
  Outlet,
  BrowserRouter as Router,
} from "react-router-dom";
import RolePage from "../components/Rol/TableRol";
import UserPage from "../components/User/TableUser";
import Login from "../components/Login/Login";
import BrandPag from "../views/Brand/tableBrand";
import ModelPage from "../views/Model/tableModel";
import CarPage from "../views/Car/tableCar";
import ClientPage from "../views/Client/tableClient";
import Home from "../components/Home/Home";
import { isAuthenticated } from "../utils/authData";
// import ProtectedRoute from "./protect";

// function ProtectedRoute({ element }: { element: React.ReactNode }) {
//   return isAuthenticated() ? <>{element}</> : <Navigate to="/" replace />;
// }

const PrivateRoutes = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" replace />;
};

function RoutesRol() {
  return (
    <Router>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="/rol" element={<RolePage />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/brand" element={<BrandPag />} />
          <Route path="/car" element={<CarPage />} />
          <Route path="/model" element={<ModelPage />} />
          <Route path="/client" element={<ClientPage />} />
        </Route>
        <Route path="/login" element={<Login></Login>}></Route>
      </Routes>
    </Router>
  );
}

export default RoutesRol;
