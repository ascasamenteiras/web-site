import React from "react";
import { GatsbyImage, getImage, getSrc } from "gatsby-plugin-image";
import { Link } from "gatsby";

import MainPageWrapper from "@BlockBuilder/MainPageWrapper";
import { useSiteMetadatas } from "../tools/useSiteMetadatas";

const ErrorPage = props => {
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
      title={"Erro 404"}
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
        <h2>
          Hmm - Os pais do noivo se perderam? Procure a equipe do cerimonial.
        </h2>
        <h2>
          Vamos para a <Link to='/'>Página Inicial</Link> começar de novo.
        </h2>
      </main>
    </MainPageWrapper>
  );
};

export default ErrorPage;
