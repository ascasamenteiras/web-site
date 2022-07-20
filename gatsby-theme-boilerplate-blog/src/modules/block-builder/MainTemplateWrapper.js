import React from "react";

import { useSiteMetadatas } from "../../tools/useSiteMetadatas";
import BodyBlock from "@BlockBuilder/BodyBlock";
import HeaderBlock from "@BlockBuilder/HeaderBlock";
import FooterBlock from "@BlockBuilder/FooterBlock";

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
    youTubeImg,
    faceImg,
    casamentospontocomImg,
  } = useSiteMetadatas();
  return (
    <BodyBlock
      opt={{ classes: classes, bgImg: backgroundImage.src, options: opt }}
    >
      <HeaderBlock logotipoSvg={logo} />
      {children}
      <div className='whatsMeWrapper'>
        <a
          href='https://web.whatsapp.com/send?phone=5516992452437&text=Ol%C3%A1%2C%20Pri.%20Eu%20gostaria%20de%20falar%20sobre%20assessoria%20e%20cerimonial%20de%20casamento'
          rel='nofollow'
          target={"_blank"}
          className={"desktop-only"}
        >
          {opt.badgesWhats}
        </a>
        <a
          href='https://api.whatsapp.com/send?phone=5516992452437&text=Ol%C3%A1%2C%20Pri.%20Eu%20gostaria%20de%20falar%20sobre%20assessoria%20e%20cerimonial%20de%20casamento'
          rel='nofollow'
          target={"_blank"}
          className={"mobile-only"}
        >
          {opt.badgesWhats}
        </a>
      </div>

      <FooterBlock
        githubImg={githubImg}
        instaImg={instaImg}
        zankyouImg={zankyouImg}
        casamentospontocomImg={casamentospontocomImg}
        whatsImg={whatsImg}
        youTubeImg={youTubeImg}
        facebookImg={faceImg}
        logo={logo}
      />
    </BodyBlock>
  );
};

export default MainTemplateWrapper;
