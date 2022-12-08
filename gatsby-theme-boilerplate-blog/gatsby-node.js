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
      
      
      
      
      <style amp-custom="">h1,h2{font-weight:normal}amp-story-page{background-color:#131516}amp-story-grid-layer{overflow:visible}@media (max-aspect-ratio: 9 / 16){@media (min-aspect-ratio: 320 / 678){amp-story-grid-layer.grid-layer{margin-top:calc(( 100% / .5625 - 100% / .66666666666667 ) / 2)}}}@media not all and (min-resolution:.001dpcm){@media{p.text-wrapper > span{font-size:calc(100% - .5px)}}}.page-fullbleed-area,.page-background-overlay-area{position:absolute;overflow:hidden;width:100%;left:0;height:calc(1.1851851851852 * 100%);top:calc(( 1 - 1.1851851851852 ) * 100% / 2)}.element-overlay-area{position:absolute;width:100%;height:100%;top:0;left:0}.page-safe-area{overflow:visible;position:absolute;top:0;bottom:0;left:0;right:0;width:100%;height:calc(.84375 * 100%);margin:auto 0}.mask{position:absolute;overflow:hidden}.fill{position:absolute;top:0;left:0;right:0;bottom:0;margin:0}@media (prefers-reduced-motion: no-preference){.animation-wrapper{opacity:var(--initial-opacity);transform:var(--initial-transform)}}._c7ac65b{background-color:#745647}._6120891{position:absolute;pointer-events:none;left:0;top:-9.25926%;width:100%;height:118.51852%;opacity:1}._89d52dd{pointer-events:initial;width:100%;height:100%;display:block;position:absolute;top:0;left:0;z-index:0}._39b9a20{position:absolute;width:142.22222%;height:100%;left:-36.73611%;top:0%}._01bc15c{background-color:rgba(0,0,0,.15)}._814e7e7{position:absolute;pointer-events:none;left:14.80583%;top:70.06472%;width:70.14563%;height:11.00324%;opacity:1}._82a9292{pointer-events:initial;width:100%;height:100%;display:block;position:absolute;top:0;left:0;z-index:0;border-radius:3.4602076124567% 3.4602076124567% 3.4602076124567% 3.4602076124567%/14.705882352941% 14.705882352941% 14.705882352941% 14.705882352941%;background-clip:content-box;background-color:#fff}._146e3e0{white-space:pre-line;overflow-wrap:break-word;word-break:break-word;margin:2.1824989186851% 0;font-family:"Anton",sans-serif;font-size:.647249em;line-height:1.19;text-align:center;padding:1.3840830449827% 2.7681660899654%;color:#000}._812798c{text-transform:uppercase}._dda1d2e{position:absolute;pointer-events:none;left:11.65049%;top:83.81877%;width:76.69903%;height:11.97411%;opacity:1}._de25298{pointer-events:initial;width:100%;height:100%;display:block;position:absolute;top:0;left:0;z-index:0;border-radius:3.1645569620253% 3.1645569620253% 3.1645569620253% 3.1645569620253%/13.513513513514% 13.513513513514% 13.513513513514% 13.513513513514%}._2339d1d{white-space:pre-line;overflow-wrap:break-word;word-break:break-word;margin:0;font-family:"Nunito",sans-serif;font-size:.323625em;line-height:calc(1.5em + .4em);text-align:center;padding:0;color:#000;background-color:#fff;background:none}._8fd856e{display:block;position:relative;left:0;top:0;margin:-.43037974683544% 0;-webkit-box-decoration-break:clone;box-decoration-break:clone}._79a7bd9{background-color:#fff;-webkit-box-decoration-break:clone;box-decoration-break:clone;position:relative;padding:1.2658227848101% 2.5316455696203%;text-align:center;border-radius:10px 10px 10px 10px;color:transparent}._47e5cc9{font-weight:700}._e936cf6{white-space:pre-line;overflow-wrap:break-word;word-break:break-word;margin:0;font-family:"Nunito",sans-serif;font-size:.323625em;line-height:calc(1.5em + .4em);text-align:center;padding:0;color:#000;background-color:#fff;background:none;position:absolute;top:0;left:0;right:0}._f340c56{background-color:#fff;-webkit-box-decoration-break:clone;box-decoration-break:clone;position:relative;padding:1.2658227848101% 2.5316455696203%;text-align:center;border-radius:10px 10px 10px 10px;background:none}._0791a18{position:absolute;pointer-events:none;left:32.03883%;top:0;width:36.40777%;height:3.23625%;opacity:1}._ae617bd{position:absolute;width:100%;height:102.15278%;left:0%;top:-1.07639%}._5a49e00{position:absolute;pointer-events:none;left:76.45631%;top:48.22006%;width:41.26214%;height:3.72168%;transform:rotate(270deg);opacity:1}._75da10d{width:100%;height:100%;display:block;position:absolute;top:0;left:0;--initial-opacity:0;--initial-transform:none}._ebfc8a8{pointer-events:initial;width:100%;height:100%;display:block;position:absolute;top:0;left:0;z-index:0;border-radius:5.8823529411765% 5.8823529411765% 5.8823529411765% 5.8823529411765%/43.478260869565% 43.478260869565% 43.478260869565% 43.478260869565%}._7d6da65{white-space:pre-line;overflow-wrap:break-word;word-break:break-word;margin:0;font-family:"Merriweather",serif;font-size:.194175em;line-height:calc(1.2em + .66666666666667em);text-align:right;padding:0;color:#000;background-color:#fff;background:none}._b9a0391{display:block;position:relative;left:0;top:0;margin:.20117647058824% 0;-webkit-box-decoration-break:clone;box-decoration-break:clone}._b95d396{background-color:#fff;-webkit-box-decoration-break:clone;box-decoration-break:clone;position:relative;padding:2.3529411764706% 4.7058823529412%;text-align:right;border-radius:10px 10px 10px 10px;color:transparent}._dfdb5e4{white-space:pre-line;overflow-wrap:break-word;word-break:break-word;margin:0;font-family:"Merriweather",serif;font-size:.194175em;line-height:calc(1.2em + .66666666666667em);text-align:right;padding:0;color:#000;background-color:#fff;background:none;position:absolute;top:0;left:0;right:0}._9c7edb3{background-color:#fff;-webkit-box-decoration-break:clone;box-decoration-break:clone;position:relative;padding:2.3529411764706% 4.7058823529412%;text-align:right;border-radius:10px 10px 10px 10px;background:none}._02f9f51{background-color:#553848}._254c3af{width:100%;height:100%;display:block;position:absolute;top:0;left:0}._232a561{position:absolute;width:177.77778%;height:100%;left:-38.88889%;top:0%}._d548501{position:absolute;pointer-events:none;left:11.40777%;top:83.00971%;width:77.18447%;height:16.99029%;opacity:1}._9686e3a{width:100%;height:100%;display:block;position:absolute;top:0;left:0;--initial-opacity:1;--initial-transform:translate3d(0px,154.49736%,0)}._9cce357{pointer-events:initial;width:100%;height:100%;display:block;position:absolute;top:0;left:0;z-index:0;border-radius:3.1446540880503% 3.1446540880503% 3.1446540880503% 3.1446540880503%/9.5238095238095% 9.5238095238095% 9.5238095238095% 9.5238095238095%}._c5fd23f{white-space:pre-line;overflow-wrap:break-word;word-break:break-word;margin:0;font-family:"Merriweather",serif;font-size:.323625em;line-height:calc(1.4em + .4em);text-align:left;padding:0;color:#000;background-color:#fff;background:none}._f0934dd{display:block;position:relative;left:0;top:0;margin:-.4496855345912% 0;-webkit-box-decoration-break:clone;box-decoration-break:clone}._77fd79b{background-color:#fff;-webkit-box-decoration-break:clone;box-decoration-break:clone;position:relative;padding:1.2578616352201% 2.5157232704403%;text-align:left;border-radius:10px 10px 10px 10px;color:transparent}._43c1014{white-space:pre-line;overflow-wrap:break-word;word-break:break-word;margin:0;font-family:"Merriweather",serif;font-size:.323625em;line-height:calc(1.4em + .4em);text-align:left;padding:0;color:#000;background-color:#fff;background:none;position:absolute;top:0;left:0;right:0}._598c355{background-color:#fff;-webkit-box-decoration-break:clone;box-decoration-break:clone;position:relative;padding:1.2578616352201% 2.5157232704403%;text-align:left;border-radius:10px 10px 10px 10px;background:none}._f9a4a30{position:absolute;pointer-events:none;left:76.21359%;top:12.13592%;width:41.26214%;height:3.55987%;transform:rotate(270deg);opacity:1}._a84d586{pointer-events:initial;width:100%;height:100%;display:block;position:absolute;top:0;left:0;z-index:0;border-radius:5.8823529411765% 5.8823529411765% 5.8823529411765% 5.8823529411765%/45.454545454545% 45.454545454545% 45.454545454545% 45.454545454545%}._88443fa{position:absolute;pointer-events:none;left:11.65049%;top:0;width:13.59223%;height:7.76699%;opacity:1}._24ea453{width:100%;height:100%;display:block;position:absolute;top:0;left:0;--initial-opacity:1;--initial-transform:translate3d(-185.71434%,0px,0)}._32eb1ef{width:100%;height:100%;display:block;position:absolute;top:0;left:0;--initial-opacity:1;--initial-transform:scale(.15)}._ce1f8be{position:absolute;width:100.28234%;height:100%;left:-.14117%;top:0%}._a378314{background-color:#aba4a5}._657b44d{position:absolute;width:142.22222%;height:100%;left:-33.09028%;top:0%}._c553826{position:absolute;pointer-events:none;left:11.40777%;top:77.18447%;width:77.18447%;height:22.81553%;opacity:1}._fcd2ad7{width:100%;height:100%;display:block;position:absolute;top:0;left:0;--initial-opacity:1;--initial-transform:translate3d(0px,140.58315%,0)}._4019107{pointer-events:initial;width:100%;height:100%;display:block;position:absolute;top:0;left:0;z-index:0;border-radius:3.1446540880503% 3.1446540880503% 3.1446540880503% 3.1446540880503%/7.0921985815603% 7.0921985815603% 7.0921985815603% 7.0921985815603%}._65fe503{background-color:#7b5845}._f318fda{position:absolute;width:142.22222%;height:100%;left:-38.81945%;top:0%}._d85a8fe{position:absolute;pointer-events:none;left:11.40777%;top:83.17152%;width:77.18447%;height:16.82848%;opacity:1}._5a5f429{width:100%;height:100%;display:block;position:absolute;top:0;left:0;--initial-opacity:1;--initial-transform:translate3d(0px,155.02137%,0)}._9905e29{pointer-events:initial;width:100%;height:100%;display:block;position:absolute;top:0;left:0;z-index:0;border-radius:3.1446540880503% 3.1446540880503% 3.1446540880503% 3.1446540880503%/9.6153846153846% 9.6153846153846% 9.6153846153846% 9.6153846153846%}._1e14164{background-color:#7a6b64}._a7aa524{position:absolute;width:237.03704%;height:100%;left:-89.87269%;top:0%}._97f38f5{position:absolute;pointer-events:none;left:11.40777%;top:83.00971%;width:62.62136%;height:16.99029%;opacity:1}._119127d{pointer-events:initial;width:100%;height:100%;display:block;position:absolute;top:0;left:0;z-index:0;border-radius:3.8759689922481% 3.8759689922481% 3.8759689922481% 3.8759689922481%/9.5238095238095% 9.5238095238095% 9.5238095238095% 9.5238095238095%}._859ac1e{display:block;position:relative;left:0;top:0;margin:-.55426356589147% 0;-webkit-box-decoration-break:clone;box-decoration-break:clone}._07ed027{background-color:#fff;-webkit-box-decoration-break:clone;box-decoration-break:clone;position:relative;padding:1.5503875968992% 3.1007751937984%;text-align:left;border-radius:10px 10px 10px 10px;color:transparent}._a34933d{background-color:#fff;-webkit-box-decoration-break:clone;box-decoration-break:clone;position:relative;padding:1.5503875968992% 3.1007751937984%;text-align:left;border-radius:10px 10px 10px 10px;background:none}._2cfaa84{background-color:#8fc4b2}._3223d14{position:absolute;width:266.66667%;height:100%;left:-102.60417%;top:0%}._6770d6f{background-color:#68774e}._dc1cd6f{position:absolute;width:237.03704%;height:100%;left:-99.76852%;top:0%}._24ae67c{background-color:#b1a38f}._cf0c162{position:absolute;width:237.03704%;height:100%;left:-49.24769%;top:0%}._fc87a1c{position:absolute;pointer-events:none;left:11.40777%;top:71.35922%;width:77.18447%;height:28.64078%;opacity:1}._aa7273e{width:100%;height:100%;display:block;position:absolute;top:0;left:0;--initial-opacity:1;--initial-transform:translate3d(0px,132.32894%,0)}._e17beca{pointer-events:initial;width:100%;height:100%;display:block;position:absolute;top:0;left:0;z-index:0;border-radius:3.1446540880503% 3.1446540880503% 3.1446540880503% 3.1446540880503%/5.6497175141243% 5.6497175141243% 5.6497175141243% 5.6497175141243%}._4b87e69{background-color:#d6d2cd}._231f5ff{position:absolute;width:142.22222%;height:100%;left:-17.46528%;top:0%}._eb1372e{position:absolute;pointer-events:none;left:11.40777%;top:65.53398%;width:76.45631%;height:34.46602%;opacity:1}._d8af8f0{width:100%;height:100%;display:block;position:absolute;top:0;left:0;--initial-opacity:1;--initial-transform:translate3d(0px,126.86489%,0)}._a5b5b11{pointer-events:initial;width:100%;height:100%;display:block;position:absolute;top:0;left:0;z-index:0;border-radius:3.1746031746032% 3.1746031746032% 3.1746031746032% 3.1746031746032%/4.6948356807512% 4.6948356807512% 4.6948356807512% 4.6948356807512%}._fd09740{display:block;position:relative;left:0;top:0;margin:-.45396825396825% 0;-webkit-box-decoration-break:clone;box-decoration-break:clone}._47e8eb6{background-color:#fff;-webkit-box-decoration-break:clone;box-decoration-break:clone;position:relative;padding:1.2698412698413% 2.5396825396825%;text-align:left;border-radius:10px 10px 10px 10px;color:transparent}._06bcd32{background-color:#fff;-webkit-box-decoration-break:clone;box-decoration-break:clone;position:relative;padding:1.2698412698413% 2.5396825396825%;text-align:left;border-radius:10px 10px 10px 10px;background:none}._4d8aeb9{background-color:#364030}._722c6a9{position:absolute;width:142.27561%;height:100%;left:-21.13781%;top:0%}._f321da6{position:absolute;pointer-events:none;left:11.40777%;top:77.18447%;width:76.45631%;height:22.81553%;opacity:1}._7e0dec8{pointer-events:initial;width:100%;height:100%;display:block;position:absolute;top:0;left:0;z-index:0;border-radius:3.1746031746032% 3.1746031746032% 3.1746031746032% 3.1746031746032%/7.0921985815603% 7.0921985815603% 7.0921985815603% 7.0921985815603%}._1066b71{background-color:#b87a42}._a3519d6{position:absolute;width:142.25123%;height:100%;left:-31.54228%;top:0%}._6010c57{position:absolute;pointer-events:none;left:11.40777%;top:65.37217%;width:76.45631%;height:34.62783%;opacity:1}._fcc13a3{width:100%;height:100%;display:block;position:absolute;top:0;left:0;--initial-opacity:1;--initial-transform:translate3d(0px,126.73936%,0)}._b0452c9{pointer-events:initial;width:100%;height:100%;display:block;position:absolute;top:0;left:0;z-index:0;border-radius:3.1746031746032% 3.1746031746032% 3.1746031746032% 3.1746031746032%/4.6728971962617% 4.6728971962617% 4.6728971962617% 4.6728971962617%}._f09cc7b{background-color:#000}._dc67a5c{will-change:transform}._d1242c4{position:absolute;pointer-events:none;left:20.14563%;top:57.60518%;width:59.70874%;height:24.91909%;opacity:1}._52bd6c1{width:100%;height:100%;display:block;position:absolute;top:0;left:0;--initial-opacity:1;--initial-transform:translate3d(-133.73983%,0px,0)}._90f19a1{pointer-events:initial;width:100%;height:100%;display:block;position:absolute;top:0;left:0;z-index:0;border-radius:4.0650406504065% 4.0650406504065% 4.0650406504065% 4.0650406504065%/6.4935064935065% 6.4935064935065% 6.4935064935065% 6.4935064935065%}._d49c48e{position:absolute;width:101.71122%;height:100%;left:-.85561%;top:0%}._42ddb46{position:absolute;pointer-events:none;left:19.90291%;top:23.78641%;width:59.95146%;height:24.75728%;opacity:1}._fa75a75{width:100%;height:100%;display:block;position:absolute;top:0;left:0;--initial-opacity:1;--initial-transform:translate3d(-133.19837%,0px,0)}._633a2be{pointer-events:initial;width:100%;height:100%;display:block;position:absolute;top:0;left:0;z-index:0;border-radius:4.0485829959514% 4.0485829959514% 4.0485829959514% 4.0485829959514%/6.5359477124183% 6.5359477124183% 6.5359477124183% 6.5359477124183%}._b33b3ed{position:absolute;width:100.64165%;height:100%;left:-.32082%;top:0%}._e425e75{position:absolute;pointer-events:none;left:19.66019%;top:0;width:76.69903%;height:12.78317%;opacity:1}._b8c6657{width:100%;height:100%;display:block;position:absolute;top:0;left:0;--initial-opacity:1;--initial-transform:translate3d(104.74684%,0px,0)}._36f2948{pointer-events:initial;width:100%;height:100%;display:block;position:absolute;top:0;left:0;z-index:0;border-radius:.63291139240506% .63291139240506% .63291139240506% .63291139240506%/2.5316455696203% 2.5316455696203% 2.5316455696203% 2.5316455696203%}._0d561e8{white-space:pre-line;overflow-wrap:break-word;word-break:break-word;margin:.28860759493671% 0;font-family:"Merriweather",serif;font-size:.517799em;line-height:1.2;text-align:left;padding:0;color:#000}._14af73e{font-weight:700;color:#fff}._57aee5a{position:absolute;pointer-events:none;left:21.60194%;top:43.04207%;width:56.31068%;height:13.1068%;opacity:1}._df3c7ea{width:100%;height:100%;display:block;position:absolute;top:0;left:0;--initial-opacity:0;--initial-transform:rotate(-540deg) scale(.1)}._0445d78{pointer-events:initial;width:100%;height:100%;display:block;position:absolute;top:0;left:0;z-index:0;border-radius:4.3103448275862% 4.3103448275862% 4.3103448275862% 4.3103448275862%/12.345679012346% 12.345679012346% 12.345679012346% 12.345679012346%}._4ec9afc{white-space:pre-line;overflow-wrap:break-word;word-break:break-word;margin:0;font-family:"Merriweather",serif;font-size:.242718em;line-height:calc(1.3em + .53333498133637em);text-align:left;padding:0;color:#000;background-color:#fff;background:none}._9189aa7{display:block;position:relative;left:0;top:0;margin:-.13900862068966% 0;-webkit-box-decoration-break:clone;box-decoration-break:clone}._2fe2343{background-color:#fff;-webkit-box-decoration-break:clone;box-decoration-break:clone;position:relative;padding:1.7241379310345% 3.448275862069%;text-align:left;border-radius:10px 10px 10px 10px;color:transparent}._0ddb1ac{white-space:pre-line;overflow-wrap:break-word;word-break:break-word;margin:0;font-family:"Merriweather",serif;font-size:.242718em;line-height:calc(1.3em + .53333498133637em);text-align:left;padding:0;color:#000;background-color:#fff;background:none;position:absolute;top:0;left:0;right:0}._0604d15{background-color:#fff;-webkit-box-decoration-break:clone;box-decoration-break:clone;position:relative;padding:1.7241379310345% 3.448275862069%;text-align:left;border-radius:10px 10px 10px 10px;background:none}._9b552a5{position:absolute;pointer-events:none;left:21.60194%;top:79.44984%;width:58.25243%;height:12.62136%;opacity:1}._7819d38{pointer-events:initial;width:100%;height:100%;display:block;position:absolute;top:0;left:0;z-index:0;border-radius:4.1666666666667% 4.1666666666667% 4.1666666666667% 4.1666666666667%/12.820512820513% 12.820512820513% 12.820512820513% 12.820512820513%}._177d3d6{white-space:pre-line;overflow-wrap:break-word;word-break:break-word;margin:0;font-family:"Merriweather",serif;font-size:.242718em;line-height:calc(1.2em + .53333498133637em);text-align:left;padding:0;color:#000;background-color:#fff;background:none}._9ceb267{display:block;position:relative;left:0;top:0;margin:.178125% 0;-webkit-box-decoration-break:clone;box-decoration-break:clone}._1891d0e{background-color:#fff;-webkit-box-decoration-break:clone;box-decoration-break:clone;position:relative;padding:1.6666666666667% 3.3333333333333%;text-align:left;border-radius:10px 10px 10px 10px;color:transparent}._ace7885{white-space:pre-line;overflow-wrap:break-word;word-break:break-word;margin:0;font-family:"Merriweather",serif;font-size:.242718em;line-height:calc(1.2em + .53333498133637em);text-align:left;padding:0;color:#000;background-color:#fff;background:none;position:absolute;top:0;left:0;right:0}._ddb255e{background-color:#fff;-webkit-box-decoration-break:clone;box-decoration-break:clone;position:relative;padding:1.6666666666667% 3.3333333333333%;text-align:left;border-radius:10px 10px 10px 10px;background:none}._8a0b3e2{position:absolute;pointer-events:none;left:32.03883%;top:96.76375%;width:35.67961%;height:3.23625%;opacity:1}._2e4d8ca{width:100%;height:100%;display:block;position:absolute;top:0;left:0;--initial-opacity:1;--initial-transform:scale(.33333333333333)}._0a2a416{position:absolute;width:100%;height:100.10971%;left:0%;top:-.05486%}

/*# sourceURL=amp-custom.css */</style>
        </head>
      
        <body>
          <amp-story id="amp-story-id" standalone live-story title="${title}" publisher="As Casamenteiras"
            publisher-logo-src="logo.png"
            poster-portrait-src="logo3x4.png"
            poster-square-src="logoSquare.png"
            poster-landscape-src="logo4x3.png">


            <amp-story-page id="page${key}">
              <amp-story-grid-layer template="fill">
                <amp-img alt="${title}" src="${srcImg}" width="900" height="675"
                  layout="responsive">
                </amp-img>
              </amp-story-grid-layer>
              <amp-story-grid-layer template="vertical">
                <h1 animate-in="fly-in-bottom">${title}</h1>
              </amp-story-grid-layer>
            </amp-story-page>
      

            ${postImages.map((img,indx)=>{return`
            <amp-story-page id="page${indx+1}">
            <amp-story-grid-layer template="fill">
              <amp-img alt="${img[1]}" src="${img[0]}" width="900" height="675"
                layout="responsive">
              </amp-img>
            </amp-story-grid-layer>
            <amp-story-grid-layer template="vertical">
              <h1>${img[1]}</h1>
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
