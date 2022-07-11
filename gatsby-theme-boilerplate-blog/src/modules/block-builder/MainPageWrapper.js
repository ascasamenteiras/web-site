import React from "react";
import { GatsbyImage, getImage, getSrc } from "gatsby-plugin-image";

import { Row } from "../../components/InsertRow";

import HeadingBlock from "@BlockBuilder/HeadingBlock";
import { useSiteMetadatas } from "../../tools/useSiteMetadatas";

import BodyBlock from "@BlockBuilder/BodyBlock";
import HeaderBlock from "@BlockBuilder/HeaderBlock";

import FooterBlock from "@BlockBuilder/FooterBlock";

const MainPageWrapper = ({
  children,
  title,
  opt,
  classes,
  backgroundImage,
}) => {
  const {
    githubImg,
    instaImg,
    twitterImg,
    whatsImg,
    bannerContent,
    boilerplateLogo,
  } = useSiteMetadatas();
  // const imageQuery = getImage(bannerContent.childrenImageSharp[0]);
  const logoQuery = getImage(boilerplateLogo.childrenImageSharp[0]);
  const logoQuerySrc = getSrc(boilerplateLogo.childrenImageSharp[0]);
  return (
    <BodyBlock
      opt={{
        classes: classes,
        bgImg: backgroundImage.src || logoQuerySrc,
        options: opt,
      }}
    >
      <HeaderBlock
        logotipoSvg={
          <GatsbyImage
            image={logoQuery}
            alt={"title"}
            placeholder={"NONE"}
            critical='true'
            className={""}
          />
        }
      />
      <main className='main-container' id='site-content' role='list'>
        <HeadingBlock classes='m30auto' importance={10} width={400}>
          {title}
        </HeadingBlock>
        <Row
          opt={{
            isBoxed: true,
            classes: "main-container-wrapper page-container",
          }}
        >
          {children}
        </Row>
      </main>
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

export default MainPageWrapper;
