import React, { useContext, useState } from 'react';
import { GoogleAuthProvider } from 'firebase/auth';
import { FaGoogle } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Login.css';
import loginImage from '../../images/login.svg';
import { AuthContext } from '../../contexts/AuthProvider';
import setAuthToken from '../../api/auth';
import { cl } from '../../Helpers/Helpers';


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
                  {btnLoading ? (
                    <div className="flex items-center justify-center">
                      <svg
                        className="mr-2 w-6 h-6 text-main fill-white animate-spin"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                    </div>
                  ) : (
                    'Log In'
                  )}
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
