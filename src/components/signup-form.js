import styled from "@emotion/styled";
import { useState } from "react";
import { useAuth } from "../context/auth-context";
import Input from "./input";
import { colors } from "../styles/colors";

const AccountTitle = styled.h1`
  font-weight: 400;
  font-size: 2rem;
  line-height: 40px;
  padding: 0 72px;
  margin: 48px 0;
`;

const ButtonAccount = styled.button`
  color: ${colors.gray.light};
  background-color: ${colors.blue};
  padding: 8px 16px;
  box-shadow: 2px 2px 0px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  border: none;
  font-weight: 700;
  font-size: 1rem;
`;

const SignupForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
  });
  const { signup } = useAuth();

  function handleSubmit(e) {
    e.preventDefault();
    // console.log(formData);
    signup(formData);
  }
  function handleChange(event) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }
  return (
    <>
      <AccountTitle>Welcome to Github Stats</AccountTitle>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
        onSubmit={handleSubmit}
      >
        <Input
          type="email"
          name="email"
          placeholder="example@mail.com"
          value={formData.email}
          onChange={handleChange}
          label="Email"
        />
        <Input
          type="password"
          name="password"
          placeholder="*******"
          value={formData.password}
          onChange={handleChange}
          label="Password"
        />
        <Input
          name="first_name"
          placeholder="John"
          value={formData.first_name}
          onChange={handleChange}
          label="First Name"
        />
        <Input
          name="last_name"
          placeholder="Doe"
          value={formData.last_name}
          onChange={handleChange}
          label="Last Name"
        />
        <ButtonAccount type="submit">Create Account</ButtonAccount>
      </form>
    </>
  );
};

export default SignupForm;
