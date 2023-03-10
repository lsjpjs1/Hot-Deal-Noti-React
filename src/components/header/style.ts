import styled from "styled-components";
import {
  fonts,
  heightMedia,
  mixMedia,
  theme,
  widthMedia,
} from "../../styles/theme";

export const MainWrapper = styled.section`
  box-shadow: 1px 1px 10px #cccccc;
`;

export const MainHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  padding-inline: 50px;
  padding-top: 15px;
  flex-wrap: wrap;
`;

export const LogoImageContainer = styled.div``;
export const LogoImage = styled.img`
  width: 240px;
  height: 60px;
  cursor: pointer;
`;
export const SearchBarContainer = styled.div`
  margin-left: 32px;
  margin-top: 42px;
  margin-bottom: 42px;
`;
export const HeaderMenuContainer = styled.div`
  margin-left: auto;
  vertical-align: middle;
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
`;

export const HeaderMenuItem = styled.div`
  cursor: pointer;
  display: flex;
  margin-right: 25px;
`;
export const HeaderMenuIcon = styled.img`
  width: 24px;
  height: 24px;
  left: 302px;
  top: 123px;
`;
export const HeaderMenuText = styled.a`
  font-weight: bold !important;
  cursor: pointer;
  color: black;
  text-decoration: none;
  margin-left: 8px !important ;
`;
export const LoginItem = styled.div``;
// export const LogoImageContainer = styled.div``;
// export const LogoImageContainer = styled.div``;
// export const LogoImageContainer = styled.div``;
