import React from "react";
import { Script } from "gatsby";

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
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GATSBY_GTAG}`}
        strategy='off-main-thread'
        id='gtag-call'
      />
      <Script id='gtag-config' strategy='off-main-thread' forward={[`gtag`]}>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments)};
          gtag('js', new Date());
          gtag('config', ${process.env.GATSBY_GTAG}, { page_path: location ? location.pathname + location.search + location.hash : undefined })
        `}
      </Script>
    </>
  );
};

export default BodyBlock;
