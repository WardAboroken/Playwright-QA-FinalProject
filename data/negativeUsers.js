import { negativeLoginMessages } from "./messages";
import { userData } from "./users";

export const negativeUsersData = [
  {
    username: "locked_out_user",
    password: userData["locked_out_user"],
    expectedMessage: negativeLoginMessages.failure.lockedOut,
  },
  {
    username: "standard_user",
    password: "",
    expectedMessage: negativeLoginMessages.failure.passwordRequired,
  },
  {
    username: "",
    password: "secret_sauce",
    expectedMessage: negativeLoginMessages.failure.usernameRequired,
  },
  {
    username: "",
    password: "",
    expectedMessage: negativeLoginMessages.failure.usernameRequired,
  },
  {
    username: "wrong_user",
    password: "secret_sauce",
    expectedMessage: negativeLoginMessages.failure.invalid,
  },
  {
    username: "standard_user",
    password: "wrong_pass",
    expectedMessage: negativeLoginMessages.failure.invalid,
  },
  {
    username: "wrong_user",
    password: "wrong_pass",
    expectedMessage: negativeLoginMessages.failure.invalid,
  },
];

