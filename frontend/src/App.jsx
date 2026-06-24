import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/login";
import BlogList from "./pages/blogList";
import BlogForm from "./pages/blogForm";
import ProtectedRoute from "./components/protectedRoute";
import Navbar from "./components/navbar";
import BlogDetailPage from "./pages/blogDetail";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* DEFAULT ROUTE → BLOG LIST */}
        <Route path="/" element={<Navigate to="/posts" />} />

        {/* PUBLIC ROUTE */}
        <Route path="/posts" element={<BlogList />} />

        {/* LOGIN */}
        <Route path="/login" element={<Login />} />

        {/* PROTECTED ROUTES */}
        <Route
          path="/posts/new"
          element={
            <ProtectedRoute>
              <BlogForm />
            </ProtectedRoute>
          }
        />

        <Route
          path="/posts/edit/:id"
          element={
            <ProtectedRoute>
              <BlogForm />
            </ProtectedRoute>
          }
        />

        <Route path="/posts/:id" element={<BlogDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
