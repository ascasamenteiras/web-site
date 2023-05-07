import React, { useState } from "react";
import { Link } from "gatsby";
import { GatsbyImage, getImage, getSrc } from "gatsby-plugin-image";
import { Row } from "@Components/InsertRow";
import HeadingBlock from "@Slices/HeadingBlock";
import MainTemplateWrapper from "@Slices/MainTemplateWrapper";
import { useSiteMetadatas } from "../tools/useSiteMetadatas";

const NotFoundPage = ({ pageContext }) => {
  const { schemasJSON } = useSiteMetadatas();
  const globalSubs = schemasJSON?.pagesHelper?.globals;
  return (
    <MainTemplateWrapper
      logo={"darkLogo.publicURL"}
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
      <main>
        <h1>Page not found</h1>
        <p>
          Sorry 😔, we couldn’t find what you were looking for.
          <br />
          {process.env.NODE_ENV === "development" ? (
            <>
              <br />
              Try creating a page in <code>src/pages/</code>.
              <br />
            </>
          ) : null}
          <br />
          <Link to='/'>Go home</Link>.
        </p>
      </main>
    </MainTemplateWrapper>
  );
};

export default NotFoundPage;

export const Head = () => <title>Not found</title>;
