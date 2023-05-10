import React from "react";

import BodyBlock from "@Slices/BodyBlock";
import BadgesButtonsBlock from "@Slices/BadgesButtonsBlock";

const HalfDivWrapper = ({ children, classes, logo, backgroundImage, opt }) => {
  return (
    <BodyBlock
      opt={{
        classes: classes,
        bgImg: backgroundImage.src,
        options: opt,
      }}
      killSEO={true}
    >
      {children}
      <BadgesButtonsBlock opt={opt} questions={opt.pageQuestions} />
    </BodyBlock>
  );
};

export default HalfDivWrapper;
