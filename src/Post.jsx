import DeleteIcon from "@mui/icons-material/Delete";
import { useAuth } from "./context/AuthContext";
import { ApiCalls } from "./api/ApiCalls";

function Post({ post, setPosts }) {
  const {
    userInfo: { user },
  } = useAuth();

  // async function handleDelete() {
  //   try {
  //     const res = await axios.delete(`posts/delete/${post._id}`, {
  //       data: { userId: user._id },
  //       headers: { authorization: `Bearer ${user.accessToken}` },
  //     });

  //     if (res.data) {
  //       setPosts((prev) => prev.filter((p) => p._id !== post._id));
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  return (
    <div className="post">
      <div className="delete-icon-container">
        <DeleteIcon
          className="delete-icon"
          onClick={() => {
            const data = ApiCalls.handleDelete(post, user);

            if (data) {
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
