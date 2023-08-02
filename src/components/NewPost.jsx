import "./new-post.scss";
import { useRef } from "react";
import { ApiCalls } from "../api/ApiCalls";
import { useAuth } from "../context/AuthContext";

function NewPost({ setPosts, userInfo: { user } }) {
  const postText = useRef(null);
  const { setUserInfo } = useAuth();

  // async function createPost() {
  //   try {
  //     const { data: post } = await axios.post(
  //       "posts/post",
  //       {
  //         userId: user._id,
  //         text: postText.current.value,
  //       },
  //       {
  //         headers: { authorization: `Bearer ${user.accessToken}` },
  //       }
  //     );
  //     setPosts((prev) => [...prev, post]);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  function handleOnKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      //apiCalls.createPost(postText, setPosts);
    }
  }

  return (
    <div className="post">
      <input
        type="text"
        placeholder="Create a post"
        ref={postText}
        onKeyDown={handleOnKeyDown}
      />
      <button
        type="submit"
        onClick={async () => {
          const post = await ApiCalls.createPost(postText, user);
          setPosts((prev) => [...prev, post]);
        }}
      >
        Create
      </button>
    </div>
  );
}

export default NewPost;
