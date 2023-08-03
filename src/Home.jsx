import { useAuth } from "./context/AuthContext";
import Header from "./components/Header";
import Navbar from "./Navbar";
import Posts from "./Posts";

function Home() {
  const { userInfo } = useAuth();

  return (
    <div>
      <Navbar />
      <Header userInfo={userInfo} />
      <Posts />
    </div>
  );
}

export default Home;
