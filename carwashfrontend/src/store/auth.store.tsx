import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
import { make_login } from "../services/auth.service";
import { CreateToken, DeleteToken } from "../utils/authData";
import { GetLoginData } from "../types/auth.types";
import { AxiosError } from "axios";
import { SlLogout } from "react-icons/sl";


function isAxiosError(error: unknown): error is AxiosError {
  return (error as AxiosError).isAxiosError !== undefined;
}

export async function MakeLogin(data_send: GetLoginData) {
  try {
    const { data } = await make_login(data_send);
    console.log(data);
    if (data.token) {
      CreateToken(data.token);

      window.location.href = "/";

      return true;
    }
  } catch (error) {
    if (isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response && axiosError.response.status === 401) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Las credenciales de inicio de sesión son incorrectas.",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ha ocurrido un error al iniciar sesión.",
        showConfirmButton: false,
        timer: 2000,
      });
    }
    return false;
  }
}

function AuthComponent() {
  function MakeLogout() {
    DeleteToken();
    
    window.location.href = "/login";
  }

  return (
    <>
      <div>
      <SlLogout className="absolute mt-11" />
        <button  className="ml-6 mt-10" onClick={MakeLogout}>Cerrar Sesión </button>
      </div>
    </>
  );
}

export default AuthComponent;
