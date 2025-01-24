import { useState } from "react";
import "../Styles/Login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLock,
  faEnvelope,
  faCross,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { PageRoutes } from "../../Scripts/Const";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import API from "../../Scripts/API";
import { enqueueSnackbar } from "notistack";
import { useAuth } from "../../Context";
import PasswordInput from "../../Components/Jsx/PasswordInput";
import NavBar from "../../Components/Jsx/NavBar";

//Database Schema:
// users
// (user_id: INT AUTO_INCREMENT, name: VARCHAR(100), email: VARCHAR(255) UNIQUE, password_hash: VARCHAR(255), created_at: TIMESTAMP DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY(user_id))

// user_profiles
// (user_id: INT, bio: TEXT, profile_picture_url: TEXT, academic_details: TEXT, social_links: JSON, PRIMARY KEY(user_id), FOREIGN KEY(user_id) REFERENCES users(user_id) ON DELETE CASCADE)

function Login() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { set_user_info } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" }); // email and password state, setEmail] = React.useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const { mutate: authenticationFetch, isLoading } = useMutation({
    mutationKey: ["authenticateUser"],
    mutationFn: (formData) =>
      API.authenticateUser(formData.email, formData.password),
    onSuccess: async (data) => {
      if (data["error"]) {
        enqueueSnackbar(data["error"], { variant: "error" });
        return;
      }
      const user_info = data["user_info"];
      sessionStorage.setItem("__user__", JSON.stringify(user_info));
      queryClient.setQueryData(["user_info"], user_info);
      set_user_info(user_info);
      enqueueSnackbar("Login Successful", { variant: "success" });
      navigate(PageRoutes.Landing);
    },
    onError: (error) => {
      enqueueSnackbar("Login Failed due to " + error, { variant: "error" });
      console.log(error);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    authenticationFetch(formData);
  };

  return (
    <div className="page flex login-page">
      <div alt="" className="bg-image image-right"></div>
      <div alt="" className="bg-image image-left"></div>

      <div className="login-box">
        <FontAwesomeIcon
          icon={faXmark}
          className="cross-button"
          onClick={() => navigate(PageRoutes.Landing)}
        />
        <div className="mascot-1"></div>
        <div className="title">
          Login to{" "}
          <span
            className="link-like title"
            onClick={() => enqueueSnackbar("Login first", { variant: "info" })}
          >
            Pass Hona Hai
          </span>
        </div>
        <form className="login-form flex" onSubmit={handleSubmit}>
          <label htmlFor="email">
            Email &nbsp;
            <FontAwesomeIcon
              icon={faEnvelope}
              style={{ color: "var(--primary-color)" }}
            />
          </label>
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            name="email"
            onChange={handleChange}
            maxLength={255}
            minLength={5}
            required
          />
          <label htmlFor="password">
            Password&nbsp;{" "}
            <FontAwesomeIcon
              icon={faLock}
              style={{ color: "var(--primary-color)" }}
            />{" "}
            &nbsp;
          </label>
          <PasswordInput
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            handleChange={handleChange}
            name={"password"}
            formData={formData.password}
          />

          <Link className="link-like" to={PageRoutes.ForgotPassword}>
            Forgot Password?
          </Link>
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Loading..." : "Login"}
          </button>
          <p className="caption">
            Don{"'"}t have an account? &nbsp;
            <Link className="link-like" to={PageRoutes.Register}>
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
