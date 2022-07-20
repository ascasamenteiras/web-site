import React from "react";
import { GatsbyImage, getImage, getSrc } from "gatsby-plugin-image";

import { useSiteMetadatas } from "../../tools/useSiteMetadatas";
import { Row } from "../../components/InsertRow";
import HeadingBlock from "@BlockBuilder/HeadingBlock";
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
    zankyouImg,
    casamentospontocomImg,
    whatsImg,
    boilerplateLogo,
    youTubeImg,
    faceImg,
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
      <div className='whatsMeWrapper'>
        <a
          href='https://web.whatsapp.com/send?phone=5516992452437&text=Ol%C3%A1%2C%20Pri.%20Eu%20gostaria%20de%20falar%20sobre%20assessoria%20e%20cerimonial%20de%20casamento'
          rel='nofollow'
          target={"_blank"}
          className={"desktop-only"}
        >
          {opt.badgesWhats}
        </a>
        <a
          href={`https://api.whatsapp.com/send?phone=5516992452437&text=Ol%C3%A1%2C%20Pri.%20Eu%20gostaria%20de%20falar%20sobre%20assessoria%20e%20cerimonial%20de%20casamento`}
          rel='nofollow'
          target={"_blank"}
          className={"mobile-only"}
        >
          {opt.badgesWhats}
        </a>
      </div>
      <FooterBlock
        githubImg={githubImg}
        instaImg={instaImg}
        zankyouImg={zankyouImg}
        whatsImg={whatsImg}
        youTubeImg={youTubeImg}
        facebookImg={faceImg}
        casamentospontocomImg={casamentospontocomImg}
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
