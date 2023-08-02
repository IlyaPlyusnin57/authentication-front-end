import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import axios from "axios";
import Input from "./components/Input";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

function Form() {
  const navigate = useNavigate();
  const { setUserInfo } = useAuth();

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      username: "",
      firstname: "",
      lastname: "",
      password: "",
      email: "",
    },
  });

  async function sendData(data) {
    const res = await axios.post("/auth/register", data);

    if (res.status === 200) {
      setUserInfo({
        authed: true,
        user: res.data,
      });

      navigate("/home");
    }
  }

  let inputs = [
    {
      id: 1,
      label: "Username",
      name: "username",
      type: "text",
      validations: {
        required: {
          value: true,
          message: "Username is required",
        },
        minLength: {
          value: 3,
          message: "Username should be at least 3 characters long",
        },
        maxLength: {
          value: 20,
          message: "Username should not exceed 20 characters",
        },
        validate: async (value) => {
          const res = await axios.post("/auth/checkUsername", {
            name: value,
          });
          return !res.data || "Username exists in the db";
        },
      },
    },
    {
      id: 2,
      label: "First name",
      name: "firstname",
      type: "text",
      validations: {
        required: {
          value: true,
          message: "First name is required",
        },
      },
    },
    {
      id: 3,
      label: "Last name",
      name: "lastname",
      type: "text",
      validations: {
        required: {
          value: true,
          message: "Last name is required",
        },
      },
    },
    {
      id: 4,
      label: "Email",
      name: "email",
      type: "email",
      validations: {
        required: {
          value: true,
          message: "Email is required",
        },
        pattern: {
          value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
          message: "Not a valid email",
        },
      },
    },
    {
      id: 5,
      label: "Password",
      name: "password",
      type: "text",
      validations: {
        required: {
          value: true,
          message: "Password is required",
        },
        pattern: {
          value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
          message:
            "Minimum eight characters, at least one letter and one number",
        },
      },
    },
    {
      id: 6,
      label: "Confirm Password",
      name: "confirmpassword",
      type: "text",
      validations: {
        required: {
          value: true,
          message: "Confirming password is required",
        },
        pattern: {
          value: new RegExp(getValues("password")),
          message: "Passwords do not match",
        },
      },
    },
  ];

  return (
    <div>
      <form onSubmit={handleSubmit(sendData)}>
        {inputs.map((input) => {
          return (
            <Input
              key={input.id}
              {...input}
              register={register}
              errors={errors}
            />
          );
        })}

        <button type="submit" formNoValidate>
          Submit
        </button>
      </form>
      {/* <DevTool control={control} /> set up the dev tool */}
    </div>
  );
}

export default Form;
