import styled from "@emotion/styled";
import { NavLink } from "react-router-dom";
import { typography } from "../styles/typography";
import { colors } from "../styles/colors";
import { BsStarFill } from "react-icons/bs";

const TitleFavorite = styled.div`
  display: flex;
  ${typography.head.md};
  margin: 1rem 2rem;
`;

const ContainerFavorite = styled.div`
  display: flex;
  flex-direction: column;
`;

const ContFavorites = styled.div`
  box-shadow: 2px 2px 0px rgba(0, 0, 0, 0.25);
  background-color: ${colors.white};
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  margin: 1rem 25px;
`;

const ContImg = styled.img`
  max-width: 40px;
  max-height: 40px;
  border-radius: 50%;
  margin: 8px 12px;
`;

const DataFavorite = styled.div`
  margin: 10.5px 8px;
`;

const DataName = styled.p`
  text-align: left;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  color: ${colors.gray.dark};
`;

const DataUserName = styled.p`
  text-align: left;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  display: flex;
  color: ${colors.gray.dark};
`;

const ContData = styled(NavLink)`
  display: flex;
  text-decoration: none;
`;

const StyledButton = styled.button`
  border: none;
  background-color: transparent;
  color: ${colors.newYellow};
`;

export default function Favorites({ favorites, onToggleFav }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TitleFavorite>
        <p>Favorites ({favorites.length})</p>
      </TitleFavorite>
      <ContainerFavorite>
        {favorites.map((fav) => {
          return (
            <ContFavorites key={fav.id}>
              <ContData to={`/search/${fav.username}`}>
                <ContImg src={fav.avatar_url} alt={`avatar-${fav.username}`} />
                <DataFavorite>
                  <DataName>{fav.name}</DataName>
                  <DataUserName>{fav.username}</DataUserName>
                </DataFavorite>
              </ContData>
              <StyledButton onClick={() => onToggleFav(fav)}>
                <BsStarFill style={{ fontSize: "24px" }} />
              </StyledButton>
            </ContFavorites>
          );
        })}
      </ContainerFavorite>
    </div>
  );
}
