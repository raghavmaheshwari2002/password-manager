import React, { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setForm] = useState({ site: "", userName: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
    }
  }, []);

  const showPassword = () => {
    if (ref.current.src.includes("icons/eye.png")) {
      ref.current.src = "icons/eye-cross.png";
      passwordRef.current.type = "text";
    } else {
      ref.current.src = "icons/eye.png";
      passwordRef.current.type = "password";
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const savePassword = () => {
    if (form.site === "" || form.userName === "" || form.password === "") {
      toast.error("All fields are Compulsory", {
        autoClose: 2000,
        position: "bottom-center",
        theme: "dark",
      });
    } else {
      setPasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
      localStorage.setItem(
        "passwords",
        JSON.stringify([...passwordArray, { ...form, id: uuidv4() }])
      );
      setForm({ site: "", userName: "", password: "" });

      toast.success("Password Saved", {
        autoClose: 1000,
        theme: "dark",
      });
    }
  };

  const editPassword = (id) => {
    setForm(passwordArray.filter((item) => item.id === id)[0]);
    setPasswordArray(passwordArray.filter((item) => item.id !== id));
  };

  const deletePassword = (id) => {
    let c = confirm("Do you really want to Delete the Password ?");
    if (c) {
      setPasswordArray(passwordArray.filter((item) => item.id !== id));
      localStorage.setItem(
        "passwords",
        JSON.stringify(passwordArray.filter((item) => item.id !== id))
      );
      toast.success("Password Deleted", {
        autoClose: 2000,
        theme: "dark",
      });
    }
  };

  return (
    <>
      <div className="absolute -z-10 insert-0 h-screen [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"></div>

      <div className="container mx-auto max-w-4xl">
        <h1 className="text-center text-2xl font-bold p-3 ">
          Your own Password Manager
        </h1>
        <div className="flex flex-col p-4 gap-4 w-full  items-center ">
          <input
            className="rounded-full p-2 w-full border-2 border-slate-500"
            onChange={handleChange}
            value={form.site}
            type="text"
            name="site"
            placeholder="Enter Website's URL..."
          />

          <div className="flex gap-5 w-full justify-between ">
            <input
              className="rounded-full p-2 w-full border-2 border-slate-500 "
              onChange={handleChange}
              value={form.userName}
              type="text"
              name="userName"
              placeholder="Username..."
            />
            <div className="relative">
              <input
                className="rounded-full p-2 w-full border-2 border-slate-500"
                onChange={handleChange}
                value={form.password}
                type="password"
                name="password"
                placeholder="Password..."
                ref={passwordRef}
              />

              <img
                className="absolute right-0 top-1 p-2 cursor-pointer"
                width={45}
                src="icons/eye.png"
                alt="eye"
                onClick={showPassword}
                ref={ref}
              />
            </div>
          </div>
          <button
            className=" flex items-center justify-center rounded-full border-2 border-green-700 bg-green-500 p-2 gap-1 w-fit hover:bg-green-400 hover:font-semibold"
            onClick={savePassword}
          >
            <lord-icon
              src="https://cdn.lordicon.com/ujxzdfjx.json"
              trigger="hover"
              stroke="regular"
            ></lord-icon>
            <div className="hover:font-bold">Save Password</div>
          </button>
        </div>
      </div>

      <div className="passwords mx-auto max-w-4xl text-center">
        <h2 className="text-xl text-left font-bold ">Your Passwords Here</h2>
        {passwordArray.length !== 0 ? (
          <p className=" text-red-800 font-semibold hover:font-bold">
            Note : Click Edit button to read the Password
          </p>
        ) : (
          <p></p>
        )}
        {passwordArray.length === 0 ? (
          <div className=" font-bold text-lg py-5"> No Passwords to Show </div>
        ) : (
          <table className="table-auto w-full mt-4  rounded-lg overflow-hidden">
            <thead className="bg-purple-800 text-white ">
              <tr>
                <th className="w-32 py-2">Site</th>
                <th className="w-32 py-2">Username</th>
                <th className="w-32 py-2 ">Password</th>
                <th className="w-10 py-2">Actions</th>
              </tr>
            </thead>
            <tbody className=" bg-purple-300 ">
              {passwordArray.map((item, index) => {
                return (
                  <tr key={index}>
                    <td className="w-32 py-1 border-y border-white cursor-pointer">
                      <a href={item.site} target="_blank">
                        {" "}
                        {item.site}{" "}
                      </a>
                    </td>
                    <td className="w-32 py-1 border-y border-white">
                      {item.userName}
                    </td>
                    <td className=" w-32 py-1 border-y border-white ">
                      {"*".repeat(item.password.length)}
                    </td>
                    <td className="w-10 py-1 border-y border-white">
                      <span
                        className=" cursor-pointer"
                        onClick={() => {
                          editPassword(item.id);
                        }}
                      >
                        <lord-icon
                          src="https://cdn.lordicon.com/lsrcesku.json"
                          trigger="hover"
                          stroke="regular"
                        ></lord-icon>
                      </span>
                      &nbsp; &nbsp;
                      <span
                        className=" cursor-pointer"
                        onClick={() => {
                          deletePassword(item.id);
                        }}
                      >
                        <lord-icon
                          src="https://cdn.lordicon.com/xekbkxul.json"
                          trigger="morph"
                          state="morph-trash-in"
                          colors="primary:#121331,secondary:#e4e4e4,tertiary:#646e78,quaternary:#ebe6ef"
                          stroke="regular"
                        ></lord-icon>
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      <ToastContainer />
    </>
  );
};

export default Manager;
