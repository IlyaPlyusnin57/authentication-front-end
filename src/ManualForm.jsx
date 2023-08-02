import { useState } from "react";
import "./manual_form.scss";
import FormInput from "./components/FormInput";

import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

function App() {
  const { register, control, handleSubmit } = useForm({
    mode: "onChange",
  });

  let [values, setValues] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    username: "",
    confirmPassword: "",
  });

  const inputs = [
    {
      id: 1,
      name: "username",
      placeholder: "Username",
      errorMessage: "Username is required",
      label: "Username",
      required: true,
    },
    // {
    //   id: 2,
    //   name: "firstname",
    //   placeholder: "First Name",
    //   errorMessage: "First name should not be empty",
    //   label: "First Name",
    //   pattern: "[A-Za-z0-9]{3,16}",
    //   required: true,
    // },
    // {
    //   id: 3,
    //   name: "lastname",
    //   placeholder: "Last Name",
    //   errorMessage: "Last name should not be empty",
    //   label: "Last Name",
    //   required: true,
    // },
    // {
    //   id: 4,
    //   name: "email",
    //   placeholder: "Email",
    //   errorMessage: "",
    //   label: "Email",
    //   required: true,
    // },
    // {
    //   id: 5,
    //   name: "password",
    //   placeholder: "Password",
    //   errorMessage: "",
    //   label: "Password",
    //   required: true,
    // },
    // {
    //   id: 6,
    //   name: "confirmPassword",
    //   placeholder: "Confirm Password",
    //   errorMessage: "Passwords must match",
    //   label: "Confirm Password",
    //   pattern: values.password,
    //   required: true,
    // },
  ];

  // function handleSubmit(e) {
  //   e.preventDefault();
  //   const data = new FormData(e.target);
  //   console.log(Object.fromEntries(data.entries()));
  // }

  // function onChange(e) {
  //   setValues({ ...values, [e.target.name]: e.target.value });
  // }

  function sendData(data) {
    console.log(data);
  }

  return (
    <div className="form-container">
      <form id="my-form" onSubmit={handleSubmit(sendData)}>
        {inputs.map((input) => {
          return (
            <FormInput
              key={input.id}
              {...input}
              //onChange={onChange}
              value={values[input.name]}
            />
          );
        })}

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default App;
