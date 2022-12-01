import React from "react";
import MainMenuList from "../components/MainMenuList";

const MainMenuContainer = ({
  refState,
  isMobile,
  wrapperRef,
  mainMenuItems,
}) => {
  const isVisibleClass = refState ? "visible" : "not-visible";
  const navClasses = isMobile
    ? "main-nav menu-state-" + isVisibleClass
    : "main-nav  main-header main-header-" + isVisibleClass;
  const labelledby = isMobile ? "check-toggle-icon" : null;
  return (
    <nav
      className={navClasses}
      ref={wrapperRef}
      id='site-navigation'
      itemScope='itemScope'
      itemType='https://schema.org/SiteNavigationElement'
    >
      <ul
        className='main-ul'
        id='mainmenu'
        role='menu'
        aria-labelledby={labelledby}
      >
        {mainMenuItems?.map((listMobile, indxMobile) => (
          <MainMenuList
            list={listMobile}
            key={indxMobile}
            isMobile={isMobile}
          />
        ))}
      </ul>
    </nav>
  );
};
export default MainMenuContainer;
