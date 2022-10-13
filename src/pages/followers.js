import styled from "@emotion/styled";
import { useEffect, useState, useReducer } from "react";
import { useParams, useLocation } from "react-router-dom";
import getUser, { getFollowers } from "../services/gitHubApi-service";
import { typography } from "../styles/typography";
import { AiOutlineLeft } from "react-icons/ai";
import { AiOutlineRight } from "react-icons/ai";
// import { colors } from "../styles/colors";

const TitleFollowers = styled.p`
  display: flex;
  ${typography.head.md};
  margin: 1rem 2rem;
`;

const ContFollowers = styled.div`
  display: flex;
  background-color: white;
  align-items: center;
  box-shadow: 2px 2px 0px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  margin: 0.5rem 55px;
`;

const FollowersLog = styled.p`
  font-size: 16px;
  line-height: 20px;
`;

const FollowersImg = styled.img`
  max-width: 40px;
  border-radius: 50%;
  margin: 0.5rem 12px;
`;

const Pagination = styled.div`
  display: flex;
  margin: auto;
  margin-bottom: 1rem;
`;

const ButtonLeftAndRight = styled.button`
  border: none;
  background-color: transparent;
`;

const ButtonNumbers = styled.button`
  border: none;
  background-color: transparent;
  &:active {
    border-radius: 100%;
    background-color: "#2D9CDB";
    color: "#FFF";
  }
`;

export default function Followers() {
  const location = useLocation();
  const [followers, setFollowers] = useState([]);
  const [state, setState] = useState("idle");
  const [total, setTotal] = useState(location.state?.quantity);
  const [status, dispatch] = useReducer(reducer, { page: 1, per_page: 7 });

  let params = useParams();
  const username = params.username;

  function reducer(state, action) {
    console.log(state, action);
    switch (action.type) {
      case "increment":
        return {
          ...state,
          page:
            state.page * state.per_page >= total ? state.page : state.page + 1,
        };
      case "decrement":
        return { ...state, page: state.page > 1 ? state.page - 1 : state.page };
      default:
        if (!isNaN(action.type)) return { ...state, page: action.type };
        throw new Error();
    }
  }

  useEffect(() => {
    console.log("its me delaying");
    // const controller = new AbortController();
    if (!total) {
      getUser(username)
        .then((r) => setTotal(r.data.followers))
        .catch((e) => {
          console.log(e);
          setState("error");
        });
    }
    // return ()=>controller.abort()
  }, []);

  useEffect(() => {
    setState("loading");
    getFollowers({ username, per_page: status.per_page, page: status.page })
      .then((response) => {
        console.log(response);
        setState("success");
        setFollowers(response.data);
      })
      .catch((e) => {
        console.log(e);
        setState("error");
        setFollowers([]);
      });
  }, [status]);

  function PageButtons() {
    const pagesTotal = Math.ceil(total / status.per_page);
    const range = (start, stop, step = 1) => {
      stop = stop - start > 4 ? start + 4 : stop;
      return Array(Math.ceil((stop + 1 - start) / step))
        .fill(start)
        .map((x, y) => x + y * step);
    };
    const pages = range(status.page >= 5 ? status.page - 3 : 1, pagesTotal);

    return (
      <>
        {pages.map((page) => {
          return (
            <ButtonNumbers key={page} onClick={() => dispatch({ type: page })}>
              {page}
            </ButtonNumbers>
          );
        })}
      </>
    );
  }

  return (
    <>
      {state === "error" ? "Not Found" : ""}
      {state === "loading" ? "Loading..." : ""}
      <TitleFollowers>Followers ({total})</TitleFollowers>
      <Pagination>
        <ButtonLeftAndRight onClick={() => dispatch({ type: "decrement" })}>
          <AiOutlineLeft style={{ fontSize: "12px" }} />
        </ButtonLeftAndRight>
        <PageButtons></PageButtons>
        <ButtonLeftAndRight onClick={() => dispatch({ type: "increment" })}>
          <AiOutlineRight style={{ fontSize: "12px" }} />
        </ButtonLeftAndRight>
      </Pagination>
      {followers.map((follower, index) => {
        return (
          <ContFollowers key={index}>
            <FollowersImg
              src={follower.avatar_url}
              alt={`${follower.login}-avatar`}
            ></FollowersImg>
            <FollowersLog>{follower.login}</FollowersLog>
          </ContFollowers>
        );
      })}
    </>
  );
}
