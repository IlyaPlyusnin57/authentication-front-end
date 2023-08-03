import "./input.scss";

import CheckIcon from "@mui/icons-material/Check";
import ErrorIcon from "@mui/icons-material/Error";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

function ShowUsernameStatus({ name, errors }) {
  if (name === "username") {
    return errors?.["username"] ? (
      <ErrorIcon className="username-status error-icon" />
    ) : (
      <CheckIcon className="username-status check-icon" />
    );
  }
}

function Input(props) {
  const { label, name, validations, register, errors, type } = props;

  function ShowError({ name }) {
    if (errors[name]) {
      return <p className="error-message">{errors[name]?.message}</p>;
    }
  }

  return (
    <>
      <div className="input-container">
        <input
          type={type}
          placeholder={label}
          {...register(name, validations)}
          className={errors?.[name] && "error-border"}
        />
        <ShowUsernameStatus {...{ name, errors }} />
      </div>
      <ShowError name={name} />
    </>
  );
}

export default Input;
