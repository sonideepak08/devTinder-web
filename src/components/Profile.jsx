import React from "react";
import EditProfileCard from "./EditProfileCard";
import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((state) => state.user);

  return (
    user && (
      <div>
        <EditProfileCard user={user} />
      </div>
    )
  );
};

export default Profile;
