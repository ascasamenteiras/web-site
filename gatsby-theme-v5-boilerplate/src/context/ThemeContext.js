import React from "react";
import { graphql, useStaticQuery } from "gatsby";

import schemaOrg from "@Content/schemas/default.json";

const locales = schemaOrg.locales;

const defaultState = {
  bigQuery: null,
};

const ThemeContext = React.createContext(defaultState);

const ThemeProvider = ({ children }) => {
  const bigQuery = useStaticQuery(graphql`
    {
      schemasJSON: allSchemasJson {
        nodes {
          locales
          schema {
            card {
              brandAppVersion
              cardLocale
              brandIntl
              brandPerson
              brandName
              brandAppName
              brandSlugName
              brandShortName
              brandPascalName
              brandDescription
              brandUrl
              brandLogo
              brandCardImage
              brandLogoTransparent
              brandPhone
              brandSeoDivisor
              brandHexMainColor
              brandHexHelperColor
              brandEmail
              brandPromoEmail
              brandGithub
              brandAppRepo
              brandHighlights
              brandPersonFamilyBio
              brandPersonBusinessHistory
              brandPersonBusinessBio
              brandTopologyDivName
              brandTopologyDivSlug
              brandVideoUrl
              brandVideoText
              datePublished
              trailingSlash
              imageMaxWidth
              imageQuality
              contentPath
              staticImagesPath
              themePath
              postPerPage
              technicalOfficer
              pagesHelper {
                jobs {
                  mainTitle
                  tasksTitle
                  qualificationsTitle
                  firstName
                  lastName
                  email
                  phoneNumber
                  button
                  privacyPolicy
                  applyButton
                  acceptMission
                  acceptPrivacyPolicy
                  sendApplicationButton
                  applyPrintText
                  inOtherLanguages
                  formThankYou
                  genders
                }
                globals {
                  contactUs
                  copyright
                  footerLegend
                  imprint
                  notAvailableLocale
                  notAvailableRedirectLocale
                  openGerman
                  privacyPolicy
                  termsConditions
                  datasheet
                }
                datasheet {
                  status
                  title
                }
                index {
                  collaborations
                  foundedHistory
                  joinTeam
                  openPosition
                  sectionOneAutonomousLegend
                  sectionOneAutonomousParagraph
                  sectionOneConsumptionLegend
                  sectionOneConsumptionParagraph
                  sectionOneMainTitle
                  sectionOneSlopesLegend
                  sectionOneSlopesParagraph
                  sectionOneTrackLegend
                  starRepo
                  sectionTwoTitle
                  sectionTwoReabilityParagraph
                  sectionTwoReabilityLegend
                  sectionTwoPlantsTwoParagraph
                  sectionTwoPlantsTwoLegend
                  sectionTwoPlantsParagraph
                  sectionTwoPlantsLegend
                  sectionThreeWeedingParagraph
                  sectionThreeWeedingLegend
                  sectionThreeHerbicideParagraph
                  sectionThreeTitle
                  sectionThreeHerbicideLegend
                  sectionThreeAccuracyParagraph
                  sectionThreeAccuracyLegend
                  sectionOneTrackParagraph
                }
              }
            }
          }
        }
      }

      brandImages: allFile(
        filter: { sourceInstanceName: { eq: "brandImages" } }
      ) {
        nodes {
          relativePath
          publicURL
          childImageSharp {
            gatsbyImageData(quality: 100)
          }
        }
      }
      generalImages: allFile(
        filter: { sourceInstanceName: { eq: "generalImages" } }
      ) {
        nodes {
          relativePath
          publicURL
          childImageSharp {
            gatsbyImageData(quality: 90)
          }
        }
      }
      pressImages: allFile(
        filter: { sourceInstanceName: { eq: "pressImages" } }
      ) {
        nodes {
          relativePath
          publicURL
          childImageSharp {
            gatsbyImageData(quality: 90)
          }
        }
      }
      darkLogo: allFile(filter: { relativePath: { eq: "logotipo.png" } }) {
        nodes {
          relativePath
          publicURL
          childImageSharp {
            gatsbyImageData(width: 250, quality: 100)
          }
        }
      }
      whiteLogoMark: allFile(
        filter: { relativePath: { eq: "F_Logo_White.png" } }
      ) {
        nodes {
          relativePath
          publicURL
          childImageSharp {
            gatsbyImageData(width: 90, height: 90, quality: 100)
          }
        }
      }
    }
  `);
  return (
    <ThemeContext.Provider
      value={{
        bigQuery: bigQuery,
        locales,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;

export { ThemeProvider };
