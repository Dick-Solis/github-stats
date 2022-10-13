import styled from "@emotion/styled";
import { NavLink } from "react-router-dom";
import {FaUser} from 'react-icons/fa';
import {RiSearchFill} from 'react-icons/ri';
import {AiFillStar} from 'react-icons/ai';
import { colors } from "../styles/colors";
import { AiOutlinePoweroff } from 'react-icons/ai';
import { useAuth } from "../context/auth-context";

const FooterNav = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 66px;
  padding: 0px 10px;
  border-top: solid 1px;
  gap: 50px;
  color: ${colors.gray[4]};
  &hover{
    color: ${colors.gray[3]};
  }
`;

export default function Navbar() {
  const { logout } = useAuth();

  return (
    <FooterNav>
      <NavLink to="/profile" 
        style={({ isActive }) => ({ color: isActive ? colors.gray[3] : colors.gray[4] })}>
          <FaUser style={{fontSize: '42px'}}/></NavLink>
      <NavLink to="/search"
       style={({ isActive }) => ({ color: isActive ? colors.gray[3] : colors.gray[4] })}>
        <RiSearchFill style={{fontSize: '42px'}}/></NavLink>
      <NavLink to="/favorites"
       style={({ isActive }) => ({ color: isActive ? colors.gray[3] : colors.gray[4] })}>
        <AiFillStar style={{fontSize: '42px'}}/></NavLink>
      <NavLink onClick={logout}
       style={({ isActive }) => ({ color: isActive ? colors.gray[3] : colors.gray[4] })}>
        <AiOutlinePoweroff style={{fontSize: '42px'}}/></NavLink>
    </FooterNav>
  );
}
