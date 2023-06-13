import React, { useState, useEffect } from "react";
import { deleteUser, getUsers, updateUser } from "../firebase";
import { useAuth } from "../context/AuthContext.js";
import { useNavigate } from "react-router-dom";
function Dashboard() {
  const { currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser || !currentUser.isAdmin) {
      navigate("/signup");
    } else {
      async function fetchUsers() {
        const data = await getUsers("/dashboard");
        setUsers(data);
      }
      fetchUsers();
    }
  }, [currentUser, navigate]);

  const handleUpdateUser = async (user, newData) => {
    await updateUser(user.userUid, newData);
    setUsers((prevUsers) =>
      prevUsers.map((u) => (u.userUid === user.userUid ? { ...u, ...newData } : u))
    );
  };

  const handleDeleteUser = async (user) => {
    await deleteUser(user.userUid);
    setUsers((prevUsers) => prevUsers.filter((u) => u.userUid !== user.userUid));
  };

  return (
    <>
      { currentUser?.isAdmin ? (
        <div>
          <h2>User Dashboard</h2>
          <p>Welcome, {currentUser.email}!</p>
          <table>
            <thead>
              <tr>
                <th>Email</th>
                <th>Provider</th>
                <th>Created</th>
                <th>Signed In</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.userUid}>
                  <td>{user.email}</td>
                  <td>{user.provider}</td>
                  <td>{user.created}</td>
                  <td>{user.signedIn}</td>
                  <td>
                    <button
                      onClick={() =>
                        handleUpdateUser(user, { displayName: "New Name" })
                      }
                    >
                      Edit
                    </button>
                    <button onClick={() => handleDeleteUser(user)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>You are not authorized to access this page. Please sign up as an admin.</p>
      )}
    </>
  );
}

export default Dashboard;