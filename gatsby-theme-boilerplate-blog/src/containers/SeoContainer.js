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
}) {
  const { site } = useSiteMetadatas();
  const metaDescription = description || site.siteMetadata.description;
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
      articleUrl={articleUrl}
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
