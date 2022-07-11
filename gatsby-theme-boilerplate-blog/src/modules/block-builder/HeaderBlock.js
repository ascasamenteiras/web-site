import React from "react";
import MainMenuData from "@Content/menus/main-menu.yaml";
import HeaderContainer from "../../containers/HeaderContainer";
const HeaderBlock = ({ logotipoSvg }) => {
  return (
    <>
      <HeaderContainer
        opt={{
          mainMenuStatus: MainMenuData.menu.status,
          logoSvg: logotipoSvg,
          bgOne: "#262A33",
          bgTwo: "transparent",
          classes: "header-block",
        }}
        mainMenu={MainMenuData.menu.items}
      />
    </>
  );
};

export default HeaderBlock;
