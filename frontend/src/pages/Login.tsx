import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../scss/login.scss";
import GoogleLoginComponent from "../components/GoogleLogin";
import { useCookies } from "react-cookie";

interface ILoginForm {
  identifier: string;
  password: string;
}

export const Login = () => {
  const [loginForm, setLoginForm] = useState<ILoginForm>({
    identifier: "",
    password: "",
  });
  const [passwordShown, setPasswordShown] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cookies, setCookies] = useCookies();
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (cookies) {
      try {
        const url = "http://localhost:9000/loginUser";
        const response = await axios.post(url, loginForm);
        if (response.status === 200) {
          const user = response.data.foundUser;
          setCookies("user", user, { path: "/" });
          navigate("/");
        }
      } catch (error: any) {
        console.error(error);
        setError(
          "Failed to login. Please check your credentials and try again."
        );
      }
    }
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleGoogleLoginSuccess = async (googleUser: any) => {
    try {
      const profile = googleUser.getBasicProfile();
      const googleLoginData = {
        identifier: profile.getEmail(),
        password: "",
      };
      const url = "http://localhost:9000/loginUser";
      const response = await axios.post(url, googleLoginData);
      if (response.status === 200) {
        console.log("Google login successful:", response.data);

        console.log(response.data);
        alert("Google Login successful!");
        navigate("/");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      setError("Failed to login with Google.");
    }
  };

  return (
    <div className="login">
      <h1>Logga in</h1>
      <div className="login-container">
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="text"
            name="identifier"
            value={loginForm.identifier}
            onChange={handleChange}
            placeholder="Username or Email"
            required
          />
          <div className="password-input">
            <input
              type={passwordShown ? "text" : "password"}
              name="password"
              value={loginForm.password}
              onChange={handleChange}
              placeholder="Password"
              required
            />
            <button
              className="btn-toggle"
              onClick={togglePasswordVisibility}
              type="button"
            >
              {passwordShown ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <button type="submit">Login</button>
          <div className="google-container">
            <GoogleLoginComponent onSuccess={handleGoogleLoginSuccess} />
          </div>
        </form>
        {error && <p className="error-message">{error}</p>}
        <a href="/">Back to start</a>
      </div>
    </div>
  );
};
