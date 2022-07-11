import React from "react";
import { GatsbyImage, getImage, getSrc } from "gatsby-plugin-image";

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
  const {
    githubImg,
    instaImg,
    twitterImg,
    whatsImg,
    boilerplateLogo,
  } = useSiteMetadatas();
  const logoQuery = getImage(boilerplateLogo.childrenImageSharp[0]);

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
        logo={
          <GatsbyImage
            image={logoQuery}
            alt={"title"}
            placeholder={"NONE"}
            critical='true'
            className={""}
          />
        }
      />
    </BodyBlock>
  );
};

export default MainTemplateWrapper;
