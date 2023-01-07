import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { GatsbyImage, getImage, getSrc } from "gatsby-plugin-image";

import MainPageWrapper from "@BlockBuilder/MainPageWrapper";
import { useSiteMetadatas } from "../tools/useSiteMetadatas";

const OneColumn = ({ location, data: { mdx } }) => {
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

  const dataPage = useStaticQuery(graphql`
    query Pages($locale: String!, $title: String!) {
      mdx(
        frontmatter: { title: { eq: $title } }
        fields: {
          locale: { eq: $locale }
          frontmatter: { status: { eq: true }, topology: { eq: "pages" } }
        }
      ) {
        frontmatter {
          title
          description
          date
          questions
          featuredImage {
            childrenImageSharp {
              gatsbyImageData(
                width: 350
                height: 224
                placeholder: NONE
                quality: 80
              )
            }
          }
        }
        body
        excerpt(pruneLength: 200)
      }
    }
  `);
  const { title, description, questions } = dataPage.frontmatter;
  const content = dataPage.body;
  return (
    <MainPageWrapper
      backgroundImage={{
        src: bgPatternSrc,
      }}
      title={title}
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
        titleSeo: title,
        classes: "one-column",
        pageQuestions: questions || defaultQuestions,
        mainLogo: imgHolder,
        cardImage: cardImage ? getSrc(cardImage.childrenImageSharp[0]) : null,
        serverUrl: location.href,
        articleUrl: location.href,
        schemaType: "article",
        description: description,
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
        <div dangerouslySetInnerHTML={{ __html: content }}></div>
      </main>
    </MainPageWrapper>
  );
};

export default OneColumn;
