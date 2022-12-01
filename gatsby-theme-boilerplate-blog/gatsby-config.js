const path = require("path");
const rootDir = path.join(__dirname, "../");
const businessInfos = require("./package.json");

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
  plugins: [
    `gatsby-plugin-sass`,
    `gatsby-plugin-anchor-links`,
    `gatsby-plugin-react-helmet-async`,
    `gatsby-transformer-yaml`,
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaults: {
          formats: [`webp`,`avif`],
          quality: 86,
          breakpoints: [200, 350, 450, 750, 1080, 1200, 1920],
        },
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-catch-links`,
    `gatsby-plugin-image`,
    {
      resolve: "gatsby-remark-copy-linked-files",
      options: {
        destinationDir: path.resolve(rootDir, "content/posts/images/"),
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `yaml`,
        path: path.resolve(rootDir, "content/"),
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
        name: `posts`,
        path: path.resolve(rootDir, "content/posts/"),
        ignore: [`**/\.jpg`,`**/\.png`], // ignore files starting with a dot
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
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 2200,
              linkImagesToOriginal: false,
            },
          },
          `gatsby-remark-lazy-load`,
          {
            resolve: `gatsby-remark-relative-images`,
            options: {
              name: `images`,
            },
          },
          {
            resolve: "gatsby-remark-external-links",
            options: {
              target: "_blank",
              rel: "nofollow"
            }
          }
        ],
      },
    },
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
    {
      resolve: "gatsby-plugin-google-tagmanager",
      options: {
        id: "G-D2B5PVZ7TY",
      },
    },
  ],
};
