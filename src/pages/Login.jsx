import { useNavigate } from "react-router-dom";
import { useMainAxios } from "../hooks/useMainAxios";
import { useMainContext } from "../hooks/useMainContext";
import { LoginVal } from "../validation/vaildation";
import { Alert } from "@mantine/core";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { useState } from "react";

const Login = () => {
  const axios = useMainAxios();
  const navigate = useNavigate();
  const [infoLogin, setInfoLogin] = useState({
    email: "",
    password: "",
  });

  const { setToken, errors, loading, setLoading, setUser, setErrors } =
    useMainContext();

  const handleChange = (e) => {
    setInfoLogin((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const LoginUser = async (e) => {
    e.preventDefault();

    const result = LoginVal.safeParse(infoLogin);
    if (!result.success) {
      const errors = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          errors[err.path[0]] = err.message;
        }
      });
      setErrors(errors);
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("/api/Authentication/Login", infoLogin);
      if (res.data && res.data.token) {
        localStorage.setItem("jwtToken", res.data.token);
        setToken(res.data.token);
        setUser(res.data.user);
        navigate("/");
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (err) {
      console.error("Login error:", err);
      const errorMessage =
        err.response?.data?.message || "An error occurred during login";
      setErrors({ auth: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-96px)] bg-gray-100">
      <div className="relative bg-white p-8 m-5 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">
          Welcome Back
        </h2>

        {Object.keys(errors).length > 0 && (
          <Alert color="red" title="Error" className="mb-5">
            <ul className="list-disc list-inside">
              {Object.entries(errors).map(([key, message]) => (
                <li key={key}>{message}</li>
              ))}
            </ul>
          </Alert>
        )}

        <form className="space-y-5" onSubmit={LoginUser}>
          <div>
            <label className="block mb-1 text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              value={infoLogin.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-600">Password</label>
            <input
              type="password"
              name="password"
              value={infoLogin.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-3"
            disabled={loading}
          >
            {loading ? <LoadingSpinner /> : <span>Login</span>}
          </button>
        </form>

        <p className="mt-5 text-center text-gray-600 text-sm">
          Don't have an account?
          <a
            href="/register"
            className="text-blue-600 font-medium hover:underline"
          >
            {" / "}
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
