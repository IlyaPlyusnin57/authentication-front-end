import "./form-input.scss";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import CheckIcon from "@mui/icons-material/Check";
import ErrorIcon from "@mui/icons-material/Error";
import CircularProgress from "@mui/material/CircularProgress";

function FormInput(props) {
  const { label, errorMessage, value, ...inputProps } = props;
  const [lostFocus, setLostFocus] = useState(false);
  const [usernameError, setUsernameError] = useState("");
  const input = document.querySelector(".my-input");

  useEffect(() => {
    if (props.name === "username") {
      input?.setCustomValidity(usernameError);
    }
  });

  useEffect(() => {
    if (props.name === "username") {
      refetch();
    }
  }, [value]);

  const { status, data, refetch } = useQuery({
    queryKey: ["username"],
    queryFn: checkUsername,
    enabled: false,
  });

  if (props.name === "username") {
    // console.log(data);
    // console.dir(input);
  }

  async function checkUsername() {
    const res = await axios.post(`/auth/checkUsername`, {
      name: input?.value,
    });
    return res.data;
  }

  function handleFocus() {
    setLostFocus(true);
  }

  function ShowIcon() {
    if (status === "loading") {
      return <CircularProgress className="progress-icon" />;
    } else if (status === "success") {
      if (data) {
        return <ErrorIcon className="error-icon" />;
      } else {
        return <CheckIcon className="check-icon" />;
      }
    }
  }

  function UsernameError() {
    if (props.name === "username" && input?.validity.customError) {
      return <span className="error">{input?.validationMessage}</span>;
    }
  }

  return (
    <>
      <div className="form-input-container">
        <label>{label}: </label>
        <input
          className="my-input"
          {...inputProps}
          onChange={props.onChange}
          onBlur={handleFocus}
          lostfocus={lostFocus.toString()}
          onFocus={() => {
            inputProps.name === "confirmPassword" && setLostFocus(true);
          }}
        />
        {props.name === "username" && <ShowIcon />}
      </div>
      <div className="error-container">
        <span className="error-message">{errorMessage}</span>
        <UsernameError />
      </div>
    </>
  );
}

export default FormInput;
