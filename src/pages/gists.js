import styled from "@emotion/styled";
import { useEffect, useState, useReducer } from "react";
import { useParams } from "react-router-dom";
import { getGists } from "../services/gitHubApi-service";
import { typography } from "../styles/typography";
import { colors } from "../styles/colors";

const StyledTitle = styled.p`
  display: flex;
  ${typography.head.md};
  margin: 1rem 2rem;
`;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  background-color: ${colors.white};
  box-shadow: 2px 2px 0px rgba(0, 0, 0, 0.25);
  word-break: break-word;
  padding: 5px;
  border-radius: 4px;
  margin: 1rem 55px;
`;

const TitleGistUser = styled.a`
  text-align: left;
  text-decoration: none;
  word-break: break-word;
  color: ${colors.blue};
  margin: 8px 12px;
  font-weight: 700;
`;

const DescriptionGistUser = styled.a`
  text-decoration: none;
  margin: 8px 12px;
  ${typography.text.md};
  color: ${colors.gray.dark};
`;

export default function Gists() {
  const [gists, setGists] = useState([]);
  const [state, setState] = useState("idle");
  // const [pageData, dispatch] = useReducer(pagePickerRdx,{
  //   page: 1,
  //   per_page: 7,
  //   total,
  // });
  let params = useParams();
  const username = params.username;

  useEffect(() => {
    setState("loading");
    getGists(username)
      .then((response) => {
        console.log(response);
        setState("success");
        setGists(response?.data);
      })
      .catch((e) => {
        console.log(e);
        setState("error");
        setGists([]);
      });
  }, [username]);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {state === "error" ? "Not Found" : ""}
      {state === "loading" ? "Loading..." : ""}
      {state === "success" && (
        <>
          <StyledTitle>Gists ({gists?.length || 0})</StyledTitle>
          {gists?.map((gist) => {
            return (
              <StyledContainer key={gist.id}>
                <TitleGistUser href={gist.html_url}>
                  {Object.keys(gist?.files || {}).map((filename, index) => (
                    <p key={index}>{filename}</p>
                  ))}
                </TitleGistUser>
                <DescriptionGistUser>{gist?.description}</DescriptionGistUser>
              </StyledContainer>
            );
          })}
        </>
      )}
    </div>
  );
}
