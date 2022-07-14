import React from "react";

import { useSiteMetadatas } from "../../tools/useSiteMetadatas";

import BodyBlock from "@BlockBuilder/BodyBlock";
import HeaderBlock from "@BlockBuilder/HeaderBlock";
import FooterBlock from "@BlockBuilder/FooterBlock";

const MainTemplateWrapper = ({
  children,
  classes,
  logo,
  backgroundImage,
  opt,
}) => {
  const { githubImg, instaImg, twitterImg, whatsImg } = useSiteMetadatas();
  return (
    <BodyBlock
      opt={{ classes: classes, bgImg: backgroundImage.src, options: opt }}
    >
      <HeaderBlock logotipoSvg={logo} />
      {children}
      <FooterBlock
        githubImg={githubImg}
        instaImg={instaImg}
        twitterImg={twitterImg}
        whatsImg={whatsImg}
        logo={logo}
      />
    </BodyBlock>
  );
};

export default MainTemplateWrapper;
