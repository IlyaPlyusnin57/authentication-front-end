import axios from "axios";

// class ApiCalls {
//   #user = null;
//   #instance = null;

//   constructor(user, setUserInfo) {
//     this.#user = user;

//     this.#instance = axios.create({
//       baseURL: "http://localhost:5000/api/",
//       headers: { authorization: `Bearer ${user.accessToken}` },
//       withCredentials: true,
//     });

//     this.#instance.interceptors.request.use(
//       async (config) => {
//         if (isExpired(user.accessToken)) {
//           const token = await this.refreshToken();
//           setUserInfo({
//             authed: true,
//             user: { ...user, accessToken: token.accessToken },
//           });
//           config.headers["authorization"] = `Bearer ${token.accessToken}`;
//         }

//         return config;
//       },
//       (error) => {
//         return Promise.reject(error);
//       }
//     );
//   }

//   async refreshToken() {
//     try {
//       const res = await axios.post("auth/refresh");
//       return res.data;
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   async getPosts() {
//     try {
//       const res = await this.#instance.get(`posts/find/${this.#user._id}`);
//       return res.data;
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   async handleDelete(post) {
//     try {
//       const res = await this.#instance.delete(`posts/delete/${post._id}`, {
//         data: { userId: this.#user._id },
//       });

//       return res.data;
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   async createPost(postText) {
//     try {
//       const { data: post } = await this.#instance.post("posts/post", {
//         userId: this.#user._id,
//         text: postText.current.value,
//       });
//       return post;
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   async logout() {
//     try {
//       console.log("logout ran");
//       const res = await this.#instance.get(`auth/logout/${this.#user._id}`);
//       return res.data;
//     } catch (error) {
//       console.log(error);
//     }
//   }
// }

class ApiCalls {
  static async getPosts(api, user) {
    try {
      const res = await api.get(`posts/find/${user._id}`);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }

  static async handleDelete(api, post, user) {
    try {
      const res = await api.delete(`posts/delete/${post._id}`, {
        data: { userId: user._id },
      });

      return res;
    } catch (error) {
      console.log(error);
    }
  }

  static async createPost(api, text, user) {
    try {
      const { data: post } = await api.post("posts/post", {
        userId: user._id,
        text,
      });
      return post;
    } catch (error) {
      console.log(error);
    }
  }

  static async logout(user, setUserInfo) {
    try {
      setUserInfo({
        authed: false,
        user: null,
      });
      sessionStorage.removeItem("accessToken");
      await axios.get(`auth/logout/${user._id}`);
    } catch (error) {
      console.log(error);
    }
  }
}

export { ApiCalls };
