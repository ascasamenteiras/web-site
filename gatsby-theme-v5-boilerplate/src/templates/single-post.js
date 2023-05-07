import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { GatsbyImage, getImage, getSrc } from "gatsby-plugin-image";
import { Row } from "@Components/InsertRow";
import Seo from "@Slices/Seo";

import MainTemplateWrapper from "@Slices/MainTemplateWrapper";
import SinglePostBlock from "@Slices/SinglePostBlock";
import { useSiteMetadatas } from "../tools/useSiteMetadatas";

const SinglePost = ({ location, pageContext }) => {
  // const { wordCount, timeToRead } = pageContext;
  // const postData = useStaticQuery(graphql`
  //   query SinglePost($locale: String!, $title: String!) {
  //     mdx(
  //       sort: { fields: frontmatter___date, order: DESC }
  //       frontmatter: { title: { eq: $title } }
  //       fields: {
  //         locale: { eq: $locale }
  //         frontmatter: { createdAt: { lt: "null" }, status: { eq: true } }
  //       }
  //     ) {
  //       fields {
  //         locale
  //         isDefault
  //       }
  //       frontmatter {
  //         date(formatString: "DD [de] MMMM [de] YYYY", locale: "pt-br")
  //         xmlDate: date
  //         topology
  //         title
  //         author
  //         status
  //         questions
  //         featuredPost
  //         homeHighlight
  //         homeHighlightRelated
  //         homeHighlightRelatedList
  //         categories
  //         featuredImage {
  //           childrenImageSharp {
  //             gatsbyImageData(
  //               width: 1200
  //               height: 627
  //               placeholder: NONE
  //               quality: 80
  //             )
  //           }
  //         }
  //       }
  //       body

  //       excerpt(pruneLength: 200)
  //     }
  //   }
  // `);
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

  // const post = pageContext.thePost;
  const { title, description, questions, wordCount, timeToRead } = pageContext;
  const {
    imgHolder,
    bgPatternImg,
    boilerplateLogo,
    site,
    bandeiraWhats,
    bandeiraQuestion,
    brandImages,
    schemasJSON,
  } = useSiteMetadatas();
  const badgeWhats = getImage(bandeiraWhats.childrenImageSharp[0]);
  const badgeQuestion = getImage(bandeiraQuestion.childrenImageSharp[0]);

  const bgPatternSrc = getSrc(bgPatternImg.childrenImageSharp[0]);
  const logoQuery = getImage(boilerplateLogo.childrenImageSharp[0]);

  const defaultQuestions = pageContext.questions;

  const pattern = brandImages?.nodes?.filter(
    brandImgs => brandImgs.relativePath === "PATTERN-bg.png"
  );
  const bgPattern = pattern
    ? pattern[0]?.childImageSharp?.gatsbyImageData?.images?.fallback?.src
    : null;
  const globalSubs = schemasJSON?.pagesHelper?.globals;
  // console.log("pageContext!!!");
  // console.log(pageContext);
  return (
    // <MainTemplateWrapper
    //   backgroundImage={{
    //     src: bgPatternSrc,
    //   }}
    //   logo={
    //     <GatsbyImage
    //       image={logoQuery}
    //       alt={"Logotipo d'As Casamenteiras"}
    //       width={450}
    //       height={230}
    //       placeholder={"NONE"}
    //       critical='true'
    //       className={""}
    //     />
    //   }
    //   classes='single-post'
    //   opt={{
    //     titleSeo: `${post.frontmatter.title}`,
    //     authorSeo: post.frontmatter.author,
    //     classes: "single-post",
    //     pageQuestions: questions || defaultQuestions,
    //     datePublished: post.frontmatter.date,
    //     schemaType: "article",
    //     featuredImage:
    //       site.siteMetadata.siteUrl +
    //       post.frontmatter.featuredImage.childrenImageSharp[0].gatsbyImageData
    //         .images.fallback.src,
    //     cardImage:
    //       post.frontmatter.featuredImage.childrenImageSharp[0].gatsbyImageData
    //         .images.fallback.src,
    //     articleBody: post.html,
    //     topology: "post",
    //     mainLogo: imgHolder,
    //     description: post.excerpt,
    //     serverUrl: location.origin || site.siteMetadata.siteUrl || "/",
    //     articleUrl: location.href,
    //     social: site.siteMetadata.social.twitter,
    //     badgesWhats: (
    //       <GatsbyImage
    //         image={badgeWhats}
    //         alt={"Botão do Whats"}
    //         width={70}
    //         height={70}
    //         placeholder={"NONE"}
    //         critical='true'
    //         className={"whatsMe"}
    //       />
    //     ),
    //     badgesQuestion: (
    //       <GatsbyImage
    //         image={badgeQuestion}
    //         alt={"Botão de Perguntas Frequentes"}
    //         width={70}
    //         height={70}
    //         placeholder={"NONE"}
    //         critical='true'
    //         className={"whatsMe"}
    //       />
    //     ),
    //   }}
    // >
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
        topRibbonImg: "bgWhipala",
        flags: flags,
        urlLocale: logoLocationUrl,
      }}
    >
      <main>
        <SinglePostBlock
          highlightImage={pageContext?.SEO.featuredImage}
          authorImg={imgHolder}
          date={pageContext.SEO.date}
          author={pageContext.brandName}
          html={pageContext.SEO.articleBody}
          title={pageContext.title}
          categories={pageContext.categories}
          timeToRead={pageContext.SEO.timeToRead}
          wordCount={pageContext.SEO.wordCount}
        />
      </main>
    </MainTemplateWrapper>
  );
};

export default SinglePost;

export const Head = ({ pageContext }) => {
  // console.log(pageContext);
  return (
    <>
      <Seo
        data={pageContext.SEO}
        killSeo={false}
        className={`one-column-body single-post`}
      />
    </>
  );
};
