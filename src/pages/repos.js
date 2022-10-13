import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRepos } from "../services/gitHubApi-service";
import { AiOutlineStar } from "react-icons/ai";
import { GiCircle } from "react-icons/gi";
import { CgGitFork } from "react-icons/cg";
import { colors } from "../styles/colors";

const TitleRepos = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 28px;
  line-height: 35px;
  margin: 1rem 2rem;
`;

const ContainerRepos = styled.div`
  box-shadow: 2px 2px 0px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  margin: 0.5rem 55px;
  background-color: white;
`;

const ContainerName = styled.a`
  text-align: left;
  text-decoration: none;
  word-break: break-word;
  color: ${colors.blue};
  margin: 8px 12px;
  font-weight: 700;
`;

const ContainerDescription = styled.div`
  margin: 0 12px;
  text-align: left;
  font-size: 12px;
`;

const ContainerLayout = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto 8px 12px;
  gap: 1rem;
`;

const ContainerDetails = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
`;

const typeLanguages = {
  C: "#0899F8",
  "C++": "#EF3862",
  "C#": "#1AE82A",
  CSS: "#0312F8",
  Haxe: "#F59307",
  HTML: "#F85C03",
  Java: "#A8B820",
  JavaScript: "#F8D030",
  Python: "#398BEE",
  Ruby: "#C03028",
  Rust: "#ECB097",
  TeX: "#005405",
  ActionScript: "#A21406",
  Shell: "#16F50F",
  TypeScript: "#6890F0",
  VimL: "#09F011",
  none: "#000000",
};

const LanguageCard = styled(GiCircle)`
  border-radius: 50%;
  background-color: ${({ type }) => typeLanguages[type]};
`;

export default function Repos() {
  const [repos, setRepos] = useState([]);
  const [state, setState] = useState("idle");
  let params = useParams();
  const username = params.username;
  useEffect(() => {
    setState("loading");
    getRepos(username)
      .then((response) => {
        setState("success");
        setRepos(response.data);
      })
      .catch((e) => {
        console.log(e);
        setState("error");
        setRepos([]);
      });
  }, [username]);
  return (
    <>
      {state === "error" ? "Not Found" : ""}
      {state === "loading" ? "Loading..." : ""}
      <TitleRepos>Public Repos ({repos.length})</TitleRepos>
      {repos.map((repo, index) => {
        return (
          <ContainerRepos key={index}>
            <ContainerName href={repo.html_url}>{repo.name}</ContainerName>
            <ContainerDescription>
              {repo.description ? repo.description : "(No Description)"}
            </ContainerDescription>
            <ContainerLayout>
              <ContainerDetails>
                <LanguageCard type={repo.language ? repo.language : "none"} />
                {repo.language ? repo.language : "none"}
              </ContainerDetails>
              <ContainerDetails>
                <AiOutlineStar />
                {repo.forks_count}
              </ContainerDetails>
              <ContainerDetails>
                <CgGitFork />
                {repo.stargazers_count}
              </ContainerDetails>
            </ContainerLayout>
          </ContainerRepos>
        );
      })}
    </>
  );
}
