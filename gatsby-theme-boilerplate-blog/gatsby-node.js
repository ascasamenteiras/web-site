const fs = require("fs");
const path = require("path");
const _ = require("lodash");
const { createFilePath } = require(`gatsby-source-filesystem`);
const rootDir = path.join(__dirname, "../");
const businessInfos = require("./package.json");
// const redirectsYAML = require('../content/configs/redirects.yaml')

// Adding slug field to each post
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  // Ensures we are processing only markdown files
  function basePathFinder(nodeTopology) {
    if (nodeTopology === "pages") {
      return "pages";
    }
    if (nodeTopology === "posts") {
      return "posts";
    }
    if (nodeTopology === "landing") {
      return "landing";
    }
    return null;
  }
  if (node.internal.type === "MarkdownRemark") {
    const basePathLabel = basePathFinder(node.frontmatter.topology) || "posts";
    // Use `createFilePath` to turn markdown files in our `data/faqs` directory into `/faqs/slug`
    const slug = createFilePath({
      node,
      getNode,
      basePath: basePathLabel,
    });
    // Creates new query'able field with name of 'slug'
    createNodeField({
      node,
      name: "slug",
      value: `/${slug.slice(1)}`,
    });
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const { createRedirect } = actions;

  const redirectsArray = [
    {
      fromPath: `/vencemos-premio-zankyou-ziwa-awards-2022`,
      toPath: `/vencemos-premio-zankyou-2022/`,
    },
    {
      fromPath: `/vencemos-premio-zankyou-ziwa-awards-2022/`,
      toPath: `/vencemos-premio-zankyou-2022/`,
    },
    {
      fromPath: `/rsvp-contato`,
      toPath: `/contato/`,
    },
    {
      fromPath: `/rsvp-contato/`,
      toPath: `/contato/`,
    },
    {
      fromPath: `/nossos-casais`,
      toPath: `/casamentos/`,
    },
    {
      fromPath: `/nossos-casais/`,
      toPath: `/casamentos/`,
    },
  ];

  redirectsArray.forEach(redirect => {
    createRedirect({
      fromPath: redirect.fromPath,
      toPath: redirect.toPath,
    });
  });

  // createRedirect({
  //   fromPath: `/vencemos-premio-zankyou-ziwa-awards-2022`,
  //   toPath: `/vencemos-premio-zankyou-2022`,
  // });

  // createRedirect({
  //   fromPath: `/vencemos-premio-zankyou-ziwa-awards-2022/`,
  //   toPath: `/vencemos-premio-zankyou-2022/`,
  // });

  // createRedirect({
  //   fromPath: `/rsvp-contato`,
  //   toPath: `/contato/`,
  // });

  // createRedirect({
  //   fromPath: `/rsvp-contato/`,
  //   toPath: `/contato/`,
  // });

  // createRedirect({
  //   fromPath: `/nossos-casais`,
  //   toPath: `/casamentos`,
  // });

  // createRedirect({
  //   fromPath: `/nossos-casais/`,
  //   toPath: `/casamentos/`,
  // });

  return graphql(`
    {
      site {
        siteMetadata {
          siteUrl
        }
      }
      allMarkdownRemark(
        sort: { fields: frontmatter___date, order: DESC }
        filter: { frontmatter: { createdAt: { lt: "null" } } }
      ) {
        edges {
          node {
            fields {
              slug
            }
            timeToRead
            wordCount {
              paragraphs
              sentences
              words
            }
            frontmatter {
              date(formatString: "DD [de] MMMM [de] YYYY", locale: "pt-br")
              xmlDate: date
              topology
              title
              author
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
            excerpt(pruneLength: 200)
            htmlAst
            html
          }
        }
      }
      categoriesGroup: allMarkdownRemark(
        filter: { frontmatter: { createdAt: { lt: "null" } } }
        limit: 800
      ) {
        group(field: frontmatter___categories) {
          fieldValue
          nodes {
            headings {
              value
            }
            fields {
              slug
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
      allPages: allMarkdownRemark(
        filter: {
          frontmatter: { status: { eq: true }, topology: { ne: "landing" } }
        }
      ) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              status
              title
              description
              slug
              questions
              featuredImage {
                childrenImageSharp {
                  gatsbyImageData(
                    width: 350
                    height: 224
                    placeholder: NONE
                    quality: 80
                  )
                }
              }
              date
            }
            html
            htmlAst
            excerpt(pruneLength: 200)
          }
        }
      }
      AllLandings: allMarkdownRemark(
        filter: {
          frontmatter: { status: { eq: true }, topology: { eq: "landing" } }
        }
      ) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              title
              status
              questions
              featuredImage {
                childrenImageSharp {
                  gatsbyImageData(
                    width: 923
                    height: 1050
                    placeholder: NONE
                    quality: 80
                  )
                }
              }
            }
            excerpt(pruneLength: 200)
            htmlAst
            html
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
  `).then(result => {
    const landings = result.data.AllLandings.edges;

    landings.forEach(({ node }) => {
      if (node.frontmatter.status === true) {
        createPage({
          path: node.fields.slug,
          component: path.resolve(
            rootDir,
            `gatsby-theme-boilerplate-blog/src/templates/half-div.js`
          ),
          context: {
            title: node.frontmatter.title,
            content: node.html,
            headline: node.frontmatter.headline,
            questions: node.frontmatter.questions,
            excerpt: node.excerpt,
            featureImage: node.frontmatter.featuredImage,
          },
        });
      }
    });

    const pages = result.data.allPages.edges;
    let allPages = [];

    pages.forEach(({ node }) => {
      let imgsPageObj = [];
      const imagePageSrc =
        businessInfos.siteUrl +
        node.frontmatter.featuredImage.childrenImageSharp[0].gatsbyImageData
          .images.fallback.src;
      if (node.frontmatter.status === true) {
        createPage({
          path: node.fields.slug,
          component: path.resolve(
            rootDir,
            `gatsby-theme-boilerplate-blog/src/templates/one-column.js`
          ),
          context: {
            title: node.frontmatter.title,
            content: node.html,
            description: node.frontmatter.description,
            questions: node.frontmatter.questions,
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
          date: node.frontmatter.date,
          title: node.frontmatter.title,
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
				xmlns:xsi="https://www.w3.org/2001/XMLSchema-instance"
				xmlns:image="https://www.google.com/schemas/sitemap-image/1.1" xsi:schemaLocation="https://www.sitemaps.org/schemas/sitemap/0.9 https://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd https://www.google.com/schemas/sitemap-image/1.1 https://www.google.com/schemas/sitemap-image/1.1/sitemap-image.xsd"
				xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
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

    const posts = result.data.allMarkdownRemark.edges;
    posts.forEach(({ node }) => {
      if (node.frontmatter.topology === "posts") {
        createPage({
          path: node.fields.slug,
          component: path.resolve(
            rootDir,
            "gatsby-theme-boilerplate-blog/src/templates/single-post.js"
          ),
          context: {
            slug: node.fields.slug,
            thePost: node,
            postQuestion: node.frontmatter.questions,
          },
        });
      }
    });

    const categories = result.data.categoriesGroup.group;
    // Make category pages
    categories.forEach(category => {
      createPage({
        path: `/trends/${_.kebabCase(category.fieldValue)}/`,
        component: path.resolve(
          rootDir,
          "gatsby-theme-boilerplate-blog/src/templates/category-list-page.js"
        ),
        context: {
          categories: category.fieldValue,
          siteMetadata: result.data.siteMetadata,
          footerThreeMarkdowRemark: result.data.footerThreeMarkdowRemark,
          postsPerPage: result.data.postsPerPage,
        },
      });
    });

    let allFeed = [];

    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      let imgsObj = [];

      const slug = node.fields.slug;
      const frontmatter = node.frontmatter;
      const { xmlDate, title } = frontmatter;
      const imageSrc =
        businessInfos.siteUrl +
        node.frontmatter.featuredImage.childrenImageSharp[0].gatsbyImageData
          .images.fallback.src;
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

    const theAmpStorie = (title, key, srcImg, mainText, postImages, slug) => {
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
          <link rel="canonical" href="${slug}" />
      
          <link rel="modulepreload" href="https://cdn.ampproject.org/v0.mjs" as="script" crossorigin="anonymous">
          <link rel="preconnect" href="https://cdn.ampproject.org">
          <link rel="preload" as="script" href="https://cdn.ampproject.org/v0/amp-story-1.0.js">
            
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
          <meta name="amp-story-generator-name" content="Web Stories for GatsbyJS">
          <meta name="amp-story-generator-version" content="1.0.0">
          <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
          
      <style amp-custom="">
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
      const itemSlug = businessInfos.siteUrl.slice(0, -1) + item.slug;
      fs.writeFile(
        `./public/${item.slug.slice(1, -1)}.stories.amp.html`,
        theAmpStorie(
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
  });
};
