const path = require("path");
const rootDir = path.join(__dirname, "../");
const businessInfos = require("./package.json");
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});
require("dotenv").config();
module.exports = {
  siteMetadata: {
    pathPrefix: businessInfos.urlPrefix,
    title: businessInfos.appName,
    description: businessInfos.description,
    author: businessInfos.author,
    questions: businessInfos.questions,
    siteUrl: businessInfos.siteUrl,
    searchBaseUrl: businessInfos.searchBaseUrl,
    keywords: businessInfos.keywords,
    image: `${__dirname}/static/images/${businessInfos.organization.logo}`,
    dateCreated: businessInfos.dateCreated,
    postsPerPage: businessInfos.postsPerPage,
    themeColor: businessInfos.themeColor,
    organization: {
      name: businessInfos.organization.name,
      phone: businessInfos.organization.phone,
      email: businessInfos.organization.email,
      url: businessInfos.organization.url,
      logo: businessInfos.organization.logo,
      cardImage: businessInfos.organization.cardImage,
    },
    social: {
      instagram: businessInfos.clientSocial.instagram,
      facebook: businessInfos.clientSocial.facebook,
      linkedIn: businessInfos.clientSocial.linkedIn,
      youtube: businessInfos.clientSocial.youtube,
      twitter: businessInfos.clientSocial.twitter,
    },
  },
  trailingSlash: "always",
  plugins: [
    `gatsby-plugin-sass`,
    // `gatsby-transformer-yaml`,
    {
      resolve: "gatsby-plugin-mailchimp",
      options: {
        endpoint:
          "https://ascasamenteiras.us21.list-manage.com/subscribe/post?u=7788204f1e9c743f2274eb8bc&amp;id=07328022a5&amp;f_id=0076c4e1f0", // string; add your MC list endpoint here; see instructions below
        timeout: 3500, // number; the amount of time, in milliseconds, that you want to allow mailchimp to respond to your request before timing out. defaults to 3500
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: path.resolve(__dirname, "static/images/"),
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: path.resolve(rootDir, "content/posts/images/"),
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: path.resolve(rootDir, "content/landing/images/"),
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: path.resolve(rootDir, "content/posts/"),
        ignore: [`**/\.jpg`, `**/\.png`], // ignore files starting with a dot
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `landing`,
        path: path.resolve(rootDir, "content/landing/"),
        ignore: [`**/\.jpg`, `**/\.png`], // ignore files starting with a dot
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: path.resolve(rootDir, "content/pages"),
      },
    },
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaults: {
          formats: [`webp`],
          quality: 86,
          breakpoints: [28, 44, 200, 350, 450, 750, 1080, 1200, 1920],
        },
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-catch-links`,
    `gatsby-plugin-image`,
    // {
    //   resolve: `gatsby-source-filesystem`,
    //   options: {
    //     name: `yaml`,
    //     path: path.resolve(rootDir, "content/"),
    //   },
    // },

    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-relative-images`,
            options: {
              name: `images`,
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 2200,
              linkImagesToOriginal: false,
            },
          },
          {
            resolve: "gatsby-remark-external-links",
            options: {
              target: "_blank",
              rel: "nofollow",
            },
          },
          // `gatsby-remark-copy-linked-files`,
        ],
      },
    },
    {
      resolve: `gatsby-plugin-subfont`,
      options: {
        silent: true,
        fallbacks: false,
        inlineFonts: true,
        fontDisplay: "optional",
      },
    },
    `gatsby-transformer-json`,
    // {
    //   resolve: `@slixites/gatsby-plugin-google-fonts`,
    //   options: {
    //     fonts: [
    //       businessInfos.importFont.font01,
    //       businessInfos.importFont.font02,
    //       businessInfos.importFont.font03,
    //       businessInfos.importFont.font04,
    //     ],
    //     display: 'swap',
    //     preconnect: true,
    //     attributes: {
    //       rel: 'stylesheet preload prefetch',
    //     },
    //   },
    // },
    `gatsby-plugin-netlify`,
    {
      resolve: `gatsby-plugin-alias-imports`,
      options: {
        alias: {
          "@BlockBuilder": path.resolve(__dirname, "src/modules/block-builder"),
          "@Posts": path.resolve(rootDir, "content/posts"),
          "@Content": path.resolve(rootDir, "content"),
          "@Images": path.resolve(__dirname, "static/images"),
        },
        extensions: ["js", "scss"],
      },
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /static\/images/, // See below to configure properly
        },
      },
    },
  ],
};
