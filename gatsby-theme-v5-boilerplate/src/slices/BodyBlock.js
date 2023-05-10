import React from "react";
import { Script } from "gatsby";

const BodyBlock = ({ children, opt, killSEO, topology }) => {
  const { options } = opt;
  return (
    <>
      <div
        className={options?.classes}
        style={opt.bgImg ? { background: `url(${opt.bgImg}) repeat` } : null}
      >
        {children}
      </div>
    </>
  );
};

export default BodyBlock;
