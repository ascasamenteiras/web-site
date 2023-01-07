import React from "react";
import { Script } from "gatsby";

import Seo from "../components/Seo";
import { useSiteMetadatas } from "../tools/useSiteMetadatas";

export default HeadContainer = ({ children }) => <Head>{children}</Head>;

export const Head = () => {
  const { site } = useSiteMetadatas();

  const metaDescription = description || site.siteMetadata.description;

  const theQuestions = pageQuestions || site.siteMetadata.questions;

  let articleUrlLastChar = null;
  let finalArticleUrl = null;
  if (articleUrl) {
    if (articleUrl.slice(-4) === "html") {
      topology = "amp";
    }
    if (topology !== "amp") {
      articleUrlLastChar = articleUrl.slice(-1);
      finalArticleUrl =
        articleUrlLastChar === "/" ? articleUrl : articleUrl + "/";
    }
    if (topology === "index") {
      finalArticleUrl = articleUrl.slice(0, -1);
    }
  }

  return (
    <HeadContainer>
      <Seo
        lang={lang}
        title={titleSeo || title}
        siteTitle={site.siteMetadata.title}
        url={site.siteMetadata.organization.url}
        metaDescription={metaDescription}
        description={description || site.siteMetadata.description}
        meta={meta}
        siteUrl={site.siteMetadata.siteUrl}
        image={featuredImage || site.siteMetadata.image}
        organizationLogo={mainLogo}
        author={authorSeo || site.siteMetadata.organization.name}
        organization={site.siteMetadata.organization}
        social={site.siteMetadata.social}
        datePublished={datePublished}
        dateCreated={site.siteMetadata.dateCreated}
        schemaType={schemaType}
        socialSameAs={site.siteMetadata.social}
        blogListing={blogListing}
        articleBody={articleBody}
        keywords={site.siteMetadata.keywords}
        cardImage={cardImage || null}
        serverUrl={site.siteMetadata.siteUrl || serverUrl}
        themeColor={site.siteMetadata.themeColor}
        pageQuestions={theQuestions}
        articleUrl={finalArticleUrl}
        killSEO={killSEO}
        topology={topology}
      />
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GATSBY_GTAG}`}
        strategy='off-main-thread'
      />
      <Script id='gtag-config' strategy='off-main-thread' forward={[`gtag`]}>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments)};
          gtag('js', new Date());
          gtag('config', ${process.env.GATSBY_GTAG}, { page_path: location ? location.pathname + location.search + location.hash : undefined })
        `}
      </Script>
    </HeadContainer>
  );
};
