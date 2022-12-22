import React from "react";
import { StaticQuery, graphql } from "gatsby";
import { GatsbyImage, getImage, getSrc } from "gatsby-plugin-image";

import { Row } from "../components/InsertRow";
import HeadingBlock from "@BlockBuilder/HeadingBlock";
import MainTemplateWrapper from "@BlockBuilder/MainTemplateWrapper";
import PostsBlock from "@BlockBuilder/PostsBlock";
import { useSiteMetadatas } from "../tools/useSiteMetadatas";

const CategoryListPage = props => {
  const {
    site,
    bannerContent,
    boilerplateLogo,
    bgPatternImg,
    cardImage,
    imgHolder,
    bandeiraWhats,
    bandeiraQuestion,
  } = useSiteMetadatas();
  return (
    <StaticQuery
      query={graphql`
        query CategoriesList {
          allMarkdownRemark(
            sort: { fields: frontmatter___date, order: DESC }
            limit: 900
          ) {
            edges {
              node {
                fields {
                  slug
                }
                frontmatter {
                  updatedAt(
                    formatString: "DD [de] MMMM [de] YYYY"
                    locale: "pt-br"
                  )
                  title
                  categories
                  featuredImage {
                    childrenImageSharp {
                      gatsbyImageData(
                        width: 400
                        height: 200
                        placeholder: DOMINANT_COLOR
                        quality: 100
                      )
                    }
                  }
                }
                excerpt(pruneLength: 200)
              }
            }
          }
        }
      `}
      render={data => {
        const categoriesList = data.allMarkdownRemark.edges;

        const defaultQuestions = site.siteMetadata.questions;
        const imageQuery = getImage(bannerContent.childrenImageSharp[0]);
        const logoQuery = getImage(boilerplateLogo.childrenImageSharp[0]);
        const categoriesContext = props.pageContext.categories;

        const badgeWhats = getImage(bandeiraWhats.childrenImageSharp[0]);
        const badgeQuestion = getImage(bandeiraQuestion.childrenImageSharp[0]);

        const bgPatternSrc = getSrc(bgPatternImg.childrenImageSharp[0]);
        const myArticlesCategorized = [];
        categoriesList.forEach(element => {
          if (element.node.frontmatter.categories !== null) {
            if (
              element.node.frontmatter.categories.includes(categoriesContext)
            ) {
              myArticlesCategorized.push(element);
            }
          }
        });
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
            classes='blog-list'
            opt={{
              titleSeo: `Trends: ${props.pageContext.categories}`,
              pageQuestions: defaultQuestions,
              classes: "blog-list",
              articleUrl: props.location.href,
              schemaType: "blog",
              mainLogo: imgHolder,
              cardImage: getSrc(cardImage.childrenImageSharp[0]),
              blogListing: categoriesList.slice(0, 9),
              serverUrl:
                props.location.origin || site.siteMetadata.siteUrl || "/",
              badgesWhats: (
                <GatsbyImage
                  image={badgeWhats}
                  alt={"Botão do Whats"}
                  width={450}
                  height={230}
                  placeholder={"NONE"}
                  critical='true'
                  className={"whatsMe"}
                />
              ),
              badgesQuestion: (
                <GatsbyImage
                  image={badgeQuestion}
                  alt={"Botão do Whats"}
                  width={450}
                  height={230}
                  placeholder={"NONE"}
                  critical='true'
                  className={"whatsMe"}
                />
              ),
            }}
          >
            <Row
              opt={{
                classes: "banner colorME",
                isBoxed: true,
              }}
            >
              <GatsbyImage
                image={imageQuery}
                alt={"Crie a sua startup"}
                placeholder={"NONE"}
                critical='true'
                className={" banner-img"}
                width={720}
                height={85}
              />
            </Row>
            <main className='main-container' role='list'>
              <HeadingBlock classes='m30auto' importance={10} width={400}>
                Posts da Categoria: {props.pageContext.categories}
              </HeadingBlock>
              <Row opt={{ isBoxed: true, classes: "main-container-wrapper" }}>
                <PostsBlock
                  postList={myArticlesCategorized}
                  postsPerPage={site.siteMetadata.postsPerPage}
                  readMoreText='Ler Mais'
                  pagination={{
                    loadMoreBtn: true,
                    loadMore: "Ler Mais",
                  }}
                />
              </Row>
            </main>
          </MainTemplateWrapper>
        );
      }}
    />
  );
};
export default CategoryListPage;
