import styled from "@emotion/styled";
import PageButtons from "../components/page-buttons";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

const Pagination = styled.div`
  display: flex;
  margin: auto;
  margin-bottom: 1rem;
`;

const ButtonLeftAndRight = styled.button`
  border: none;
  background-color: transparent;
`;

export default function PagePicker({ total, pageData, onDispatch }) {
  return (
    <Pagination>
      <ButtonLeftAndRight onClick={() => onDispatch({ type: "decrement" })}>
        <AiOutlineLeft style={{ fontSize: "12px" }} />
      </ButtonLeftAndRight>
      <PageButtons
        page={pageData.page}
        pagesTotal={Math.ceil(total / pageData.per_page)}
        onClickBtn={onDispatch}
      ></PageButtons>
      <ButtonLeftAndRight onClick={() => onDispatch({ type: "increment" })}>
        <AiOutlineRight style={{ fontSize: "12px" }} />
      </ButtonLeftAndRight>
    </Pagination>
  );
}
