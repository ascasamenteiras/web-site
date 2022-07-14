import React from "react";

import MainPageWrapper from "@BlockBuilder/MainPageWrapper";

import { useSiteMetadatas } from "../tools/useSiteMetadatas";

import { GatsbyImage, getImage, getSrc } from "gatsby-plugin-image";

const OneColumn = ({ location, pageContext }) => {
  const {
    imgHolder,
    bgPatternImg,
    boilerplateLogo,
    site,
    cardImage,
    bandeiraWhats,
  } = useSiteMetadatas();
  const badgeWhats = getImage(bandeiraWhats.childrenImageSharp[0]);

  const bgPatternSrc = getSrc(bgPatternImg.childrenImageSharp[0]);
  const logoQuery = getImage(boilerplateLogo.childrenImageSharp[0]);
  const { title, content, description } = pageContext;
  return (
    <MainPageWrapper
      backgroundImage={{
        src: bgPatternSrc,
      }}
      title={title}
      logo={
        <GatsbyImage
          image={logoQuery}
          alt={"title"}
          placeholder={"NONE"}
          critical='true'
          className={""}
        />
      }
      opt={{
        titleSeo: `As Casamenteiras`,
        classes: "one-column",
        // blogListing: posts.slice(0, 9),
        mainLogo: imgHolder,
        cardImage: cardImage ? getSrc(cardImage.childrenImageSharp[0]) : null,
        serverUrl: location.href,
        schemaType: "article",
        description: description,
        social: site.siteMetadata.social.twitter,
        badgesWhats: (
          <GatsbyImage
            image={badgeWhats}
            alt={"title"}
            placeholder={"NONE"}
            critical='true'
            className={"whatsMe"}
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
