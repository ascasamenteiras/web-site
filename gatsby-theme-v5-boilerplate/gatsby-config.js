/**
 * @type {import('gatsby').GatsbyConfig}
 */

// gatsby-config.js
// requiring path and fs modules
// imports and configs
// xxxxxxxxxxxxxxxxxx
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

const { readdir, readFile } = require("fs/promises");

const path = require("path");
const fs = require("fs");

const rootDir = path.join(__dirname, "../");
const schemaOrg = require(path.resolve(
  rootDir,
  `content/schemas/default.json`
));
const card = schemaOrg.schema[0].card[0];
const contentPath = path.resolve(rootDir, card.contentPath);

const staticImagesPathCard = card.staticImagesPath;
const staticThemePathCard = card.themePath;

const staticImagesPath = path.resolve(
  rootDir,
  staticThemePathCard + "/" + staticImagesPathCard
);

//passsing directoryPath and callback function
let imagePathFolders = new Set();

const contentDir = srcPath =>
  fs
    .readdirSync(srcPath)
    .filter(file => fs.statSync(path.join(srcPath, file)).isDirectory());

contentDir(contentPath).forEach(element => {
  contentDir(contentPath + "/" + element).forEach(ele => {
    if (ele === "images") {
      imagePathFolders.add(contentPath + "/" + element + "/" + ele);
    }
  });
});

module.exports = {
  trailingSlash: card.trailingSlash,
  siteMetadata: {
    title: `My Gatsby Site`,
    siteUrl: `https://www.yourdomain.tld`,
  },
  flags: {
    DEV_SSR: true,
  },
  plugins: [
    `gatsby-transformer-json`,

    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaults: {
          formats: card.imageFormats,
          quality: card.imageQuality,
          breakpoints: card.imageBreakPoints,
        },
      },
    },

    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: path.resolve(__dirname, staticImagesPath),
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
        path: path.resolve(rootDir, "content/landings/images/"),
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: path.resolve(rootDir, "content/pages/images/"),
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `schemaJSON`,
        path: path.resolve(rootDir, "content/schemas"),
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `brandImages`,
        path: path.resolve(rootDir, contentPath + "/images/brand"),
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `generalImages`,
        path: path.resolve(rootDir, contentPath + "/images/general"),
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `heroImages`,
        path: path.resolve(rootDir, contentPath + "/images/hero"),
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pressImages`,
        path: path.resolve(rootDir, contentPath + "/images/press"),
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `partnerImages`,
        path: path.resolve(rootDir, contentPath + "/images/partners"),
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `treatmentImages`,
        path: path.resolve(rootDir, contentPath + "/images/treatment"),
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `indexImages`,
        path: path.resolve(rootDir, contentPath + "/images/index"),
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: path.resolve(rootDir, contentPath + "/posts"),
        ignore: [`**/\.jpg`, `**/\.png`], // ignore files starting with a dot
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `landings`,
        path: path.resolve(rootDir, contentPath + "/landings"),
        ignore: [`**/\.jpg`, `**/\.png`], // ignore files starting with a dot
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: path.resolve(rootDir, contentPath + "/pages"),
        ignore: [`**/\.jpg`, `**/\.png`], // ignore files starting with a dot
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "components",
        path: path.resolve(rootDir, contentPath + "/slices/components"),
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "sections",
        path: path.resolve(rootDir, contentPath + "/slices/components"),
      },
    },
    `gatsby-transformer-sharp`,
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
              maxWidth: card.imageMaxWidth,
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
        ],
      },
    },
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-transformer-excel`,
      options: {
        raw: false,
      },
    },

    {
      resolve: `gatsby-plugin-alias-imports`,
      options: {
        alias: {
          "@Theme": path.resolve(rootDir, card.themePath),
          "@Containers": path.resolve(
            rootDir,
            card.themePath + "/src/containers"
          ),
          "@Components": path.resolve(
            rootDir,
            card.themePath + "/src/components"
          ),
          "@Tools": path.resolve(rootDir, card.themePath + "/src/tools"),
          "@Templates": path.resolve(
            rootDir,
            card.themePath + "/src/templates"
          ),
          "@Slices": path.resolve(rootDir, card.themePath + "/src/slices"),
          "@Conteudo": path.resolve(rootDir, contentPath),
          "@Posts": path.resolve(rootDir, contentPath + "/posts"),
          "@I18n": path.resolve(rootDir, contentPath + "/i18n"),
          "@Content": path.resolve(rootDir, contentPath),
          "@Context": path.resolve(__dirname, "src/context"),
        },
        extensions: ["js", "scss"],
      },
    },
    {
      resolve: "gatsby-plugin-mailchimp",
      options: {
        endpoint: process.env.MC_ENDPOINT, // string; add your MC list endpoint here; see instructions below
        timeout: 3500, // number; the amount of time, in milliseconds, that you want to allow mailchimp to respond to your request before timing out. defaults to 3500
      },
    },
    {
      resolve: `gatsby-business-in-build`,
      options: {
        name: "As Casamenteiras - Website",
        version: "0.1.0",
        developer: "As Casamenteiras",
        coauthorBusiness: "MB Corp",
        project: "As Casamenteiras - Website",
        url: "https://ascasamenteiras.com.br",
        message: "Please, pay attention.",
      },
    },
    `gatsby-plugin-sass`,
    `gatsby-plugin-netlify`,
  ],
};
