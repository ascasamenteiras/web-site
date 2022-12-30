import React from "react";
import { GatsbyImage, getImage, getSrc } from "gatsby-plugin-image";

import MainPageWrapper from "@BlockBuilder/MainPageWrapper";
import { useSiteMetadatas } from "../tools/useSiteMetadatas";

import schemaYAML from "@Content/configs/schema-org.yaml";

const ContatoPage = props => {
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
  console.log("schemaYAML");

  const { sameAs } = schemaYAML.schema[0].card;
  const sameAsResult = Object.keys(sameAs).map(key => [key, sameAs[key]]);
  return (
    <MainPageWrapper
      backgroundImage={{
        src: bgPatternSrc,
      }}
      title={"Contato"}
      logo={
        <GatsbyImage
          image={logoQuery}
          alt={"Logotipo do As Casamenteiras"}
          width={450}
          height={230}
          placeholder={"NONE"}
          critical='true'
          className={""}
        />
      }
      opt={{
        titleSeo: `Árvore de Links`,
        classes: "one-column",
        pageQuestions: defaultQuestions,
        articleUrl: props.location.href,
        mainLogo: imgHolder,
        cardImage: cardImage ? getSrc(cardImage.childrenImageSharp[0]) : null,
        serverUrl: props.location.href,
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
        {/* fazer um card e deixar escolher entre card e arvore de links*/}
        <ul className={"contact-link-tree-wrapper"}>
          {sameAsResult.map((e, i) => (
            <li key={i}>
              <a href={e[1]} rel='nofollow' target={"_blank"}>
                {e[0].charAt(0).toUpperCase() + e[0].slice(1)}
              </a>
            </li>
          ))}
        </ul>
      </main>
    </MainPageWrapper>
  );
};

export default ContatoPage;
