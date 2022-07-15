import React, { useState } from "react";
import { graphql, Link } from "gatsby";
import { GatsbyImage, getImage, getSrc } from "gatsby-plugin-image";

import { Row } from "../components/InsertRow";
import { useSiteMetadatas } from "../tools/useSiteMetadatas";
import PostsBlock from "@BlockBuilder/PostsBlock";
import HeadingBlock from "@BlockBuilder/HeadingBlock";
import MainTemplateWrapper from "@BlockBuilder/MainTemplateWrapper";

const IndexPage = props => {
  const [btnRef, setBtnRef] = useState(1);
  const handleSetBtnRef = ref => {
    setBtnRef(ref);
  };
  const btnHandler = btn => {
    handleSetBtnRef(btn);
  };

  const {
    site,
    bannerContent,
    boilerplateLogo,
    profileOficial,
    diamond,
    diamondBg,
    githubImg,
    instaImg,
    twitterImg,
    whatsImg,
    bgPatternImg,
    imgHolder,
    cardImage,
    bandeiraFeminista,
    bandeiraLgbtqia,
    bandeiraRibeiraoPreto,
    bandeiraVidasNegras,
    bandeiraWhats,
  } = useSiteMetadatas();
  const { data } = props;
  const posts = data.allMarkdownRemark.edges;
  console.log("posts");
  console.log(posts);
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
  const imageQuery = getImage(bannerContent.childrenImageSharp[0]);
  const badgeFeminista = getImage(bandeiraFeminista.childrenImageSharp[0]);
  const badgeLgbtqia = getImage(bandeiraLgbtqia.childrenImageSharp[0]);
  const badgeRibeiraoPreto = getImage(
    bandeiraRibeiraoPreto.childrenImageSharp[0]
  );
  const badgeVidasNegras = getImage(bandeiraVidasNegras.childrenImageSharp[0]);
  const badgeWhats = getImage(bandeiraWhats.childrenImageSharp[0]);

  const logoQuery = getImage(boilerplateLogo.childrenImageSharp[0]);
  const bgPatternSrc = getSrc(bgPatternImg.childrenImageSharp[0]);
  const profileQuery = getImage(profileOficial.childrenImageSharp[0]);
  const diamondQuery = getImage(diamond.childrenImageSharp[0]);
  const diamondBgQuery = getImage(diamondBg.childrenImageSharp[0]);
  const githubGetImg = getImage(githubImg.childrenImageSharp[0]);
  const instaGetImg = getImage(instaImg.childrenImageSharp[0]);
  const twitterGetImg = getImage(twitterImg.childrenImageSharp[0]);
  const whatsGetImg = getImage(whatsImg.childrenImageSharp[0]);

  var updatedDate = new Date(
    homeHighlightPost[0].node.frontmatter.updatedModified
  );
  var now = new Date();
  var diff = parseInt((now - updatedDate) / 1000);
  var diffHours = parseInt(diff / 3600);

  var difference_In_Time = now.getTime() - updatedDate.getTime();
  var difference_In_Days = difference_In_Time / (1000 * 60 * 60 * 24);
  var difference_In_Hours = difference_In_Time / (1000 * 60 * 60);
  var countOneDay = difference_In_Days >= 1 ? true : false;

  function convertNumToTime(number, returnType) {
    // Check sign of given number
    var sign = number >= 0 ? 1 : -1;

    // Set positive value of number of sign negative
    number = number * sign;

    // Separate the int from the decimal part
    var hour = Math.floor(number);
    var decpart = number - hour;

    var min = 1 / 60;
    // Round to nearest minute
    decpart = min * Math.round(decpart / min);

    var minute = Math.floor(decpart * 60) + "";

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
  return (
    <MainTemplateWrapper
      backgroundImage={{
        src: bgPatternSrc,
      }}
      logo={
        <GatsbyImage
          image={logoQuery}
          alt={"title"}
          placeholder={"NONE"}
          critical='true'
          className={""}
        />
      }
      opt={{
        titleSeo: `Assessoria e Cerimonial`,
        classes: "blog-list",
        schemaType: "blog",
        blogListing: posts.slice(0, 9),
        mainLogo: imgHolder,
        cardImage: cardImage ? getSrc(cardImage.childrenImageSharp[0]) : null,
        serverUrl: props.location.href,
        badgesWhats: (
          <GatsbyImage
            image={badgeWhats}
            alt={"title"}
            placeholder={"NONE"}
            critical='true'
            className={"whatsMe"}
          />
        ),
      }}
    >
      <main className='main-container' id='site-content' role='list'>
        <HeadingBlock classes='m30auto hack' importance={10} width={300}>
          Assessoria e Cerimonial
        </HeadingBlock>
        <Row opt={{ classes: "home-infos", isBoxed: true, role: "something" }}>
          <section className='main-page-wrapper'>
            <Row opt={{ classes: "main-row", numColumns: 2 }}>
              <div className='main-article'>
                <h4>
                  {homeHighlightPost[0].node.frontmatter.categories.map(
                    (el, key) => {
                      return (
                        <Link
                          key={key}
                          to={"/trends/" + el}
                          className='main-article-categories'
                        >
                          {el}
                        </Link>
                      );
                    }
                  )}
                </h4>
                <h1>
                  <Link to={homeHighlightPost[0].node.fields.slug}>
                    {homeHighlightPost[0].node.frontmatter.title}
                  </Link>
                </h1>
                <Link
                  to={homeHighlightPost[0].node.fields.slug}
                  className='main-article-caption'
                ></Link>
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
                    <Link to={homeHighlightRelatedPost[0].node.fields.slug}>
                      {homeHighlightRelatedPost[0].node.frontmatter.title}
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
                </div>
              </div>
              <div className='home-profile-wrapper'>
                <Row
                  opt={{
                    isBoxed: true,
                    role: "something",
                    classes: "home-profile home-profile-width",
                    numColumns: 2,
                  }}
                >
                  <div className='home-profile-left-column'>
                    <p>
                      <strong>Casamentos Realizados: </strong>51
                    </p>
                    <p>
                      <strong>Casamentos em Andamento: </strong>17
                    </p>
                    <p>
                      <strong>Anos de Experiência: </strong>12 anos
                    </p>
                    <GatsbyImage
                      image={githubGetImg}
                      alt={"title"}
                      placeholder={"NONE"}
                      critical='true'
                      className={" profile-socials"}
                    />
                    <GatsbyImage
                      image={instaGetImg}
                      alt={"title"}
                      placeholder={"NONE"}
                      critical='true'
                      className={" profile-socials"}
                    />
                    <GatsbyImage
                      image={twitterGetImg}
                      alt={"title"}
                      placeholder={"NONE"}
                      critical='true'
                      className={" profile-socials"}
                    />
                    <GatsbyImage
                      image={whatsGetImg}
                      alt={"title"}
                      placeholder={"NONE"}
                      critical='true'
                      className={" profile-socials"}
                    />
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
                        alt={"title"}
                        placeholder={"NONE"}
                        critical='true'
                        className={"diamond-img"}
                        style={{
                          WebkitMaskImage: `url(${diamondQuery.images.fallback.src})`,
                        }}
                      />
                      <GatsbyImage
                        image={diamondBgQuery}
                        alt={"title"}
                        placeholder={"NONE"}
                        critical='true'
                        className={"diamond-background"}
                        style={{
                          width: "190px",
                          height: "190px",
                        }}
                      />
                    </div>
                    <div className='home-profile-infos'>
                      <Link
                        to='/priscilla-barbosa-cerimonialista'
                        className='profile-btn'
                      >
                        + Info
                      </Link>
                      <Link to='/' className='profile-btn'>
                        + Seguir
                      </Link>
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
                      Atuou na organização de casamentos ao ar livre conectados
                      à natureza, miniwedding, praia, igrejas, chácaras,
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
            postsPerPage={site.siteMetadata.postsPerPage}
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
          <Link to='/causas-apoiadas'>
            <GatsbyImage
              image={badgeFeminista}
              alt={"title"}
              placeholder={"NONE"}
              critical='true'
              className={" footer-badges"}
            />
            <h3>Empreendedorismo Feminino</h3>
          </Link>
          <Link to='/causas-apoiadas'>
            <GatsbyImage
              image={badgeLgbtqia}
              alt={"title"}
              placeholder={"NONE"}
              critical='true'
              className={" footer-badges"}
            />
            <h3>Amor LGBTQIA+</h3>
          </Link>
          <Link to='/causas-apoiadas'>
            <GatsbyImage
              image={badgeVidasNegras}
              alt={"title"}
              placeholder={"NONE"}
              critical='true'
              className={" footer-badges"}
            />
            <h3>Vidas Negras Importam</h3>
          </Link>
          <Link to='/causas-apoiadas'>
            <GatsbyImage
              image={badgeRibeiraoPreto}
              alt={"title"}
              placeholder={"NONE"}
              critical='true'
              className={" footer-badges"}
            />
            <h3>Comércio Local</h3>
          </Link>
        </Row>
        <HeadingBlock classes='m30auto' importance={9} width={400}>
          Últimos Eventos
        </HeadingBlock>
        <Row opt={{ isBoxed: true, classes: "main-container-wrapper" }}>
          <PostsBlock
            postsPerPage={site.siteMetadata.postsPerPage}
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

export const queryAtividade = graphql`
  query {
    allMarkdownRemark(
      sort: { fields: frontmatter___date, order: DESC }
      filter: { frontmatter: { createdAt: { lt: "null" } } }
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
            featuredPost
            homeHighlight
            homeHighlightRelated
            homeHighlightRelatedList
            featuredImage {
              childrenImageSharp {
                gatsbyImageData(
                  width: 400
                  height: 200
                  placeholder: DOMINANT_COLOR
                  quality: 100
                )
              }
            }
          }
          excerpt(pruneLength: 200)
        }
      }
    }
  }
`;
