import { UserProps } from "@/pages/user/User.type";

export type UserTableProps = {
  data: UserProps[];
  handleDeleteUser: (email: string) => void;
  onChange: (user: UserProps) => void;
};
