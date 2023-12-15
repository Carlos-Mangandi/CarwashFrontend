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
    <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
      <div className="md:w-1/3 max-w-sm">
        <img
          src="https://image.shutterstock.com/image-vector/cartoon-car-wash-logo-perfect-260nw-1689808834.jpg"
          alt="Sample image"
        />
      </div>

      <div className="md:w-1/3 max-w-sm">
        <div className="text-center md:text-left"></div>
        <div className="my-5 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
          <p className="mx-4 mb-0 text-center font-semibold text-slate-500">
            Login
          </p>
        </div>

        <input
          className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleLogin()}
          placeholder="email"
        />

        <input
          className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleLogin()}
          placeholder="password"
        />

        <div className="text-center md:text-left flex justify-center mt-3">
          <button
            type="button"
            onClick={handleLogin}
            className="px-6 py-3.5 text-base font-medium text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </div>
      </div>

      <ToastContainer />
    </section>
  );
}

export default Login;
