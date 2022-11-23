import React from "react";
import { Helmet } from "react-helmet-async";

export default React.memo(
  ({
    author,
    siteUrl,
    datePublished,
    // defaultTitle,
    description,
    image,
    schemaType,
    // organization,
    questions,
    title,
    // url,
    // socialSameAs,
    // blogListing,
    articleBody,
    keywords,
    dateCreated,
    organizationLogo,
    telephone,
    sameAs,
    email,
    brandName,
    brandDescription,
    // brandUrl,
    inLanguage,
    // keywordsSchema,
    featuredImage,
  }) => {
    const dateNow = Date.now();
    const authorType =
      author === "As Casamenteiras" ? "Organization" : "Person";
    let socialValues = [];
    Object.values(sameAs).forEach(social => socialValues.push(social));
    const orgSchema = [
      {
        "@type": ["Organization"],
        "@context": "http://schema.org",
        name: "As Casamenteiras",
        url: siteUrl,
        email: email,
        description: brandDescription,
        sameAs: socialValues,
        logo: organizationLogo,
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: telephone,
            contactType: "Serviço Ao Cliente",
          },
        ],
      },
    ];

    const webSiteSchema = [
      {
        "@type": "WebSite",
        "@context": "http://schema.org",
        name: title,
        description: brandDescription,
        url: siteUrl,
        keywords: [keywords.map(e => e)],
        inLanguage: inLanguage,
        copyrightYear: new Date().getFullYear(),
        datePublished: dateCreated,
        dateModified: dateNow,
        image: image || featuredImage,
        sameAs: socialValues,
      },
    ];

    // "potentialAction":
    // {
    // 	"@type": "SearchAction",
    // 	"target":
    // 	{
    // 		"@type": "EntryPoint",
    // 		"urlTemplate": "https://busca.uol.com.br/result.html?term={search_term_string}#gsc.tab=0&gsc.q={search_term_string}&gsc.page=1"
    // 	},
    // 	"query-input": "required name=search_term_string"
    // }

    const articleSchema = [
      {
        "@context": "http://schema.org",
        "@type": "NewsArticle",
        name: title,
        headline: description.substring(0, 130),
        description: description,
        author: {
          "@type": authorType,
          name: author,
          url: siteUrl,
        },
        image: {
          "@type": "ImageObject",
          url: image || featuredImage,
          height: 156,
          width: 60,
        },
        articleBody: articleBody,
        publisher: {
          "@type": "Organization",
          name: brandName,
          url: siteUrl,
          logo: {
            "@type": "ImageObject",
            url: organizationLogo,
            width: 156,
            height: 60,
          },
        },
        datePublished: datePublished,
      },
    ];
    let arrayQuestions = []
    questions.forEach(question => {
      return arrayQuestions.push(
        {
          "@type": "Question",
          "name": question[0],
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `<p>${question[1]}</p>`
          }
        }
      )
    });
    
    
   const questionSchema = [{
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": 
      [
        arrayQuestions
      ]
    }];

    return (
      <Helmet>
        {/* Schema.org tags */}
        {schemaType === "article" ? (
          <script type='application/ld+json' data-schema='Article'>
            {JSON.stringify(articleSchema)}
          </script>
        ) : null}
        <script type='application/ld+json' data-schema='WebSite'>
          {JSON.stringify(webSiteSchema)}
        </script>
        <script type='application/ld+json' data-schema='Organization'>
          {JSON.stringify(orgSchema)}
        </script>
        <script type='application/ld+json'>
          {JSON.stringify(questionSchema)}
        </script>
      </Helmet>
    );
  }
);
