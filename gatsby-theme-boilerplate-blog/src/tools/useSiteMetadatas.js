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
            questions
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
        dateImageButton: file(relativePath: { eq: "date-img.png" }) {
          childrenImageSharp {
            gatsbyImageData(width: 60, height: 60, quality: 90)
          }
        }
        fingerButton: file(relativePath: { eq: "turn-finger.png" }) {
          childrenImageSharp {
            gatsbyImageData(width: 60, height: 60, quality: 90)
          }
        }
        boilerplateLogo: file(
          relativePath: { eq: "logo-fundo-transparent-900-w.png" }
        ) {
          childrenImageSharp {
            gatsbyImageData(width: 450, quality: 100)
          }
        }
        boilerplateLogoSmall: file(
          relativePath: { eq: "logo-fundo-transparent-900-w.png" }
        ) {
          childrenImageSharp {
            gatsbyImageData(width: 200, quality: 100)
          }
        }

        floralCimaImg: file(relativePath: { eq: "floral-cima.png" }) {
          childrenImageSharp {
            gatsbyImageData(quality: 100)
          }
        }
        floralMeioImg: file(relativePath: { eq: "floral-meio.png" }) {
          childrenImageSharp {
            gatsbyImageData(quality: 100)
          }
        }
        florBaixoImg: file(relativePath: { eq: "floral-baixo.png" }) {
          childrenImageSharp {
            gatsbyImageData(quality: 100)
          }
        }
        marcaImg: file(
          relativePath: { eq: "As-Casamenteiras-ICON-fundo-transparent.png" }
        ) {
          childrenImageSharp {
            gatsbyImageData(width: 250, quality: 100)
          }
        }
        voucherImg: file(relativePath: { eq: "voucher.png" }) {
          childrenImageSharp {
            gatsbyImageData(width: 80, quality: 100)
          }
        }
        pdfImg: file(relativePath: { eq: "pdf.png" }) {
          childrenImageSharp {
            gatsbyImageData(width: 80, quality: 100)
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
              width: 160
              height: 160
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
              quality: 85
            )
          }
        }
        githubImg: file(relativePath: { eq: "github.png" }) {
          childrenImageSharp {
            gatsbyImageData(
              width: 44
              height: 44
              placeholder: NONE
              quality: 100
              backgroundColor: "transparent"
            )
          }
        }
        instaImg: file(relativePath: { eq: "insta.png" }) {
          childrenImageSharp {
            gatsbyImageData(
              width: 44
              height: 44
              placeholder: NONE
              quality: 100
              backgroundColor: "transparent"
            )
          }
        }
        twitterImg: file(relativePath: { eq: "twitter.png" }) {
          childrenImageSharp {
            gatsbyImageData(
              width: 44
              height: 44
              placeholder: NONE
              quality: 100
              backgroundColor: "transparent"
            )
          }
        }
        whatsImg: file(relativePath: { eq: "whats.png" }) {
          childrenImageSharp {
            gatsbyImageData(
              width: 44
              height: 44
              placeholder: NONE
              quality: 100
              backgroundColor: "transparent"
            )
          }
        }
        zankyouImg: file(relativePath: { eq: "zankyou.png" }) {
          childrenImageSharp {
            gatsbyImageData(
              width: 44
              height: 44
              placeholder: NONE
              quality: 100
              backgroundColor: "transparent"
            )
          }
        }
        youTubeImg: file(relativePath: { eq: "youtube.png" }) {
          childrenImageSharp {
            gatsbyImageData(
              width: 44
              height: 44
              placeholder: NONE
              quality: 100
              backgroundColor: "transparent"
            )
          }
        }
        deezerImg: file(relativePath: { eq: "deezer.png" }) {
          childrenImageSharp {
            gatsbyImageData(
              width: 44
              height: 44
              placeholder: NONE
              quality: 100
              backgroundColor: "transparent"
            )
          }
        }
        spotifyImg: file(relativePath: { eq: "spotify.png" }) {
          childrenImageSharp {
            gatsbyImageData(
              width: 44
              height: 44
              placeholder: NONE
              quality: 100
              backgroundColor: "transparent"
            )
          }
        }

        iTunesImg: file(relativePath: { eq: "itunes.png" }) {
          childrenImageSharp {
            gatsbyImageData(
              width: 44
              height: 44
              placeholder: NONE
              quality: 100
              backgroundColor: "transparent"
            )
          }
        }
        casamentospontocomImg: file(
          relativePath: { eq: "casamentospontocom.png" }
        ) {
          childrenImageSharp {
            gatsbyImageData(
              width: 44
              height: 44
              placeholder: NONE
              quality: 100
              backgroundColor: "transparent"
            )
          }
        }

        faceImg: file(relativePath: { eq: "facebook.png" }) {
          childrenImageSharp {
            gatsbyImageData(
              width: 44
              height: 44
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
              width: 90
              height: 90
              placeholder: NONE
              quality: 100
            )
          }
        }
        bandeiraLgbtqia: file(relativePath: { eq: "bandeira-lgbtqia+.png" }) {
          childrenImageSharp {
            gatsbyImageData(
              width: 90
              height: 90
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
              width: 90
              height: 90
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
              width: 90
              height: 90
              placeholder: NONE
              quality: 100
            )
          }
        }
        bandeiraCodigoAberto: file(
          relativePath: { eq: "bandeira-codigo-aberto.png" }
        ) {
          childrenImageSharp {
            gatsbyImageData(
              width: 90
              height: 90
              placeholder: NONE
              quality: 100
            )
          }
        }
        bandeiraQuestion: file(relativePath: { eq: "bandeira-pergunta.png" }) {
          childrenImageSharp {
            gatsbyImageData(
              width: 70
              height: 70
              placeholder: NONE
              quality: 100
            )
          }
        }
        bandeiraWhats: file(relativePath: { eq: "bandeira-whats.png" }) {
          childrenImageSharp {
            gatsbyImageData(
              width: 70
              height: 70
              placeholder: NONE
              quality: 100
            )
          }
        }
        vaiCasarImg: file(relativePath: { eq: "video-vai-casar.jpg" }) {
          childrenImageSharp {
            gatsbyImageData(width: 250, placeholder: NONE, quality: 100)
          }
        }
      }
    `
  );
