import { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { userContext } from "../context/userProvider";

const Navbar = () => {
  const { SignOut, user } = useContext(userContext);
  const navigate = useNavigate();

  const handleOut = async () => {
    try {
      await SignOut();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const ButtonBlue =
    "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800";

  const ButtonRed =
    "text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800";
  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              ShortURL APP
            </span>
          </Link>
          <div className="flex md:order-2 gap-4">
            {user ? (
              <>
                <NavLink to="/home" className={ButtonBlue}>
                  Home
                </NavLink>
                <NavLink to="/profile" className={ButtonBlue}>
                  Profile
                </NavLink>
                <button onClick={handleOut} className={ButtonRed}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink to="/" className={ButtonBlue}>
                  Login
                </NavLink>

                <NavLink to="/register" className={ButtonBlue}>
                  Register
                </NavLink>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};
export default Navbar;
