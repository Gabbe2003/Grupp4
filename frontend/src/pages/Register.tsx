import { useState } from 'react';
import axios from 'axios';
import '../scss/register.scss';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

interface IUser {
  id: string;
  username: string;
  email: string;
}

interface IRegisterUserForm {
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
}

export const Register = () => {
  const [user, setUser] = useState<IUser | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [passwordShown, setPasswordShown] = useState(false);
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);
  const [registerForm, setRegisterForm] = useState<IRegisterUserForm>({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordShown(!confirmPasswordShown);
  };

  const createUser = async () => {
    if (registerForm.password !== registerForm.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    if (!registerForm.username || !registerForm.email || !registerForm.password) {
      setError("Please fill in all fields.");
      return;
    }
    try {
      const url = 'http://localhost:9000/registerUser';
      const response = await axios.post(url, registerForm);
      if (response.status === 201) {
        setUser(response.data);
        setRegisterForm({ username: '', email: '', password: '', confirmPassword: '' });
        alert("Registration successful!");
        navigate('/loginUser');
      } else {
        throw new Error(`Registration failed with status: ${response.status}`);
      }
    } catch (error) {
      setError("Failed to register. Please try again later.");
      console.error(error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterForm(prev => ({
      ...prev,
      [name]: value
    }));
  };
  console.log(user);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createUser();
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="register-form">
        <input type="text" name="username" value={registerForm.username} onChange={handleChange} placeholder="Username" required />
        <input type="email" name="email" value={registerForm.email} onChange={handleChange} placeholder="Email" required />
        
        <div className="password-input">
          <input type={passwordShown ? "text" : "password"} name="password" value={registerForm.password} onChange={handleChange} placeholder="Password" required />
          <button className="btn-toggle" onClick={togglePasswordVisibility} type="button">
            {passwordShown ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        
        <div className="password-input">
          <input type={confirmPasswordShown ? "text" : "password"} name="confirmPassword" value={registerForm.confirmPassword} onChange={handleChange} placeholder="Confirm Password" required />
          <button className="btn-toggle" onClick={toggleConfirmPasswordVisibility} type="button">
            {confirmPasswordShown ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        
        <button type="submit">Register</button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};
