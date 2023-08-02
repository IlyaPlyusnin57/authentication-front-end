import "./input.scss";

import CheckIcon from "@mui/icons-material/Check";
import ErrorIcon from "@mui/icons-material/Error";

function Input(props) {
  const { label, name, validations, register, errors, type } = props;

  function ShowError({ name }) {
    if (errors[name]) {
      return <p className="error-message">{errors[name]?.message}</p>;
    }
  }

  function ShowUsernameStatus() {
    if (name === "username") {
      return errors?.["username"] ? (
        <ErrorIcon className="username-status error-icon" />
      ) : (
        <CheckIcon className="username-status check-icon" />
      );
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
        <ShowUsernameStatus />
      </div>
      <ShowError name={name} />
    </>
  );
}

export default Input;
