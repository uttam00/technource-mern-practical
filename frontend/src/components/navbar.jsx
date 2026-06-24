import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector((state) => state.auth.token);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/posts");
  };

  return (
    <nav className="navbar navbar-dark bg-dark px-3">
      <Link className="navbar-brand" to="/posts">
        Blog App
      </Link>

      <div>
        {/* <Link className="btn btn-light me-2" to="/posts">
          Blogs
        </Link> */}

        {token ? (
          <>
            {/* <Link className="btn btn-success me-2" to="/posts/new">
              Create
            </Link> */}

            <button className="btn btn-danger" onClick={handleLogout}>
              Log out
            </button>
          </>
        ) : (
          <Link className="btn btn-primary" to="/login">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;