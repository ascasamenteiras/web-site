import React from "react";

const BodyBlock = ({ children, opt, killSEO, topology }) => {
  const { options } = opt;
  return (
    <>
      {opt?.topRibbonImg ? (
        <div
          className={"topRibbonImg"}
          style={
            opt?.topRibbonImg
              ? { background: `url(${opt.topRibbonImg}) repeat` }
              : null
          }
        ></div>
      ) : null}
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
