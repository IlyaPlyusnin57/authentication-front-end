import { useAuth } from "./context/AuthContext";
import Header from "./components/Header";
import Navbar from "./Navbar";
import { useEffect } from "react";
import axiosConfig from "./api/axiosConfig";
import axios from "axios";
import Posts from "./Posts";

function Home() {
  const { userInfo, setUserInfo } = useAuth();

  // useEffect(() => {
  //   const interceptor = axiosConfig(userInfo.user, setUserInfo);
  //   return () => axios.interceptors.request.eject(interceptor);
  // }, []);

  return (
    <div>
      <Navbar />
      <Header userInfo={userInfo} />
      <Posts />
    </div>
  );
}

export default Home;
