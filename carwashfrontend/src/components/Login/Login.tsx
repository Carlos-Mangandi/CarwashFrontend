import { useState } from "react";
import { MakeLogin } from "../../store/auth.store";
import { ToastContainer, toast } from "react-toastify";
import CarwashImage from "../../assets/Carro.png";
import { MdEmail } from "react-icons/md";
import { FaLuggageCart } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";

import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("El email y la contraseña son requeridos");
      return;
    }

    const data_send = {
      email: email,
      password: password,
    };

    const loginSuccessful = await MakeLogin(data_send);

    if (loginSuccessful) {
      toast.success("Inicio de sesión exitoso");
    } else {
      toast.error("Email o contraseña incorrecta");
    }
  };

  return (
    <div className="w-full h-screen flex flex-col md:flex-row items-start">
      <div className="relative w-full md:w-1/2  h-1/2 md:h-full flex flex-col">
        <div className="absolute top-[20%] left-[10%] flex flex-col">
          <h1 className="text-4xl text-white font-bold my-2 mt-32">CarWash</h1>
          <p className="text-xl text-white font-normal">
            Lo mejor en cuidado para tu auto.
          </p>
        </div>
        <img src={CarwashImage} className="w-full h-full object-cover" />
      </div>

      <div className="w-full md:w-1/2 h-full bg-[#f5f5f5] flex flex-col p-20 justify-between">
        <h1 className="text-xl text-[#060606] font-semibold">
          <FaLuggageCart className="absolute ml-48 mt-1" />
          Enciende tus luces
        </h1>
        <div className="w-full flex flex-col max-w-[550px]">
          <div className="w-full flex flex-col mb-2">
            <h3 className="text-3xl font-semibold mb-2">Iniciar Sesión</h3>

            <p className="text-sm mb-3">Bienvenido al Sistema de CarWash</p>
          </div>
          <div className="w-full flex flex-col">
            <MdEmail className="relative w-10 h-5" />
            <h4 className="absolute ml-10">Usuario</h4>
            <input
              className="w-full text-black py-2 my-4 border-b border-black outline-none focus:outline-none p-4 bg-trasnparent"
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ingrese Usuario"
            />
          </div>
          <div className="w-full flex flex-col mt-3">
            <input
              type="password"
              className="w-full text-black py-2 my-4 border-b border-black outline-none focus:outline-none p-4 bg-trasnparent"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingrese Contraseña"
            />
            <RiLockPasswordFill className="absolute w-10 h-5" />
            <h4 className="absolute ml-10">Contraseña</h4>
          </div>
          <div className="w-full flex flex-col my-4">
            <button
              type="button"
              onClick={handleLogin}
              className="w-full md:w-auto bg-[#060606] text-white font-semibold rounded-md p-4 text-center my-2 md:mx-2 flex items-center justify-center"            >
              Acceder
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
export default Login;
