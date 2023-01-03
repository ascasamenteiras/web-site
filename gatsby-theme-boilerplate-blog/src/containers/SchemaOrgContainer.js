import React from "react";
import schemaYAML from "@Content/configs/schema-org.json";
import SchemaOrg from "../components/SchemaOrg";
import { getSrc } from "gatsby-plugin-image";

const SchemaOrgContainer = ({
  schemaType,
  siteUrl,
  title,
  image,
  featuredImage,
  description,
  datePublished,
  author,
  organization,
  socialSameAs,
  blogListing,
  articleBody,
  keywords,
  dateCreated,
  organizationLogo,
  serverUrl,
  pageQuestions,
}) => {
  const orgImageSrc = getSrc(organizationLogo?.childrenImageSharp[0]);
  const organizationLogoVar = siteUrl + orgImageSrc;
  const {
    alternateName,
    appName,
    brandDescription,
    brandName,
    brandUrl,
    contactType,
    datePublishedSchema,
    email,
    inLanguage,
    keywordsSchema,
    potentialAction,
    sameAs,
    telephone,
    version,
  } = schemaYAML.schema[0].card;
  // console.log(schemaYAML.schema[0].card);

  console.log("datePublished");
  console.log(datePublished);
  const dP = new Date(datePublished);
  console.log("dP console !");
  console.log(dP.setFullYear(dP.getFullYear() - 18));
  console.log("datePublishedSchema");
  console.log(datePublishedSchema);

  let questionsArray = [];
  pageQuestions.forEach(q => {
    questionsArray.push(q.split(":"));
  });

  return (
    <SchemaOrg
      telephone={telephone}
      sameAs={sameAs}
      email={email}
      brandName={brandName}
      brandDescription={brandDescription}
      brandUrl={brandUrl}
      inLanguage={inLanguage}
      schemaType={schemaType}
      keywordsSchema={keywordsSchema}
      url={siteUrl}
      title={title}
      image={image}
      featuredImage={featuredImage}
      description={description}
      datePublished={datePublished}
      siteUrl={siteUrl}
      author={author}
      organization={organization}
      defaultTitle={title}
      socialSameAs={socialSameAs}
      blogListing={blogListing}
      articleBody={articleBody}
      keywords={keywords}
      dateCreated={dateCreated}
      questions={questionsArray}
      organizationLogo={organizationLogoVar}
    />
  );
};

export default SchemaOrgContainer;
