import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const UserTableRow = ({ user, onUpdate, onDelete, onToggleAdmin }) => {
  const [isEditing, setEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({ ...user });

  const handleUpdate = () => {
    // Call the onUpdate callback with the updated user data
    onUpdate(updatedUser);
    setEditing(false);
  };

  const handleDelete = () => {
    // Call the onDelete callback with the user ID
    onDelete(user.id);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleCheckboxChange = () => {
    setUpdatedUser((prevUser) => ({
      ...prevUser,
      isadmin: !prevUser.isadmin,
    }));
  };

  return (
    <tr>
      <td>{user.id}</td>
      {isEditing ? (
        <>
          <td>
            <input
              type="text"
              name="firstname"
              value={updatedUser.firstname}
              onChange={handleInputChange}
            />
          </td>
          <td>
            <input
              type="text"
              name="lastname"
              value={updatedUser.lastname}
              onChange={handleInputChange}
            />
          </td>
          <td>
            <input
              type="text"
              name="username"
              value={updatedUser.username}
              onChange={handleInputChange}
            />
          </td>
        </>
      ) : (
        <>
          <td>{user.firstname}</td>
          <td>{user.lastname}</td>
          <td>{user.username}</td>
        </>
      )}
      <td>
        <input
          type="checkbox"
          name="isadmin"
          checked={updatedUser.isadmin}
          onChange={handleCheckboxChange}
          disabled={!isEditing}
        />
      </td>
      <td>
        {isEditing ? (
          <>
            <button onClick={handleUpdate}>Save</button>
            <button onClick={() => setEditing(false)}>Cancel</button>
          </>
        ) : (
          <>
            <button onClick={() => setEditing(true)}>Update</button>
            <button onClick={handleDelete} className="delete">
              Delete
            </button>
          </>
        )}
      </td>
    </tr>
  );
};

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/admin/users", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch(() => toast("Error fetching users: ", { type: "error" }));
  }, []);

  const handleUpdate = (data) => {
    fetch(`http://localhost:8080/api/admin/users/${data.id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) =>
        setUsers((prevUsers) =>
          prevUsers.map((user) => (user.id === data.id ? data : user))
        )
      )
      .catch(() => toast("Error updating user: ", { type: "error" }));
  };

  const handleDelete = (userId) => {
    fetch(`http://localhost:8080/api/admin/users/${userId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then(() =>
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId))
      )
      .catch(() => toast("Error deleting user: ", { type: "error" }));
  };

  return (
    <div>
      <h2>Users</h2>
      <table className="list">
        {/* Table header */}
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
            <th>isadmin</th>
            <th>Actions</th>
          </tr>
        </thead>
        {/* Table body */}
        <tbody>
          {users.map((user) => (
            <UserTableRow
              key={user.id}
              user={user}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
