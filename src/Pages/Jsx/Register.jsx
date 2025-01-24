import { useState } from "react";
import "../Styles/Login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faLock,
  faEnvelope,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { PageRoutes } from "../../Scripts/Const";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import API from "../../Scripts/API";
import { enqueueSnackbar } from "notistack";
import { useAuth } from "../../Context";
import PasswordInput from "../../Components/Jsx/PasswordInput";
function Register() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { set_user_info } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    confirm_password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const { mutate: registrationPost, isLoading } = useMutation({
    mutationKey: ["registrationPost"],
    mutationFn: (formData) =>
      API.registerUser(formData.name, formData.email, formData.password),
    onSuccess: async (data) => {
      if (data["error"]) {
        enqueueSnackbar(data["error"], { variant: "error" });
        return;
      }
      const user_info = data["user_info"];
      sessionStorage.setItem("__user__", JSON.stringify(user_info));
      queryClient.setQueryData(["user_info"], user_info);
      set_user_info(user_info);
      enqueueSnackbar("Registration Successful", { variant: "success" });
      navigate(PageRoutes.Landing);
    },
    onError: (error, data) => {
      enqueueSnackbar("Registration Failed : " + error, {
        variant: "error",
      });
      console.log(error);
      console.log(data);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirm_password) {
      enqueueSnackbar("Passwords do not match", { variant: "error" });
      return;
    }
    registrationPost(formData);
  };

  return (
    <div className="page flex login-page">
      <div alt="" className="bg-image image-right"></div>
      <div alt="" className="bg-image image-left"></div>

      <div className="login-box">
        <div className="mascot-1"></div>
        <FontAwesomeIcon
          icon={faXmark}
          className="cross-button"
          onClick={() => navigate(PageRoutes.Landing)}
        />
        <div className="title">
          Welcome to{" "}
          <span
            className="link-like title"
            onClick={() => enqueueSnackbar("Login first", { variant: "info" })}
          >
            Pass Hona Hai
          </span>
        </div>
        <form className="login-form flex" onSubmit={handleSubmit}>
          <label htmlFor="name">
            Name &nbsp;
            <FontAwesomeIcon
              icon={faUser}
              style={{ color: "var(--primary-color)" }}
            />
          </label>
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            name="name"
            onChange={handleChange}
            maxLength={255}
            minLength={5}
            required
          />
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
            Password&nbsp;
            <FontAwesomeIcon
              icon={faLock}
              style={{ color: "var(--primary-color)" }}
            />
            &nbsp;
          </label>
          <PasswordInput
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            handleChange={handleChange}
            name="password"
            formData={formData.confirm_password}
          />
          <label htmlFor="password">
            Confirm Password&nbsp;
            <FontAwesomeIcon
              icon={faLock}
              style={{ color: "var(--primary-color)" }}
            />
            &nbsp;
          </label>
          <PasswordInput
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            handleChange={handleChange}
            name="confirm_password"
            formData={formData.confirm_password}
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Loading..." : "Register"}
          </button>
          <p className="caption">
            Already have an account? &nbsp;
            <Link className="link-like" to={PageRoutes.Login}>
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
