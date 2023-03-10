import React from "react";
import SearchBar from "../searchbar/SearchBar";
import { useDispatch, useSelector } from "react-redux";
import {
  callGetHotDeals,
  setIsShowReturnItem,
  setPage,
  setSearchBody,
} from "../../modules/hotDeal";
import { Link } from "react-router-dom";
import mixpanel from "mixpanel-browser";
import { RootState } from "../../modules";
import { RETURN_ITEM_SEARCH_MODE } from "../../containers/ReturnHotDealsContainer";
import * as S from "./style";

const MainHeader = () => {
  const dispatch = useDispatch();
  const searchMode = useSelector(
    (state: RootState) => state.hotDealReducer.searchMode
  );

  const getHotDeals = () => {
    // @ts-ignore
    dispatch(callGetHotDeals());
  };

  const goFirstPage = () => {
    dispatch(setPage(0));
  };

  const onSearch = (s: string) => {
    mixpanel.track("search", { searchBody: s });
    dispatch(setSearchBody(s));
    goFirstPage();
    if (searchMode == RETURN_ITEM_SEARCH_MODE) {
      getReturnHotDeals();
    } else {
      getHotDeals();
    }
  };

  const getReturnHotDeals = () => {
    dispatch(setIsShowReturnItem(true));
    // @ts-ignore
    dispatch(callGetHotDeals(true));
  };

  const logoHandler = () => {
    mixpanel.track("logoButtonClick", {
      currentPage: window.location.href,
    });
    window.location.href = "/";
  };

  const headerMenuHandler = (mixPanelValue: string, externalLink?: string) => {
    mixpanel.track(mixPanelValue);
    if (
      mixPanelValue === "realHotDealDistinctionClick" ||
      mixPanelValue === "faqClick"
    ) {
      window.open(externalLink, "_blank");
    }
  };

  const logout = () => {
    mixpanel.track("logoutButtonClick");
    localStorage.removeItem("authToken");
    window.location.reload();
  };

  mixpanel.track_links("#star-btn .header-manu-text", "starButtonClick");
  mixpanel.track_links("#login-btn a.header-manu-text", "loginButtonClick");

  return (
    <S.MainWrapper>
      <S.MainHeaderContainer>
        <S.LogoImageContainer>
          <S.LogoImage onClick={logoHandler} src={"/image/IMG_0385_2.png"} />
          <S.MobileLoginMenuItem>
            {localStorage.getItem("authToken") ? (
              <S.LoginItem>
                <S.LoginImg src={"image/icon/login.png"} />
              </S.LoginItem>
            ) : (
              <Link to={"/login"}>
                <S.LoginItem>
                  <S.LoginImg src={"image/icon/login.png"} />
                </S.LoginItem>
              </Link>
            )}
          </S.MobileLoginMenuItem>
        </S.LogoImageContainer>

        <SearchBar onSearch={onSearch} onSearchTextChange={(e) => {}} />

        <S.HeaderMenuContainer>
          <S.HeaderMenuItem
            onClick={() => headerMenuHandler("notificationPageClick")}
          >
            <S.HeaderMenuIcon src={"/image/icon/alarm.png"} />
            <S.HeaderMenuLinkText to={"/notifications"}>
              특가 알림
            </S.HeaderMenuLinkText>
          </S.HeaderMenuItem>

          <S.HeaderMenuItem
            onClick={() =>
              headerMenuHandler(
                "realHotDealDistinctionClick",
                "https://bush-thorn-7ed.notion.site/924639f9727e400ebb3eeed6c086d8d6"
              )
            }
          >
            <S.HeaderMenuIcon src={"/image/icon/check.png"} />
            <S.HeaderMenuText>찐특가 구별법</S.HeaderMenuText>
          </S.HeaderMenuItem>

          <S.HeaderMenuItem
            onClick={() =>
              headerMenuHandler(
                "faqClick",
                "https://bush-thorn-7ed.notion.site/77c65c69c1cf4176b313cd8b6eb7e3f2"
              )
            }
          >
            <S.HeaderMenuIcon src={"/image/icon/question.png"} />
            <S.HeaderMenuText>FAQ</S.HeaderMenuText>
          </S.HeaderMenuItem>

          <S.HeaderMenuItem
          // todo : 즐겨찾기 mixPanel 없음
          // onClick={() => headerMenuHandler("")}
          >
            <S.HeaderMenuIcon src={"/image/icon/star.png"} />
            <S.HeaderMenuLinkText to={"/favorite"}>
              즐겨찾기
            </S.HeaderMenuLinkText>
          </S.HeaderMenuItem>
          <S.PcLoginMenuItem>
            {localStorage.getItem("authToken") ? (
              <S.LoginItem>
                <S.LoginImg src={"image/icon/login.png"} />
                <S.HeaderMenuText onClick={logout}>로그아웃</S.HeaderMenuText>
              </S.LoginItem>
            ) : (
              <Link to={"/login"}>
                <S.LoginItem>
                  <S.LoginImg src={"image/icon/login.png"} />
                  <S.HeaderMenuText>로그인</S.HeaderMenuText>
                </S.LoginItem>
              </Link>
            )}
          </S.PcLoginMenuItem>
        </S.HeaderMenuContainer>
      </S.MainHeaderContainer>
    </S.MainWrapper>
  );
};

export default MainHeader;
