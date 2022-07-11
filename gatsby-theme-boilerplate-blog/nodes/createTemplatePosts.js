const path = require("path");
const rootDir = path.join(__dirname, "../");
const businessInfos = require("../package.json");

const theXML = require("./assets/theXML");
module.exports = async (graphql, actions) => {
  const { createPage } = actions;
  return graphql(`
    {
      site {
        siteMetadata {
          siteUrl
        }
      }
      allMarkdownRemark(sort: { fields: frontmatter___date, order: DESC }) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              date(formatString: "DD [de] MMMM [de] YYYY", locale: "pt-br")
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
                    width: 350
                    height: 224
                    placeholder: NONE
                    quality: 100
                  )
                }
              }
            }
            excerpt(pruneLength: 200)
            htmlAst
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) throw result.errors;
    const posts = result.data.allMarkdownRemark.edges;
    posts.forEach(({ node }) => {
      createPage({
        path: node.fields.slug,
        component: path.resolve(rootDir, "src/templates/single-post.js"),
        context: {
          slug: node.fields.slug,
        },
      });

      let imgsObj = [];
      let allFeed = [];

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

      fs.writeFileSync(`./public/post-sitemap.xml`, theXML);
    });
  });
};
