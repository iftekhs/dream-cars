import React, { useContext, useState } from 'react';
import { GoogleAuthProvider } from 'firebase/auth';
import { FaGoogle } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Login.css';
import loginImage from '../../images/login.svg';
import { AuthContext } from '../../contexts/AuthProvider';
import setAuthToken from '../../api/auth';
import { cl } from '../../Helpers/Helpers';
import BtnLoader from '../Shared/BtnLoader/BtnLoader';

const Login = () => {
  const { login, providerLogin } = useContext(AuthContext);

  const [error, setError] = useState(null);
  const [btnLoading, setBtnLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  let from = location.state?.from?.pathname || '/';

  const handleLogin = (event) => {
    event.preventDefault();

    setBtnLoading(true);
    setError(null);

    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    login(email, password)
      .then((result) => {
        const user = result.user;
        const currentUser = {
          email: user.email,
        };
        setAuthToken(currentUser)
          .then((data) => {
            if (data.accessToken) {
              navigate(from, { replace: true });
            }
          })
          .catch(console.error)
          .finally(() => {
            setBtnLoading(false);
          });
      })
      .catch((error) => {
        setError(error.message);
        setBtnLoading(false);
      });
  };

  //   Providers
  const googleProvider = new GoogleAuthProvider();

  const handleGoogleSignIn = () => {
    providerLogin(googleProvider)
      .then((result) => {
        const user = result.user;
        saveUser(user.displayName, user.email, 'user');
      })
      .catch(console.error);
  };

  const saveUser = (name, email, type) => {
    const user = { name, email, type };
    const currentUser = {
      email,
    };
    fetch(cl('/users'), {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then(() => {
        setAuthToken(currentUser)
          .then((data) => {
            if (data.accessToken) {
              navigate(from, { replace: true });
            }
          })
          .catch(console.error);
      });
  };

  return (
    <section className="px-2 py-8 bg-clp">
      <div className="flex items-center justify-center">
        <div className="auth flex items-center justify-center px-2">
          <div className="auth-body-container flex bg-white rounded-lg overflow-hidden">
            <div className="bg-gradient-to-tr from-main to-main2 text-white auth-body-left flex flex-col items-center justify-center text-center">
              <img className="h-40 mb-5" src={loginImage} alt="" />
              <h2 className="text-3xl font-semibold mb-3">DreamCars</h2>
              <p className="text-sm px-5">
                We bring the car that you have dreamed of for your entire life in cheap price!
              </p>
            </div>
            <div className="auth-body">
              <h2 className="text-center text-3xl mt-10 font-bold">Welcome to DreamCars</h2>
              <p className="text-center mt-5 text-gray-700">
                Use your email or another service to continue <br /> with DreamCars
              </p>
              <form onSubmit={handleLogin} className="my-5">
                <div className="mb-6">
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">
                    Your email
                  </label>
                  <input
                    name="email"
                    type="email"
                    id="email"
                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-main focus:border-main block w-full p-2.5"
                    placeholder="example@email.com"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 ">
                    Your password
                  </label>
                  <input
                    name="password"
                    type="password"
                    id="password"
                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-main focus:border-main block w-full p-2.5"
                    required
                  />
                </div>

                <p className="mb-3 text-main1">{error}</p>

                <button
                  disabled={btnLoading}
                  className="w-full transition-all bg-main hover:bg-main1 text-white py-3 px-5 rounded-lg">
                  {btnLoading ? <BtnLoader></BtnLoader> : 'Log In'}
                </button>
              </form>

              <button
                onClick={handleGoogleSignIn}
                className="w-full transition-all hover:bg-gray-50 bg-white border border-gray-200 py-3 px-5 flex items-center justify-center gap-2 rounded-lg">
                <FaGoogle></FaGoogle> Sign In
              </button>

              <p className="mt-5 text-center">
                Dont have an account yet?{' '}
                <Link to="/signup" className="text-main font-semibold">
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
