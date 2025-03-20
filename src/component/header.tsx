import { useState } from "react";

import { FaRegUser, FaTasks } from "react-icons/fa";

import { GrLogout } from "react-icons/gr";
import { TbLogin } from "react-icons/tb";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import useLogout from "../hooks/useLogout";
import { RootState } from "../store/Store";
import { Iuser } from "../types/types";

import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";

function Header() {
  const logout = useLogout();

  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };
  const toggleProfileOpen = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const userData = useSelector(
    (state: RootState) => state.auth.userData
  ) as Iuser | null;
  const handlerLogout = async () => {
    await logout();
  };

  const ProfileHover = (
    <div>
      <div className=" bg-white shadow-md p-4 rounded-lg ">
        {userData && (
          <div
            className="flex   items-center   my-2 space-x-2 hover:text-gray-500"
            onClick={handlerLogout}
          >
            <GrLogout />
            <div>Logout</div>
          </div>
        )}
        {userData === null ? (
          <Link to="/login">
            <div className="flex   items-center   my-2 space-x-2 hover:text-gray-500">
              <TbLogin size={20} />
              <div>Login</div>
            </div>
          </Link>
        ) : null}
      </div>
    </div>
  );

  const ProfileHoverMobile = (
    <div>
      <div
        className=" text-pink-700    "
        onClick={() => {
          setIsOpen(false);
          setIsProfileOpen(false);
          return;
        }}
      >
        {userData && (
          <div
            className="flex   items-center   my-2 space-x-2 hover:text-gray-500 py-2"
            onClick={handlerLogout}
          >
            <GrLogout size={30} />
            <div className="text-xl text-gray-600">Logout</div>
          </div>
        )}
        {userData === null ? (
          <Link to="/login">
            <div className="flex   items-center   my-2 space-x-2 hover:text-gray-500">
              <TbLogin size={30} />
              <div className="text-xl">Login</div>
            </div>
          </Link>
        ) : null}
      </div>
    </div>
  );

  return (
    <div>
      <div className="hidden sm:block">
        <div className="flex justify-between shadow-b-md sm:px-5 py-5  shadow-md">
          <div className=" flex  items-center text-2xl font-bold text-sky-500 hover:text-sky-600">
            <Link to="/">Tasker</Link>
          </div>

          <div className=" flex items-center justify-end space-x-8 ">
            <div className="group   hover:border-b-2 border-pink-500  cursor-pointer  ">
              <div className=" flex justify-center  text-gray-500 group-hover:text-pink-500 ">
                <FaRegUser size={20} />
              </div>
              <p className=" text-[.7rem] leading-2 font-semibold    group-hover:text-pink-500">
                Profile
              </p>
              <div className="invisible absolute group-hover:visible  pt-5 right-20 z-30  ">
                {ProfileHover}
              </div>
            </div>{" "}
            <Link to="/">
              {" "}
              <div className="group     hover:border-b-2 border-cyan-500">
                {/* {totalQuantity !== 0 ? (
                <div className="absolute right-3 top-4 bg-red-600 text-white rounded-full px-1 text-xs">
                  {totalQuantity}
                </div>
              ) : null} */}
                <div className=" flex justify-center text-gray-500 group-hover:text-cyan-500">
                  <FaTasks size={20} />
                </div>
                <p className=" text-[.7rem] leading-2   font-semibold   group-hover:text-cyan-500">
                  Tasks
                </p>
              </div>{" "}
            </Link>
          </div>
        </div>
      </div>

      <div className="sm:hidden   shadow-md">
        <div className="flex justify-between shadow-b-md px-5 py-4">
          <div className=" flex  items-center text-2xl font-bold text-sky-500 hover:text-sky-600">
            <Link to="/">JHStore</Link>
          </div>
          <button onClick={toggleOpen}>
            {isOpen ? (
              <RxCross2 className="text-3xl text-gray-700" />
            ) : (
              <GiHamburgerMenu className="text-3xl text-gray-700" />
            )}
          </button>
        </div>

        {isOpen && (
          <div className=" h-full z-10  bg-white w-full py-7">
            <div className=" flex  flex-col items-center justify-end space-y-9 mt-8 ">
              <div className="flex flex-col justify-center w-36  ">
                <button
                  className=" text-2xl font-semibold  text-pink-500 flex justify-center items-center"
                  onClick={toggleProfileOpen}
                >
                  Profile
                  {isProfileOpen ? <IoIosArrowDown /> : <IoIosArrowForward />}
                </button>

                {isProfileOpen && ProfileHoverMobile}
              </div>{" "}
              <Link to="/">
                {" "}
                <div className="flex justify-center w-36" onClick={toggleOpen}>
                  <p className=" text-2xl  font-semibold   text-cyan-500">
                    Tasks
                  </p>
                </div>{" "}
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
