const path = require("path");
const _ = require("lodash");

const rootDir = path.join(__dirname, "../");

module.exports = async (graphql, actions) => {
  const { createPage } = actions;
  const result = await graphql(`
    {
      site {
        siteMetadata {
          siteUrl
        }
      }
      categoriesGroup: allMarkdownRemark(limit: 800) {
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
    }
  `);

  if (result.errors) throw result.errors;
  const categories = result.data.categoriesGroup.group;
  // Make category pages
  categories.forEach(category => {
    createPage({
      path: `/trends/${_.kebabCase(category.fieldValue)}/`,
      component: path.resolve(rootDir, "src/templates/category-list-page.js"),
      context: {
        categories: category.fieldValue,
        siteMetadata: result.data.siteMetadata,
        footerThreeMarkdowRemark: result.data.footerThreeMarkdowRemark,
        postsPerPage: result.data.postsPerPage,
      },
    });
  });
};
