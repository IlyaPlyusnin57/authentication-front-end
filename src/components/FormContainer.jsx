import "./form-container.scss";
import Form from "../Form";
import Login from "../Login";
import { useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function FormContainer() {
  const [register, setRegister] = useState(true);
  const [parent] = useAutoAnimate();
  const { userInfo } = useAuth();

  if (userInfo.authed) {
    return <Navigate to="/home" />;
  }

  return (
    <div className="form-container">
      <div className="btn-container">
        <button
          className={`btn-1 ${register ? "btn-gray" : undefined}`}
          onClick={() => {
            setRegister(true);
          }}
        >
          Register
        </button>
        <button
          className={register ? undefined : "btn-gray"}
          onClick={() => {
            setRegister(false);
          }}
        >
          Login
        </button>
      </div>
      <div ref={parent}>{register ? <Form /> : <Login />}</div>
    </div>
  );
}

export default FormContainer;
