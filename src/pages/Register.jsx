import { useMainAxios } from "../hooks/useMainAxios";
import { useMainContext } from "../hooks/useMainContext";
import { RegisterVal } from "../validation/vaildation";
import { Alert } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { LoadingSpinner } from "../components/LoadingSpinner";

const Register = () => {
  const axios = useMainAxios();
  const navigate = useNavigate();

  const { user, loading, setLoading, setUser, errors, setErrors } =
    useMainContext();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const RegisterUser = async (e) => {
    e.preventDefault();

    const result = RegisterVal.safeParse(user);
    if (!result.success || user.password !== user.confirmPassword) {
      const errors = {};

      if (!result.success) {
        result.error.errors.forEach((err) => {
          if (err.path[0]) {
            errors[err.path[0]] = err.message;
          }
        });
      }

      setErrors(errors);
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post("/api/Authentication/Register", user);
      setUser(res.data);
      console.log(res.data);
      navigate("/login");
    } catch (err) {
      alert(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-96px)] bg-gray-100">
      <div className="bg-white p-8 m-5 rounded-2xl shadow-lg w-full max-w-3xl">
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">
          Create an Account
        </h2>

        {/* عرض الأخطاء */}
        {Object.keys(errors).length > 0 && (
          <Alert color="red" title="Validation Errors" className="mb-5">
            <ul className="list-disc list-inside">
              {Object.entries(errors).map(([key, message]) => (
                <li key={key}>{message}</li>
              ))}
            </ul>
          </Alert>
        )}

        <form className="space-y-5" onSubmit={RegisterUser}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* First Name */}
            <div>
              <label className="block mb-1 text-gray-600">First Name</label>
              <input
                type="text"
                name="firstName"
                value={user.firstName}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your first name"
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="block mb-1 text-gray-600">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={user.lastName}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your last name"
              />
            </div>

            {/* Username */}
            <div>
              <label className="block mb-1 text-gray-600">Username</label>
              <input
                type="text"
                name="username"
                value={user.username}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your username"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block mb-1 text-gray-600">Email</label>
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your email"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block mb-1 text-gray-600">Password</label>
              <input
                type="tel"
                name="password"
                value={user.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Create a password"
              />
            </div>

            {/* confirmPassword */}
            <div>
              <label className="block mb-1 text-gray-600">
                ConfirmPassword
              </label>
              <input
                type="tel"
                name="confirmPassword"
                value={user.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Create a password"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            disabled={loading}
          >
            {loading ? <LoadingSpinner /> : <span>Register</span>}
          </button>
        </form>

        <p className="mt-5 text-center text-gray-600 text-sm">
          Already have an account{" "}
          <a
            href="/login"
            className="text-blue-600 font-medium hover:underline"
          >
            {" / "}
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
