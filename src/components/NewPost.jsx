import "./new-post.scss";
import { useRef } from "react";
import { ApiCalls } from "../api/ApiCalls";
import useAxiosConfig from "../api/useAxiosConfig";

function NewPost({ setPosts, user }) {
  const postText = useRef(null);
  const api = useAxiosConfig();

  async function createNewPost() {
    const post = await ApiCalls.createPost(api, postText.current.value, user);
    setPosts((prev) => [...prev, post]);
    postText.current.value = "";
  }

  async function handleOnKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      await createNewPost();
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
      <button type="submit" onClick={createNewPost}>
        Create
      </button>
    </div>
  );
}

export default NewPost;
