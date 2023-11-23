import { Routes, Route, BrowserRouter} from "react-router-dom";
import RolePage from "../components/Rol/TableRol"

function App(){
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<RolePage></RolePage>}></Route>
        </Routes>
    </BrowserRouter>
}

export default App