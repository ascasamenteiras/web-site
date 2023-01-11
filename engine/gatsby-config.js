const businessInfos = require("../gatsby-theme-boilerplate-blog/package.json");
module.exports = {
  plugins: [
    {
      resolve: "gatsby-theme-boilerplate-blog",
      options: {
        fonts: [
          businessInfos.importFont.font01,
          businessInfos.importFont.font02,
          businessInfos.importFont.font03,
          businessInfos.importFont.font04,
          businessInfos.importFont.font05,
        ],
        display: "swap",
        preconnect: true,
        attributes: {
          rel: "stylesheet preload prefetch",
        },
      },
    },
    `gatsby-plugin-offline`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `As Casamenteiras`,
        short_name: `AsCasamenteiras`,
        start_url: `/`,
        background_color: `#011624`,
        theme_color: `#032741`,
        display: `standalone`,
        icon: `../gatsby-theme-boilerplate-blog/static/images/android-chrome-512x512.png`,
      },
    },
  ],
};
