import React from "react";

const UserCard = ({ user }) => {
  if (!user) return <h1>Loading profile...</h1>;

  const { firstName, lastName, age, gender, pictureUrl, about } = user;

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
          <button className="btn btn-primary mx-6">Ignored</button>

          <button className="btn btn-secondary">Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
