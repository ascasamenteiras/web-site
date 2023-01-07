const fs = require("fs");
const path = require("path");
const rootDir = path.join(__dirname, "../");
const businessInfos = require("./package.json");
const locales = require(`../content/translations/i18n`);
const redirects = require(`../content/configs/redirects.json`);
const {
  localizedSlug,
  findKey,
  removeTrailingSlash,
} = require(`./src/tools/gatsby-node-helpers`);

exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions;

  // First delete the incoming page that was automatically created by Gatsby
  // So everything in src/pages/
  deletePage(page);

  // Grab the keys ('en' & 'de') of locales and map over them
  Object.keys(locales).map(lang => {
    // Use the values defined in "locales" to construct the path
    const localizedPath = locales[lang].default
      ? page.path
      : `${locales[lang].path}${page.path}`;

    return createPage({
      // Pass on everything from the original page
      ...page,
      // Since page.path returns with a trailing slash (e.g. "/de/")
      // We want to remove that
      path: removeTrailingSlash(localizedPath),
      // Pass in the locale as context to every page
      // This context also gets passed to the src/components/layout file
      // This should ensure that the locale is available on every page
      context: {
        ...page.context,
        locale: lang,
        dateFormat: locales[lang].dateFormat,
      },
    });
  });
};

// As you don't want to manually add the correct language to the frontmatter of each file
// a new node is created automatically with the filename
// It's necessary to do that -- otherwise you couldn't filter by language

// Adding slug field to each post
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;

  // Ensures we are processing only markdownX files

  if (node.internal.type === "Mdx") {
    // Use path.basename
    // https://nodejs.org/api/path.html#path_path_basename_path_ext
    const name = path.basename(node.fileAbsolutePath, `.mdx`);
    // Use `createFilePath` to turn markdown files in our `data/faqs` directory into `/faqs/slug`

    // Check if post.name is "index" -- because that's the file for default language
    // (In this case "pt_br")
    const isDefault = name === `index`;

    // Find the key that has "default: true" set (in this case it returns "pt_br")
    const defaultKey = findKey(locales, o => o.default === true);

    // Files are defined with "name-with-dashes.lang.mdx"
    // name returns "name-with-dashes.lang"
    // So grab the lang from that string
    // If it's the default language, pass the locale for that
    const lang = isDefault ? defaultKey : name.split(`.`)[1];

    createNodeField({ node, name: `locale`, value: lang });
    createNodeField({ node, name: `isDefault`, value: isDefault });
  }
};

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;
  const { createRedirect } = actions;

  const redirectsArray = redirects.fromToPath;

  redirectsArray.forEach(redirect => {
    createRedirect({
      fromPath: redirect.fromPath,
      toPath: redirect.toPath,
    });
  });

  const result = await graphql(
    `
      {
        site {
          siteMetadata {
            siteUrl
          }
        }
        allFile(
          sort: { fields: frontmatter___date, order: DESC }
          filter: {
            frontmatter: { createdAt: { lt: "null" }, status: { eq: true } }
          }
        ) {
          edges {
            node {
              relativeDirectory
              childMdx {
                fields {
                  locale
                  isDefault
                }
                frontmatter {
                  date(formatString: "DD [de] MMMM [de] YYYY", locale: "pt-br")
                  xmlDate: date
                  topology
                  title
                  author
                  status
                  questions
                  featuredPost
                  homeHighlight
                  homeHighlightRelated
                  homeHighlightRelatedList
                  categories
                  featuredImage {
                    childrenImageSharp {
                      gatsbyImageData(
                        width: 1200
                        height: 627
                        placeholder: NONE
                        quality: 80
                      )
                    }
                  }
                }
              }
              timeToRead
              wordCount {
                paragraphs
                sentences
                words
              }
              excerpt(pruneLength: 200)
              htmlAst
              html
            }
          }
        }
        categoriesGroup: allFile(
          filter: { frontmatter: { createdAt: { lt: "null" } } }
          limit: 800
        ) {
          group(field: frontmatter___categories) {
            fieldValue
            nodes {
              headings {
                value
              }
              childMdx {
                fields {
                  locale
                  isDefault
                }
                frontmatter {
                  featuredImage {
                    childrenImageSharp {
                      gatsbyImageData
                    }
                  }
                }
              }
            }
          }
        }
        allPages: allFile(
          filter: {
            frontmatter: { status: { eq: true }, topology: { eq: "pages" } }
          }
        ) {
          edges {
            node {
              relativeDirectory
              childMdx {
                fields {
                  locale
                  isDefault
                }
                frontmatter {
                  status
                  title
                }
              }
              htmlAst
            }
          }
        }
        AllLandings: allFile(
          filter: {
            frontmatter: { status: { eq: true }, topology: { eq: "landing" } }
          }
        ) {
          edges {
            node {
              relativeDirectory
              childMdx {
                fields {
                  locale
                  isDefault
                }
                frontmatter {
                  title
                  status
                }
              }
              htmlAst
            }
          }
        }
        storiesA: file(
          relativePath: { eq: "as-casamenteiras-stories-ante-final.png" }
        ) {
          childrenImageSharp {
            gatsbyImageData(width: 900, height: 675, quality: 80)
          }
        }
        storiesZ: file(
          relativePath: { eq: "as-casamenteiras-stories-final.png" }
        ) {
          childrenImageSharp {
            gatsbyImageData(width: 900, height: 675, quality: 80)
          }
        }
      }
    `
  );

  if (result.errors) {
    reporter.panicOnBuild("Error loading MDX result", result.errors);
  }
  const landings = result.data.AllLandings.edges;

  landings.forEach(({ node }) => {
    if (node.childMdx.frontmatter.status === true) {
      const slug = node.relativeDirectory;
      const landing = node.childMdx;
      const title = landing.frontmatter.title;

      // Use the fields created in exports.onCreateNode
      const locale = landing.fields.locale;
      const isDefault = landing.fields.isDefault;

      createPage({
        path: localizedSlug({ isDefault, locale, slug }),
        component: path.resolve(
          rootDir,
          `gatsby-theme-boilerplate-blog/src/templates/half-div.js`
        ),
        context: {
          title: title,
          // content: node.html,
          // headline: node.childMdx.frontmatter.headline,
          // questions: node.childMdx.frontmatter.questions,
          // excerpt: node.excerpt,
          // landingCTA: node.childMdx.frontmatter.landingCTA,
          // emailCTA: node.childMdx.frontmatter.emailCTA,
          // featuredImage: node.childMdx.frontmatter.featuredImage,
          // Pass both the "title" and "locale" to find a unique file
          // Only the title would not have been sufficient as articles could have the same title
          // in different languages, e.g. because an english phrase is also common in german
          locale,
        },
      });
    }
  });

  const pages = result.data.allPages.edges;
  let allPages = [];

  pages.forEach(({ node }) => {
    const slug = node.relativeDirectory;
    const title = node.childMdx.frontmatter.title;
    // Use the fields created in exports.onCreateNode
    const locale = node.childMdx.fields.locale;
    const isDefault = node.childMdx.fields.isDefault;
    let imgsPageObj = [];
    const imagePageSrc =
      businessInfos.siteUrl +
      node.childMdx.frontmatter.featuredImage.childrenImageSharp[0]
        .gatsbyImageData.images.fallback.src;
    if (node.childMdx.frontmatter.status === true) {
      createPage({
        path: localizedSlug({ isDefault, locale, slug }),
        component: path.resolve(
          rootDir,
          `gatsby-theme-boilerplate-blog/src/templates/one-column.js`
        ),
        context: {
          title: title,
          locale,
        },
      });
      node.htmlAst.children.map(child => {
        if (child.children && child.children[0]) {
          if (child.children[0].tagName === "img") {
            imgsPageObj.push(child.children[0].properties.src);
          }
        }
      });

      allPages.push({
        slug: node.fields.slug,
        date: node.childMdx.frontmatter.date,
        title: node.childMdx.frontmatter.title,
        imageSrc: imagePageSrc,
        excerpt: node.excerpt,
        insideImgs: imgsPageObj,
      });
    }
  });

  // xml pages

  const theXMLpages = `<?xml version="1.0" encoding="UTF-8"?>
		<?xml-stylesheet type="text/xsl" href="/template.xsl"?>
			<urlset
				xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
				xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd http://www.google.com/schemas/sitemap-image/1.1 http://www.google.com/schemas/sitemap-image/1.1/sitemap-image.xsd"
				xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

        <url>
        <loc>https://ascasamenteiras.com.br</loc>
        <lastmod>2022-12-14T08:30:00.000Z</lastmod>
        <image:image>
          <image:loc>https://ascasamenteiras.com.br/static/a0dd69c92bab97911931006e14f102b6/5531e/52015494369_659ac9d5bb_o.webp</image:loc>
        </image:image>
      </url>,

      <url>
        <loc>https://ascasamenteiras.com.br/contato/</loc>
        <lastmod>2022-12-20T12:24:43+00:00</lastmod>
        <image:image>
          <image:loc>https://ascasamenteiras.com.br/static/a0dd69c92bab97911931006e14f102b6/5531e/52015494369_659ac9d5bb_o.webp</image:loc>
        </image:image>
      </url>,



				${allPages.map(item => {
          return `<url>
					<loc>${businessInfos.siteUrl}${item.slug}</loc>
					<lastmod>${item.date}</lastmod>
					<image:image>
						<image:loc>${item.imageSrc}</image:loc>
					</image:image>
						${
              item.insideImgs.length > 0
                ? item.insideImgs.map(img => {
                    return `<image:image>
											<image:loc>${
                        img.substring(0, 4) === "http"
                          ? img
                          : businessInfos.siteUrl + img[0]
                      }</image:loc>
										</image:image>`;
                  })
                : ""
            }
				</url>`;
        })}

		</urlset>
		`;
  fs.writeFileSync(`./public/page-sitemap.xml`, theXMLpages);

  // xml posts

  const posts = result.data.allFile.edges;
  posts.forEach(({ node }) => {
    if (
      node.childMdx.frontmatter.topology === "posts" &&
      node.childMdx.frontmatter.status === true
    ) {
      const slug = node.relativeDirectory;

      const title = node.childMdx.frontmatter.title;

      // Use the fields created in exports.onCreateNode
      const locale = node.childMdx.fields.locale;
      const isDefault = node.childMdx.fields.isDefault;
      createPage({
        path: localizedSlug({ isDefault, locale, slug }),
        component: path.resolve(
          rootDir,
          "gatsby-theme-boilerplate-blog/src/templates/single-post.js"
        ),
        context: {
          locale,
          title,
          timeToRead: timeToRead,
          wordCount: wordCount,
        },
      });
    }
  });

  const categories = result.data.categoriesGroup.group;
  // Make category pages
  categories.forEach(category => {
    const slug = category.relativeDirectory;

    const title = category.childMdx.frontmatter.title;

    // Use the fields created in exports.onCreateNode
    const locale = category.childMdx.fields.locale;
    const isDefault = category.childMdx.fields.isDefault;
    createPage({
      path: `/trends/${localizedSlug({ isDefault, locale, slug })}/`,
      component: path.resolve(
        rootDir,
        "gatsby-theme-boilerplate-blog/src/templates/category-list-page.js"
      ),
      context: {
        locale,
        title,
        // categories: category.fieldValue,
        siteMetadata: result.data.siteMetadata,
        // footerThreeMarkdowRemark: result.data.footerThreeMarkdowRemark,
        postsPerPage: result.data.postsPerPage,
      },
    });
  });

  let allFeed = [];

  result.data.allFile.edges.forEach(({ node }) => {
    let imgsObj = [];

    const slug = node.relativeDirectory;

    const title = node.childMdx.frontmatter.title;

    // Use the fields created in exports.onCreateNode
    // const locale = category.childMdx.fields.locale;
    // const isDefault = category.childMdx.fields.isDefault;

    const frontmatter = node.childMdx.frontmatter;
    const { xmlDate } = frontmatter;
    const imageSrc =
      businessInfos.siteUrl +
      node.childMdx.frontmatter.featuredImage.childrenImageSharp[0]
        .gatsbyImageData.images.fallback.src;
    node.htmlAst.children.map(child => {
      if (child.children && child.children[0]) {
        child.children.map(eleChild => {
          if (eleChild.tagName === "span") {
            eleChild.children.map(grandChildEle => {
              if (grandChildEle.tagName === "img") {
                imgsObj.push([
                  grandChildEle.properties.dataSrc,
                  grandChildEle.properties.alt,
                ]);
              }
            });
          }
        });
      }
    });

    allFeed.push({
      slug: slug,
      date: xmlDate,
      title: title,
      imageSrc: imageSrc,
      excerpt: node.excerpt,
      insideImgs: imgsObj,
    });
  });

  const theXML = `<?xml version="1.0" encoding="UTF-8"?>
		<?xml-stylesheet type="text/xsl" href="/template.xsl"?>
			<urlset
				xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
				xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd http://www.google.com/schemas/sitemap-image/1.1 http://www.google.com/schemas/sitemap-image/1.1/sitemap-image.xsd"
				xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
				${allFeed.map(item => {
          return `<url>
					<loc>${businessInfos.siteUrl}${item.slug}</loc>
					<lastmod>${item.date}</lastmod>
					<image:image>
						<image:loc>${item.imageSrc}</image:loc>
					</image:image>

          ${
            item.insideImgs
              ? item.insideImgs.map(img => {
                  return `<image:image>
          <image:loc>${
            img[0].substring(0, 4) === "http"
              ? img[0]
              : businessInfos.siteUrl + img[0]
          }</image:loc>
        </image:image>`;
                })
              : ""
          }
				</url>`;
        })}
		</urlset>
		`;
  fs.writeFileSync(`./public/post-sitemap.xml`, theXML);

  const theStoriesXML = `<?xml version="1.0" encoding="UTF-8"?>
		<?xml-stylesheet type="text/xsl" href="/template.xsl"?>
			<urlset
				xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
				xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd http://www.google.com/schemas/sitemap-image/1.1 http://www.google.com/schemas/sitemap-image/1.1/sitemap-image.xsd"
				xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
				${allFeed.map(item => {
          return `<url>
					<loc>${businessInfos.siteUrl}${item.slug.slice(0, -1) +
            `.stories.amp.html`}</loc>
					<lastmod>${item.date}</lastmod>
					<image:image>
						<image:loc>${item.imageSrc}</image:loc>
					</image:image>

          ${
            item.insideImgs
              ? item.insideImgs.map(img => {
                  return `<image:image>
          <image:loc>${
            img[0].substring(0, 4) === "http"
              ? img[0]
              : businessInfos.siteUrl + img[0]
          }</image:loc>
        </image:image>`;
                })
              : ""
          }



				</url>`;
        })}
		</urlset>
		`;
  fs.writeFileSync(`./public/webstories-sitemap.xml`, theStoriesXML);

  const ampStoryPage = (
    srcImg,
    title,
    index
  ) => `<amp-story-page id="page-${index}" auto-advance-after="7s" >
  <amp-story-grid-layer template="vertical" >
    <amp-img src="${srcImg}" alt="${title}" width="900" height="675"
    layout="responsive">
    </amp-img>
  </amp-story-grid-layer>
    <amp-story-grid-layer class="story-page" template="vertical" >
      <div class="inner-page-wrapper">
        <h1>As Casamenteiras</h1>
        <h2>${title}</h2>
        <p>@ascasamenteiras_</p>
      </div>
    </amp-story-grid-layer>
  </amp-story-page>`;

  const theAmpStories = (
    title,
    key,
    srcImg,
    mainText,
    postImages,
    canonical
  ) => {
    return `<!DOCTYPE html>
      <html amp lang="pt-BR">
      
        <head>
          <meta charset="utf-8" />
          
          <title>${title}</title>
          <style amp-boilerplate>
            body {
              -webkit-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
              -moz-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
              -ms-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
              animation: -amp-start 8s steps(1, end) 0s 1 normal both
            }
      
            @-webkit-keyframes -amp-start {
              from {
                visibility: hidden
              }
      
              to {
                visibility: visible
              }
            }
      
            @-moz-keyframes -amp-start {
              from {
                visibility: hidden
              }
      
              to {
                visibility: visible
              }
            }
      
            @-ms-keyframes -amp-start {
              from {
                visibility: hidden
              }
      
              to {
                visibility: visible
              }
            }
      
            @-o-keyframes -amp-start {
              from {
                visibility: hidden
              }
      
              to {
                visibility: visible
              }
            }
      
            @keyframes -amp-start {
              from {
                visibility: hidden
              }
      
              to {
                visibility: visible
              }
            }
          </style>
          <noscript>
            <style amp-boilerplate>
              body {
                -webkit-animation: none;
                -moz-animation: none;
                -ms-animation: none;
                animation: none
              }
            </style>
          </noscript>
         
          <script async src="https://cdn.ampproject.org/v0.js"></script>
          <script async custom-element="amp-story" src="https://cdn.ampproject.org/v0/amp-story-1.0.js"></script>
          <link rel="canonical" type="text/html" href="${canonical}" />
      
          <link rel="modulepreload" href="https://cdn.ampproject.org/v0.mjs" as="script" crossorigin="anonymous">
          <link rel="preconnect" href="https://cdn.ampproject.org">
          <link rel="preload" as="script" href="https://cdn.ampproject.org/v0/amp-story-1.0.js">
            
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
          <meta name="amp-story-generator-name" content="Web Stories for GatsbyJS">
          <meta name="amp-story-generator-version" content="1.0.0">
          <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
          <script async custom-element="amp-analytics" src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"></script>

      <style amp-custom>
.story-page{position:relative}
.inner-page-wrapper{position:absolute; width: 100%; height: 50%;  
  background: rgb(0,0,0);
  background: linear-gradient(1deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.6) 20%, rgba(0,0,0,0) 100%);
  display: block;
  bottom: 0;}
.inner-page-wrapper h1, .inner-page-wrapper h2, .inner-page-wrapper p{color: #fff; width: 90%; margin-left: auto; margin-right: auto}
.inner-page-wrapper h1{font-size:32px;font-weight:900;}
.inner-page-wrapper h2{
  font-size: 22px;
    font-weight: 600;
    background: white;
    display: block;
    color: black;
    border-radius: 5px;
    margin-bottom: 20px;
    padding: 5px 10px;
        width: 85%;
        text-align: center;
    }
    .inner-page-wrapper p{text-align:center; font-size:16px;font-weight:400; width: 90%; margin-top: 20px; text-shadow: 1px 2px black;}
    .inner-page-wrapper h1{ margin-top: 50px;
      background: white;
      display: block;
      color: black;
      border-radius: 5px;
      margin-bottom: 20px;
      padding: 5px 10px;
      width: 85%;
      text-align: center;}
    /*# sourceURL=amp-custom.css */</style>
        </head>
        <body>
          <amp-story id="amp-story-id" standalone live-story title="${title}" publisher="As Casamenteiras"
            publisher-logo-src="logo.png"
            poster-portrait-src="logo3x4.png"
            poster-square-src="logoSquare.png"
            poster-landscape-src="logo4x3.png"
            >
            <amp-analytics type="gtag" data-credentials="include">
            <script type="application/json">
            {
              "vars" : {
                "gtag_id": "G-D2B5PVZ7TY",
                "config" : {
                  "G-D2B5PVZ7TY": { "groups": "default" }
                }
              }
            }
            </script>
            </amp-analytics>
              ${ampStoryPage(srcImg, title, 1)}
              
              ${postImages.map((img, indx) => {
                return ampStoryPage(img[0], img[1], indx + 2);
              })}

              ${ampStoryPage(
                businessInfos.siteUrl +
                  result.data.storiesA.childrenImageSharp[0].gatsbyImageData
                    .images.fallback.src,
                "Fale com As Casamenteiras!",
                99
              )}
              ${ampStoryPage(
                businessInfos.siteUrl +
                  result.data.storiesZ.childrenImageSharp[0].gatsbyImageData
                    .images.fallback.src,
                "Todo Amor Importa!",
                100
              )}

          </amp-story>
        </body>
      </html>`;
  };
  allFeed.map((item, key) => {
    const itemSlug = businessInfos.siteUrl + item.slug;

    fs.writeFile(
      `./public/${item.slug.slice(1, -1)}.stories.amp.html`,
      theAmpStories(
        item.title,
        key,
        item.imageSrc,
        "txt",
        item.insideImgs,
        itemSlug
      ),
      function(err) {
        if (err) throw err;
        console.log("File is created successfully.");
      }
    );
  });
};
