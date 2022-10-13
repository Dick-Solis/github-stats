import styled from "@emotion/styled";
import { colors } from "../styles/colors";

const ButtonNumbers = styled.button`
  border: none;
  width: 26px;
  background-color: ${({ active }) => (active ? colors.blue : "transparent")};
  color: ${({ active }) => (active ? "white" : "black")};
  border-radius: 100%;
`;

export default function PageButtons({ page, pagesTotal, onClickBtn }) {
  const range = (start, stop, step = 1) => {
    stop = stop - start > 4 ? start + 4 : stop;
    return Array(Math.ceil((stop + 1 - start) / step))
      .fill(start)
      .map((x, y) => x + y * step);
  };
  const pages = range(page >= 5 ? page - 3 : 1, pagesTotal);

  return (
    <>
      {pages.map((pageNumber) => {
        return (
          <ButtonNumbers
            key={pageNumber}
            active={pageNumber === page ? true : false}
            onClick={() => onClickBtn({ type: pageNumber })}
          >
            {pageNumber}
          </ButtonNumbers>
        );
      })}
    </>
  );
}
