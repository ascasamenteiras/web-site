import React from "react";
import { Row } from "../components/InsertRow";
import MainMenuContainer from "../containers/MainMenuContainer";

const Header = ({
  refState,
  menuActive,
  wrapperRef,
  bgOne,
  bgTwo,
  mainMenuStatus,
  mainMenuItems,
  mainMenu,
  logo,
}) => {
  return (
    <header>
      <Row
        opt={{
          isBoxed: false,
          bgColor: bgOne,
          classes: "main-header",
        }}
      >
        {/* mobile menu */}
        {mainMenuStatus === true ? (
          <>
            <div className={"mobile-only main-header-" + menuActive}>
              <MainMenuContainer
                wrapperRef={wrapperRef}
                refState={refState}
                mainMenuStatus={mainMenuStatus}
                isMobile={true}
                mainMenuItems={mainMenuItems}
              />
            </div>
            <div className='desktop-only'>
              <MainMenuContainer
                wrapperRef={wrapperRef}
                refState={refState}
                mainMenuStatus={mainMenuStatus}
                isMobile={false}
                mainMenuItems={mainMenu}
              />
            </div>
          </>
        ) : null}
        {/* desktop menu */}
      </Row>
      <Row
        opt={{
          bgColor: bgTwo,
          isBoxed: false,
          classes: "header-logo-wrapper",
        }}
      >
        <Row opt={{ isBoxed: true, classes: "header-logo" }}>{logo}</Row>
      </Row>
    </header>
  );
};

export default Header;
