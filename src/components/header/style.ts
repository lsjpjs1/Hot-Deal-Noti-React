import styled from "styled-components";
import { fonts, theme, widthMedia } from "../../styles/theme";
import { Link } from "react-router-dom";

export const MainWrapper = styled.section`
  box-shadow: 1px 1px 10px #cccccc;
`;

export const MainHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 32px 48px;
  ${widthMedia.pc} {
    flex-direction: column;
    width: 600px;
    margin: 0 auto;
    position: relative;
  }
  ${widthMedia.mobile} {
    width: 100vw;
    padding: 16px 32px;
  }
`;

export const LogoImageContainer = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  ${widthMedia.pc} {
    margin-bottom: 24px;
  }
`;
export const LogoImage = styled.img`
  width: 240px;
  height: 60px;
`;
export const SearchBarContainer = styled.div`
  margin-left: 32px;
  ${widthMedia.pc} {
    margin-bottom: 24px;
    margin-left: 0px;
    width: 100%;
    display: flex;
    justify-content: center;
  }
`;
export const HeaderMenuContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  ${widthMedia.pc} {
    width: 100%;
    justify-content: space-between;
  }
`;

export const HeaderMenuItem = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 25px;
  ${widthMedia.pc} {
    &:nth-child(4) {
      margin-right: 0px;
    }
  }
  ${widthMedia.mobile} {
    flex-direction: column;
    margin-right: 0px;
  }
`;
export const HeaderMenuIcon = styled.img`
  width: 24px;
  height: 24px;
  ${widthMedia.mobile} {
    margin-bottom: 8px;
  }
`;
export const HeaderMenuText = styled.span`
  font-weight: bold;
  cursor: pointer;
  color: ${theme.color.black};
  text-decoration: none;
  margin-left: 8px;
  font-size: ${fonts.size.medium};
  margin-top: 3px;
  ${widthMedia.mobile} {
    margin: 0px;
  }
  ${widthMedia.mobile} {
    font-size: ${fonts.size.small};
  }
`;
export const HeaderMenuLinkText = styled(Link)`
  font-weight: bold;
  cursor: pointer;
  color: ${theme.color.black};
  text-decoration: none;
  margin-left: 8px;
  font-size: ${fonts.size.medium};
  margin-top: 3px;
  ${widthMedia.mobile} {
    margin: 0px;
  }
  ${widthMedia.mobile} {
    font-size: ${fonts.size.small};
  }
`;
export const PcLoginMenuItem = styled.div`
  margin-left: 16px;
  ${widthMedia.pc} {
    display: none;
  }
`;
export const MobileLoginMenuItem = styled.div`
  display: none;
  ${widthMedia.pc} {
    display: block;
    width: 30px;
    height: 30px;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #f2f2f2;
    position: absolute;
    right: 48px;
  }
  ${widthMedia.mobile} {
    right: 32px;
  }
`;
export const LoginItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const LoginImg = styled.img`
  width: 16px;
  height: 16px;
`;
