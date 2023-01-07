import React from "react";
import { GatsbyImage, getImage, getSrc } from "gatsby-plugin-image";

import { useSiteMetadatas } from "../../tools/useSiteMetadatas";
import { Row } from "../../components/InsertRow";
import HeadingBlock from "@BlockBuilder/HeadingBlock";
import BodyBlock from "@BlockBuilder/BodyBlock";
import HeaderBlock from "@BlockBuilder/HeaderBlock";
import FooterBlock from "@BlockBuilder/FooterBlock";
import BadgesButtonsBlock from "@BlockBuilder/BadgesButtonsBlock";

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
    zankyouImg,
    casamentospontocomImg,
    whatsImg,
    boilerplateLogo,
    youTubeImg,
    faceImg,
    deezerImg,
    iTunesImg,
    spotifyImg,
  } = useSiteMetadatas();
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
            alt={"Logotipo d'As Casamenteiras"}
            placeholder={"NONE"}
            critical='true'
            className={""}
            width={450}
            height={230}
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
      <BadgesButtonsBlock opt={opt} questions={opt.pageQuestions} />

      <FooterBlock
        githubImg={githubImg}
        instaImg={instaImg}
        zankyouImg={zankyouImg}
        whatsImg={whatsImg}
        youTubeImg={youTubeImg}
        facebookImg={faceImg}
        casamentospontocomImg={casamentospontocomImg}
        deezerImg={deezerImg}
        iTunesImg={iTunesImg}
        spotifyImg={spotifyImg}
        logo={
          <GatsbyImage
            image={logoQuery}
            alt={"Logotipo d'As Casamenteiras"}
            placeholder={"NONE"}
            critical='true'
            className={""}
            height={230}
          />
        }
      />
    </BodyBlock>
  );
};

export default MainPageWrapper;
