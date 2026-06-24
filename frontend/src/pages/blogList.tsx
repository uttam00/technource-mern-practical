import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import api from "../service/api";
import { setPosts } from "../features/posts/postSlice";
import BlogCard from "../components/blogCard";

interface Post {
  _id: string;
  mainImage: string;
  title: string;
  description: string;
  status: string;
  tags?: string[];
}

interface RootState {
  auth: {
    token: string;
  };
  posts: {
    posts: Post[];
  };
}

function BlogList() {
  const dispatch = useDispatch();

  const token = useSelector((state: RootState) => state.auth.token);
  const posts = useSelector((state: RootState) => state.posts.posts);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [tag, setTag] = useState("");

  const loadPosts = async () => {
    try {
      const res = await api.get(
        `/posts?search=${search}&page=${page}&tag=${tag}`
      );

      dispatch(setPosts(res.data.posts));
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.error("Failed to load posts:", error);
    }
  };

  useEffect(() => {
    loadPosts();
  }, [search, page, tag]);

  // ======================
  // DELETE POST
  // ======================
  const deletePost = async (id: string) => {
    try {
      await api.delete(`/posts/${id}`);
      loadPosts();
    } catch (error) {
      console.error("Failed to delete post:", error);
    }
  };

  return (
    <div className="container py-4">

      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">📝 Blog Posts</h2>

        {token && (
          <Link to="/posts/new" className="btn btn-success">
            + Create Blog
          </Link>
        )}
      </div>

      {/* SEARCH */}
      <div className="row mb-3">
        <div className="col-md-6 w-100">
          <input
            className="form-control"
            placeholder="Search blogs..."
            value={search}
            onChange={(e) => {
              setPage(1);
              setSearch(e.target.value);
            }}
          />
        </div>
      </div>

      {/* TAG FILTER */}
      <div className="mb-3 d-flex gap-2 flex-wrap">
        {["tech", "life", "travel", "news"].map((t) => (
          <button
            key={t}
            className={`btn btn-sm ${
              tag === t ? "btn-primary" : "btn-outline-primary"
            }`}
            onClick={() => {
              setTag(tag === t ? "" : t);
              setPage(1);
            }}
          >
            #{t}
          </button>
        ))}
      </div>

      {/* BLOG GRID */}
      <div className="row g-4">
        {posts.map((post) => (
          <div key={post._id} className="col-md-4">
            <BlogCard
              post={post}
              token={token}
              onDelete={deletePost}
            />
          </div>
        ))}
      </div>

      {/* EMPTY STATE */}
      {posts.length === 0 && (
        <div className="text-center py-5">
          <h4 className="text-muted">No blogs found 💤</h4>
          <p className="text-muted">
            Try changing search or filters
          </p>
        </div>
      )}

      {/* PAGINATION */}
      <div className="d-flex justify-content-center mt-4 gap-2">
        <button
          className="btn btn-outline-secondary"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>

        <span className="align-self-center">
          Page {page} of {totalPages}
        </span>

        <button
          className="btn btn-outline-secondary"
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>

    </div>
  );
}

export default BlogList;