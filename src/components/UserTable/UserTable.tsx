import { FaRegTrashAlt } from "react-icons/fa";
import { LuPencil } from "react-icons/lu";

import { UserProps } from "@/pages/user/User.type";
import { UserTableProps } from "./UserTable.type";

import "./UserTable.css";

function UserTable({ data, handleDeleteUser, onChange }: UserTableProps) {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((user: UserProps) => (
          <tr key={user.email}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td className="actions">
              <LuPencil
                className="edit-icon"
                onClick={() =>
                  onChange({
                    name: user.name,
                    email: user.email,
                    isEditing: true,
                  })
                }
              />
              <FaRegTrashAlt
                className="exclude-icon"
                onClick={() => handleDeleteUser(user.email)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default UserTable;
