import { useStaticQuery, graphql } from "gatsby";

export const useSiteMetadatas = () =>
  useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            siteUrl
            image
            keywords
            themeColor
            dateCreated
            postsPerPage
            searchBaseUrl
            author {
              name
            }
            organization {
              name
              url
              email
              logo
              cardImage
            }
            social {
              youtube
              instagram
              facebook
              linkedIn
            }
          }
        }
        footerThreeMarkdowRemark: allMarkdownRemark(
          sort: { fields: frontmatter___date, order: DESC }
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                updatedAt(
                  formatString: "DD [de] MMMM [de] YYYY"
                  locale: "pt-br"
                )
                title
                categories
                footerFeaturedImage: featuredImage {
                  childrenImageSharp {
                    gatsbyImageData(
                      width: 152
                      height: 152
                      placeholder: DOMINANT_COLOR
                      quality: 80
                    )
                  }
                }
              }
              excerpt(pruneLength: 200)
            }
          }
        }
        boilerplateLogo: file(
          relativePath: { eq: "logo-fundo-transparent-900-w.png" }
        ) {
          childrenImageSharp {
            gatsbyImageData(width: 900, quality: 100)
          }
        }
        profileOficial: file(
          relativePath: { eq: "android-chrome-512x512.jpg" }
        ) {
          childrenImageSharp {
            gatsbyImageData(
              width: 160
              height: 160
              placeholder: NONE
              quality: 100
            )
          }
        }
        diamond: file(relativePath: { eq: "diamond.png" }) {
          childrenImageSharp {
            gatsbyImageData(
              width: 160
              height: 160
              placeholder: NONE
              quality: 100
            )
          }
        }
        diamondBg: file(relativePath: { eq: "diamond-colored.png" }) {
          childrenImageSharp {
            gatsbyImageData(
              width: 190
              height: 190
              placeholder: NONE
              quality: 100
            )
          }
        }
        imgHolder: file(relativePath: { eq: "oval-logo.png" }) {
          childrenImageSharp {
            gatsbyImageData(
              width: 600
              height: 600
              placeholder: NONE
              quality: 100
            )
          }
        }
        cardImage: file(relativePath: { eq: "boilerplate-banner.jpg" }) {
          childrenImageSharp {
            gatsbyImageData(
              width: 1200
              height: 627
              placeholder: NONE
              quality: 90
            )
          }
        }
        githubImg: file(relativePath: { eq: "github.png" }) {
          childrenImageSharp {
            gatsbyImageData(
              width: 120
              height: 120
              placeholder: NONE
              quality: 100
              backgroundColor: "transparent"
            )
          }
        }
        instaImg: file(relativePath: { eq: "insta.png" }) {
          childrenImageSharp {
            gatsbyImageData(
              width: 120
              height: 120
              placeholder: NONE
              quality: 100
              backgroundColor: "transparent"
            )
          }
        }
        twitterImg: file(relativePath: { eq: "twitter.png" }) {
          childrenImageSharp {
            gatsbyImageData(
              width: 120
              height: 120
              placeholder: NONE
              quality: 100
              backgroundColor: "transparent"
            )
          }
        }
        whatsImg: file(relativePath: { eq: "whats.png" }) {
          childrenImageSharp {
            gatsbyImageData(
              width: 120
              height: 120
              placeholder: NONE
              quality: 100
              backgroundColor: "transparent"
            )
          }
        }
        zankyouImg: file(relativePath: { eq: "zankyou.png" }) {
          childrenImageSharp {
            gatsbyImageData(
              width: 120
              height: 120
              placeholder: NONE
              quality: 100
              backgroundColor: "transparent"
            )
          }
        }
        youTubeImg: file(relativePath: { eq: "youtube.png" }) {
          childrenImageSharp {
            gatsbyImageData(
              width: 120
              height: 120
              placeholder: NONE
              quality: 100
              backgroundColor: "transparent"
            )
          }
        }
        faceImg: file(relativePath: { eq: "facebook.png" }) {
          childrenImageSharp {
            gatsbyImageData(
              width: 120
              height: 120
              placeholder: NONE
              quality: 100
              backgroundColor: "transparent"
            )
          }
        }
        bannerContent: file(relativePath: { eq: "banner-content.png" }) {
          childrenImageSharp {
            gatsbyImageData(
              height: 80
              placeholder: NONE
              quality: 100
              backgroundColor: "transparent"
            )
          }
        }
        bgPatternImg: file(
          relativePath: { eq: "as-casamenteiras-PATTERN-bg.png" }
        ) {
          childrenImageSharp {
            gatsbyImageData(
              height: 107
              placeholder: NONE
              quality: 100
              backgroundColor: "transparent"
            )
          }
        }
        bandeiraFeminista: file(
          relativePath: { eq: "bandeira-feminista.png" }
        ) {
          childrenImageSharp {
            gatsbyImageData(
              width: 300
              height: 300
              placeholder: NONE
              quality: 100
            )
          }
        }
        bandeiraLgbtqia: file(relativePath: { eq: "bandeira-lgbtqia+.png" }) {
          childrenImageSharp {
            gatsbyImageData(
              width: 300
              height: 300
              placeholder: NONE
              quality: 100
            )
          }
        }
        bandeiraRibeiraoPreto: file(
          relativePath: { eq: "bandeira-ribeirao-preto.png" }
        ) {
          childrenImageSharp {
            gatsbyImageData(
              width: 300
              height: 300
              placeholder: NONE
              quality: 100
            )
          }
        }
        bandeiraVidasNegras: file(
          relativePath: { eq: "bandeira-vidas-negras.png" }
        ) {
          childrenImageSharp {
            gatsbyImageData(
              width: 300
              height: 300
              placeholder: NONE
              quality: 100
            )
          }
        }
        bandeiraWhats: file(relativePath: { eq: "bandeira-whats.png" }) {
          childrenImageSharp {
            gatsbyImageData(
              width: 300
              height: 300
              placeholder: NONE
              quality: 100
            )
          }
        }
      }
    `
  );
