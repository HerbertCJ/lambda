import { UserProps } from "@/pages/user/User.type";

export type UserFormProps = {
  user: UserProps;
  onChange: (user: UserProps) => void;
  createUser: () => void;
  updateUser: () => void;
};
