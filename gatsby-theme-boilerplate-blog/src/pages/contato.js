import React from "react";
import { GatsbyImage, getImage, getSrc } from "gatsby-plugin-image";

import MainPageWrapper from "@BlockBuilder/MainPageWrapper";
import { useSiteMetadatas } from "../tools/useSiteMetadatas";

const ContatoPage = () => {
  const {
    imgHolder,
    bgPatternImg,
    boilerplateLogo,
    site,
    cardImage,
    bandeiraWhats,
    bandeiraQuestion,
  } = useSiteMetadatas();
  const badgeWhats = getImage(bandeiraWhats.childrenImageSharp[0]);
  const badgeQuestion = getImage(bandeiraQuestion.childrenImageSharp[0]);

  const bgPatternSrc = getSrc(bgPatternImg.childrenImageSharp[0]);
  const logoQuery = getImage(boilerplateLogo.childrenImageSharp[0]);
  const defaultQuestions = site.siteMetadata.questions;

  return (
    <MainPageWrapper
      backgroundImage={{
        src: bgPatternSrc,
      }}
      title={"Contato"}
      logo={
        <GatsbyImage
          image={logoQuery}
          alt={"Logotipo d'As Casamenteiras"}
          width={450}
          height={230}
          placeholder={"NONE"}
          critical='true'
          className={""}
        />
      }
      opt={{
        titleSeo: `As Casamenteiras`,
        classes: "one-column",
        pageQuestions: defaultQuestions,
        mainLogo: imgHolder,
        cardImage: cardImage ? getSrc(cardImage.childrenImageSharp[0]) : null,
        serverUrl: location.href,
        schemaType: "article",
        description: "description",
        social: site.siteMetadata.social.twitter,
        badgesWhats: (
          <GatsbyImage
            image={badgeWhats}
            alt={"Botão do Whats"}
            width={70}
            height={70}
            placeholder={"NONE"}
            critical='true'
            className={"whatsMe"}
          />
        ),
        badgesQuestion: (
          <GatsbyImage
            image={badgeQuestion}
            alt={"Botão de Perguntas Frequentes"}
            placeholder={"NONE"}
            critical='true'
            className={"whatsMe"}
            width={70}
            height={70}
          />
        ),
      }}
    >
      <main>
        {/* <div dangerouslySetInnerHTML={{ __html: content }}></div> */}
        <h1>teste</h1>
      </main>
    </MainPageWrapper>
  );
};

export default ContatoPage;
