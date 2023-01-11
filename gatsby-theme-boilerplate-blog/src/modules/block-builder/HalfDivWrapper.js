import React from "react";

import BodyBlock from "@BlockBuilder/BodyBlock";
import BadgesButtonsBlock from "@BlockBuilder/BadgesButtonsBlock";

const HalfDivWrapper = ({ children, classes, logo, backgroundImage, opt }) => {
  return (
    <BodyBlock
      opt={{ classes: classes, bgImg: backgroundImage.src, options: opt }}
      killSEO={true}
    >
      {children}
      {/* <BadgesButtonsBlock opt={opt} questions={opt.pageQuestions} /> */}
    </BodyBlock>
  );
};

export default HalfDivWrapper;
