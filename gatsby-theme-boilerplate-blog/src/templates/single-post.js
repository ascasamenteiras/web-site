import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { GatsbyImage, getImage, getSrc } from "gatsby-plugin-image";

import MainTemplateWrapper from "@BlockBuilder/MainTemplateWrapper";
import SinglePostBlock from "@BlockBuilder/SinglePostBlock";
import { useSiteMetadatas } from "../tools/useSiteMetadatas";

const SinglePost = ({ pageContext, location, data: { mdx } }) => {
  const { wordCount, timeToRead } = pageContext;
  const postData = useStaticQuery(graphql`
    query SinglePost($locale: String!, $title: String!) {
      mdx(
        sort: { fields: frontmatter___date, order: DESC }
        frontmatter: { title: { eq: $title } }
        fields: {
          locale: { eq: $locale }
          frontmatter: { createdAt: { lt: "null" }, status: { eq: true } }
        }
      ) {
        frontmatter {
          date(formatString: "DD [de] MMMM [de] YYYY", locale: "pt-br")
          xmlDate: date
          topology
          title
          author
          status
          questions
          featuredPost
          homeHighlight
          homeHighlightRelated
          homeHighlightRelatedList
          categories
          featuredImage {
            childrenImageSharp {
              gatsbyImageData(
                width: 1200
                height: 627
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
  const post = postData.frontmatter;
  const { title, description, questions } = post.mdx;

  const {
    imgHolder,
    bgPatternImg,
    boilerplateLogo,
    site,
    bandeiraWhats,
    bandeiraQuestion,
  } = useSiteMetadatas();
  const badgeWhats = getImage(bandeiraWhats.childrenImageSharp[0]);
  const badgeQuestion = getImage(bandeiraQuestion.childrenImageSharp[0]);

  const bgPatternSrc = getSrc(bgPatternImg.childrenImageSharp[0]);
  const logoQuery = getImage(boilerplateLogo.childrenImageSharp[0]);

  const defaultQuestions = site.siteMetadata.questions;
  return (
    <MainTemplateWrapper
      backgroundImage={{
        src: bgPatternSrc,
      }}
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
      classes='single-post'
      opt={{
        titleSeo: `${post.frontmatter.title}`,
        authorSeo: post.frontmatter.author,
        classes: "single-post",
        pageQuestions: questions || defaultQuestions,
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
        topology: "post",
        mainLogo: imgHolder,
        description: post.excerpt,
        serverUrl: location.origin || site.siteMetadata.siteUrl || "/",
        articleUrl: location.href,
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
            width={70}
            height={70}
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
          html={post.body}
          title={post.frontmatter.title}
          categories={post.frontmatter.categories}
          timeToRead={wordCount}
          wordCount={timeToRead}
        />
      </main>
    </MainTemplateWrapper>
  );
};

export default SinglePost;
