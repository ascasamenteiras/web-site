import React, { useState, useRef } from "react";
import { Link } from "gatsby";
import Header from "../components/Header";

const HeaderContainer = ({ mainMenu, opt }) => {
  const [refState, setRefState] = useState(true);
  const wrapperRef = useRef(null);

  function handleRefState() {
    setRefState(!refState);
  }

  const logoHeader = opt ? opt.logoHeader : null;

  const menuActive = refState ? "visible" : "not-visible";
  const logotype = opt.logoUrl ? (
    <a href={opt.logoUrl} className='logo-link'>
      {opt.logoSvg}
    </a>
  ) : (
    <Link to='/' className='logo-link'>
      {opt.logoSvg}
    </Link>
  );
  return (
    <Header
      logoSvg={opt.logoSvg}
      refState={refState}
      handleRefState={handleRefState}
      logoComponent={logoHeader}
      mainMenu={mainMenu}
      logoUrl={opt.logoUrl}
      menuActive={menuActive}
      logo={logotype}
      wrapperRef={wrapperRef}
      bgOne={opt.bgOne || "#e9e9ed"}
      bgTwo={opt.bgTwo || "#f6f7fa"}
      mainMenuStatus={opt.mainMenuStatus}
    />
  );
};
export default HeaderContainer;
