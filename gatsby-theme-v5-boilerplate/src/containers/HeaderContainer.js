import React, { useState, useRef } from "react";
import { Link } from "gatsby";
import Header from "../components/Header";
import { getImage, GatsbyImage } from "gatsby-plugin-image";
import { useSiteMetadatas } from "../tools/useSiteMetadatas";

const HeaderContainer = ({ mainMenu, opt }) => {
  const [refState, setRefState] = useState(true);
  const wrapperRef = useRef(null);

  function handleRefState() {
    setRefState(!refState);
  }

  const logoHeader = opt ? opt.logoHeader : null;

  const menuActive = refState ? "visible" : "not-visible";
  const { darkLogo } = useSiteMetadatas();

  const logoImage = getImage(darkLogo?.nodes[0]?.childImageSharp);
  const logotype = opt.logoUrl ? (
    <a href={opt.logoUrl} className='logo-link'>
      {opt.logoSvg}
    </a>
  ) : (
    <Link
      to={
        opt.urlLocale === undefined || !opt.urlLocale || opt.urlLocale === ""
          ? "/"
          : "/" + opt.urlLocale + "/"
      }
      className='logo-link'
    >
      <GatsbyImage
        image={logoImage}
        alt={"Logo"}
        placeholder={"NONE"}
        critical='true'
        className={"main-logo"}
        width={250}
      />
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
      logotype={logotype}
      logoImage={logoImage}
      wrapperRef={wrapperRef}
      bgOne={opt.bgOne || "#e9e9ed"}
      bgTwo={opt.bgTwo || "#f6f7fa"}
      mainMenuStatus={opt.mainMenuStatus}
      flags={opt.flags}
    />
  );
};
export default HeaderContainer;
