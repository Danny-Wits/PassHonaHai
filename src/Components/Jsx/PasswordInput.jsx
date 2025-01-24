import React from "react";
import "../Styles/PasswordInput.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
function PasswordInput({
  showPassword,
  setShowPassword,
  handleChange,
  data,
  name,
}) {
  return (
    <div className="password-div">
      <input
        type={showPassword ? "text" : "password"}
        placeholder="Password"
        value={data}
        name={name}
        id="password"
        maxLength={16}
        minLength={6}
        onChange={handleChange}
        required
      />
      <FontAwesomeIcon
        className="eye-icon"
        icon={faEye}
        onClick={() => setShowPassword(!showPassword)}
        style={{ color: showPassword ? "var(--primary-color)" : "gray" }}
      />
    </div>
  );
}

export default PasswordInput;
