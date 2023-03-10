import styled from "styled-components";
import {
  fonts,
  heightMedia,
  mixMedia,
  theme,
  widthMedia,
} from "../../styles/theme";
import { Link } from "react-router-dom";

export const MainWrapper = styled.section`
  box-shadow: 1px 1px 10px #cccccc;
`;

export const MainHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 32px 48px;
`;

export const LogoImageContainer = styled.div`
  cursor: pointer;
`;
export const LogoImage = styled.img`
  width: 240px;
  height: 60px;
`;
export const SearchBarContainer = styled.div`
  margin-left: 32px;
`;
export const HeaderMenuContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 16px;
`;

export const HeaderMenuItem = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 25px;
`;
export const HeaderMenuIcon = styled.img`
  width: 24px;
  height: 24px;
`;
export const HeaderMenuText = styled.span`
  font-weight: bold;
  cursor: pointer;
  color: ${theme.color.black};
  text-decoration: none;
  margin-left: 8px;
  font-size: ${fonts.size.medium};
  margin-top: 3px;
`;
export const HeaderMenuLinkText = styled(Link)`
  font-weight: bold;
  cursor: pointer;
  color: ${theme.color.black};
  text-decoration: none;
  margin-left: 8px;
  font-size: ${fonts.size.medium};
  margin-top: 3px;
`;
export const LoginMenuItem = styled.div``;
export const LoginItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const LoginImg = styled.img`
  width: 16px;
  height: 16px;
`;
