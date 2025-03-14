import { useEffect, useState } from "react";

import UserTable from "@/components/UserTable";
import UserForm from "@/components/UserForm";

import { UserProps } from "./User.type";
import "./User.css";

const apiUrl = import.meta.env.VITE_API_URL;

function User() {
  const [data, setData] = useState([]);
  const [user, setUser] = useState<UserProps>({
    name: "",
    email: "",
    isEditing: false,
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${apiUrl}/users`);
      const data = await response.json();
      setData(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteUser = async (email: string) => {
    try {
      await fetch(`${apiUrl}/users/${email}`, {
        method: "DELETE",
      });
      const newData = data.filter((user: UserProps) => user.email !== email);
      setData(newData);
    } catch (error) {
      console.error(error);
    }
  };

  const createUser = async () => {
    try {
      await fetch(`${apiUrl}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      await fetchUsers();
    } catch (error) {
      console.error(error);
    }
  };

  const updateUser = async () => {
    try {
      await fetch(`${apiUrl}/users/${user.email}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      await fetchUsers();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="wrapper">
      <UserTable
        data={data}
        handleDeleteUser={handleDeleteUser}
        onChange={setUser}
      />
      <UserForm
        user={user}
        onChange={setUser}
        createUser={createUser}
        updateUser={updateUser}
      />
    </div>
  );
}

export default User;
