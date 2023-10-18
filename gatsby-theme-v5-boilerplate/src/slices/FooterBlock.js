import React from "react";
import { Row } from "@Components/InsertRow";
import { Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { useSiteMetadatas } from "../tools/useSiteMetadatas";
import HeadingBlock from "@Slices/HeadingBlock";
const FooterBlock = ({ logo, globalSubs }) => {
  const {
    darkLogo,
    flagDeco,
    faceImg,
    githubImg,
    instaImg,
    youTubeImg,
    whatsImg,
    zankyouImg,
    casamentospontocomImg,
    deezerImg,
    spotifyImg,
    iTunesImg,
  } = useSiteMetadatas();

  const githubGetImg = getImage(githubImg.childrenImageSharp[0]);
  const deezerGetImg = getImage(deezerImg.childrenImageSharp[0]);
  const spotifyGetImg = getImage(spotifyImg.childrenImageSharp[0]);
  const iTunesGetImg = getImage(iTunesImg.childrenImageSharp[0]);
  const instaGetImg = getImage(instaImg.childrenImageSharp[0]);
  const whatsGetImg = getImage(whatsImg.childrenImageSharp[0]);
  const zankyouImgProp = getImage(zankyouImg.childrenImageSharp[0]);
  const youTubeGetImg = getImage(youTubeImg.childrenImageSharp[0]);
  const faceGetImg = getImage(faceImg.childrenImageSharp[0]);
  // console.log("darkLogo");
  // console.log(darkLogo);
  const whiteMark = getImage(darkLogo.nodes[0]?.childImageSharp);
  const casamentospontocomGetImg = getImage(
    casamentospontocomImg.childrenImageSharp[0]
  );

  const whiteFooterMark = flagDeco.nodes[0]?.childImageSharp;

  function socialMe(img, link) {
    if (!img && !link) {
      return null;
    }
    return (
      <a
        href={link}
        className='social-icon-wrapper'
        rel='noopener noreferrer'
        target={"_blank"}
      >
        <GatsbyImage
          image={img}
          alt={
            "Atalhos para redes sociais e outras ferramentas d'As Casamenteiras"
          }
          placeholder={"NONE"}
          critical='true'
          className={"colorME roundME bottom-social"}
          width={44}
          height={44}
        />
      </a>
    );
  }

  return (
    <>
      <HeadingBlock classes='m30auto hack' importance={9} width={400}>
        Social
      </HeadingBlock>
      <Row opt={{ isBoxed: true }}>
        <Row
          opt={{
            isBoxed: true,
            alignTo: "center",
            classes: "social-icons",
            numColumns: 5,
          }}
        >
          {socialMe(instaGetImg, "https://www.instagram.com/ascasamenteiras_")}
          {socialMe(
            zankyouImgProp,
            "https://www.zankyou.com.br/f/as-casamenteiras-976737"
          )}
          {socialMe(
            casamentospontocomGetImg,
            "https://www.casamentos.com.br/cerimonialista/as-casamenteiras--e192771"
          )}
          {socialMe(faceGetImg, "https://www.facebook.com/pricerimonial")}
          {socialMe(
            youTubeGetImg,
            "https://www.youtube.com/channel/UCa7WCZgri320eSCS-7rr38g"
          )}
          {socialMe(
            whatsGetImg,
            "https://api.whatsapp.com/send?phone=5516992452437"
          )}
          {socialMe(
            githubGetImg,
            "https://github.com/ascasamenteiras/web-site"
          )}
          {socialMe(
            spotifyGetImg,
            "https://open.spotify.com/artist/5scJ7dkADVQQ52kLcRA1mV"
          )}
          {socialMe(deezerGetImg, "https://www.deezer.com/br/artist/181009227")}
          {socialMe(
            iTunesGetImg,
            "https://music.apple.com/br/artist/priscilla-barbosa/1641419117"
          )}
        </Row>
        <Row opt={{ isBoxed: true, classes: "logo-bottom-wrapper" }}>
          <div className='footer-logo'>
            <GatsbyImage
              image={whiteMark}
              alt={
                "Atalhos para redes sociais e outras ferramentas d'As Casamenteiras"
              }
              placeholder={"NONE"}
              critical='true'
              width={290}
              height={125}
            />
          </div>
          {/* <BoilerplateLogo className='m0auto logo-bottom' /> */}
          <p className='m0auto bottom-paragraph'>
            © 2022 AS CASAMENTEIRAS - TODOS OS DIREITOS RESERVADOS
          </p>
        </Row>
      </Row>
      {/*       
      <Row
        opt={{
          isBoxed: false,
          classes: "section-row bg-primary-dark main-footer-wrapper",
        }}
      >
        <GatsbyImage
          image={getImage(whiteFooterLogo)}
          alt={"As Casamenteirass Partners Logo"}
          placeholder={"NONE"}
          critical='true'
          objectFit='fixed'
          className={"footer-logo-img"}
          width={100}
        />
        <Row
          opt={{
            classes: "section-row bg-primary-light footer-rounded",
            isBoxed: true,
            numColumns: 2,
          }}
        >
          <section className='footer-contacts contacts'>
            <div>
              <h3>{globalSubs?.contactUs}</h3>
              <h1>As Casamenteiras</h1>
              <p>Todo Amor Importa!</p>
              <p>@DECOLONIZEJA</p>
              <a href='mailto:cerimonial@ascasamenteiras.com.br'>
                contato@ascasamenteiras.com.br
              </a>
              <a href='tel:+12 98106-2959'>+12 98106-2959</a>
            </div>
          </section>
          <div className='footer-languages'>
            <h3>Idiomas</h3>
            <ul>
              <li>
                <Link to='/en/'>English</Link>
              </li>
              <li>
                <Link to='/de/'>Deutsch</Link>
              </li>
              <li>
                <Link to='/fr/'>Français</Link>
              </li>
              <li>
                <Link to='/es/'>Español</Link>
              </li>
              <li>
                <Link to='/nl/'>Nederlands</Link>
              </li>
              <li>
                <Link to='/'>Português</Link>
              </li>
              <li>
                <Link to='/ru/'>Русский</Link>
              </li>
            </ul>
          </div>
        </Row>

        <Row
          opt={{
            classes: "footer-copyright",
            isBoxed: true,
          }}
        >
          <GatsbyImage
            image={getImage(whiteFooterMark)}
            alt={"As Casamenteirass Partners Logo"}
            placeholder={"NONE"}
            critical='true'
            objectFit='fixed'
            className={"copyright-logo-img"}
            width={80}
          />
          <h3>{globalSubs?.footerLegend}</h3>
          <div className='footer-links'>
            <a href='/politica-privacidade'>{globalSubs?.privacyPolicy}</a>
            <a href='/responsavel-tecnico'>{globalSubs?.imprint}</a>
            <a href='/termos'>{globalSubs?.termsConditions}</a>
          </div>
          <p>© 2023 - {globalSubs?.copyright}</p>
        </Row>
      </Row> */}
    </>
  );
};

export default FooterBlock;
