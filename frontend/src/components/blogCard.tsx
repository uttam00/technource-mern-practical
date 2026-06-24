import { Link } from "react-router-dom";

interface Post {
  _id: string;
  title: string;
  description: string;
  mainImage: string;
  status: string;
  tags?: string[];
}

interface Props {
  post: Post;
  token: string;
  onDelete: (id: string) => void;
}

function BlogCard({ post, token, onDelete }: Props) {
  return (
    <div
      className="card h-100 shadow-sm border-0 blog-card"
      style={{
        borderRadius: "12px",
        overflow: "hidden",
        transition: "0.3s",
      }}
    >
      {/* IMAGE */}
      <div style={{ overflow: "hidden" }}>
        <img
          src={post.mainImage}
          className="card-img-top"
          alt='card-img'
          style={{
            height: "200px",
            objectFit: "cover",
            transition: "0.3s",
          }}
        />
      </div>

      {/* BODY */}
      <div className="card-body d-flex flex-column">
        <h5 className="fw-bold">{post.title}</h5>

        <p className="text-muted" style={{ fontSize: "14px" }}>
          {post.description.length > 80
            ? post.description.substring(0, 80) + "..."
            : post.description}
        </p>

        {/* ⭐ TAGS SECTION */}
        <div className="mb-2 d-flex gap-1 flex-wrap">
          {post.tags?.map((tag, i) => (
            <span key={i} className="badge bg-info text-dark">
              #{tag}
            </span>
          ))}
        </div>

        {/* STATUS */}
        <span
          className={`badge mb-2 ${
            post.status === "active"
              ? "bg-success"
              : "bg-secondary"
          }`}
        >
          {post.status}
        </span>

        {/* ACTIONS */}
        <div className="mt-auto d-flex gap-2 flex-wrap">

          <Link
            to={`/posts/${post._id}`}
            className="btn btn-outline-info btn-sm w-100"
          >
            View
          </Link>

          {token && (
            <div className="d-flex gap-2 w-100">

              <Link
                to={`/posts/edit/${post._id}`}
                className="btn btn-warning btn-sm w-100"
              >
                Edit
              </Link>

              <button
                onClick={() => onDelete(post._id)}
                className="btn btn-danger btn-sm w-100"
              >
                Delete
              </button>

            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BlogCard;