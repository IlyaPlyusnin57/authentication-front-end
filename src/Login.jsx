import "./components/form-input.scss";
import "./login.scss";

import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

function Login() {
  const { register, handleSubmit } = useForm({
    mode: "onChange",
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const [error, setError] = useState(null);
  const { setUserInfo } = useAuth();
  const navigate = useNavigate();

  async function login(data) {
    try {
      const res = await axios.post("/auth/login", {
        ...data,
      });

      console.log({ loginData: res.data });

      setUserInfo({
        authed: true,
        user: res.data,
      });

      navigate("/home");
    } catch (error) {
      setError(error?.response?.data);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit(login)}>
        <div className="form-input-container">
          <input
            type="text"
            name="username"
            placeholder="Userame"
            {...register("username")}
          />
        </div>
        <div className="form-input-container">
          <input
            type="text"
            name="password"
            placeholder="Password"
            {...register("password")}
          />
        </div>
        <button type="submit">Login</button>

        <div className="server-error">{error}</div>
      </form>
    </div>
  );
}

export default Login;
