import React, { useState } from "react";
// import { Link } from "gatsby";
// import { GatsbyImage, getImage, getSrc } from "gatsby-plugin-image";
import { Row } from "@Components/InsertRow";
// import HeadingBlock from "@Slices/HeadingBlock";
import MainTemplateWrapper from "@Slices/MainTemplateWrapper";

import { useSiteMetadatas } from "../tools/useSiteMetadatas";

const OneColumn = ({ location, pageContext }) => {
  const {
    brandImages,
    generalImages,
    schemasJSON,
    bandeiraWhats,
    bandeiraQuestion,
  } = useSiteMetadatas();
  const badgeWhats = getImage(bandeiraWhats.childrenImageSharp[0]);
  const badgeQuestion = getImage(bandeiraQuestion.childrenImageSharp[0]);

  const regex = /\/(\w{2})\//;
  const locationUrl = location.pathname.match(regex);
  const logoLocationUrl = locationUrl ? locationUrl[1] : "";
  const i =
    logoLocationUrl && logoLocationUrl !== undefined && logoLocationUrl !== ""
      ? locationUrl[1]
      : "pt-BR";
  const y = schemasJSON.nodes.filter(sch =>
    sch.schema[0].card[0].cardLocale.includes(i)
  );
  const cardY = y[0].schema[0].card[0];
  const indexQuestions = cardY?.questions;
  const flags = [];
  Object.entries(pageContext.helperI18n).forEach(transl => {
    // console.log("transl");
    // console.log(transl);
    flags.push({
      i18n: transl[1].split(":")[0],
      slug: transl[1].split(":")[1],
    });
  });

  const { title, description, content } = pageContext;

  const pattern = brandImages?.nodes?.filter(
    brandImgs => brandImgs.relativePath === "PATTERN-bg.png"
  );
  const bgPattern = pattern
    ? pattern[0]?.childImageSharp?.gatsbyImageData?.images?.fallback?.src
    : null;
  const genImgsNodes = generalImages?.nodes;
  const globalSubs = schemasJSON?.pagesHelper?.globals;

  return (
    <MainTemplateWrapper
      logo={"darkLogo.publicURL"}
      backgroundImage={{
        src: bgPattern,
      }}
      opt={{
        titleSeo: `As Casamenteiras`,
        pageQuestions: indexQuestions,
        classes: "blog-list",
        schemaType: "blog",
        topology: "index",
        blogListing: "posts?.slice(0, 9)",
        articleUrl: "props.location.href",
        mainLogo: "imgHolder",
        cardImage: "cardImage ? getSrc(cardImage.childrenImageSharp[0]) : null",
        serverUrl: "props.location.href",
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
      <Row
        opt={{
          isBoxed: false,
          classes: "one-column",
          bgColor: "rgba(255, 248, 236, 0.9)",
        }}
      >
        <main>
          <h1>{title}</h1>
          <div dangerouslySetInnerHTML={{ __html: content }}></div>
        </main>
      </Row>
    </MainTemplateWrapper>
  );
};

export default OneColumn;
