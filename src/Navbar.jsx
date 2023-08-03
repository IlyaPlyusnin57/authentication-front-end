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
            await ApiCalls.logout(user, setUserInfo);
          }}
        >
          Logout
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
