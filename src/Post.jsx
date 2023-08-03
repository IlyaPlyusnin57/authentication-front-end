import DeleteIcon from "@mui/icons-material/Delete";
import { useAuth } from "./context/AuthContext";
import { ApiCalls } from "./api/ApiCalls";
import useAxiosConfig from "./api/useAxiosConfig";

function Post({ post, setPosts }) {
  const {
    userInfo: { user },
  } = useAuth();

  const api = useAxiosConfig();

  return (
    <div className="post">
      <div className="delete-icon-container">
        <DeleteIcon
          className="delete-icon"
          onClick={async () => {
            const res = await ApiCalls.handleDelete(api, post, user);

            if (res.status === 200) {
              setPosts((prev) => prev.filter((p) => p._id !== post._id));
            }
          }}
        />
      </div>
      {post.text}
    </div>
  );
}

export default Post;
