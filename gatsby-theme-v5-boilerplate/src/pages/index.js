import React, { useState } from "react";
import { graphql, useStaticQuery, Link } from "gatsby";
import { GatsbyImage, getImage, getSrc } from "gatsby-plugin-image";

import { Row } from "@Components/InsertRow";

import { useSiteMetadatas } from "../tools/useSiteMetadatas";
import PostsBlock from "@Slices/PostsBlock";
import HeadingBlock from "@Slices/HeadingBlock";
import MainTemplateWrapper from "@Slices/MainTemplateWrapper";
import Seo from "@Slices/Seo";
const _ = require("lodash");

const IndexPage = ({ pageContext, location }) => {
  const [btnRef, setBtnRef] = useState(1);
  const handleSetBtnRef = ref => {
    setBtnRef(ref);
  };
  const btnHandler = btn => {
    handleSetBtnRef(btn);
  };

  const {
    site,
    boilerplateLogo,
    profileOficial,
    diamond,
    diamondBg,
    faceImg,
    githubImg,
    instaImg,
    youTubeImg,
    whatsImg,
    zankyouImg,
    bgPatternImg,
    imgHolder,
    casamentospontocomImg,
    cardImage,
    vaiCasarImg,
    bandeiraFeminista,
    bandeiraLgbtqia,
    bandeiraRibeiraoPreto,
    bandeiraVidasNegras,
    bandeiraWhats,
    bandeiraQuestion,
    bandeiraCodigoAberto,
  } = useSiteMetadatas();

  const dataIndex = useStaticQuery(graphql`
    query IndexPosts {
      allMarkdownRemark(
        filter: {
          frontmatter: { status: { eq: true }, topology: { eq: "posts" } }
        }
        sort: { frontmatter: { date: DESC } }
        limit: 900
      ) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              updatedAt(formatString: "DD [de] MMMM [de] YYYY", locale: "pt-br")
              created: createdAt(
                formatString: "DD [de] MMMM [de] YYYY"
                locale: "pt-br"
              )
              updated: updatedAt
              updatedModified: updatedAt(formatString: "YYYY-MM-DDTHH:mm:SS")
              title
              headline
              categories
              questions
              featuredPost
              homeHighlight
              homeHighlightRelated
              homeHighlightRelatedList
              featuredImage {
                childrenImageSharp {
                  gatsbyImageData(
                    width: 350
                    height: 175
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
    }
  `);
  const data = dataIndex?.allMarkdownRemark;
  const posts = data?.edges;
  const defaultQuestions = dataIndex?.site?.siteMetadata.questions;
  const findItemFeatured = postsList => {
    let x = null;

    x = [];
    postsList.map(e => {
      if (e.node.frontmatter.featuredPost === true) {
        x.push(e);
      }
    });

    return x;
  };

  const findItemhomeHighlight = postsList => {
    let x = null;

    x = [];
    postsList.map(e => {
      if (e.node.frontmatter.homeHighlight === true) {
        x.push(e);
      }
    });

    return x;
  };

  const findItemhomeHighlightRelated = postsList => {
    let x = null;

    x = [];
    postsList.map(e => {
      if (e.node.frontmatter.homeHighlightRelated === true) {
        x.push(e);
      }
    });

    return x;
  };

  const findItemhomeHighlightRelatedList = postsList => {
    let x = null;

    x = [];
    postsList.map(e => {
      if (e.node.frontmatter.homeHighlightRelatedList === true) {
        x.push(e);
      }
    });

    return x;
  };

  const featuredPosts = findItemFeatured(posts);
  const homeHighlightPost = findItemhomeHighlight(posts);
  const homeHighlightRelatedPost = findItemhomeHighlightRelated(posts);
  const homeHighlightRelatedListPost = findItemhomeHighlightRelatedList(posts);
  const badgeCodigoAberto = getImage(
    bandeiraCodigoAberto.childrenImageSharp[0]
  );
  const badgeFeminista = getImage(bandeiraFeminista.childrenImageSharp[0]);
  const badgeLgbtqia = getImage(bandeiraLgbtqia.childrenImageSharp[0]);
  const badgeRibeiraoPreto = getImage(
    bandeiraRibeiraoPreto.childrenImageSharp[0]
  );
  const badgeVidasNegras = getImage(bandeiraVidasNegras.childrenImageSharp[0]);
  const badgeWhats = getImage(bandeiraWhats.childrenImageSharp[0]);
  const badgeQuestion = getImage(bandeiraQuestion.childrenImageSharp[0]);

  const logoQuery = getImage(boilerplateLogo.childrenImageSharp[0]);
  const bgPatternSrc = getSrc(bgPatternImg.childrenImageSharp[0]);
  const vaiCasarGetImg = getImage(vaiCasarImg.childrenImageSharp[0]);
  const profileQuery = getImage(profileOficial.childrenImageSharp[0]);
  const diamondQuery = getImage(diamond.childrenImageSharp[0]);
  const diamondBgQuery = getImage(diamondBg.childrenImageSharp[0]);
  const githubGetImg = getImage(githubImg.childrenImageSharp[0]);
  const instaGetImg = getImage(instaImg.childrenImageSharp[0]);
  const zankyouGetImg = getImage(zankyouImg.childrenImageSharp[0]);
  const casamentospontocomGetImg = getImage(
    casamentospontocomImg.childrenImageSharp[0]
  );
  const whatsGetImg = getImage(whatsImg.childrenImageSharp[0]);
  const youTubeGetImg = getImage(youTubeImg.childrenImageSharp[0]);
  const facebookGetImg = getImage(faceImg.childrenImageSharp[0]);

  const updatedDate = new Date(
    homeHighlightPost[0]?.node.frontmatter.updatedModified
  );
  const now = new Date();
  const diff = parseInt((now - updatedDate) / 1000);
  const diffHours = parseInt(diff / 3600);

  const difference_In_Time = now.getTime() - updatedDate.getTime();
  const difference_In_Days = difference_In_Time / (1000 * 60 * 60 * 24);
  const difference_In_Hours = difference_In_Time / (1000 * 60 * 60);
  const countOneDay = difference_In_Days >= 1 ? true : false;

  function convertNumToTime(number, returnType) {
    // Check sign of given number
    let sign = number >= 0 ? 1 : -1;

    // Set positive value of number of sign negative
    number = number * sign;

    // Separate the int from the decimal part
    let hour = Math.floor(number);
    let decpart = number - hour;

    let min = 1 / 60;
    // Round to nearest minute
    decpart = min * Math.round(decpart / min);

    let minute = Math.floor(decpart * 60) + "";

    // Add padding if need
    if (minute.length < 2) {
      minute = "0" + minute;
    }

    if (minute === "60") {
      minute = "59";
    }
    return returnType === "hours" ? hour : minute;
  }

  const hourLegend = diffHours === 1 ? "hora e" : " horas e";
  const hoursCaption =
    diffHours === 0 ? "" : diffHours + " " + hourLegend + " ";
  function printMySocial(img, link) {
    if (!img && !link) {
      return null;
    }
    return (
      <a href={link} rel='noopener noreferrer' target={"_blank"}>
        <GatsbyImage
          image={img}
          alt={"Ícone de Rede Social"}
          placeholder={"NONE"}
          critical='true'
          className={" profile-socials"}
          width={28}
          height={28}
        />
      </a>
    );
  }

  // v5
  // v5
  // v5
  const {
    schemasJSON,
    brandImages,
    generalImages,
    treatmentImages,
    partnerImages,
  } = useSiteMetadatas();

  const regex = /\/(\w{2})\//;
  const locationUrl = location.pathname.match(regex);
  const logoLocationUrl = locationUrl ? locationUrl[1] : "";
  const flags = [
    {
      i18n: "pt-BR",
      slug: "/",
    },
    {
      i18n: "en-US",
      slug: "/en/",
    },
    {
      i18n: "de-DE",
      slug: "/de/",
    },
    {
      i18n: "fr-FR",
      slug: "/fr/",
    },
    {
      i18n: "es-ES",
      slug: "/es/",
    },
    {
      i18n: "pt-BR",
      slug: "/",
    },
    {
      i18n: "nl-NL",
      slug: "/nl/",
    },
    {
      i18n: "ru-RU",
      slug: "/ru/",
    },
    {
      i18n: "jp-JP",
      slug: "/jp/",
    },
  ];
  const i =
    logoLocationUrl && logoLocationUrl !== undefined && logoLocationUrl !== ""
      ? locationUrl[1]
      : "pt-BR";
  const y = schemasJSON.nodes.filter(sch =>
    sch.schema[0].card[0].cardLocale.includes(i)
  );
  const cardY = y[0].schema[0].card[0];
  const indexSubs = cardY?.pagesHelper?.index;
  const globalSubs = y?.pagesHelper?.globals;
  const whipala = brandImages?.nodes?.filter(
    brandImgs => brandImgs.relativePath === "whipala.png"
  );
  const bgWhipala = whipala
    ? whipala[0]?.childImageSharp?.gatsbyImageData?.images?.fallback?.src
    : null;

  const pattern = brandImages?.nodes?.filter(
    brandImgs => brandImgs.relativePath === "PATTERN-bg.png"
  );
  const bgPattern = pattern
    ? pattern[0]?.childImageSharp?.gatsbyImageData?.images?.fallback?.src
    : null;
  const patternDark = brandImages?.nodes?.filter(
    brandImgs => brandImgs.relativePath === "PATTERN-bg-dark.png"
  );
  const bgPatternDark = patternDark
    ? patternDark[0]?.childImageSharp?.gatsbyImageData?.images?.fallback?.src
    : null;

  const patternFooterGrafism = brandImages?.nodes?.filter(
    brandImgs => brandImgs.relativePath === "PATTERN-bg-2.png"
  );
  const patternFooterGrafismImg = patternFooterGrafism
    ? patternFooterGrafism[0]?.childImageSharp?.gatsbyImageData?.images
        ?.fallback?.src
    : null;

  const patternFooterGrafismDark = brandImages?.nodes?.filter(
    brandImgs => brandImgs.relativePath === "PATTERN-bg-2-dark.png"
  );
  const patternFooterGrafismImgDark = patternFooterGrafismDark
    ? patternFooterGrafismDark[0]?.childImageSharp?.gatsbyImageData
    : null;
  const toproof = generalImages?.nodes?.filter(
    generalImgs => generalImgs?.relativePath === "mb-left-mic-guitar.jpg"
  );
  const treatmentNodes = treatmentImages?.nodes;
  const partnersNodes = partnerImages?.nodes;
  const getSectionOneImg = toproof
    ? toproof[0]?.childImageSharp?.gatsbyImageData
    : null;
  // console.log("featuredPosts");
  // console.log(featuredPosts);
  return (
    // <MainTemplateWrapper
    //   backgroundImage={{
    //     src: bgPatternSrc,
    //   }}
    //   logo={
    //     <GatsbyImage
    //       image={logoQuery}
    //       alt={"Logotipo d'As Casamenteiras"}
    //       width={450}
    //       height={230}
    //       placeholder={"NONE"}
    //       critical='true'
    //       className={""}
    //     />
    //   }
    //   opt={{
    //     titleSeo: `Cerimonialista de Casamentos - As Casamenteiras`,
    //     pageQuestions: defaultQuestions,
    //     classes: "blog-list",
    //     schemaType: "blog",
    //     topology: "index",
    //     blogListing: posts?.slice(0, 9),
    //     articleUrl: location.href,
    //     mainLogo: imgHolder,
    //     cardImage: cardImage ? getSrc(cardImage.childrenImageSharp[0]) : null,
    //     serverUrl: location.href,
    //     badgesWhats: (
    //       <GatsbyImage
    //         image={badgeWhats}
    //         alt={"Botão do Whats"}
    //         placeholder={"NONE"}
    //         critical='true'
    //         className={"whatsMe"}
    //         width={70}
    //         height={70}
    //       />
    //     ),
    //     badgesQuestion: (
    //       <GatsbyImage
    //         image={badgeQuestion}
    //         alt={"Botão de Perguntas Frequentes"}
    //         placeholder={"NONE"}
    //         critical='true'
    //         className={"whatsMe"}
    //         width={70}
    //         height={70}
    //       />
    //     ),
    //   }}
    // >
    <MainTemplateWrapper
      logo={"darkLogo.publicURL"}
      backgroundImage={{
        src: bgPattern,
      }}
      opt={{
        titleSeo: `As Casamenteiras`,
        pageQuestions: "defaultQuestions",
        classes: "blog-list",
        schemaType: "blog",
        topology: "index",
        blogListing: "posts?.slice(0, 9)",
        articleUrl: "props.location.href",
        mainLogo: "imgHolder",
        cardImage: "cardImage ? getSrc(cardImage.childrenImageSharp[0]) : null",
        serverUrl: "props.location.href",
        badgesWhats: "badgeWhats",
        badgesQuestion: "badgeQuestion",
        globalSubs: globalSubs,
        topRibbonImg: bgWhipala,
        flags: flags,
        urlLocale: logoLocationUrl,
      }}
    >
      <main className='main-container' id='site-content' role='list'>
        <HeadingBlock classes='m30auto hack' importance={10} width={350}>
          Cerimonialista de Casamentos
        </HeadingBlock>

        <Row opt={{ classes: "home-infos", isBoxed: true }}>
          <section className='main-page-wrapper'>
            <Row opt={{ classes: "main-row", numColumns: 2 }}>
              <div className='main-article'>
                <div className='main-headings'>
                  <h1>
                    <Link to={homeHighlightPost[0]?.node.fields.slug}>
                      {homeHighlightPost[0]?.node.frontmatter.title}
                    </Link>
                  </h1>

                  {/* <span className='heading-categorie'>
                    {homeHighlightPost[0]?.node.frontmatter.categories.map(
                      (el, key) => {
                        return (
                          <Link
                            key={key}
                            to={"/trends/" + _.kebabCase(el) + "/"}
                            className='main-article-categories'
                          >
                            {el}
                          </Link>
                        );
                      }
                    )}
                  </span> */}
                </div>
                {countOneDay === false ? (
                  <p>
                    Atualizado à{" "}
                    {hoursCaption +
                      convertNumToTime(difference_In_Hours, "minutes") +
                      " minutos atrás"}
                  </p>
                ) : (
                  ""
                )}

                <div className='main-article-relatives'>
                  <h2>
                    <Link to={homeHighlightRelatedPost[0]?.node.fields.slug}>
                      {homeHighlightRelatedPost[0]?.node.frontmatter.title}
                    </Link>
                  </h2>

                  <ul>
                    {homeHighlightRelatedListPost.map((e, k) => {
                      return (
                        <li key={k}>
                          <Link to={e.node.fields.slug}>
                            {e.node.frontmatter.title}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>

                  <a
                    className='home-video-button'
                    href='https://www.youtube.com/watch?v=07COygyW6W0'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <GatsbyImage
                      image={vaiCasarGetImg}
                      alt={"Vídeo Promocional d'As Casamenteiras no YouTube"}
                      placeholder={"NONE"}
                      critical='true'
                      className={"video-promo"}
                      width='250'
                      height='167'
                    />
                  </a>
                </div>
              </div>
              <div className='home-profile-wrapper'>
                <Row
                  opt={{
                    isBoxed: true,
                    classes: "home-profile home-profile-width",
                    numColumns: 2,
                  }}
                >
                  <div className='home-profile-left-column'>
                    <p>
                      <strong>Casamentos Realizados: </strong>57
                    </p>
                    <p>
                      <strong>Casamentos em Andamento: </strong>17
                    </p>
                    <p>
                      <strong>Anos de Experiência: </strong>12 anos
                    </p>
                    {printMySocial(
                      instaGetImg,
                      "https://instagram.com/ascasamenteiras_"
                    )}
                    {printMySocial(
                      zankyouGetImg,
                      "https://www.zankyou.com.br/f/as-casamenteiras-976737"
                    )}
                    {printMySocial(
                      casamentospontocomGetImg,
                      "https://www.casamentos.com.br/cerimonialista/as-casamenteiras--e192771"
                    )}
                    {printMySocial(
                      whatsGetImg,
                      "https://web.whatsapp.com/send?phone=5516992452437"
                    )}
                    {printMySocial(
                      youTubeGetImg,
                      "https://www.youtube.com/channel/UCa7WCZgri320eSCS-7rr38g"
                    )}
                    {printMySocial(
                      facebookGetImg,
                      "https://www.facebook.com/pricerimonial"
                    )}
                    {printMySocial(
                      githubGetImg,
                      "https://github.com/ascasamenteiras/web-site"
                    )}

                    <span id='perfil' />

                    <div className='left-bottom'>
                      <ul className='profile-anchor-menu'>
                        <li>
                          <a
                            href='/#perfil'
                            className={`btn01 ${btnRef === 1 ? "active" : ""}`}
                            onClick={() => btnHandler(1)}
                          >
                            Histórico
                          </a>
                        </li>
                        <li>
                          <a
                            href='/#perfil'
                            className={`btn02 ${btnRef === 2 ? "active" : ""}`}
                            onClick={() => btnHandler(2)}
                          >
                            Profissão
                          </a>
                        </li>
                        <li>
                          <a
                            href='/#perfil'
                            className={`btn03 ${btnRef === 3 ? "active" : ""}`}
                            onClick={() => btnHandler(3)}
                          >
                            Família
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className='home-profile-right-column'>
                    <div className='diamond-profile'>
                      <GatsbyImage
                        image={profileQuery}
                        alt={"Imagem principal de perfil"}
                        placeholder={"NONE"}
                        critical='true'
                        className={"diamond-img"}
                        width={160}
                        height={160}
                        style={{
                          WebkitMaskImage: `url(${diamondQuery.images.fallback.src})`,
                        }}
                      />
                      <GatsbyImage
                        image={diamondBgQuery}
                        alt={"Imagem de fundo do perfil inicial"}
                        placeholder={"NONE"}
                        critical='true'
                        className={"diamond-background"}
                        width={190}
                        height={190}
                        style={{
                          width: "190px",
                          height: "190px",
                        }}
                      />
                    </div>
                    <div className='home-profile-infos'>
                      <Link
                        to='/priscilla-barbosa-cerimonialista/'
                        className='profile-btn'
                      >
                        + Info
                      </Link>
                      <a
                        href='https://www.instagram.com/ascasamenteiras_'
                        rel='noopener noreferrer'
                        target={"_blank"}
                        className='profile-btn'
                      >
                        + Seguir
                      </a>
                    </div>
                  </div>
                </Row>
                <Row
                  opt={{
                    isBoxed: true,
                    bgColor: "white",
                    classes: "home-profile-bottom home-profile-width",
                  }}
                >
                  <div
                    className={`home-profile-tab ${
                      btnRef === 1 ? "" : "hide-me"
                    }`}
                  >
                    <h2>Histórico</h2>

                    <p>
                      Após a amiga lhe convidar para organizar o seu casamento
                      em 2010, Priscilla Barbosa decide se engajar e faz cursos
                      com grandes especialistas em gestão de eventos.
                    </p>
                    <p>
                      De lá para cá, foram mais de 50 casais felizes subindo ao
                      altar junto com a Pri.
                    </p>
                  </div>
                  <div
                    className={`home-profile-tab ${
                      btnRef === 2 ? "" : "hide-me"
                    }`}
                  >
                    <h2>Profissão</h2>
                    <p>
                      É consultora na área de eventos. Formada em Gestão de
                      Negócios pela USP-ESALQ, com título de MBA.
                    </p>
                    <p>
                      Atua na organização de casamentos ao ar livre conectados à
                      natureza, miniwedding, praia, igrejas, chácaras,
                      residências, destination e elopement wedding. Organiza
                      cerimônias tradicionais e modernas, tais como: religiosa
                      diversa, civil, ecológica, cerimônias ecumênicas ,
                      Lgbtqia+ e temática.
                    </p>
                  </div>
                  <div
                    className={`home-profile-tab ${
                      btnRef === 3 ? "" : "hide-me"
                    }`}
                  >
                    <h2>Minha Família</h2>
                    <p>
                      Natural de São Paulo, a filha mais velha de Marli Barbosa
                      e Ricardo Coelho, Priscilla Barbosa passa a sua infância
                      aprendendo piano e canto.
                    </p>
                    <p>
                      Ainda menina começa a organizar eventos em igrejas e
                      festas da sua grande família.
                    </p>
                    <p>
                      É a primeira filha de sua mãe e ajudou a cuidar de seus
                      sete irmãos junto à ela ainda na infância. E a essa
                      experiência enriquecedora dedica grande gratidão por ter
                      moldado a sua formação como mulher forte e independente.
                    </p>
                  </div>
                </Row>
              </div>
            </Row>
          </section>
        </Row>
        <HeadingBlock classes='m30auto hack' importance={9} width={300}>
          Destaques d'As Casamenteiras
        </HeadingBlock>
        <Row opt={{ isBoxed: true, classes: "main-container-wrapper" }}>
          <PostsBlock
            postsPerPage={3}
            postList={featuredPosts}
            typeLoad={"push"} // or false
            // readMoreText="Ler Mais"
            pagination={{
              loadMoreBtn: true,
              loadMore: "Ler Mais",
            }}
            classes='colorME'
          />
        </Row>
        <HeadingBlock classes='m30auto' importance={9} width={400}>
          Causas Que Apoiamos
        </HeadingBlock>
        <Row
          opt={{
            isBoxed: true,
            classes: "footer-badges-wrapper",
            numColumns: 4,
          }}
        >
          <Link to='/causas-apoiadas/'>
            <GatsbyImage
              image={badgeFeminista}
              alt={"Empreendedorismo Feminino"}
              placeholder={"NONE"}
              critical='true'
              className={" footer-badges"}
              width={90}
              height={90}
            />
            <h3>Empreendedorismo Feminino</h3>
          </Link>
          <Link to='/causas-apoiadas/'>
            <GatsbyImage
              image={badgeLgbtqia}
              alt={"LGBTQIAP+"}
              placeholder={"NONE"}
              critical='true'
              className={" footer-badges"}
              width={90}
              height={90}
            />
            <h3>Amor LGBTQIAP+</h3>
          </Link>
          <Link to='/causas-apoiadas/'>
            <GatsbyImage
              image={badgeVidasNegras}
              alt={"Vidas Negras Importam"}
              placeholder={"NONE"}
              critical='true'
              className={" footer-badges"}
              width={90}
              height={90}
            />
            <h3>Vidas Negras Importam</h3>
          </Link>
          <Link to='/causas-apoiadas/'>
            <GatsbyImage
              image={badgeRibeiraoPreto}
              alt={"Comércio Local"}
              placeholder={"NONE"}
              critical='true'
              className={" footer-badges"}
              width={90}
              height={90}
            />
            <h3>Comércio Local</h3>
          </Link>
          <Link to='/causas-apoiadas/'>
            <GatsbyImage
              image={badgeCodigoAberto}
              alt={"Hackativismo"}
              placeholder={"NONE"}
              critical='true'
              className={" footer-badges"}
              width={90}
              height={90}
            />
            <h3>Hackativismo</h3>
          </Link>
        </Row>
        <HeadingBlock classes='m30auto' importance={9} width={400}>
          Atualizações
        </HeadingBlock>
        <Row opt={{ isBoxed: true, classes: "main-container-wrapper" }}>
          <PostsBlock
            postsPerPage={3 + 3}
            postList={posts}
            typeLoad={"push"} // or false
            // readMoreText="Ler Mais"
            pagination={{
              loadMoreBtn: true,
              loadMore: "Ler Mais",
            }}
            classes='colorME'
          />
        </Row>
      </main>
    </MainTemplateWrapper>
  );
};

export default IndexPage;

// export const queryAtividade = graphql`
// query {
//   allMarkdownRemark(
//     sort: { fields: frontmatter___date, order: DESC }
//     filter: {
//       frontmatter: { createdAt: { lt: "null" }, status: { eq: true } }
//     }
//     limit: 900
//   ) {
//     edges {
//       node {
//         fields {
//           slug
//         }
//         frontmatter {
//           updatedAt(formatString: "DD [de] MMMM [de] YYYY", locale: "pt-br")
//           created: createdAt(
//             formatString: "DD [de] MMMM [de] YYYY"
//             locale: "pt-br"
//           )
//           updated: updatedAt
//           updatedModified: updatedAt(formatString: "YYYY-MM-DDTHH:mm:SS")
//           title
//           headline
//           categories
//           featuredPost
//           homeHighlight
//           homeHighlightRelated
//           homeHighlightRelatedList
//           featuredImage {
//             childrenImageSharp {
//               gatsbyImageData(
//                 width: 350
//                 height: 175
//                 placeholder: DOMINANT_COLOR
//                 quality: 80
//               )
//             }
//           }
//         }
//         excerpt(pruneLength: 200)
//       }
//     }
//   }
// }
// `;

export const Head = ({ pageContext }) => {
  // console.log("pageContext");
  // console.log(pageContext);
  return <Seo data={pageContext.SEO} killSeo={false} />;
};