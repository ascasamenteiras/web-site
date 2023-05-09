import React from "react";
import { Partytown } from "@builder.io/partytown/react";
import { stripIndent } from "common-tags";

export const onRenderBody = ({ setHeadComponents, setPreBodyComponents }) => {
  setHeadComponents([
    <Partytown key='partytown' debug={true} forward={["dataLayer.push"]} />,
    // <script
    //   key='analytics'
    //   src='https://example.com/analytics.js'
    //   type='text/partytown'
    // />,
    <script
      type='text/partytown'
      key='gtmGlobal'
      dangerouslySetInnerHTML={{
        __html: stripIndent`
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','GTM-P9ZZXPV')`,
      }}
    />,
  ]);

  // For GTM, we will need to add this noscript tag to the body of the HTML
  setPreBodyComponents([
    <noscript
      key='gtm'
      dangerouslySetInnerHTML={{
        __html: `
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-P9ZZXPV" height="0" width="0"
                      style="display:none;visibility:hidden"></iframe></noscript>
                `,
      }}
    />,
  ]);
};
