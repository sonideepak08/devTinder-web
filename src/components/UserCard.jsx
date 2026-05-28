import React from "react";
import { removeUserFromFeed } from "../utils/feedSlice";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch } from "react-redux";

const UserCard = ({ user }) => {
  const dispatch = useDispatch();
  
  const { _id, firstName, lastName, age, gender, pictureUrl, about } = user;
  const handleSendRequest = async (status, userId) => {
    try {
      await axios.post(BASE_URL + "/request/send/" + status + "/" + userId, {}, {withCredentials: true});
      dispatch(removeUserFromFeed(userId));
    } catch (error) {
      console.error(error);
    }
  }


  return (
    <div className="card bg-base-300 w-96 shadow-xl">
      <figure className="px-4 pt-4">
        <img
          src={pictureUrl}
          alt="photo"
          className="rounded-xl h-60 w-full object-cover"
        />
      </figure>

      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>

        {age && gender && <p>{age + ", " + gender}</p>}

        <p className="min-h-24">{about}</p>

        <div className="card-actions justify-center my-4">
          <button className="btn btn-primary mx-6" onClick={() => handleSendRequest("ignored", _id)}>Ignored</button>
          <button className="btn btn-secondary" onClick={() => handleSendRequest("interested", _id)}>Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
