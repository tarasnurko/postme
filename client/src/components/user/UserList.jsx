import React from "react";
import UserPreview from "./UserPreview";

const UserList = ({ users }) => {
  return (
    <div className="mt-6 grid auto-rows-[60px] grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
      {users.map((user) => (
        <UserPreview
          key={user._id}
          id={user._id}
          photo={user.photo}
          username={user.username}
          followers={user.followers.length}
        />
      ))}
    </div>
  );
};

export default UserList;
