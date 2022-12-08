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

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const { createRedirect } = actions;

  const redirectsArray = [
    {
      fromPath: `/vencemos-premio-zankyou-ziwa-awards-2022`,
      toPath: `/vencemos-premio-zankyou-2022/`
    },
    {
      fromPath: `/vencemos-premio-zankyou-ziwa-awards-2022/`,
      toPath: `/vencemos-premio-zankyou-2022/`
    },
    {
      fromPath: `/rsvp-contato`,
      toPath: `/contato/`
    },
    {
      fromPath: `/rsvp-contato/`,
      toPath: `/contato/`
    },
    {
      fromPath: `/nossos-casais`,
      toPath: `/casamentos/`  
    },
    {
      fromPath: `/nossos-casais/`,
      toPath: `/casamentos/`,
    }
  ]

  redirectsArray.forEach(redirect => {
    createRedirect({
      fromPath: redirect.fromPath,
      toPath: redirect.toPath,
    });
    console.log("redirect criado com sucesso")
    console.log('redirect.fromPath::::')
    console.log(redirect.fromPath)
    console.log('redirect.toPath::::')
    console.log(redirect.toPath)

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
              questions
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
            questions: node.frontmatter.questions
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
            postQuestion: node.frontmatter.questions
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
          child.children.map(eleChild=>{
                      if (eleChild.tagName === "span") {
                        eleChild.children.map(grandChildEle=>{
                          if (grandChildEle.tagName==="img") {
                            console.log(grandChildEle.properties.alt)
                            console.log(grandChildEle.properties.dataSrc)
                            console.log(grandChildEle.properties.title)
                            imgsObj.push([grandChildEle.properties.dataSrc,grandChildEle.properties.alt]);
                          }
                        })

                      }

          })


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

          ${item.insideImgs ? item.insideImgs.map(img=>{return`<image:image>
          <image:loc>${
            img[0].substring(0, 4) === "http"
              ? img[0]
              : businessInfos.siteUrl + img[0]
          }</image:loc>
        </image:image>`}):''}



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
					<loc>${businessInfos.siteUrl}${item.slug.slice(0, -1)+`.stories.amp.html`}</loc>
					<lastmod>${item.date}</lastmod>
					<image:image>
						<image:loc>${item.imageSrc}</image:loc>
					</image:image>

          ${item.insideImgs ? item.insideImgs.map(img=>{return`<image:image>
          <image:loc>${
            img[0].substring(0, 4) === "http"
              ? img[0]
              : businessInfos.siteUrl + img[0]
          }</image:loc>
        </image:image>`}):''}



				</url>`;
        })}
		</urlset>
		`;
    fs.writeFileSync(`./public/webstories-sitemap.xml`, theStoriesXML);
    

    const theAmpStorie = (title,      
      key,
      srcImg,
      mainText,
      postImages,
      slug) => {
        console.log("postImages postImages postImages")
        console.log(postImages)
      return `<!DOCTYPE html>
      <html amp lang="pt-BR">
      
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width,minimum-scale=1">
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
      <style amp-runtime="" i-amphtml-version="012211182146000">html{overflow-x:hidden!important}html.i-amphtml-fie{height:100%!important;width:100%!important}html:not([amp4ads]),html:not([amp4ads]) body{height:auto!important}html:not([amp4ads]) body{margin:0!important}body{-webkit-text-size-adjust:100%;-moz-text-size-adjust:100%;-ms-text-size-adjust:100%;text-size-adjust:100%}html.i-amphtml-singledoc.i-amphtml-embedded{-ms-touch-action:pan-y pinch-zoom;touch-action:pan-y pinch-zoom}html.i-amphtml-fie>body,html.i-amphtml-singledoc>body{overflow:visible!important}html.i-amphtml-fie:not(.i-amphtml-inabox)>body,html.i-amphtml-singledoc:not(.i-amphtml-inabox)>body{position:relative!important}html.i-amphtml-ios-embed-legacy>body{overflow-x:hidden!important;overflow-y:auto!important;position:absolute!important}html.i-amphtml-ios-embed{overflow-y:auto!important;position:static}#i-amphtml-wrapper{overflow-x:hidden!important;overflow-y:auto!important;position:absolute!important;top:0!important;left:0!important;right:0!important;bottom:0!important;margin:0!important;display:block!important}html.i-amphtml-ios-embed.i-amphtml-ios-overscroll,html.i-amphtml-ios-embed.i-amphtml-ios-overscroll>#i-amphtml-wrapper{-webkit-overflow-scrolling:touch!important}#i-amphtml-wrapper>body{position:relative!important;border-top:1px solid transparent!important}#i-amphtml-wrapper+body{visibility:visible}#i-amphtml-wrapper+body .i-amphtml-lightbox-element,#i-amphtml-wrapper+body[i-amphtml-lightbox]{visibility:hidden}#i-amphtml-wrapper+body[i-amphtml-lightbox] .i-amphtml-lightbox-element{visibility:visible}#i-amphtml-wrapper.i-amphtml-scroll-disabled,.i-amphtml-scroll-disabled{overflow-x:hidden!important;overflow-y:hidden!important}amp-instagram{padding:54px 0px 0px!important;background-color:#fff}amp-iframe iframe{box-sizing:border-box!important}[amp-access][amp-access-hide]{display:none}[subscriptions-dialog],body:not(.i-amphtml-subs-ready) [subscriptions-action],body:not(.i-amphtml-subs-ready) [subscriptions-section]{display:none!important}amp-experiment,amp-live-list>[update]{display:none}amp-list[resizable-children]>.i-amphtml-loading-container.amp-hidden{display:none!important}amp-list [fetch-error],amp-list[load-more] [load-more-button],amp-list[load-more] [load-more-end],amp-list[load-more] [load-more-failed],amp-list[load-more] [load-more-loading]{display:none}amp-list[diffable] div[role=list]{display:block}amp-story-page,amp-story[standalone]{min-height:1px!important;display:block!important;height:100%!important;margin:0!important;padding:0!important;overflow:hidden!important;width:100%!important}amp-story[standalone]{background-color:#000!important;position:relative!important}amp-story-page{background-color:#757575}amp-story .amp-active>div,amp-story .i-amphtml-loader-background{display:none!important}amp-story-page:not(:first-of-type):not([distance]):not([active]){transform:translateY(1000vh)!important}amp-autocomplete{position:relative!important;display:inline-block!important}amp-autocomplete>input,amp-autocomplete>textarea{padding:0.5rem;border:1px solid rgba(0,0,0,0.33)}.i-amphtml-autocomplete-results,amp-autocomplete>input,amp-autocomplete>textarea{font-size:1rem;line-height:1.5rem}[amp-fx^=fly-in]{visibility:hidden}amp-script[nodom],amp-script[sandboxed]{position:fixed!important;top:0!important;width:1px!important;height:1px!important;overflow:hidden!important;visibility:hidden}
/*# sourceURL=/css/ampdoc.css*/[hidden]{display:none!important}.i-amphtml-element{display:inline-block}.i-amphtml-blurry-placeholder{transition:opacity 0.3s cubic-bezier(0.0,0.0,0.2,1)!important;pointer-events:none}[layout=nodisplay]:not(.i-amphtml-element){display:none!important}.i-amphtml-layout-fixed,[layout=fixed][width][height]:not(.i-amphtml-layout-fixed){display:inline-block;position:relative}.i-amphtml-layout-responsive,[layout=responsive][width][height]:not(.i-amphtml-layout-responsive),[width][height][heights]:not([layout]):not(.i-amphtml-layout-responsive),[width][height][sizes]:not(img):not([layout]):not(.i-amphtml-layout-responsive){display:block;position:relative}.i-amphtml-layout-intrinsic,[layout=intrinsic][width][height]:not(.i-amphtml-layout-intrinsic){display:inline-block;position:relative;max-width:100%}.i-amphtml-layout-intrinsic .i-amphtml-sizer{max-width:100%}.i-amphtml-intrinsic-sizer{max-width:100%;display:block!important}.i-amphtml-layout-container,.i-amphtml-layout-fixed-height,[layout=container],[layout=fixed-height][height]:not(.i-amphtml-layout-fixed-height){display:block;position:relative}.i-amphtml-layout-fill,.i-amphtml-layout-fill.i-amphtml-notbuilt,[layout=fill]:not(.i-amphtml-layout-fill),body noscript>*{display:block;overflow:hidden!important;position:absolute;top:0;left:0;bottom:0;right:0}body noscript>*{position:absolute!important;width:100%;height:100%;z-index:2}body noscript{display:inline!important}.i-amphtml-layout-flex-item,[layout=flex-item]:not(.i-amphtml-layout-flex-item){display:block;position:relative;-ms-flex:1 1 auto;flex:1 1 auto}.i-amphtml-layout-fluid{position:relative}.i-amphtml-layout-size-defined{overflow:hidden!important}.i-amphtml-layout-awaiting-size{position:absolute!important;top:auto!important;bottom:auto!important}i-amphtml-sizer{display:block!important}@supports (aspect-ratio:1/1){i-amphtml-sizer.i-amphtml-disable-ar{display:none!important}}.i-amphtml-blurry-placeholder,.i-amphtml-fill-content{display:block;height:0;max-height:100%;max-width:100%;min-height:100%;min-width:100%;width:0;margin:auto}.i-amphtml-layout-size-defined .i-amphtml-fill-content{position:absolute;top:0;left:0;bottom:0;right:0}.i-amphtml-replaced-content,.i-amphtml-screen-reader{padding:0!important;border:none!important}.i-amphtml-screen-reader{position:fixed!important;top:0px!important;left:0px!important;width:4px!important;height:4px!important;opacity:0!important;overflow:hidden!important;margin:0!important;display:block!important;visibility:visible!important}.i-amphtml-screen-reader~.i-amphtml-screen-reader{left:8px!important}.i-amphtml-screen-reader~.i-amphtml-screen-reader~.i-amphtml-screen-reader{left:12px!important}.i-amphtml-screen-reader~.i-amphtml-screen-reader~.i-amphtml-screen-reader~.i-amphtml-screen-reader{left:16px!important}.i-amphtml-unresolved{position:relative;overflow:hidden!important}.i-amphtml-select-disabled{-webkit-user-select:none!important;-ms-user-select:none!important;user-select:none!important}.i-amphtml-notbuilt,[layout]:not(.i-amphtml-element),[width][height][heights]:not([layout]):not(.i-amphtml-element),[width][height][sizes]:not(img):not([layout]):not(.i-amphtml-element){position:relative;overflow:hidden!important;color:transparent!important}.i-amphtml-notbuilt:not(.i-amphtml-layout-container)>*,[layout]:not([layout=container]):not(.i-amphtml-element)>*,[width][height][heights]:not([layout]):not(.i-amphtml-element)>*,[width][height][sizes]:not([layout]):not(.i-amphtml-element)>*{display:none}amp-img:not(.i-amphtml-element)[i-amphtml-ssr]>img.i-amphtml-fill-content{display:block}.i-amphtml-notbuilt:not(.i-amphtml-layout-container),[layout]:not([layout=container]):not(.i-amphtml-element),[width][height][heights]:not([layout]):not(.i-amphtml-element),[width][height][sizes]:not(img):not([layout]):not(.i-amphtml-element){color:transparent!important;line-height:0!important}.i-amphtml-ghost{visibility:hidden!important}.i-amphtml-element>[placeholder],[layout]:not(.i-amphtml-element)>[placeholder],[width][height][heights]:not([layout]):not(.i-amphtml-element)>[placeholder],[width][height][sizes]:not([layout]):not(.i-amphtml-element)>[placeholder]{display:block;line-height:normal}.i-amphtml-element>[placeholder].amp-hidden,.i-amphtml-element>[placeholder].hidden{visibility:hidden}.i-amphtml-element:not(.amp-notsupported)>[fallback],.i-amphtml-layout-container>[placeholder].amp-hidden,.i-amphtml-layout-container>[placeholder].hidden{display:none}.i-amphtml-layout-size-defined>[fallback],.i-amphtml-layout-size-defined>[placeholder]{position:absolute!important;top:0!important;left:0!important;right:0!important;bottom:0!important;z-index:1}amp-img[i-amphtml-ssr]:not(.i-amphtml-element)>[placeholder]{z-index:auto}.i-amphtml-notbuilt>[placeholder]{display:block!important}.i-amphtml-hidden-by-media-query{display:none!important}.i-amphtml-element-error{background:red!important;color:#fff!important;position:relative!important}.i-amphtml-element-error:before{content:attr(error-message)}i-amp-scroll-container,i-amphtml-scroll-container{position:absolute;top:0;left:0;right:0;bottom:0;display:block}i-amp-scroll-container.amp-active,i-amphtml-scroll-container.amp-active{overflow:auto;-webkit-overflow-scrolling:touch}.i-amphtml-loading-container{display:block!important;pointer-events:none;z-index:1}.i-amphtml-notbuilt>.i-amphtml-loading-container{display:block!important}.i-amphtml-loading-container.amp-hidden{visibility:hidden}.i-amphtml-element>[overflow]{cursor:pointer;position:relative;z-index:2;visibility:hidden;display:initial;line-height:normal}.i-amphtml-layout-size-defined>[overflow]{position:absolute}.i-amphtml-element>[overflow].amp-visible{visibility:visible}template{display:none!important}.amp-border-box,.amp-border-box *,.amp-border-box :after,.amp-border-box :before{box-sizing:border-box}amp-pixel{display:none!important}amp-analytics,amp-auto-ads,amp-story-auto-ads{position:fixed!important;top:0!important;width:1px!important;height:1px!important;overflow:hidden!important;visibility:hidden}amp-story{visibility:hidden!important}html.i-amphtml-fie>amp-analytics{position:initial!important}[visible-when-invalid]:not(.visible),form [submit-error],form [submit-success],form [submitting]{display:none}amp-accordion{display:block!important}@media (min-width:1px){:where(amp-accordion>section)>:first-child{margin:0;background-color:#efefef;padding-right:20px;border:1px solid #dfdfdf}:where(amp-accordion>section)>:last-child{margin:0}}amp-accordion>section{float:none!important}amp-accordion>section>*{float:none!important;display:block!important;overflow:hidden!important;position:relative!important}amp-accordion,amp-accordion>section{margin:0}amp-accordion:not(.i-amphtml-built)>section>:last-child{display:none!important}amp-accordion:not(.i-amphtml-built)>section[expanded]>:last-child{display:block!important}
/*# sourceURL=/css/ampshared.css*/</style>

      
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
          <meta name="amp-story-generator-name" content="Web Stories for GatsbyJS">
          <meta name="amp-story-generator-version" content="1.0.0">
          <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
          <link rel="stylesheet" amp-extension="amp-story" href="https://cdn.ampproject.org/v0/amp-story-1.0.css">

      
      
      
      <style amp-custom="">h1,h2{font-weight:normal}

/*# sourceURL=amp-custom.css */</style>
        </head>
      
        <body>
          <amp-story id="amp-story-id" standalone live-story title="${title}" publisher="As Casamenteiras"
            publisher-logo-src="logo.png"
            poster-portrait-src="logo3x4.png"
            poster-square-src="logoSquare.png"
            poster-landscape-src="logo4x3.png"
            >


              
                
            
            
            

            <amp-story-page id="d0345866-3a97-417d-8714-a868eff8fb68" auto-advance-after="7s" >
           
            <amp-story-grid-layer template="vertical" >
            <amp-img layout="fill" src="${srcImg}" alt="${title}" sizes="(min-width: 1024px) 64vh, 142vw" disable-inline-width="true" class="i-amphtml-layout-fill i-amphtml-layout-size-defined" i-amphtml-layout="fill">
          </amp-img>
          </amp-story-grid-layer>
            <amp-story-grid-layer template="vertical" >
            <h1 class="_146e3e0 fill text-wrapper">
            As Casamenteiras
          </h1>
            <p class="_2339d1d fill text-wrapper">
            ${title}
          </p>
            <p class="_e936cf6 fill text-wrapper" aria-hidden="true">
${title}
          </p>
          
          <p fill text-wrapper">
            @ascasamenteiras_
          </p>
          </amp-story-grid-layer>
          </amp-story-page>
          









      

            ${postImages.map((img,indx)=>{return`
            <amp-story-page id="d0345866-3a97-417d-8714-a868eff8fb68" auto-advance-after="7s" class="i-amphtml-layout-container" i-amphtml-layout="container">
            <amp-story-grid-layer template="vertical" aspect-ratio="412:618" class="grid-layer i-amphtml-layout-container" i-amphtml-layout="container" style="--aspect-ratio:412/618;">
            <amp-img layout="fill" src="${img[0]}" alt="${img[1]}" sizes="(min-width: 1024px) 64vh, 142vw" disable-inline-width="true" class="i-amphtml-layout-fill i-amphtml-layout-size-defined" i-amphtml-layout="fill">
          </amp-img>
          </amp-story-grid-layer>
            <amp-story-grid-layer template="vertical" aspect-ratio="412:618" class="grid-layer i-amphtml-layout-container" i-amphtml-layout="container" style="--aspect-ratio:412/618;">
            <h1 class="_146e3e0 fill text-wrapper">
            As Casamenteiras
          </h1>
            <p class="_2339d1d fill text-wrapper">
           ${img[1]}
          </p>
            <p class="_e936cf6 fill text-wrapper" aria-hidden="true">
          ${img[1]}
        
          </p>
            
          <p class="_7d6da65 fill text-wrapper">
            @ascasamenteiras_
          </p>
          </amp-story-grid-layer>
          </amp-story-page>
          





            `})}



          </amp-story>
      
        </body>
      
      </html>`
    }

    allFeed.map((item,key) => {
      const itemSlug = businessInfos.siteUrl + item.slug
      fs.writeFile(`./public/${item.slug.slice(1,-1)}.stories.amp.html`, theAmpStorie(
        item.title,
        key,
        item.imageSrc,
        'txt',
        item.insideImgs,
        itemSlug.replace('//','/')
        ), function (err) {
          if (err) throw err;
          console.log('File is created successfully.');
        });

    })

  });
};
