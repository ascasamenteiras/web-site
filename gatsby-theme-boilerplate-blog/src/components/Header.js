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
  handleRefState,
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
              {/* <MainMenuContainer
                wrapperRef={wrapperRef}
                refState={refState}
                mainMenuStatus={mainMenuStatus}
                isMobile={true}
                mainMenuItems={mainMenuItems}
              /> */}
              <div className='header-columns toggle-menu'>
                <button
                  type='button'
                  id='check-toggle-icon'
                  onClick={handleRefState}
                  aria-haspopup='true'
                  aria-controls='mainmenu'
                  aria-expanded={refState}
                  aria-label='Alternar visibilidade do menu'
                  className={`menu-wrapper menu-bar-icon  ${
                    refState ? "active" : "not-active"
                  }`}
                >
                  ...
                </button>
              </div>
            </div>
            <div>
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
