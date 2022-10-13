import styled from "@emotion/styled";
import { typography } from "../styles/typography";
import { colors } from "../styles/colors";
const DivInput = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 213px;
  gap: 4px;
  margin-bottom: 32px;
  text-align: left;
`;

const TitleInput = styled.label`
  ${typography.text.md};
  color: ${colors.gray.med_ligth};
`;

const BodyInput = styled.input`
  /* color: ${colors.gray.light}; */
  font-size: 1rem;
  box-shadow: 2px 2px 0px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  border: none;
  padding: 4px 8px;
  &:hover {
    color: black;
  }
`;

function Input({
  id,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  label,
}) {
  return (
    <DivInput>
      {label && <TitleInput htmlFor={id || name}>{label}</TitleInput>}
      <BodyInput
        type={type}
        name={name}
        id={id || name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </DivInput>
  );
}

export default Input;
