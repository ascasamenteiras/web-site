import React, { useState } from "react";
import { Link } from "gatsby";
import { GatsbyImage, getImage, getSrc } from "gatsby-plugin-image";
import { Row } from "@Components/InsertRow";
import HeadingBlock from "@Slices/HeadingBlock";
import MainTemplateWrapper from "@Slices/MainTemplateWrapper";
import { useSiteMetadatas } from "../tools/useSiteMetadatas";
import Seo from "@Slices/Seo";

const OneColumn = ({ location, pageContext }) => {
  const {
    schemasJSON,
    brandImages,
    bandeiraWhats,
    bandeiraQuestion,
    generalImages,
  } = useSiteMetadatas();
  const badgeWhats = getImage(bandeiraWhats.childrenImageSharp[0]);
  const badgeQuestion = getImage(bandeiraQuestion.childrenImageSharp[0]);

  const regex = /\/(\w{2})\//;
  const locationUrl = location.pathname.match(regex);
  const logoLocationUrl = locationUrl ? locationUrl[1] : "";

  const flags = [];
  Object.entries(pageContext.helperI18n).forEach(transl => {
    flags.push({
      i18n: transl[1].split(":")[0],
      slug: transl[1].split(":")[1],
    });
  });
  const { title, description, content } = pageContext;
  const { questions } = pageContext.SEO;
  console.log("questions");
  console.log(questions);
  const pattern = brandImages?.nodes?.filter(
    brandImgs => brandImgs.relativePath === "PATTERN-bg.png"
  );
  const bgPattern = pattern
    ? pattern[0]?.childImageSharp?.gatsbyImageData?.images?.fallback?.src
    : null;
  const genImgsNodes = generalImages?.nodes;
  const globalSubs = schemasJSON?.pagesHelper?.globals;
  console.log("pageContext");
  console.log(pageContext);
  return (
    <MainTemplateWrapper
      logo={"darkLogo.publicURL"}
      backgroundImage={{
        src: bgPattern,
      }}
      opt={{
        titleSeo: `${pageContext} - As Casamenteiras`,
        pageQuestions: questions,
        classes: `one-column ${pageContext.slug}`,
        schemaType: "blog",
        topology: "index",
        blogListing: "posts?.slice(0, 9)",
        articleUrl: location.href,
        mainLogo: "imgHolder",
        cardImage: "cardImage ? getSrc(cardImage.childrenImageSharp[0]) : null",
        serverUrl: location.href,
        badgesWhats: (
          <GatsbyImage
            image={badgeWhats}
            alt={"Botão do Whats"}
            placeholder={"NONE"}
            critical='true'
            className={"whatsMe"}
            width={70}
            height={70}
            id='btn-whats-api'
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
        globalSubs: globalSubs,
        flags: flags,
        urlLocale: logoLocationUrl,
      }}
    >
      <main className='main-container'>
        <HeadingBlock classes='m30auto' importance={10} width={400}>
          {title}
        </HeadingBlock>
        <Row
          opt={{
            isBoxed: true,
            classes: "main-container-wrapper page-container",
          }}
          content={content}
        ></Row>
      </main>
    </MainTemplateWrapper>
  );
};

export default OneColumn;

export const Head = ({ pageContext }) => {
  // console.log(pageContext);
  return (
    <>
      <Seo
        data={pageContext.SEO}
        killSeo={false}
        className={`one-column-body page-body`}
      />
    </>
  );
};
