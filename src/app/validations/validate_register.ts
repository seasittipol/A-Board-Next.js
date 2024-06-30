import { RegisterType } from "../types/type";

export default function validate_register(
  register: RegisterType
): RegisterType {
  const { username, firstName, lastName, password, confirmPassword, email } =
    register;
  const errors: RegisterType = {
    username: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    email: "",
  };

  if (username.trim().length < 6) {
    errors.username = "username not matched";
  }
  if (firstName.trim().length < 1) {
    errors.firstName = "enter first name";
  }
  if (lastName.trim().length < 1) {
    errors.lastName = "enter last name";
  }
  if (password.trim().length < 6) {
    errors.password = "password require 6 character";
  }
  if (confirmPassword.trim().length < 6) {
    errors.confirmPassword = "confirm password require 6 character";
  } else if (confirmPassword !== password) {
    errors.confirmPassword = "confirm password not matched password";
  }
  if (!/\S+\@+\S+\.+\S/.test(email)) {
    errors.email = "email not matched";
  }
  return errors;
}
