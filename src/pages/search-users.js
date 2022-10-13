import React, { useCallback, useEffect, useState } from "react";
import Input from "../components/input";
import getUser from "../services/gitHubApi-service";
import debounce from "lodash.debounce";
import defaultAvatar from "../images/GitHub-Mark.png";
import { useParams } from "react-router-dom";
import styled from "@emotion/styled";
import { NavLink } from "react-router-dom";
import { colors } from "../styles/colors";
import { typography } from "../styles/typography";
import users from "../images/users.svg";
import follow from "../images/follow.svg";
import code from "../images/code.svg";
import book from "../images/book.svg";
import { BsStarFill } from "react-icons/bs";

const StyledNavLink = styled(NavLink)`
  max-width: 140px;
  min-width: 140px;
  height: 140px;
  background-color: ${colors.white};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
  gap: 5px;
  flex-wrap: nowrap;
  text-decoration: none;
  box-shadow: 2px 2px 0px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
`;

const TitleNavLink = styled.p`
  ${typography.head.lg};
  color: ${colors.black};
`;

const ContentNavLink = styled.p`
  ${typography.text.md};
  color: ${colors.black};
`;

const ContainerNavLink = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 17px;
  margin-bottom: 42px;
`;

const ContainerImageUserGitHub = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 100%;
`;

const ContainerDataOfSearch = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const ContainerLoading = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 427px;
`;

const StyledDefaultImg = styled.img`
  max-width: 120px;
`;

const Paragraph = styled.p`
  font-weight: 700;
  font-size: 20px;
`;

export const SearchUsers = ({ favorites, onToggleFav }) => {
  let params = useParams();
  const [username, setUsername] = useState(params.username || "");
  const [user, setUser] = useState({});
  const [state, setState] = useState("idle");

  async function getUserData(query) {
    setState("loading");
    console.log("query:", query);
    if (!query) {
      setUser({});
      setState("idle");
    } else {
      try {
        const u = await getUser(query);
        setUser(u);
        setState("success");
      } catch (e) {
        setState("error");
        setUser({});
        console.log(e);
      }
    }
  }

  const StyledButton = styled.button`
    border: none;
    background-color: transparent;
    color: ${({ fav }) => {
      if (fav) return colors.newYellow;
      return colors.gray[4];
    }};
  `;

  const debouncedSearch = useCallback(debounce(getUserData, 1000), []);

  useEffect(() => {
    if (username && state === "idle") getUserData(username);
  }, []);

  function handleChange(e) {
    setUsername(e.target.value);
    debouncedSearch(e.target.value);
  }

  function handleToggle() {
    if (!user.data) return;
    const data = {
      name: user.data.name || user.data.login,
      username: user.data.login,
      avatar_url: user.data.avatar_url,
    };
    onToggleFav(data);
  }

  return (
    <div
      style={{
        marginTop: "32px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Input
        name="username"
        value={username}
        onChange={handleChange}
        placeholder="username"
      />
      {(() => {
        switch (state) {
          case "idle":
          case "error":
            return (
              <ContainerLoading>
                <StyledDefaultImg src={defaultAvatar} alt="default" />
                <Paragraph>No users...</Paragraph>
              </ContainerLoading>
            );
          case "loading":
            return (
              <ContainerLoading>
                <StyledDefaultImg src={defaultAvatar} alt="default" />
                <Paragraph>
                  {state === "loading" ? "Retrieving user..." : ""}
                </Paragraph>
              </ContainerLoading>
            );
          case "success":
            return (
              <ContainerDataOfSearch>
                <ContainerImageUserGitHub
                  src={user.data?.avatar_url}
                  alt="avatar"
                />
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <Paragraph>{user.data.name || "No name"}</Paragraph>
                  <StyledButton
                    onClick={handleToggle}
                    fav={
                      favorites.find((obj) => {
                        return obj["username"] === user.data?.login;
                      })
                        ? true
                        : false
                    }
                  >
                    <BsStarFill style={{ fontSize: "24px" }} />
                  </StyledButton>
                </div>
                <p style={{ marginLeft: "25px", marginRight: "25px" }}>
                  {user.data?.bio}
                </p>
                <ContainerNavLink>
                  <StyledNavLink
                    to={`/search/${user.data.login}/followers`}
                    state={{ quantity: user.data.followers }}
                  >
                    <img src={users} alt="followers-icon" />
                    <TitleNavLink>
                      {user.data.followers > 999
                        ? Math.round(user.data.followers / 100) / 10 + "K"
                        : user.data.followers}
                    </TitleNavLink>
                    <ContentNavLink>Followers</ContentNavLink>
                  </StyledNavLink>

                  <StyledNavLink
                    to={`/search/${user.data.login}/following`}
                    state={{ quantity: user.data.following }}
                  >
                    <img src={follow} alt="following-icon" />
                    <TitleNavLink>
                      {user.data.following > 999
                        ? Math.round(user.data.following / 100) / 10 + "K"
                        : user.data.following}
                    </TitleNavLink>
                    <ContentNavLink>Following</ContentNavLink>
                  </StyledNavLink>

                  <StyledNavLink to={`/search/${user.data.login}/repos`}>
                    <img src={book} alt="repos-icon" />
                    <TitleNavLink>{user.data.public_repos}</TitleNavLink>
                    <ContentNavLink>Public repos</ContentNavLink>
                  </StyledNavLink>

                  <StyledNavLink to={`/search/${user.data.login}/gists`}>
                    <img src={code} alt="gists-icon" />
                    <TitleNavLink>{user.data.public_gists}</TitleNavLink>
                    <ContentNavLink>Public gists</ContentNavLink>
                  </StyledNavLink>
                </ContainerNavLink>
              </ContainerDataOfSearch>
            );

          default:
            break;
        }
      })()}
    </div>
  );
};
