const fs = require("fs");
const path = require("path");
const rootDir = path.join(__dirname, "../");
const businessInfos = require("./package.json");
const redirects = require(`../content/configs/redirects.json`);
const { createFilePath } = require(`gatsby-source-filesystem`);

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
// Adding slug field to each post
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;

  // Ensures we are processing only markdownX files
  console.log("node.internal.type");
  console.log(node.internal.type);
  console.log("node.internal.type");

  if (node.internal.type === "MarkdownRemark") {
    // console.log("ENTREOUUUUUU!!");
    const basePathLabel = basePathFinder(node.frontmatter.topology) || "posts";
    // Use `createFilePath` to turn markdown files in our `data/faqs` directory into `/faqs/slug`
    const slug = createFilePath({
      node,
      getNode,
      basePath: basePathLabel,
    });
    // Creates new query'able field with name of 'slug'

    console.log("slug");
    console.log("slug");
    console.log("slug");
    console.log(slug);
    console.log("slug");
    console.log("slug");
    console.log("slug");

    createNodeField({
      node,
      name: "slug",
      value: `/${slug.slice(1)}`,
    });
  }
};

// As you don't want to manually add the correct language to the frontmatter of each file
// a new node is created automatically with the filename
// It's necessary to do that -- otherwise you couldn't filter by language

exports.createPages = ({ graphql, actions, reporter }) => {
  const { createPage, createRedirect } = actions;

  // First delete the incoming page that was automatically created by Gatsby
  // So everything in src/pages/
  // Grab the keys ('en' & 'de') of locales and map over them

  // outro mundo
  const redirectsArray = redirects.fromToPath;

  redirectsArray.forEach(redirect => {
    createRedirect({
      fromPath: redirect.fromPath,
      toPath: redirect.toPath,
    });
  });

  return graphql(`
    {
      site {
        siteMetadata {
          siteUrl
        }
      }
      allMarkdownRemark(
        sort: { frontmatter: { date: DESC } }
        filter: {
          frontmatter: { topology: { eq: "posts" }, status: { eq: true } }
        }
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
              status
              createdAt
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
        filter: {
          frontmatter: { topology: { eq: "posts" }, status: { eq: true } }
        }
        limit: 800
      ) {
        group(field: { frontmatter: { categories: SELECT } }) {
          fieldValue
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                topology
                categories
                createdAt
                status
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
      allPages: allMarkdownRemark(
        filter: {
          frontmatter: { status: { eq: true }, topology: { eq: "pages" } }
        }
      ) {
        edges {
          node {
            htmlAst
            fields {
              slug
            }
            frontmatter {
              status
              topology
              title
              date
              featuredImage {
                childrenImageSharp {
                  gatsbyImageData
                }
              }
            }
            excerpt(pruneLength: 200)
            htmlAst
            html
          }
        }
      }
      AllLandings: allMarkdownRemark(
        filter: {
          frontmatter: { status: { eq: true }, topology: { eq: "landings" } }
        }
      ) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              title
              topology
              status
              headline
              questions
              emailCTA
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
    if (result.errors) {
      reporter.panicOnBuild("Error loading MD result", result.errors);
    }

    // let arrays
    let allFeed = [];
    let allPages = [];

    const posts = result?.data?.allMarkdownRemark?.edges
      ? result.data.allMarkdownRemark.edges
      : console.log("posts com eero");
    const pages = result?.data?.allPages?.edges
      ? result.data.allPages.edges
      : console.log("allPages com eero");
    const categories = result?.data?.categoriesGroup?.group?.edges
      ? result.data.categoriesGroup.group.edges
      : console.log("categoriesGroup com eero");
    const landings = result?.data?.AllLandings?.edges
      ? result.data.AllLandings.edges
      : console.log("AllLandings com eero");

    // creating functions
    // posts
    posts.forEach(post => {
      if (!post && !post.node) {
        return console.log("post: deu muito ruim");
      }
      if (post.node.frontmatter === null) {
        return console.log("post: frontmatter deu muito ruim");
      }
      let imgsObj = [];
      // console.log("post.fields");
      // console.log(post.node.fields);
      // console.log("post.fields");
      // console.log(post);
      const { slug } = post.node.fields;
      const { xmlDate, title, featuredImage, questions } =
        post.node.frontmatter;
      // Use the fields created in exports.onCreateNode
      const imageSrc =
        businessInfos.siteUrl +
        featuredImage?.childrenImageSharp[0]?.gatsbyImageData?.images.fallback
          .src;

      createPage({
        path: slug,
        component: path.resolve(
          rootDir,
          "gatsby-theme-boilerplate-blog/src/templates/single-post.js"
        ),
        context: {
          slug: slug,
          thePost: post.node,
          postQuestion: questions,
        },
      });

      post.node.htmlAst.children.map(child => {
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
        excerpt: post.excerpt,
        insideImgs: [],
        // insideImgs: imgsObj,
      });
    });

    pages.forEach(page => {
      if (!page) {
        return console.log("page: deu erro muito");
      }
      if (page.node.frontmatter === null) {
        return console.log("page: deu erro");
      }
      let imgsPageObj = [];
      const { slug } = page.node.fields;
      const { title, featuredImage, date, description, questions } =
        page.node.frontmatter;
      // Use the fields created in exports.onCreatepage
      const imagePageSrc =
        businessInfos.siteUrl +
        featuredImage?.childrenImageSharp[0]?.gatsbyImageData?.images.fallback
          .src;
      createPage({
        path: slug,
        component: path.resolve(
          rootDir,
          `gatsby-theme-boilerplate-blog/src/templates/one-column.js`
        ),
        context: {
          title: title,
          content: page.node.html,
          description: description,
          questions: questions,
        },
      });

      page.node.htmlAst.children.map(child => {
        if (child.children && child.children[0]) {
          if (child.children[0].tagName === "img") {
            imgsPageObj.push(child.children[0].properties.src);
          }
        }
      });

      allPages.push({
        slug: slug,
        date: date,
        title: title,
        imageSrc: imagePageSrc,
        excerpt: page.node.excerpt,
        insideImgs: [],
        // insideImgs: imgsPageObj,
      });
    });

    // Make category pages
    categories?.forEach(category => {
      if (!category) {
        return console.log("category: deu muito ruim");
      }
      if (category.node.frontmatter === null) {
        return console.log("category: frontmatter deu muito ruim");
      }
      // Use the fields created in exports.onCreateNode
      console.log("category: TA INDOOO");
      console.log(result.data.categoriesGroup.group.fieldValue);
      console.log(_.kebabCase(result.data.categoriesGroup.group.fieldValue));
      console.log("category: TA INDOOO");
      createPage({
        path: `/trends/${_.kebabCase(
          result.data.categoriesGroup.group.fieldValue
        )}/`,
        component: path.resolve(
          rootDir,
          "gatsby-theme-boilerplate-blog/src/templates/category-list-page.js"
        ),
        context: {
          categories: result.data.categoriesGroup.group.fieldValue,
          siteMetadata: result.data.siteMetadata,
          // footerThreeMarkdowRemark: result.data.footerThreeMarkdowRemark,
          postsPerPage: result.data.postsPerPage,
        },
      });
      console.log("category: FOIIIIII");
      console.log("category: FOIIIIII");
      console.log("category: FOIIIIII");
    });

    // dealing with nodes
    landings?.forEach(landing => {
      if (!landing) {
        return console.log("landing: deu erro muito");
      }
      if (landing.node.frontmatter === null) {
        return console.log("landing: deu erro");
      }
      const { slug } = landing.node.fields;
      const { title, headline, questions, featuredImage, emailCTA } =
        landing.node.frontmatter;

      // Use the fields created in exports.onCreateNode

      createPage({
        path: slug,
        component: path.resolve(
          rootDir,
          `gatsby-theme-boilerplate-blog/src/templates/half-div.js`
        ),
        context: {
          title: title,
          content: landing.node.html,
          headline: headline,
          questions: questions,
          excerpt: landing.node.excerpt,
          featuredImage: featuredImage,
          emailCTA: emailCTA,
        },
      });
    });

    // TEMPLATES
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

    const theStoriesXML = `<?xml version="1.0" encoding="UTF-8"?>
      <?xml-stylesheet type="text/xsl" href="/template.xsl"?>
        <urlset
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd http://www.google.com/schemas/sitemap-image/1.1 http://www.google.com/schemas/sitemap-image/1.1/sitemap-image.xsd"
          xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
          ${allFeed.map(item => {
            return `<url>
            <loc>${businessInfos.siteUrl}${
              item.slug.slice(0, -1) + `.stories.amp.html`
            }</loc>
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

    fs.writeFileSync(`./public/page-sitemap.xml`, theXMLpages);

    fs.writeFileSync(`./public/post-sitemap.xml`, theXML);

    fs.writeFileSync(`./public/webstories-sitemap.xml`, theStoriesXML);

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
        function (err) {
          if (err) throw err;
          console.log("File is created successfully.");
        }
      );
    });
  });
};
