import styled from "styled-components";
import { fonts, theme, widthMedia } from "../../styles/theme";
import { Link } from "react-router-dom";

export const SearchWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 32px;
  ${widthMedia.pc} {
    margin-bottom: 24px;
    margin-left: 0px;
    width: 100%;
    display: flex;
    justify-content: center;
  }
`;

export const HeaderMenuIcon = styled.img`
  width: 24px;
  height: 24px;
  ${widthMedia.mobile} {
    margin-bottom: 8px;
  }
`;

export const ModalItem = styled.div`
  background-color: white;
  border-radius: 4px;
  padding: 20px;
`;
