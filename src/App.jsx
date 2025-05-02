import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useMainContext } from "./hooks/useMainContext";
import Home from "./pages/Home";
import MainLayout from "./layout/MainLayout";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Friends from "./pages/Friends";

const App = () => {
  const { token } = useMainContext();
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="friends" element={!token ? <Login /> : <Friends />} />
          <Route
            path="profile/:id"
            element={!token ? <Login /> : <Profile />}
          />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
