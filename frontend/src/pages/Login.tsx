import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../scss/login.scss";
import GoogleLoginComponent from "../components/GoogleLoginComponent";
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

  useEffect(() => {
    const checkUserLogin = async () => {
      if (cookies.user) {
        navigate("/");
      }
    };

    checkUserLogin();
  }, [cookies.user, navigate]);

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

  const handleLogin = async (userData: ILoginForm) => {
    try {
      const url = "http://localhost:9000/loginUser";
      const response = await axios.post(url, userData);
      if (response.status === 200) {
        const user = response.data.foundUser;
        setCookies("user", user, { path: "/" });
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/");
      }
    } catch (error: any) {
      console.error(error);
      setError("Failed to login. Please check your credentials and try again.");
    }
  };
  const handleGoogleLoginSuccess = async (response: any) => {
    console.log("Google login response:", response);
    if (response.credential) {
      const tokenId = response.credential;
      try {
        const url = "http://localhost:9000/google-login";
        const responseFromServer = await axios.post(url, { tokenId });
        console.log("Server response:", responseFromServer);
        if (responseFromServer.status === 200) {
          const { token } = responseFromServer.data;
          localStorage.setItem("token", token);
          navigate("/");
        }
      } catch (error) {
        console.error("Google login failed:", error);
        setError("Failed to login with Google.");
      }
    } else {
      setError("Google login failed: No credential received.");
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleLogin(loginForm);
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
            <GoogleLoginComponent
              onSuccess={handleGoogleLoginSuccess}
              onFailure={(error) => console.error(error)}
            />
          </div>
        </form>
        {error && <p className="error-message">{error}</p>}
        <a href="/">Back to start</a>
      </div>
    </div>
  );
};
