const fs = require("fs");
const path = require("path");
const _ = require("lodash");
const { createFilePath } = require(`gatsby-source-filesystem`);
const rootDir = path.join(__dirname, "../");
const businessInfos = require("./package.json");
// Adding slug field to each post
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  // Ensures we are processing only markdown files
  if (node.internal.type === "MarkdownRemark") {
    const basePathLabel =
      node.frontmatter.topology === "pages" ? "pages" : "posts";

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

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

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
              topology
              title
              author
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
                    quality: 90
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
        filter: { frontmatter: { status: { eq: true } } }
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
              featuredImage {
                childrenImageSharp {
                  gatsbyImageData(
                    width: 350
                    height: 224
                    placeholder: NONE
                    quality: 100
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
    }
  `).then(result => {
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
				xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
				xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd http://www.google.com/schemas/sitemap-image/1.1 http://www.google.com/schemas/sitemap-image/1.1/sitemap-image.xsd"
				xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
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
                          : businessInfos.siteUrl + img
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

    // xml pages

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
          },
        });
      }
    });

    const categories = result.data.categoriesGroup.group;
    // Make category pages
    categories.forEach(category => {
      createPage({
        path: `/category/${_.kebabCase(category.fieldValue)}/`,
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
      const { date, title } = frontmatter;
      const imageSrc =
        businessInfos.siteUrl +
        node.frontmatter.featuredImage.childrenImageSharp[0].gatsbyImageData
          .images.fallback.src;

      node.htmlAst.children.map(child => {
        if (child.children && child.children[0]) {
          if (child.children[0].tagName === "img") {
            imgsObj.push(child.children[0].properties.src);
          }
        }
      });

      allFeed.push({
        slug: slug,
        date: date,
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
              item.insideImgs.length > 0
                ? item.insideImgs.map(img => {
                    return `<image:image>
											<image:loc>${
                        img.substring(0, 4) === "http"
                          ? img
                          : businessInfos.siteUrl + img
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
  });
};
