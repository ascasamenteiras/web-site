import React from "react";
const Seo = ({ data, killSeo, className }) => {
  // console.log("data");
  // console.log(data);
  // console.log(data ? data : "nada");
  if (killSeo) {
    return (
      <>
        <title>NO SEO</title>
        <meta name='robots' content={"noindex, nofollow"} />
      </>
    );
  }
  if (!data) {
    return (
      <>
        <title>NO SEO DATA</title>
      </>
    );
  }
  const isBrowser = () => typeof window !== "undefined";
  if (!isBrowser) {
    return null;
  }
  const dateNow = Date.now();
  const authorType =
    data.author === "Equipe As Casamenteiras" ? "Organization" : "Person";
  let socialValues = [];
  Object.values(data.social).forEach(social => socialValues.push(social));
  const orgSchema = [
    {
      "@type": ["Organization"],
      "@context": "https://schema.org",
      name: "As Casamenteiras",
      url: data.siteUrl,
      email: data.brandEmail,
      description: data.brandDescription,
      sameAs: socialValues,
      logo: data.brandLogo,
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: data.brandPhone,
          contactType: "Serviço Ao Cliente",
        },
      ],
    },
  ];

  const webSiteSchema = [
    {
      "@type": "WebSite",
      "@context": "https://schema.org",
      name: data.title,
      description: data.brandDescription,
      url: data.siteUrl,
      keywords: [data.keywords.map(e => e)],
      inLanguage: data.i18n,
      copyrightYear: new Date().getFullYear(),
      datePublished: data.dateCreated,
      dateModified: data.dateNow,
      image: data.brandCardImage || data.featuredImage,
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
      "@context": "https://schema.org",
      "@type": "NewsArticle",
      name: data.title,
      headline: data.description,
      description: data.description,
      author: {
        "@type": authorType,
        name: data.author,
        url: data.siteUrl,
      },
      image: {
        "@type": "ImageObject",
        url: data.brandCardImage || data.featuredImage,
        height: 156,
        width: 60,
      },
      articleBody: data.articleBody,
      publisher: {
        "@type": "Organization",
        name: data.brandName,
        url: data.siteUrl,
        logo: {
          "@type": "ImageObject",
          url: data.brandLogo,
          width: 156,
          height: 60,
        },
      },
      datePublished: data.datePublished,
    },
  ];
  let arrayQuestions = [];

  let questionsArray = [];

  data?.questions?.forEach(q => {
    questionsArray.push(q.split(":"));
  });

  questionsArray?.forEach(question => {
    return arrayQuestions.push({
      "@type": "Question",
      name: question[0],
      acceptedAnswer: {
        "@type": "Answer",
        text: `<p>${question[1]}</p>`,
      },
    });
  });

  const questionSchema = [
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [arrayQuestions],
    },
  ];

  return (
    <>
      <html lang={data.i18n} />
      <body className={className} />

      <title>{data.title}</title>
      <meta name='robots' content={"index, follow"} />
      <meta name='description' content={data.description} />
      {data.brandCardImage || data.featuredImage ? (
        <meta
          name='image'
          content={data.brandCardImage || data.featuredImage}
        />
      ) : (
        ""
      )}
      <meta name='keywords' content={data.keywords.map(e => e)} />

      <meta property='article:author' content={data.siteUrl + "/biografia/"} />
      <meta name='author' content={data.author} />
      <meta property='article:author' content={data.siteUrl} />
      <meta property='article:publisher' content={data.siteUrl} />

      {/* OpenGraph tags */}
      {data.topology === "post" ? (
        <meta property='og:type' content='article' />
      ) : (
        <meta property='og:type' content='website' />
      )}
      <meta property='og:url' content={data.articleUrl} />
      <meta property='og:site_name' content={data.title} />
      <meta property='og:title' content={data.title} />
      <meta property='og:description' content={data.description} />
      <meta
        property='og:image'
        content={data.brandCardImage || data.featuredImage}
      />
      <meta name='theme-color' content={data.themeColor || "#FF0081"} />
      <link
        rel='canonical'
        href={data.siteUrl + (data.slug === "/" ? "/" : "/" + data.slug)}
      />
      {data.fbAppID ? (
        <meta property='fb:app_id' content={data.social.fbAppID} />
      ) : null}
      {data.social.twitter ? (
        <meta name='twitter:card' content='summary_large_image' />
      ) : (
        ""
      )}
      {data.social.twitter ? (
        <meta name='twitter:creator' content={data.social.twitter} />
      ) : null}
      {data.social.twitter ? (
        <meta name='twitter:title' content={data.title} />
      ) : (
        ""
      )}
      {data.social.twitter ? (
        <meta name='twitter:description' content={data.description} />
      ) : (
        ""
      )}
      {data.social.twitter ? (
        <meta
          name='twitter:image:src'
          content={data.brandCardImage || data.featuredImage}
        />
      ) : (
        ""
      )}
      {data.social.twitter ? (
        <meta name='twitter:site' content={`@` + data.social.twitter} />
      ) : (
        ""
      )}
      {data.datePublished ? (
        <meta name='article:published_time' content={data.datePublished} />
      ) : (
        ""
      )}
      {/* Schema.org tags */}
      {data.topology === "article" ? (
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
    </>
  );
};
export default Seo;
