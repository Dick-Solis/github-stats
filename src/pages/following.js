import styled from "@emotion/styled";
import { useEffect, useState, useReducer } from "react";
import { useParams, useLocation } from "react-router-dom";
import { typography } from "../styles/typography";
import pagePickerRdx from "../redux/page-picker";
import PagePicker from "../components/page-picker";
import getUser, { getFollowing } from "../services/gitHubApi-service";

const TitleFollowing = styled.p`
  display: flex;
  ${typography.head.md};
  margin: 1rem 2rem;
`;

const ContFollowing = styled.div`
  display: flex;
  align-items: center;
  box-shadow: 2px 2px 0px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  margin: 1rem 55px;
  background-color: white;
`;

const FollowingLog = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
`;

const FollowingImg = styled.img`
  max-width: 40px;
  border-radius: 50%;
  margin: 0.5rem 12px;
`;

export default function Following() {
  const location = useLocation();
  const [following, setFollowing] = useState([]);
  const [state, setState] = useState("idle");
  const [total, setTotal] = useState(location.state?.quantity || 0);
  const [pageData, dispatch] = useReducer(pagePickerRdx, {
    page: 1,
    per_page: 7,
    total,
  });

  let params = useParams();
  const username = params.username;

  useEffect(() => {
    setState("loading");
    getFollowing({ username, page: pageData.page, per_page: pageData.per_page })
      .then((response) => {
        setState("success");
        setFollowing(response.data);
      })
      .catch((e) => {
        console.log(e);
        setState("error");
        setFollowing([]);
      });
  }, [username, pageData]);

  useEffect(() => {
    console.log("its me delaying");
    // const controller = new AbortController();
    if (!total) {
      getUser(username)
        .then((r) => setTotal(r.data.following))
        .catch((e) => {
          console.log(e);
          setState("error");
        });
    }
    // return ()=>controller.abort()
  }, [username, total]);

  return (
    <>
      {state === "error" ? "Not Found" : ""}
      {state === "loading" ? "Loading..." : ""}
      <TitleFollowing>Following ({total})</TitleFollowing>
      <PagePicker total={total} pageData={pageData} onDispatch={dispatch} />
      {following.map((follow, index) => {
        return (
          <ContFollowing key={index}>
            <FollowingImg
              src={follow.avatar_url}
              alt={`${follow.login}-avatar`}
            ></FollowingImg>
            <FollowingLog>{follow.login}</FollowingLog>
          </ContFollowing>
        );
      })}
    </>
  );
}
