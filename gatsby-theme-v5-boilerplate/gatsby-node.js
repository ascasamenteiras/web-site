// Esse é um arquivo de configuração para um projeto Gatsby.
// O arquivo está dividido em três partes que usam diferentes plugins do Gatsby:

//   - context-i18n
//   - sitepages-i18n
//   - markdown-i18n

// gatsby-plugin-sitepages-i18n
//
// create Node Field in SitePage node type

const path = require("path");
const rootDir = path.join(__dirname, "../");
const fs = require("fs").promises;
const writeFileSync = require("fs").writeFileSync;
const _ = require("lodash");

const { createFilePath } = require(`gatsby-source-filesystem`);

//requires for schemas
// const pagesPath = path.resolve(rootDir, `content/pages`);
const schemasPath = path.resolve(rootDir, `content/schemas`);
const reqSchemaDefault = require(path.resolve(
  rootDir,
  `${schemasPath}/default.json`
));

// i18n default card
const card = reqSchemaDefault.schema[0].card[0];
// i18n array locales ['xx-XX','xx-XX']
const locales = reqSchemaDefault.locales;

//require theme pagesSite
const pageSiteFolder = path.resolve(rootDir, `${card.themePath}/src/pages`);

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      fallback: {
        path: require.resolve("path-browserify"),
        fs: false,
      },
    },
  });
};
// grab schema and pageFiles
// Adding slug field to each post
// Adiciona um campo slug a cada nó do tipo MarkdownRemark
// E um campo i18n a cada nó do tipo SitePage
// Facilita o tratamento de localização (tradução) no projeto.

exports.onCreateNode = async ({ node, getNode, getNodesByType, actions }) => {
  const { createNodeField } = actions;
  // const markdownNodes = getNodesByType(`MarkdownRemark`);

  if (node.internal.type === "SitePage") {
    createNodeField({
      node,
      name: "i18n",
      value: card.brandIntl,
    });
    createNodeField({
      node,
      name: "schemaJSON",
      value: card,
    });
  }

  if (node?.internal?.type === "MarkdownRemark") {
    // Use `createFilePath` to turn markdown files in our `data/faqs` directory into `/faqs/slug`
    const slug = createFilePath({
      node,
      getNode,
    });

    const htmlSlug = slug.includes(".htm");
    const slashSlugfirst = slug.slice(0, 1) === "/" ? slug.slice(1) : slug;
    const slashSlug =
      slashSlugfirst.slice(-1) === "/"
        ? slashSlugfirst.slice(0, -1)
        : slashSlugfirst;
    const slugTrim =
      slashSlug.includes(".md") && !htmlSlug
        ? slashSlug.split(".md")[0]
        : slashSlug;
    const slugTitle = slugTrim.includes(".")
      ? slugTrim.split(".")[0]
      : slugTrim;
    const frontmatterSlug = node?.frontmatter?.slug
      ? node.frontmatter.slug
      : slugTitle;
    const slugLocale = slugTrim.split(".")[1];
    const isI18n = slugTrim.includes(".");
    const isLocale = isI18n && slugLocale !== "";

    const finalSlug = isLocale
      ? "/" + slugLocale + "/" + frontmatterSlug + "/"
      : slugTrim;
    const schemasFiles = await fs.readdir(schemasPath);

    const localesWithouDefault = [];
    for (const element of schemasFiles) {
      if (element !== "default.json") {
        localesWithouDefault.push(element);
      }
    }
    const MDPagesFolder = path.resolve(rootDir, `content/pages`);
    const MDFiles = await fs.readdir(MDPagesFolder);
    const regexTranslation = /\.([a-z0-9-]{2})\.md$/i;

    const translations = MDFiles.filter(
      md =>
        md.match(regexTranslation) &&
        md.split(".").length > 1 &&
        md.split(".")[0] === slugTitle
    );

    const defaultsMds = MDFiles.filter(
      md =>
        !md.match(regexTranslation) &&
        md.split(".").length > 1 &&
        md.split(".")[0] === slugTitle
    );
    if (!slashSlug.includes(".") && translations.length > 0) {
      defaultsMds.forEach(async md => {
        if (md.split(".").length > 1 && md.split(".")[0] === slugTitle) {
          const mdLocale = MDFiles.filter(
            e =>
              e.match(regexTranslation) &&
              e.split(".").length > 1 &&
              e.split(".")[0] === slugTitle
          );
          const arrayI18n = [];
          mdLocale.forEach(
            async el =>
              arrayI18n.push(
                `${
                  locales.filter(d => d.split("-")[0] === el.split(".")[1])[0]
                }`
              )
            // console.log("markdownNodes.filter(nod=>nod.fileAbsolutePath===el)"),
            // console.log(
            //   markdownNodes.filter(nod => nod.fileAbsolutePath === el)
            // )
          );
          arrayI18n.push(locales[0]);
          await createNodeField({
            node,
            name: "availableI18n",
            value: arrayI18n,
          });
        } else {
          await createNodeField({
            node,
            name: "availableI18n",
            value: [locales[0]],
          });
        }
      });
    }

    if (translations.length > 0) {
      translations.forEach(async md => {
        if (md.split(".").length > 1 && md.split(".")[0] === slugTitle) {
          const mdLocale = MDFiles.filter(
            e =>
              e.match(regexTranslation) &&
              e.split(".").length > 1 &&
              e.split(".")[0] === slugTitle
          );
          const arrayI18n = [];
          mdLocale.forEach(async el =>
            arrayI18n.push(
              `${locales.filter(d => d.split("-")[0] === el.split(".")[1])[0]}`
            )
          );
          arrayI18n.push(locales[0]);

          await createNodeField({
            node,
            name: "availableI18n",
            value: arrayI18n,
          });
        }
      });
    } else {
      await createNodeField({
        node,
        name: "availableI18n",
        value: [locales[0]],
      });
    }
    let foundedLocale = localesWithouDefault.filter(e =>
      e.includes(slugLocale)
    );
    if (!foundedLocale || foundedLocale === "") {
      foundedLocale === locales[0];
    } else {
      foundedLocale == null;
    }
    const i18n = foundedLocale ? foundedLocale : locales[0];
    const finalI18n =
      i18n && Array.isArray(i18n) && i18n[0]
        ? i18n[0].split(".")[0]
        : locales[0];

    await createNodeField({
      node,
      name: "i18n",
      value: finalI18n || reqSchemaDefault.locales[0],
    });

    await createNodeField({
      node,
      name: "AllI18n",
      value: reqSchemaDefault.locales,
    });
    const indexLocale = finalSlug.match(/^\/([a-z]{2})(?!index)\/$/);
    await createNodeField({
      node,
      name: "slug",
      value: finalSlug === indexLocale ? indexLocale[0] : finalSlug,
    });
  }
};

// # gatsby-plugin-context-i18n
//
// onCreatePage
// - modify all page contexts for default or path i18n match
// - delete n create pages w i18n SCHEMA JSON context n i18n url prefix
// - insert i18n schemaJSON context
// delete n create pages w i18n SCHEMA JSON context n i18n url prefix
// adiciona contexto de localização a cada página do projeto
// (a partir da pasta src/pages)
// e cria novas páginas para cada idioma do projeto.
exports.onCreatePage = async ({ page, actions }) => {
  const schemasFiles = await fs.readdir(schemasPath);
  const pageFiles = await fs.readdir(pageSiteFolder);
  const { createPage, deletePage } = actions;
  const newPage = Object.assign({}, page);
  deletePage(page);
  const i18nContextPageSite = async (page, file, schemasLoaded) => {
    for (const schemaFile of schemasLoaded) {
      const schema = require(path.resolve(
        rootDir,
        `content/schemas/${schemaFile}`
      ));

      const cardElement = schema.schema[0].card[0];
      const cardElementDefault = reqSchemaDefault.schema[0].card[0];

      const cardLocale = cardElement.cardLocale.split("-")[0];
      const cardLocalePath = "/" + cardLocale + "/";
      const pathLocale = page.path;
      const pathLocaleHasI18n = pathLocale.includes(cardLocalePath);
      const defaultLanguage = reqSchemaDefault.locales[0].split("-")[0];
      const isDefaultLanguage = defaultLanguage === cardLocale;
      const isDefaultSchema = schemaFile === "default.json";

      newPage.context = {
        ...newPage.context,
        schemaJSON: pathLocaleHasI18n ? cardElement : cardElementDefault,
        prefixI18n: cardLocale,
        SEO: {
          i18n: cardElement.cardLocale,
          topology: "pages",
          dateCreated: cardElement.datePublished,
          datePublished: cardElement.datePublished,
          slug: newPage.path,
          siteUrl: cardElement.brandUrl,
          articleUrl: cardElement.brandUrl + "/" + newPage.path,
          title:
            cardElement.pagesHelper.index.SEO.title || cardElement.brandName,
          description: cardElement.brandDescription,
          keywords: cardElement.brandKeywords,
          author: cardElement.brandName,
          social: cardElement.sameAs,
          articleBody: "page.html",
          questions: cardElement.questions,
          brandLogo: cardElement.brandLogo,
          brandCardImage: cardElement.brandCardImage,
          featuredImage: cardElement.brandCardImage,
          fbAppID: cardElement.fbAppID,
          themeColor: cardElement.brandHexMainColor,
          brandName: cardElement.brandName,
          brandDescription: cardElement.brandDescription,
          brandKeywords: cardElement.brandKeywords,
          brandEmail: cardElement.brandEmail,
          brandPhone: cardElement.brandPhone,
        },
      };
      // console.log("");
      // console.log("cardElement.pagesHelper.index.SEO.title");
      // console.log(cardElement.pagesHelper.index.SEO.title);
      // console.log("");

      if (
        newPage.path === "/" ||
        (isDefaultLanguage && isDefaultSchema && newPage.path === "/") ||
        newPage.path.includes("404")
      ) {
        createPage(newPage);
      }
      // await fs.readdir(pageSiteFolder, (err, files) => {
      //   files.map((file, ind) => {

      //   });
      // });

      // if (
      //   isDefaultLanguage &&
      //   isDefaultSchema &&
      //   newPage.path === "/dev-404-page/" &&
      //   newPage.path === "/404/" &&
      //   newPage.path === "404.html"
      // ) {
      //   createPage(newPage);
      // }
    }
  };

  try {
    await Promise.all(
      pageFiles.map(file => i18nContextPageSite(newPage, file, schemasFiles))
    );
  } catch (err) {
    console.error(err);
  }
};

// modifica o contexto de cada página do projeto
// adicionar informações de localização
// cria novas páginas para cada idioma do projeto
exports.createPages = async ({ graphql, actions, reporter }) => {
  const schemasFiles = await fs.readdir(schemasPath);
  const pageFiles = await fs.readdir(pageSiteFolder);
  const { createPage } = actions;
  // first array locale position it's reserved to default locale
  // dealing with allSitePages: theme/src/pages
  const createPageSite = async (page, schemasLoaded) => {
    const fileName = page.split(".")[0];

    for (const schemaFile of schemasLoaded) {
      const isDefaultI18n = schemaFile === "default.json" ? true : false;
      const isIndex = page === "index.js" ? true : false;
      const is404 = page === "404.js" ? true : false;
      const localePathQuery = isDefaultI18n ? "" : schemaFile.slice(0, 2);
      // console.log("fileName");
      // console.log(fileName);
      let pathQuery = isIndex && !is404 ? "" : fileName + "/";

      const pathExtended = isDefaultI18n
        ? "/" + pathQuery
        : "/" + schemaFile.slice(0, 2) + "/" + pathQuery;

      const schemaLocaleContent = await require(`${schemasPath}/${schemaFile}`);
      const cardUse = !isDefaultI18n
        ? schemaLocaleContent?.schema[0]?.card[0]
        : card;

      const pageSiteObj = (path, component) => {
        return {
          path: path,
          component: component,
          context: {
            schemaJSON: cardUse,
          },
        };
      };

      if (is404) {
        // await createPage(pageSiteObj);
        const errorComponent = path.resolve(
          rootDir,
          `${card.themePath}/src/pages/404.js`
        );
        for (let index = 1; index < locales.length; index++) {
          const element = locales[index];
          // locales.forEach(async locale => {
          await createPage(
            pageSiteObj(
              "/" + element.split("-")[0] + "/" + "dev-404-page" + "/",
              errorComponent
            )
          );
          await createPage(
            pageSiteObj(
              "/" + element.split("-")[0] + "/" + "404" + ".html",
              errorComponent
            )
          );
          await createPage(
            pageSiteObj("/" + "dev-404-page" + "/", errorComponent)
          );
          await createPage(pageSiteObj("/" + "404" + ".html", errorComponent));
          // console.log("");
          // console.log("404 criada");
          // console.log(element.split("-")[0]);
          // console.log("");
        }
      }
      if (isDefaultI18n || (isIndex && isDefaultI18n)) {
        // console.log("");
        // console.log("criada pagina isDefaultI18n || isIndex");
        // console.log("");
        await createPage({
          path: pathExtended,
          component: pageSiteFolder + "/" + page,
          context: {
            schemaJSON: cardUse,
          },
        });
      } else {
        // console.log("");
        // console.log("criada pagina contraria a isDefaultI18n || isIndex");
        // console.log("");
        await createPage({
          path: pathExtended,
          component: pageSiteFolder + "/" + page,
          context: {
            schemaJSON: cardUse,
          },
        });
      }
    }
  };

  try {
    await Promise.all(
      pageFiles.map(file => createPageSite(file, schemasFiles))
    );
  } catch (err) {
    console.error(err);
  }

  // markdown-i18n
  //
  // onCreateNode
  // - i18n slug field
  // - Adding i18n slug field to each MD
  // createPages
  // - create i18n PAGES from content/pages, MDS PAGES

  // dealing with allPages: allMarkdownRemark
  return graphql(`
    {
      allPages: allMarkdownRemark(
        filter: { frontmatter: { topology: { eq: "pages" } } }
      ) {
        nodes {
          frontmatter {
            title
            agent
            schema
            status
            slug
            topology
            description
            date
            questions
            helperI18n
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
          fields {
            slug
            i18n
            availableI18n
          }
          html
          htmlAst
          excerpt(pruneLength: 200)
          fileAbsolutePath
        }
      }

      allPosts: allMarkdownRemark(
        sort: { frontmatter: { date: DESC } }
        filter: {
          frontmatter: { topology: { eq: "posts" }, status: { eq: true } }
        }
      ) {
        nodes {
          fields {
            slug
            i18n
            availableI18n
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
            agent
            schema
            helperI18n
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
                i18n
                availableI18n
              }
              frontmatter {
                date(formatString: "DD [de] MMMM [de] YYYY", locale: "pt-br")
                xmlDate: date
                topology
                title
                author
                status
                createdAt
                agent
                schema
                helperI18n
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
          }
        }
      }

      AllLandings: allMarkdownRemark(
        filter: {
          frontmatter: { status: { eq: true }, topology: { eq: "landings" } }
        }
      ) {
        nodes {
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

      storiesA: file(relativePath: { eq: "stories-ante-final.png" }) {
        childrenImageSharp {
          gatsbyImageData(width: 900, height: 675, quality: 80)
        }
      }
      storiesZ: file(relativePath: { eq: "stories-final.png" }) {
        childrenImageSharp {
          gatsbyImageData(width: 900, height: 675, quality: 80)
        }
      }
    }
  `).then(async results => {
    if (results.errors) {
      reporter.panicOnBuild("Error loading MD result", results.errors);
    }

    const pages = results.data?.allPages?.nodes
      ? results.data.allPages.nodes
      : console.log("Page Error");

    const npages = results.data.allPages.nodes.reduce((acc, node) => {
      const { slug, i18n } = node.fields;
      if (!acc[slug]) {
        acc[slug] = [];
      }
      acc[slug].push(`${i18n}:${slug}`);
      return acc;
    }, {});

    // Object.entries(npages).forEach(([slug, translations]) => {
    //   console.log({
    //     path: slug,
    //     context: translations,
    //   });
    // });

    const posts = results.data?.allPosts?.nodes
      ? results.data.allPosts.nodes
      : console.log("posts com erro");

    // const categories = results?.data?.categoriesGroup?.group
    //   ? results.data.categoriesGroup.group
    //   : console.log("categoriesGroup com eero");

    const landings = results?.data?.AllLandings?.nodes
      ? results.data.AllLandings.nodes
      : console.log("AllLandings com eero");
    // console.log("landings");
    // console.log(landings);
    // console.log("results.data.AllLandings");
    // console.log(results.data.AllLandings);
    let imgsPageObj = [];
    let allPages = [];

    await posts.forEach(async post => {
      if (!post) {
        return console.log("post: deu erro muito");
      }
      if (post.frontmatter === null) {
        return console.log("post: deu erro");
      }
      const { timeToRead, wordCount } = post;
      const { slug, availableI18n, i18n } = post.fields;
      const {
        title,
        date,
        description,
        helperI18n,
        questions,
        featuredImage,
        agent,
        schema,
        categories,
      } = post.frontmatter;
      // Use the fields created in exports.onCreatepage
      const regex = /\/([^/]+)\.md$/;
      const localesSlugs = [];

      if (availableI18n && availableI18n.length > 1) {
        posts.filter(async currPage => {
          const slugTitleTwo = currPage.fileAbsolutePath
            .match(regex)[1]
            .includes(".")
            ? currPage.fileAbsolutePath.match(regex)[1].split(".")[0]
            : currPage.fileAbsolutePath.match(regex)[1];
          const slugLocale = currPage.fileAbsolutePath
            .match(regex)[1]
            .split(".")[1];
          // const frontmatterSlug = currPage?.frontmatter?.slug
          //   ? currPage.frontmatter.slug
          //   : slugTitleTwo;
          // const isI18n = currPage.fileAbsolutePath
          //   .match(regex)[1]
          //   .includes(".");
          // const isLocale = isI18n && slugLocale !== "";
          // const finalSlug = isLocale
          //   ? "/" + slugLocale + "/" + frontmatterSlug + "/"
          //   : currPage.fileAbsolutePath.match(regex)[1];
          const schemasFiles = await fs.readdir(schemasPath);
          const localesWithouDefault = [];
          for (const element of schemasFiles) {
            if (element !== "default.json") {
              localesWithouDefault.push(element);
            }
          }
          const MDPagesFolder = path.resolve(rootDir, `content/posts`);
          const MDFiles = await fs.readdir(MDPagesFolder);
          const regexTranslation = /\.([a-z0-9-]{2})\.md$/i;

          const translations = MDFiles.filter(
            md =>
              md.match(regexTranslation) &&
              md.split(".").length > 1 &&
              md.split(".")[0] === slugTitleTwo
          );

          const defaultsMds = MDFiles.filter(
            md =>
              !md.match(regexTranslation) &&
              md.split(".").length > 1 &&
              md.split(".")[0] === slugTitleTwo
          );

          if (
            !currPage.fileAbsolutePath.match(regex)[1].includes(".") &&
            translations.length > 0
          ) {
            defaultsMds.forEach(async md => {
              if (
                md.split(".").length > 1 &&
                md.split(".")[0] === slugTitleTwo
              ) {
                const mdLocale = MDFiles.filter(
                  e =>
                    e.match(regexTranslation) &&
                    e.split(".").length > 1 &&
                    e.split(".")[0] === slugTitleTwo
                );
                const arrayI18n = [];
                mdLocale.forEach(async el => arrayI18n.push(el));
              }
            });
          }

          if (translations.length > 0) {
            translations.forEach(async md => {
              if (
                md.split(".").length > 1 &&
                md.split(".")[0] === slugTitleTwo
              ) {
                const mdLocale = MDFiles.filter(
                  e =>
                    e.match(regexTranslation) &&
                    e.split(".").length > 1 &&
                    e.split(".")[0] === slugTitleTwo
                );
                const arrayI18n = [];
                mdLocale.forEach(async el => arrayI18n.push(el));
              }
            });
          }

          let foundedLocale = localesWithouDefault.filter(e =>
            e.includes(slugLocale)
          );
          if (!foundedLocale || foundedLocale === "") {
            foundedLocale === locales[0];
          } else {
            foundedLocale == null;
          }
        });
      }

      const h = await require(`${schemasPath}/${
        i18n === locales[0] ? "default" : i18n
      }.json`).schema[0].card[0];

      createPage({
        path: slug,
        component: path.resolve(
          rootDir,
          `gatsby-theme-v5-boilerplate/src/templates/single-post.js`
        ),
        context: {
          ...post.pageContext,
          title,
          content: post.html,
          description,
          categories,
          date,
          availableI18n,
          i18n,
          theLocales: localesSlugs,
          helperI18n,
          slug,
          SEO: {
            i18n: i18n,
            agent: agent,
            schema: schema,
            topology: "article",
            content: post.html,
            categories,
            date,
            wordCount: wordCount,
            timeToRead: timeToRead,
            dateCreated: date,
            datePublished: date,
            slug: slug,
            siteUrl: h.brandUrl,
            articleUrl: h.brandUrl + "/" + slug,
            title: title,
            description: description,
            keywords: h.brandKeywords,
            author: h.brandName,
            social: h.sameAs,
            articleBody: post.html,
            questions: questions,
            brandLogo: h.brandLogo,
            brandCardImage: h.brandCardImage,
            featuredImage: featuredImage,
            fbAppID: h.fbAppID,
            themeColor: h.brandHexMainColor,
            brandName: h.brandName,
            brandDescription: h.brandDescription,
            brandKeywords: h.brandKeywords,
            brandEmail: h.brandEmail,
            brandPhone: h.brandPhone,
            track: null,
            album: null,
          },
        },

        slices: {
          // Any time `<Slice alias="seo">` is seen on this post,
          // use the `seo-${language}` id
          seo: `seo-${slug}`,
        },
      });

      // post create posts xml builder

      const imagePageSrc =
        h.brandUrl +
        featuredImage?.childrenImageSharp[0]?.gatsbyImageData?.images.fallback
          .src;

      post?.htmlAst?.children?.map(child => {
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
        excerpt: post.excerpt,
        insideImgs: imgsPageObj || [],
      });
    });

    await pages.forEach(async page => {
      if (!page) {
        return console.log("page: deu erro muito");
      }
      if (page.frontmatter === null) {
        return console.log("page: deu erro");
      }
      const { fileAbsolutePath } = page;
      const { slug, availableI18n, i18n } = page.fields;
      const {
        title,
        date,
        description,
        helperI18n,
        questions,
        featuredImage,
        agent,
        schema,
      } = page.frontmatter;

      const h = await require(`${schemasPath}/${
        i18n === locales[0] ? "default" : i18n
      }.json`).schema[0].card[0];

      // Use the fields created in exports.onCreatepage
      const regex = /\/([^/]+)\.md$/;
      const localesSlugs = [];

      if (availableI18n && availableI18n.length > 1) {
        pages.filter(async currPage => {
          const slugTitleTwo = currPage.fileAbsolutePath
            .match(regex)[1]
            .includes(".")
            ? currPage.fileAbsolutePath.match(regex)[1].split(".")[0]
            : currPage.fileAbsolutePath.match(regex)[1];
          const slugLocale = currPage.fileAbsolutePath
            .match(regex)[1]
            .split(".")[1];
          // const frontmatterSlug = currPage?.frontmatter?.slug
          //   ? currPage.frontmatter.slug
          //   : slugTitleTwo;
          // const isI18n = currPage.fileAbsolutePath
          //   .match(regex)[1]
          //   .includes(".");
          // const isLocale = isI18n && slugLocale !== "";
          // const finalSlug = isLocale
          //   ? "/" + slugLocale + "/" + frontmatterSlug + "/"
          //   : currPage.fileAbsolutePath.match(regex)[1];
          const schemasFiles = await fs.readdir(schemasPath);
          const localesWithouDefault = [];
          for (const element of schemasFiles) {
            if (element !== "default.json") {
              localesWithouDefault.push(element);
            }
          }
          const MDPagesFolder = path.resolve(rootDir, `content/pages`);
          const MDFiles = await fs.readdir(MDPagesFolder);
          const regexTranslation = /\.([a-z0-9-]{2})\.md$/i;

          const translations = MDFiles.filter(
            md =>
              md.match(regexTranslation) &&
              md.split(".").length > 1 &&
              md.split(".")[0] === slugTitleTwo
          );

          const defaultsMds = MDFiles.filter(
            md =>
              !md.match(regexTranslation) &&
              md.split(".").length > 1 &&
              md.split(".")[0] === slugTitleTwo
          );

          if (
            !currPage.fileAbsolutePath.match(regex)[1].includes(".") &&
            translations.length > 0
          ) {
            defaultsMds.forEach(async md => {
              if (
                md.split(".").length > 1 &&
                md.split(".")[0] === slugTitleTwo
              ) {
                const mdLocale = MDFiles.filter(
                  e =>
                    e.match(regexTranslation) &&
                    e.split(".").length > 1 &&
                    e.split(".")[0] === slugTitleTwo
                );
                const arrayI18n = [];
                mdLocale.forEach(async el => arrayI18n.push(el));
              }
            });
          }

          if (translations.length > 0) {
            translations.forEach(async md => {
              if (
                md.split(".").length > 1 &&
                md.split(".")[0] === slugTitleTwo
              ) {
                const mdLocale = MDFiles.filter(
                  e =>
                    e.match(regexTranslation) &&
                    e.split(".").length > 1 &&
                    e.split(".")[0] === slugTitleTwo
                );
                const arrayI18n = [];
                mdLocale.forEach(async el => arrayI18n.push(el));
              }
            });
          }

          let foundedLocale = localesWithouDefault.filter(e =>
            e.includes(slugLocale)
          );
          if (!foundedLocale || foundedLocale === "") {
            foundedLocale === locales[0];
          } else {
            foundedLocale == null;
          }
          // const i18nFounded = foundedLocale ? foundedLocale : locales[0];
          // const finalI18n =
          //   i18nFounded && Array.isArray(i18nFounded) && i18nFounded[0]
          //     ? i18nFounded[0].split(".")[0]
          //     : locales[0];
        });
      }

      createPage({
        path: slug,
        component: path.resolve(
          rootDir,
          `gatsby-theme-v5-boilerplate/src/templates/one-column.js`
        ),
        context: {
          ...page.pageContext,
          title,
          content: page.html,
          description,
          availableI18n,
          i18n,
          theLocales: localesSlugs,
          helperI18n,
          slug,
          SEO: {
            i18n: i18n,
            agent: agent,
            schema: schema,
            topology: "pages",
            dateCreated: date,
            datePublished: date,
            slug: slug,
            siteUrl: h.brandUrl,
            articleUrl: h.brandUrl + "/" + slug,
            title: title,
            description: description,
            keywords: h.brandKeywords,
            author: h.brandName,
            social: h.sameAs,
            articleBody: page.html,
            questions: questions,
            brandLogo: h.brandLogo,
            brandCardImage: h.brandCardImage,
            featuredImage: featuredImage,
            fbAppID: h.fbAppID,
            themeColor: h.brandHexMainColor,
            brandName: h.brandName,
            brandDescription: h.brandDescription,
            brandKeywords: h.brandKeywords,
            brandEmail: h.brandEmail,
            brandPhone: h.brandPhone,
            track: null,
            album: null,
          },
        },

        slices: {
          // Any time `<Slice alias="seo">` is seen on this page,
          // use the `seo-${language}` id
          seo: `seo-${slug}`,
        },
      });

      // post create pages xml builder

      const imagePageSrc =
        h.brandUrl +
        featuredImage?.childrenImageSharp[0]?.gatsbyImageData?.images.fallback
          .src;

      page?.htmlAst?.children?.map(child => {
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
        excerpt: page.excerpt,
        insideImgs: imgsPageObj || [],
      });
    });

    // dealing with nodes
    landings?.forEach(landing => {
      if (!landing) {
        return console.log("landing: deu erro muito");
      }
      if (landing.frontmatter === null) {
        return console.log("landing: deu erro");
      }
      const { slug } = landing.fields;
      const { title, headline, questions, featuredImage, emailCTA } =
        landing.frontmatter;

      // Use the fields created in exports.onCreateNode

      createPage({
        path: slug,
        component: path.resolve(
          rootDir,
          `gatsby-theme-v5-boilerplate/src/templates/half-div.js`
        ),
        context: {
          title: title,
          content: landing.html,
          headline: headline,
          questions: questions,
          excerpt: landing.excerpt,
          featuredImage: featuredImage,
          emailCTA: emailCTA,
        },
      });
    });

    // new cat N landings

    // // Make category pages
    // categories?.forEach(async edges => {
    //   if (!edges) {
    //     return console.log("edges deu ruim");
    //   }
    //   console.log(edges);
    //   if (!edges) {
    //     return console.log("edges: deu muito ruim");
    //   }
    //   if (edges.fieldValue === null) {
    //     return console.log("category: fieldValue deu muito ruim");
    //   }

    //   if (edges.edges === null) {
    //     return console.log("category: edges deu muito ruim");
    //   }
    //   // console.log("aqui dentrooooooooooo");
    //   // const { slug, availableI18n, i18n } = edges.category.node.fields;
    //   // const { title, helperI18n, questions, featuredImage } =
    //   //   edges.category.node.frontmatter;
    //   // const h = await require(`${schemasPath}/${
    //   //   i18n === locales[0] ? "default" : i18n
    //   // }.json`).schema[0].card[0];

    //   // // Use the fields created in exports.onCreatepage
    //   // const regex = /\/([^/]+)\.md$/;
    //   // const localesSlugs = [];

    //   // if (availableI18n && availableI18n.length > 1) {
    //   //   posts.filter(async currPage => {
    //   //     const slugTitleTwo = currPage.fileAbsolutePath
    //   //       .match(regex)[1]
    //   //       .includes(".")
    //   //       ? currPage.fileAbsolutePath.match(regex)[1].split(".")[0]
    //   //       : currPage.fileAbsolutePath.match(regex)[1];
    //   //     const slugLocale = currPage.fileAbsolutePath
    //   //       .match(regex)[1]
    //   //       .split(".")[1];
    //   //     // const frontmatterSlug = currPage?.frontmatter?.slug
    //   //     //   ? currPage.frontmatter.slug
    //   //     //   : slugTitleTwo;
    //   //     // const isI18n = currPage.fileAbsolutePath
    //   //     //   .match(regex)[1]
    //   //     //   .includes(".");
    //   //     // const isLocale = isI18n && slugLocale !== "";
    //   //     // const finalSlug = isLocale
    //   //     //   ? "/" + slugLocale + "/" + frontmatterSlug + "/"
    //   //     //   : currPage.fileAbsolutePath.match(regex)[1];
    //   //     const schemasFiles = await fs.readdir(schemasPath);
    //   //     const localesWithouDefault = [];
    //   //     for (const element of schemasFiles) {
    //   //       if (element !== "default.json") {
    //   //         localesWithouDefault.push(element);
    //   //       }
    //   //     }
    //   //     const MDPagesFolder = path.resolve(rootDir, `content/posts`);
    //   //     const MDFiles = await fs.readdir(MDPagesFolder);
    //   //     const regexTranslation = /\.([a-z0-9-]{2})\.md$/i;

    //   //     const translations = MDFiles.filter(
    //   //       md =>
    //   //         md.match(regexTranslation) &&
    //   //         md.split(".").length > 1 &&
    //   //         md.split(".")[0] === slugTitleTwo
    //   //     );

    //   //     const defaultsMds = MDFiles.filter(
    //   //       md =>
    //   //         !md.match(regexTranslation) &&
    //   //         md.split(".").length > 1 &&
    //   //         md.split(".")[0] === slugTitleTwo
    //   //     );

    //   //     if (
    //   //       !currPage.fileAbsolutePath.match(regex)[1].includes(".") &&
    //   //       translations.length > 0
    //   //     ) {
    //   //       defaultsMds.forEach(async md => {
    //   //         if (
    //   //           md.split(".").length > 1 &&
    //   //           md.split(".")[0] === slugTitleTwo
    //   //         ) {
    //   //           const mdLocale = MDFiles.filter(
    //   //             e =>
    //   //               e.match(regexTranslation) &&
    //   //               e.split(".").length > 1 &&
    //   //               e.split(".")[0] === slugTitleTwo
    //   //           );
    //   //           const arrayI18n = [];
    //   //           mdLocale.forEach(async el => arrayI18n.push(el));
    //   //         }
    //   //       });
    //   //     }

    //   //     if (translations.length > 0) {
    //   //       translations.forEach(async md => {
    //   //         if (
    //   //           md.split(".").length > 1 &&
    //   //           md.split(".")[0] === slugTitleTwo
    //   //         ) {
    //   //           const mdLocale = MDFiles.filter(
    //   //             e =>
    //   //               e.match(regexTranslation) &&
    //   //               e.split(".").length > 1 &&
    //   //               e.split(".")[0] === slugTitleTwo
    //   //           );
    //   //           const arrayI18n = [];
    //   //           mdLocale.forEach(async el => arrayI18n.push(el));
    //   //         }
    //   //       });
    //   //     }

    //   //     let foundedLocale = localesWithouDefault.filter(e =>
    //   //       e.includes(slugLocale)
    //   //     );
    //   //     if (!foundedLocale || foundedLocale === "") {
    //   //       foundedLocale === locales[0];
    //   //     } else {
    //   //       foundedLocale == null;
    //   //     }
    //   //     // const i18nFounded = foundedLocale ? foundedLocale : locales[0];
    //   //     // const finalI18n =
    //   //     //   i18nFounded && Array.isArray(i18nFounded) && i18nFounded[0]
    //   //     //     ? i18nFounded[0].split(".")[0]
    //   //     //     : locales[0];
    //   //   });
    //   // }

    //   // Use the fields created in exports.onCreateNode
    //   // console.log("category: TA INDOOO");
    //   // console.log(edges.fieldValue);
    //   // console.log(_.kebabCase(edges.fieldValue));
    //   // console.log("category: TA INDOOO");
    //   createPage({
    //     path: `/trends/${_.kebabCase(edges.fieldValue)}/`,
    //     component: path.resolve(
    //       rootDir,
    //       "gatsby-theme-v5-boilerplate/src/templates/category-list-page.js"
    //     ),
    //     context: {
    //       categories: edges.fieldValue,
    //     },
    //   });
    //   console.log("category: FOIIIIII");
    //   console.log("category: FOIIIIII");
    //   console.log("category: FOIIIIII");
    // });

    // dealing with nodes
    // landings?.forEach(async landing => {
    //   if (!landing) {
    //     return console.log("landing: deu erro muito");
    //   }
    //   if (landing.node.frontmatter === null) {
    //     return console.log("landing: deu erro");
    //   }
    //   const { slug, availableI18n, i18n } = landing.node.fields;
    //   const {
    //     title,
    //     headline,
    //     featuredImage,
    //     emailCTA,
    //     helperI18n,
    //     questions,
    //   } = landing.node.frontmatter;

    //   // const { slug, availableI18n, i18n } = category.node.fields;
    //   // const {
    //   //   title,
    //   //   date,
    //   //   description,
    //   //   helperI18n,
    //   //   questions,
    //   //   featuredImage,
    //   // } = category.node.frontmatter;

    //   const h = await require(`${schemasPath}/${
    //     i18n === locales[0] ? "default" : i18n
    //   }.json`).schema[0].card[0];
    //   // Use the fields created in exports.onCreateNode

    //   // Use the fields created in exports.onCreatepage
    //   const regex = /\/([^/]+)\.md$/;
    //   const localesSlugs = [];

    //   if (availableI18n && availableI18n.length > 1) {
    //     landings.filter(async currPage => {
    //       const slugTitleTwo = currPage.fileAbsolutePath
    //         .match(regex)[1]
    //         .includes(".")
    //         ? currPage.fileAbsolutePath.match(regex)[1].split(".")[0]
    //         : currPage.fileAbsolutePath.match(regex)[1];
    //       const slugLocale = currPage.fileAbsolutePath
    //         .match(regex)[1]
    //         .split(".")[1];
    //       // const frontmatterSlug = currPage?.frontmatter?.slug
    //       //   ? currPage.frontmatter.slug
    //       //   : slugTitleTwo;
    //       // const isI18n = currPage.fileAbsolutePath
    //       //   .match(regex)[1]
    //       //   .includes(".");
    //       // const isLocale = isI18n && slugLocale !== "";
    //       // const finalSlug = isLocale
    //       //   ? "/" + slugLocale + "/" + frontmatterSlug + "/"
    //       //   : currPage.fileAbsolutePath.match(regex)[1];
    //       const schemasFiles = await fs.readdir(schemasPath);
    //       const localesWithouDefault = [];
    //       for (const element of schemasFiles) {
    //         if (element !== "default.json") {
    //           localesWithouDefault.push(element);
    //         }
    //       }
    //       const MDPagesFolder = path.resolve(rootDir, `content/landings`);
    //       const MDFiles = await fs.readdir(MDPagesFolder);
    //       const regexTranslation = /\.([a-z0-9-]{2})\.md$/i;

    //       const translations = MDFiles.filter(
    //         md =>
    //           md.match(regexTranslation) &&
    //           md.split(".").length > 1 &&
    //           md.split(".")[0] === slugTitleTwo
    //       );

    //       const defaultsMds = MDFiles.filter(
    //         md =>
    //           !md.match(regexTranslation) &&
    //           md.split(".").length > 1 &&
    //           md.split(".")[0] === slugTitleTwo
    //       );

    //       if (
    //         !currPage.fileAbsolutePath.match(regex)[1].includes(".") &&
    //         translations.length > 0
    //       ) {
    //         defaultsMds.forEach(async md => {
    //           if (
    //             md.split(".").length > 1 &&
    //             md.split(".")[0] === slugTitleTwo
    //           ) {
    //             const mdLocale = MDFiles.filter(
    //               e =>
    //                 e.match(regexTranslation) &&
    //                 e.split(".").length > 1 &&
    //                 e.split(".")[0] === slugTitleTwo
    //             );
    //             const arrayI18n = [];
    //             mdLocale.forEach(async el => arrayI18n.push(el));
    //           }
    //         });
    //       }

    //       if (translations.length > 0) {
    //         translations.forEach(async md => {
    //           if (
    //             md.split(".").length > 1 &&
    //             md.split(".")[0] === slugTitleTwo
    //           ) {
    //             const mdLocale = MDFiles.filter(
    //               e =>
    //                 e.match(regexTranslation) &&
    //                 e.split(".").length > 1 &&
    //                 e.split(".")[0] === slugTitleTwo
    //             );
    //             const arrayI18n = [];
    //             mdLocale.forEach(async el => arrayI18n.push(el));
    //           }
    //         });
    //       }

    //       let foundedLocale = localesWithouDefault.filter(e =>
    //         e.includes(slugLocale)
    //       );
    //       if (!foundedLocale || foundedLocale === "") {
    //         foundedLocale === locales[0];
    //       } else {
    //         foundedLocale == null;
    //       }
    //     });
    //   }

    //   createPage({
    //     path: slug,
    //     component: path.resolve(
    //       rootDir,
    //       `gatsby-theme-v5-boilerplate/src/templates/half-div.js`
    //     ),
    //     context: {
    //       title: title,
    //       content: landing.node.html,
    //       headline: headline,
    //       questions: questions,
    //       excerpt: landing.node.excerpt,
    //       featuredImage: featuredImage,
    //       emailCTA: emailCTA,
    //       availableI18n,
    //       i18n,
    //       theLocales: localesSlugs,
    //       helperI18n,
    //       slug,

    //       SEO: {
    //         i18n: i18n,
    //         agent: agent,
    //         schema: null,
    //         topology: "landings",
    //         dateCreated: null,
    //         datePublished: null,
    //         slug: slug,
    //         siteUrl: h.brandUrl,
    //         articleUrl: h.brandUrl + "/" + slug,
    //         title: title,
    //         description: "landings",
    //         keywords: h.brandKeywords,
    //         author: h.brandName,
    //         social: h.sameAs,
    //         articleBody: landing.node.html,
    //         questions: null,
    //         brandLogo: h.brandLogo,
    //         brandCardImage: h.brandCardImage,
    //         featuredImage: featuredImage,
    //         fbAppID: h.fbAppID,
    //         themeColor: h.brandHexMainColor,
    //         brandName: h.brandName,
    //         brandDescription: h.brandDescription,
    //         brandKeywords: h.brandKeywords,
    //         brandEmail: h.brandEmail,
    //         brandPhone: h.brandPhone,
    //         track: null,
    //         album: null,
    //       },
    //     },
    //   });
    // });

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
          <lastmod>2023-04-05T08:30:00.000Z</lastmod>
          <image:image>
            <image:loc>https://ascasamenteiras.com.br/static/a0dd69c92bab97911931006e14f102b6/5531e/52015494369_659ac9d5bb_o.webp</image:loc>
          </image:image>
        </url>,
  
        <url>
          <loc>https://ascasamenteiras.com.br/contato/</loc>
          <lastmod>2023-04-05T12:24:43+00:00</lastmod>
          <image:image>
            <image:loc>https://ascasamenteiras.com.br/static/a0dd69c92bab97911931006e14f102b6/5531e/52015494369_659ac9d5bb_o.webp</image:loc>
          </image:image>
        </url>,
  
  
  
          ${allPages.map(item => {
            return `<url>
            <loc>${
              card?.siteUrl === undefined
                ? "https://ascasamenteiras.com.br"
                : card.siteUrl
            }${item.slug.charAt(0) === "/" ? item.slug : "/" + item.slug}</loc>
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
                            : card.siteUrl + img[0]
                        }</image:loc>
                      </image:image>`;
                    })
                  : ""
              }
          </url>`;
          })}
  
      </urlset>
      `;

    // const theXML = `<?xml version="1.0" encoding="UTF-8"?>
    //   <?xml-stylesheet type="text/xsl" href="/template.xsl"?>
    //     <urlset
    //       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    //       xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd http://www.google.com/schemas/sitemap-image/1.1 http://www.google.com/schemas/sitemap-image/1.1/sitemap-image.xsd"
    //       xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    //       ${allFeed.map(item => {
    //         return `<url>
    //         <loc>${card.brandUrl}${item.slug}</loc>
    //         <lastmod>${item.date}</lastmod>
    //         <image:image>
    //           <image:loc>${item.imageSrc}</image:loc>
    //         </image:image>

    //         ${
    //           item.insideImgs
    //             ? item.insideImgs.map(img => {
    //                 return `<image:image>
    //         <image:loc>${
    //           img[0].substring(0, 4) === "http"
    //             ? img[0]
    //             : card.brandUrl + img[0]
    //         }</image:loc>
    //       </image:image>`;
    //               })
    //             : ""
    //         }
    //       </url>`;
    //       })}
    //   </urlset>
    //   `;

    const theStoriesXML = `<?xml version="1.0" encoding="UTF-8"?>
      <?xml-stylesheet type="text/xsl" href="/template.xsl"?>
        <urlset
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd http://www.google.com/schemas/sitemap-image/1.1 http://www.google.com/schemas/sitemap-image/1.1/sitemap-image.xsd"
          xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
          ${allPages.map(item => {
            return `<url>
            <loc>${
              card?.siteUrl === undefined
                ? "https://ascasamenteiras.com.br"
                : card.siteUrl
            }/${
              item.slug.charAt(0) === "/"
                ? item.slug.substring(1).replace("/", "-").slice(0, -1) +
                  `.stories.amp.html`
                : item.slug.replace("/", "-").slice(0, -1) + `.stories.amp.html`
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
              img[0].substring(0, 4) === "http" ? img[0] : card.siteUrl + img[0]
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
          <p>@AsCasamenteiras_</p>
        </div>
      </amp-story-grid-layer>
    </amp-story-page>`;

    const theAmpStories = (title, srcImg, mainText, postImages, canonical) => {
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
                  card.brandUrl +
                    results.data.storiesA.childrenImageSharp[0].gatsbyImageData
                      .images.fallback.src,
                  "Fale com As Casamenteiras!",
                  99
                )}
                ${ampStoryPage(
                  card.brandUrl +
                    results.data.storiesZ.childrenImageSharp[0].gatsbyImageData
                      .images.fallback.src,
                  "Todo Amor Importa!",
                  100
                )}
  
            </amp-story>
          </body>
        </html>`;
    };

    writeFileSync(`./public/page-sitemap.xml`, theXMLpages);

    // writeFileSync(`./public/post-sitemap.xml`, theXML);

    writeFileSync(`./public/webstories-sitemap.xml`, theStoriesXML);

    allPages.map(item => {
      const itemSlug = card.brandUrl + item.slug;
      fs.writeFile(
        `./public/${item.slug
          .substring(1)
          .replace("/", "-")
          .slice(0, -1)}.stories.amp.html`,
        theAmpStories(
          item.title,
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
