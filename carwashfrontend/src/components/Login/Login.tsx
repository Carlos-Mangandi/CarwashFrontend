import { useState } from "react";
import { MakeLogin } from "../../store/auth.store";
import { ToastContainer, toast } from "react-toastify";
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
    <div
    className="text-white h-[100vh] flex items-center justify-center bg-cover"
    style={{ backgroundImage: "url(../src/assets/Carwash.jpg)" }}
  >
    <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my- ">
        <div className="bg-trasnparent rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-lg bg-opacity-30 relative">
        <p className="mx-4 mb-0 text-center font-bold text-white">
            Iniciar Sesión
          </p>
        <form action="">
          <div className="relative my-4">
        
            <input
              className="block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-black focus:outline-none focus:ring-0 focus:text-white focus:border-black peer placeholder:text-white font-bold "
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Usuario"
            />

          </div>
          <div className="relative my-4">
            <input
              className="block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-black focus:outline-none focus:ring-0 focus:text-white focus:border-black peer placeholder:text-white font-bold"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              
            />

          </div>
          
        </form>

        <div className="text-center md:text-left flex justify-center mt-3">
          <button
            type="button"
            onClick={handleLogin}
            className="px-6 py-3.5 text-base font-medium text-black inline-flex items-center bg-white hover:bg-white focus:ring-4  focus:ring-black rounded-lg text-center dark:bg-white dark:hover:bg-white dark:focus:ring-white"
          >
            Acceder
          </button>
        </div>
      </div>
      
      <ToastContainer />
    </section>
  </div>
  );
}

export default Login;
