import { useAuth } from "./context/AuthContext";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import Post from "./Post";
import NewPost from "./components/NewPost";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { ApiCalls } from "./api/ApiCalls";
import axiosConfig from "./api/axiosConfig";
import axios from "axios";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [parent] = useAutoAnimate();

  const { userInfo, setUserInfo } = useAuth();

  useEffect(() => {
    const interceptor = axiosConfig(userInfo.user, setUserInfo);
    return () => axios.interceptors.request.eject(interceptor);
  }, [userInfo.user]);

  const { status, error } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const posts = await ApiCalls.getPosts(userInfo.user);
      setPosts(posts);
      return posts;
    },
  });

  if (status === "loading") {
    return <span>Loading...</span>;
  }

  if (status === "error") {
    return <span>Error: {error.message}</span>;
  }

  return (
    <>
      <NewPost userInfo={userInfo} setPosts={setPosts} />
      <div ref={parent}>
        {posts.map((post) => {
          return <Post key={post._id} post={post} setPosts={setPosts} />;
        })}
      </div>
    </>
  );
}

export default Posts;
