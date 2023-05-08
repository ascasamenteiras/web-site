import React, { useState, useRef } from "react";
import { Link } from "gatsby";
import { GatsbyImage, getImage, getSrc } from "gatsby-plugin-image";
import { Row } from "@Components/InsertRow";
import HeadingBlock from "@Slices/HeadingBlock";
import MainTemplateWrapper from "@Slices/MainTemplateWrapper";

const MDexample = ({ location, pageContext }) => {
  const { brandImages, schemasJSON } = useSiteMetadatas();
  const globalSubs = schemasJSON?.pagesHelper?.globals;
  const pattern = brandImages?.nodes?.filter(
    brandImgs => brandImgs?.relativePath === "PATTERN-bg.png"
  );
  const bgPattern = pattern
    ? pattern[0]?.childImageSharp?.gatsbyImageData?.images?.fallback?.src
    : null;
  return (
    <MainTemplateWrapper
      logo={"darkLogo.publicURL"}
      backgroundImage={{
        src: bgPattern,
      }}
      opt={{
        titleSeo: `As Casamenteiras`,
        pageQuestions: "defaultQuestions",
        classes: "blog-list",
        schemaType: "blog",
        topology: "index",
        blogListing: "posts?.slice(0, 9)",
        articleUrl: "props.location.href",
        mainLogo: "imgHolder",
        cardImage: "cardImage ? getSrc(cardImage.childrenImageSharp[0]) : null",
        serverUrl: "props.location.href",
        badgesWhats: "badgeWhats",
        badgesQuestion: "badgeQuestion",
        globalSubs: globalSubs,
      }}
    >
      <Row opt={{ isBoxed: false, bgColor: "#fff" }}>
        <Row opt={{ classes: "datasheet-header", isBoxed: true }}></Row>
      </Row>
    </MainTemplateWrapper>
  );
};

export default MDexample;
