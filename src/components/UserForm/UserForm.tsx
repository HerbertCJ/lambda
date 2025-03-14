import { FormEvent } from "react";

import { UserFormProps } from "./UserForm.type";
import "./UserForm.css";

function UserForm({ user, onChange, createUser, updateUser }: UserFormProps) {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user.isEditing) {
      updateUser();
      clearForm();
      return;
    }

    createUser();
    clearForm();
  };

  const clearForm = () => {
    onChange({
      name: "",
      email: "",
      isEditing: false,
    });
  };

  const handleChange = (event: HTMLInputElement) => {
    const { name, value } = event;
    onChange({
      ...user,
      [name]: value,
    });
  };

  return (
    <div className="form-wrapper">
      <form onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          value={user.name}
          name="name"
          id="name"
          onChange={(e) => handleChange(e.target)}
        />
        <label htmlFor="email">Email</label>
        <input
          type="text"
          value={user.email}
          name="email"
          id="email"
          disabled={user.isEditing}
          onChange={(e) => handleChange(e.target)}
        />
        <button type="submit">{user.isEditing ? "Update" : "Create"}</button>
      </form>
    </div>
  );
}

export default UserForm;
