import { useSiteMetadatas } from "../tools/useSiteMetadatas";
import { getSrc } from "gatsby-plugin-image";

const defaultSchema = location => {
  const { cardImage, imgHolder, site } = useSiteMetadatas();

  const {
    description,
    keywords,
    siteUrl,
    dateCreated,
    organization,
    themeColor,
  } = site.siteMetadata;
  return {
    schemaType: "Blog",
    startedWebsiteDate: dateCreated,
    pageTitle: `Boileplate`,
    pageDescription: description,
    authorWebsiteData: organization.url,
    authorPostData: organization.name,
    highlightImage: cardImage,
    brandMainLogo: imgHolder,
    brandCardLogo: imgHolder,
    brandPhone: organization.phone,
    brandEmail: organization.email,
    brandName: organization.name,
    brandSocialArr: {
      instagram: "https://www.instagram.com/ascasamenteiras_",
      facebook: "https://www.facebook.com/ascasamenteiras_",
      linkedIn: "https://www.linkedin.com/company/ascasamenteiras_",
      youtube: "asd",
      twitter: "asd",
    },
    buildServerUrl: siteUrl,
    websiteLanguage: "pt-BR",
    brandThemeColor: themeColor,
    brandKeywords: keywords,
    brandWebsiteUrl: siteUrl,
    actualPage: siteUrl + location.pathname || "/",
  };
};

const articleSchema = (data, location) => {
  const { cardImage, imgHolder, site } = useSiteMetadatas();
  const post = data.markdownRemark;
  const { keywords, dateCreated, organization, themeColor, siteUrl } =
    site.siteMetadata;
  return {
    schemaType: "article",
    startedWebsiteDate: dateCreated,
    createdPageDate: post.frontmatter.updatedAt,
    pageTitle: `${post.frontmatter.title} - Boileplate`,
    pageDescription: post.excerpt,
    authorWebsiteData: organization.url,
    authorPostData: post.frontmatter.author,
    highlightImage:
      siteUrl +
      post?.frontmatter?.featuredImage?.childrenImageSharp[0].gatsbyImageData
        .images.fallback.src,
    postBody: post.html,
    brandMainLogo: siteUrl + getSrc(imgHolder?.childrenImageSharp[0]),
    brandCardLogo: cardImage,
    brandPhone: organization.phone,
    brandEmail: organization.email,
    brandName: organization.name,
    brandSocialArr: {
      instagram: "https://www.instagram.com/ascasamenteiras_schema",
      facebook: "https://www.facebook.com/ascasamenteiras_schema",
      linkedIn: "https://www.linkedin.com/company/ascasamenteiras_schema",
      youtube: "asd",
      twitter: "asd",
    },
    buildServerUrl: siteUrl || "/",
    websiteLanguage: "pt-BR",
    brandThemeColor: themeColor,
    brandKeywords: keywords,
    brandWebsiteUrl: siteUrl,
    actualPage: siteUrl + location.pathname || "/",
  };
};

export { defaultSchema, articleSchema };
