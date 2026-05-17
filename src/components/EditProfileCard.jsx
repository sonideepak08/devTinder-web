import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import UserCard from "./userCard";

const EditProfileCard = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [pictureUrl, setPictureUrl] = useState(user.pictureUrl);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [about, setAbout] = useState(user.about);
  const [error, setError] = useState();
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();

  const saveProfile = async () => {
    try {
      //clear errors
      setError("");
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, age, gender, pictureUrl, about },
        {
          withCredentials: true,
        },
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (error) {
      setError(error?.response?.data);
    }
  };

  return (
    <>
      <div className="flex justify-center items-start gap-10 my-10 min-h-screen">
        <div>
          <div className="card bg-base-300 w-96 shadow-xl">
            <div className="card-body">
              <h2 className="card-title justify-center">Edit Profile</h2>
              <div>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">FirstName</span>
                  </div>
                  <input
                    type="text"
                    value={firstName}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => {
                      setFirstName(e.target.value);
                    }}
                  />
                </label>

                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">lastName</span>
                  </div>
                  <input
                    type="text"
                    value={lastName}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => {
                      setLastName(e.target.value);
                    }}
                  />
                </label>

                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">pictureUrl</span>
                  </div>
                  <input
                    type="text"
                    value={pictureUrl}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => {
                      setPictureUrl(e.target.value);
                    }}
                  />
                </label>

                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">age</span>
                  </div>
                  <input
                    type="text"
                    value={age}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => {
                      setAge(e.target.value);
                    }}
                  />
                </label>

                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">gender</span>
                  </div>

                  <div className="dropdown w-full">
                    <div
                      tabIndex={0}
                      role="button"
                      className="input input-bordered w-full max-w-xs flex items-center justify-between cursor-pointer"
                    >
                      {gender}
                    </div>

                    <ul
                      tabIndex={0}
                      className="dropdown-content menu bg-base-100 rounded-box z-[1] w-full p-2 shadow"
                    >
                      <li>
                        <a
                          onClick={() => {
                            setGender("male");
                            document.activeElement.blur();
                          }}
                        >
                          male
                        </a>
                      </li>

                      <li>
                        <a
                          onClick={() => {
                            setGender("female");
                            document.activeElement.blur();
                          }}
                        >
                          female
                        </a>
                      </li>

                      <li>
                        <a
                          onClick={() => {
                            setGender("other");
                            document.activeElement.blur();
                          }}
                        >
                          others
                        </a>
                      </li>
                    </ul>
                  </div>
                </label>

                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">about</span>
                  </div>
                  <textarea
                    className="textarea textarea-bordered"
                    value={about}
                    onChange={(e) => {
                      setAbout(e.target.value);
                    }}
                  ></textarea>
                </label>
              </div>
              <p className="bg-red-500">{error}</p>
              <div className="card-actions justify-center m=2">
                <button className="btn btn-primary" onClick={saveProfile}>
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex">
          <UserCard
            user={{ firstName, lastName, age, gender, pictureUrl, about }}
          />
        </div>
      </div>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span onClick={setShowToast}>Message sent successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfileCard;
