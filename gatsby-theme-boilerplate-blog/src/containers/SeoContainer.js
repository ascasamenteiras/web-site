import React from "react";
import PropTypes from "prop-types";

import Seo from "../components/Seo";
import { useSiteMetadatas } from "../tools/useSiteMetadatas";

function SeoContainer({
  // frontmatter = {},
  description,
  lang,
  meta,
  title,
  datePublished,
  schemaType,
  titleSeo,
  authorSeo,
  featuredImage,
  blogListing,
  articleBody,
  mainLogo,
  cardImage,
  serverUrl,
  articleUrl,
  pageQuestions,
  killSEO,
  topology,
}) {
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
  );
}

SeoContainer.defaultProps = {
  lang: `pt-br`,
  meta: [],
  description: ``,
};

SeoContainer.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
};

export default SeoContainer;
