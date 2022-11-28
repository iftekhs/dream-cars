import React, { useContext, useState } from 'react';
import { GoogleAuthProvider } from 'firebase/auth';
import { FaGoogle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import loginImage from '../../images/login.svg';
import { AuthContext } from '../../contexts/AuthProvider';
import { cl } from '../../Helpers/Helpers';
import setAuthToken from '../../api/auth';
import BtnLoader from '../Shared/BtnLoader/BtnLoader';

const SignUp = () => {
  const [btnLoading, setBtnLoading] = useState(false);

  const { createUser, providerLogin, updateUserProfile } = useContext(AuthContext);
  const [signUpError, setSignUpError] = useState('');
  const navigate = useNavigate();

  const handleRegister = (event) => {
    event.preventDefault();

    setBtnLoading(true);
    setSignUpError(null);

    const form = event.target;
    const name = form.name.value;
    const photoURL = form.photoURL.value;
    const email = form.email.value;
    const password = form.password.value;
    const role = form.role.value;

    const data = {
      name,
      photoURL,
      email,
      password,
      role,
    };

    createUser(data.email, data.password)
      .then(() => {
        const userInfo = {
          displayName: data.name,
          photoURL: data.photoURL,
        };
        updateUserProfile(userInfo)
          .then(() => {
            saveUser(data.name, data.email, data.role);
          })
          .catch((err) => console.log(err));
      })
      .catch((error) => {
        setBtnLoading(false);
        setSignUpError(error.message);
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

  const saveUser = (name, email, role) => {
    const user = { name, email, role };
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
              navigate('/');
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
            <div className="hidden md:flex bg-gradient-to-tr from-main to-main2 text-white auth-body-left flex-col items-center justify-center text-center">
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
              <form onSubmit={handleRegister} className="my-5">
                <div className="mb-6">
                  <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 ">
                    Your name
                  </label>
                  <input
                    name="name"
                    type="text"
                    id="name"
                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-main focus:border-main block w-full p-2.5"
                    required
                  />
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="photoURL"
                    className="block mb-2 text-sm font-medium text-gray-900 ">
                    Your Photo URL
                  </label>
                  <input
                    name="photoURL"
                    type="text"
                    id="photoURL"
                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-main focus:border-main block w-full p-2.5"
                    required
                  />
                </div>

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

                <div className="mb-6">
                  <label htmlFor="type" className="block mb-2 text-sm font-medium text-gray-900 ">
                    Type
                  </label>
                  <select
                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-main focus:border-main block w-full p-2.5"
                    name="role"
                    id="role"
                    defaultValue="user">
                    <option value="user">User</option>
                    <option value="seller">Seller</option>
                  </select>
                </div>

                <p className="mb-3 text-rose-500">{signUpError}</p>

                <button
                  disabled={btnLoading}
                  className="w-full transition-all bg-main hover:bg-main1 text-white py-3 px-5 rounded-lg">
                  {btnLoading ? <BtnLoader></BtnLoader> : 'Sign Up'}
                </button>
              </form>

              <button
                onClick={handleGoogleSignIn}
                className="w-full transition-all hover:bg-gray-50 bg-white border border-gray-200 py-3 px-5 flex items-center justify-center gap-2 rounded-lg">
                <FaGoogle></FaGoogle> Sign In
              </button>

              <p className="mt-5 text-center">
                Already have an account?{' '}
                <Link to="/login" className="text-main font-semibold">
                  Log In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
