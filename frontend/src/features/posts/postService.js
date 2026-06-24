import api from "../../services/api";

const getPosts = async () => {
  const response = await api.get("/posts");

  return response.data;
};

const getPost = async (id) => {
  const response = await api.get(
    `/posts/${id}`
  );

  return response.data;
};

const createPost = async (postData) => {
  const response = await api.post(
    "/posts",
    postData
  );

  return response.data;
};

const updatePost = async (
  id,
  postData
) => {
  const response = await api.put(
    `/posts/${id}`,
    postData
  );

  return response.data;
};

const deletePost = async (id) => {
  const response = await api.delete(
    `/posts/${id}`
  );

  return response.data;
};

const postService = {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
};

export default postService;