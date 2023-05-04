import React from "react";
import { Partytown } from "@builder.io/partytown/react";

export const onRenderBody = ({ setHeadComponents, setPreBodyComponents }) => {
  setHeadComponents([
    <Partytown key='partytown' debug={true} forward={["dataLayer.push"]} />,
    // <script
    //   key='analytics'
    //   src='https://example.com/analytics.js'
    //   type='text/partytown'
    // />,
  ]);

  // For GTM, we will need to add this noscript tag to the body of the HTML
  setPreBodyComponents([
    <noscript
      key='gtm'
      dangerouslySetInnerHTML={{
        __html: `
                  <iframe src="https://www.googletagmanager.com/ns.html?id=xxx-xxxxxxx" height="0" width="0"
                      style="display:none;visibility:hidden"></iframe>
                `,
      }}
    />,
  ]);
};
