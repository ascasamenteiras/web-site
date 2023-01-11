import React from "react";

import { useSiteMetadatas } from "../../tools/useSiteMetadatas";
import BodyBlock from "@BlockBuilder/BodyBlock";
import HeaderBlock from "@BlockBuilder/HeaderBlock";
import FooterBlock from "@BlockBuilder/FooterBlock";
import BadgesButtonsBlock from "@BlockBuilder/BadgesButtonsBlock";

const MainTemplateWrapper = ({
  children,
  classes,
  logo,
  backgroundImage,
  opt,
}) => {
  const {
    githubImg,
    instaImg,
    zankyouImg,
    whatsImg,
    deezerImg,
    spotifyImg,
    iTunesImg,
    youTubeImg,
    faceImg,
    casamentospontocomImg,
  } = useSiteMetadatas();
  return (
    <BodyBlock
      opt={{ classes: classes, bgImg: backgroundImage.src, options: opt }}
      topology={opt.topology}
    >
      <HeaderBlock logotipoSvg={logo} />
      {children}
      {/* <BadgesButtonsBlock opt={opt} questions={opt.pageQuestions} /> */}
      <FooterBlock
        githubImg={githubImg}
        instaImg={instaImg}
        zankyouImg={zankyouImg}
        casamentospontocomImg={casamentospontocomImg}
        whatsImg={whatsImg}
        deezerImg={deezerImg}
        spotifyImg={spotifyImg}
        iTunesImg={iTunesImg}
        youTubeImg={youTubeImg}
        facebookImg={faceImg}
        logo={logo}
      />
    </BodyBlock>
  );
};

export default MainTemplateWrapper;
