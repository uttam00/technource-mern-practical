import { useState, useEffect } from "react";
import api from "../service/api";
import { useNavigate, useParams } from "react-router-dom";

function BlogForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    mainImage: "",
    subImages: ["", "", "", ""],
    status: "active",
  });

  const [errors, setErrors] = useState({
    title: "",
    description: "",
    mainImage: "",
    subImages: "",
  });

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await api.get(`/posts/${id}`);
        const data = res.data;

        console.log("EDIT DATA:", data); // 🔥 debug

        setFormData({
          title: data.title || "",
          description: data.description || "",
          mainImage: data.mainImage || "",
          subImages: Array.isArray(data.subImages)
            ? data.subImages
            : ["", "", "", ""],
          status: data.status || "active",
        });
      } catch (err) {
        console.log("Error loading post:", err);
      }
    };

    if (id) fetchPost();
  }, [id]);

  const validateField = (name, value) => {
    if (name === "title") {
      return value.trim() ? "" : "Title is required";
    }

    if (name === "description") {
      return value.trim() ? "" : "Description is required";
    }

    if (name === "mainImage") {
      return value.trim() ? "" : "Main image is required";
    }

    return "";
  };

  const validateSubImages = (images) => {
    if (images.some((img) => !img.trim())) {
      return "All 4 sub images are required";
    }
    return "";
  };

  const validateForm = () => {
    const newErrors = {
      title: validateField("title", formData.title),
      description: validateField("description", formData.description),
      mainImage: validateField("mainImage", formData.mainImage),
      subImages: validateSubImages(formData.subImages),
    };

    setErrors(newErrors);

    return Object.values(newErrors).every((err) => err === "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      if (isEdit) {
        await api.put(`/posts/${id}`, formData);
      } else {
        await api.post("/posts", formData);
      }

      navigate("/posts");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container mt-4">
      <h2>{isEdit ? "Edit Blog" : "Create Blog"}</h2>

      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-1"
          placeholder="Title"
          value={formData.title}
          onChange={(e) => {
            const value = e.target.value;

            setFormData({ ...formData, title: value });
            setErrors({
              ...errors,
              title: validateField("title", value),
            });
          }}
        />
        {errors.title && <small className="text-danger">{errors.title}</small>}

        <textarea
          className="form-control mb-1"
          placeholder="Description"
          value={formData.description}
          onChange={(e) => {
            const value = e.target.value;

            setFormData({ ...formData, description: value });

            setErrors({
              ...errors,
              description: validateField("description", value),
            });
          }}
        />
        {errors.description && (
          <small className="text-danger">{errors.description}</small>
        )}

        {/* MAIN IMAGE */}
        <input
          className="form-control mb-1"
          placeholder="Main Image"
          value={formData.mainImage}
          onChange={(e) => {
            const value = e.target.value;

            setFormData({ ...formData, mainImage: value });

            setErrors({
              ...errors,
              mainImage: validateField("mainImage", value),
            });
          }}
        />
        {errors.mainImage && (
          <small className="text-danger">{errors.mainImage}</small>
        )}

        {/* SUB IMAGES */}
        {formData.subImages.map((img, i) => (
          <input
            key={i}
            className="form-control mb-1"
            placeholder={`Sub Image ${i + 1}`}
            value={img}
            onChange={(e) => {
              const updated = [...formData.subImages];
              updated[i] = e.target.value;

              setFormData({
                ...formData,
                subImages: updated,
              });

              setErrors({
                ...errors,
                subImages: validateSubImages(updated),
              });
            }}
          />
        ))}

        {errors.subImages && (
          <small className="text-danger">{errors.subImages}</small>
        )}

        {/* STATUS */}
        <select
          className="form-control mb-3"
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        
        <input
          className="form-control mb-3"
          placeholder="Tags (comma separated)"
          value={formData.tags}
          onChange={(e) =>
            setFormData({
              ...formData,
              tags: e.target.value.split(","),
            })
          }
        />

        <div className="d-flex justify-content-between">
          <button className="btn btn-primary w-10">
            {isEdit ? "Update Blog" : "Create Blog"}
          </button>
          <button
            className="btn btn-outline-secondary w-10"
            onClick={() => navigate("/posts")}
          >
            ← Back
          </button>
        </div>
      </form>
    </div>
  );
}

export default BlogForm;
