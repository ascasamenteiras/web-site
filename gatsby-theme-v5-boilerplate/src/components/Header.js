import React from "react";
import { Row } from "@Components/InsertRow";
import { Link } from "gatsby";
import MainMenuContainer from "../containers/MainMenuContainer";
import { GatsbyImage, getImage, getSrc } from "gatsby-plugin-image";

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
  logotype,
  logoImage,
  handleRefState,
  flags,
}) => {
  function getFlag(i18n) {
    switch (i18n) {
      case "pt-BR":
        return "BR";
      case "en-US":
        return "US";
      case "de-DE":
        return "DE";
      case "jp-JP":
        return "JP";
      case "ru-RU":
        return "RU";
      case "fr-FR":
        return "FR";
      case "nl-NL":
        return "NL";
      case "es-ES":
        return "ES";
      default:
        return "BR";
    }
  }
  return (
    <header>
      <Row
        opt={{
          isBoxed: false,
          bgColor: bgOne,
          classes: "main-header",
          numColumns: 2,
        }}
      >
        {/* mobile menu */}
        {mainMenuStatus === true ? (
          <>
            <div
              className={`main-header-${!refState ? "visible" : "not-visible"}`}
            >
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
                    !refState ? "active opened" : "not-active"
                  }`}
                >
                  ...
                </button>
              </div>
            </div>
            <div
              className={`main-menu main-menu-${
                !refState ? "visible" : "not-visible"
              }`}
            >
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

        {/* available locales menu */}
        <ul className='locales-menu'>
          {flags?.map((e, i) => {
            const x = i === 0;
            const plus = x ? <span className='plus-locales'>+</span> : null;
            return (
              <React.Fragment key={i}>
                <li>
                  <Link
                    to={e.slug}
                    className='locales available active'
                    title={e.i18n}
                  >
                    {getFlag(e.i18n)}
                  </Link>
                </li>
                {plus}
              </React.Fragment>
            );
          })}
        </ul>
      </Row>
      <Row
        opt={{
          bgColor: bgTwo,
          isBoxed: false,
          classes: "header-logo-wrapper",
        }}
      >
        <Row opt={{ isBoxed: true, classes: "header-logo" }}>{logotype}</Row>
      </Row>
    </header>
  );
};

export default Header;
