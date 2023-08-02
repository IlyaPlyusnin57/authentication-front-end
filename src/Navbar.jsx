import React from "react";
import "./navbar.scss";

import { ApiCalls } from "./api/ApiCalls";
import { useAuth } from "./context/AuthContext";

function Navbar() {
  const {
    userInfo: { user },
    setUserInfo,
  } = useAuth();

  return (
    <div className="navbar">
      <ul>
        <li
          onClick={async () => {
            console.log({ useriS: user });
            const res = await ApiCalls.logout(user);

            if (res === "success") {
              console.log("success");
              setUserInfo({
                authed: false,
                user: null,
              });
            }
          }}
        >
          Logout
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
