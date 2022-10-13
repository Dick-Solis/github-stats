import styled from "@emotion/styled";
import { useState } from "react";
import { useAuth } from "../context/auth-context";
import Input from "./input";
import { colors } from "../styles/colors";

const LoginTitle = styled.h1`
  font-weight: 400;
  font-size: 2rem;
  line-height: 40px;
  padding: 0 72px;
  margin: 48px 0;
`;

const ButtonLogin = styled.button`
  color: ${colors.gray.light};
  background-color: ${colors.blue};
  padding: 8px 16px;
  box-shadow: 2px 2px 0px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  border: none;
  font-weight: 700;
  font-size: 1rem;
`;

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  const { login } = useAuth();

  function handleSubmit(e) {
    e.preventDefault();
    login(formData);
  }

  return (
    <>
      <LoginTitle>Welcome to Github Stats</LoginTitle>
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
          placeholder="example@example.com"
          label="Email"
          onChange={handleChange}
          value={formData.email}
        />
        <Input
          type="password"
          name="password"
          placeholder="******"
          label="Password"
          onChange={handleChange}
          value={formData.password}
        />
        <ButtonLogin type="submit">Login</ButtonLogin>
      </form>
    </>
  );
};

export default LoginForm;
