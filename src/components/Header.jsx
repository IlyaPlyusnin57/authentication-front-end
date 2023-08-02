import "./header.scss";

function Header({ userInfo }) {
  return <div className="user-header">Welcome {userInfo.user.username}</div>;
}

export default Header;
