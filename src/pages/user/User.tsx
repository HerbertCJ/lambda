import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api from "@/api";
import UserTable from "@/components/UserTable";
import UserForm from "@/components/UserForm";

import { UserProps } from "./User.type";
import "./User.css";

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
      const response = await api.get("/users");
      const { data } = response.data;
      setData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteUser = async (email: string) => {
    try {
      await api.delete(`/users/${email}`);
      const newData = data.filter((user: UserProps) => user.email !== email);
      setData(newData);
    } catch (error) {
      console.error(error);
    }
  };

  const createUser = async () => {
    try {
      await api.post(`/users`, user);
      await fetchUsers();
    } catch (error) {
      console.error(error);
    }
  };

  const updateUser = async () => {
    try {
      await api.patch(`/users/${user.email}`, user);
      await fetchUsers();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="wrapper">
      <Link to="/home">Home</Link>
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
