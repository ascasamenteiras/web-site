import React from "react";
import { GatsbyImage, getImage, getSrc } from "gatsby-plugin-image";

import MainTemplateWrapper from "@BlockBuilder/MainTemplateWrapper";
import SinglePostBlock from "@BlockBuilder/SinglePostBlock";
import { useSiteMetadatas } from "../tools/useSiteMetadatas";

const SinglePost = ({ location, pageContext }) => {
  const {
    imgHolder,
    bgPatternImg,
    boilerplateLogo,
    site,
    bandeiraWhats,
  } = useSiteMetadatas();
  const badgeWhats = getImage(bandeiraWhats.childrenImageSharp[0]);
  const bgPatternSrc = getSrc(bgPatternImg.childrenImageSharp[0]);
  const logoQuery = getImage(boilerplateLogo.childrenImageSharp[0]);
  const post = pageContext.thePost;
  return (
    <MainTemplateWrapper
      backgroundImage={{
        src: bgPatternSrc,
      }}
      logo={
        <GatsbyImage
          image={logoQuery}
          alt={"title"}
          placeholder={"NONE"}
          critical='true'
          className={""}
        />
      }
      classes='single-post'
      opt={{
        titleSeo: `${post.frontmatter.title}`,
        authorSeo: post.frontmatter.author,
        classes: "single-post",
        datePublished: post.frontmatter.date,
        schemaType: "article",
        featuredImage:
          site.siteMetadata.siteUrl +
          post.frontmatter.featuredImage.childrenImageSharp[0].gatsbyImageData
            .images.fallback.src,
        cardImage:
          post.frontmatter.featuredImage.childrenImageSharp[0].gatsbyImageData
            .images.fallback.src,
        articleBody: post.html,
        mainLogo: imgHolder,
        description: post.excerpt,
        serverUrl: location.origin || site.siteMetadata.siteUrl || "/",
        articleUrl: location.href,
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
        <SinglePostBlock
          highlightImage={post?.frontmatter?.featuredImage}
          authorImg={imgHolder}
          date={post.frontmatter.updatedAt}
          author={post.frontmatter.author}
          html={post.html}
          title={post.frontmatter.title}
          categories={post.frontmatter.categories}
          timeToRead={post.timeToRead}
          wordCount={post.wordCount}
        />
      </main>
    </MainTemplateWrapper>
  );
};

export default SinglePost;
