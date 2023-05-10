import React from "react";

import BodyBlock from "@Slices/BodyBlock";
import HeaderBlock from "@Slices/HeaderBlock";
import FooterBlock from "@Slices/FooterBlock";
import BadgesButtonsBlock from "@Slices/BadgesButtonsBlock";

const MainTemplateWrapper = ({
  children,
  classes = "",
  logo,
  backgroundImage,
  opt,
}) => {
  return (
    <BodyBlock
      opt={{
        classes: classes + " MainTemplateWrapper",
        bgImg: backgroundImage?.src || null,
        options: opt,
      }}
    >
      <HeaderBlock
        logotipoSvg={logo}
        opt={{
          classes: classes + " MainTemplateWrapper",
          bgImg: backgroundImage?.src || null,
          options: opt,
        }}
      />
      {children}
      <FooterBlock logo={logo} globalSubs={opt?.globalSubs || null} />
      <BadgesButtonsBlock opt={opt} questions={opt.pageQuestions} />
    </BodyBlock>
  );
};

export default MainTemplateWrapper;
