import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../service/api";
import { useSelector } from "react-redux";

function BlogDetailPage() {
  const token = useSelector((state) => state.auth.token);
  const { id } = useParams();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await api.get(`/posts/${id}`);
        setPost(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" />
        <p className="mt-2">Loading blog...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container py-5 text-center">
        <h4 className="text-danger">Post not found</h4>
      </div>
    );
  }

  return (
    <div className="container py-4">

      {/* TOP ACTION BAR */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <Link to="/posts" className="btn btn-outline-secondary">
          ← Back
        </Link>

        {token && <Link to={`/posts/edit/${post._id}`} className="btn btn-primary">
          ✏️ Edit Post
        </Link>}
      </div>

      {/* HERO IMAGE */}
      <div className="card shadow-sm border-0 mb-4 overflow-hidden">
        <img
          src={post.mainImage}
          alt="main"
          className="w-100"
          style={{
            height: "400px",
            objectFit: "cover",
          }}
        />
      </div>

      {/* CONTENT CARD */}
      <div className="card shadow-sm border-0 p-4">

        {/* TITLE + BADGE */}
        <div className="d-flex justify-content-between align-items-start">
          <h2 className="fw-bold mb-0">{post.title}</h2>

          <span
            className={`badge px-3 py-2 ${
              post.status === "active"
                ? "bg-success"
                : "bg-secondary"
            }`}
          >
            {post.status}
          </span>
        </div>

        <hr />

        {/* DESCRIPTION */}
        <p
          className="text-muted"
          style={{ fontSize: "16px", lineHeight: "1.8" }}
        >
          {post.description}
        </p>

        {/* SUB IMAGES SECTION */}
        <div className="mt-4">
          <h5 className="mb-3 fw-semibold">More Images</h5>

          <div className="row g-3">
            {post.subImages &&
              post.subImages.map((img, index) => (
                <div className="col-6 col-md-3" key={index}>
                  <div className="image-card">
                    <img
                      src={img}
                      alt={`sub-${index}`}
                      className="img-fluid rounded shadow-sm"
                      style={{
                        height: "140px",
                        width: "100%",
                        objectFit: "cover",
                        transition: "0.3s",
                        cursor: "pointer",
                      }}
                      onMouseOver={(e) =>
                        (e.target.style.transform = "scale(1.05)")
                      }
                      onMouseOut={(e) =>
                        (e.target.style.transform = "scale(1)")
                      }
                    />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogDetailPage;