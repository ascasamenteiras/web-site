import React from 'react'
import schemaYAML from '@Content/configs/schema-org.yaml'
import SchemaOrg from '../components/SchemaOrg'
import { getSrc } from 'gatsby-plugin-image'

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
}) => {
	const orgImageSrc = getSrc(organizationLogo?.childrenImageSharp[0])
	const organizationLogoVar = siteUrl + orgImageSrc
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
	} = schemaYAML.schema[0].card

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
			organizationLogo={organizationLogoVar}
		/>
	)
}

export default SchemaOrgContainer
