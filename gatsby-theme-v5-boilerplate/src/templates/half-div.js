import React from "react";
import fetch from "cross-fetch";
import { useSiteMetadatas } from "../tools/useSiteMetadatas";
// // import { sendEmail } from "@netlify/emails";
// // const HalfDiv = async () => {
// //   await sendEmail({
// //     from: "cerimonial@ascasamenteiras.com.br",
// //     to: "miltonbolonha@gmail.com",
// //     subject: "Testexxx",
// //     template: "subscribed",
// //     parameters: { name: "milo" },
// //   });
// //   return <h1>teste</h1>;
// // };

// const HalfDiv = async () => {
//   await fetch(`${process.env.URL}/.netlify/functions/emails/subscribed`, {
//     headers: {
//       "netlify-emails-secret": process.env.NETLIFY_EMAILS_SECRET,
//     },
//     method: "POST",
//     body: JSON.stringify({
//       from: "cerimonial@ascasamenteiras.com.br",
//       to: "miltonbolonha@gmail.com",
//       subject: "testim",
//       parameters: {
//         name: "Milo",
//       },
//     }),
//   });
//   return <h1>teste</h1>;
// };

// export default HalfDiv;

const Subscribe = ({ location }) => {
  const { schemasJSON } = useSiteMetadatas();
  const regex = /\/(\w{2})\//;
  const locationUrl = location.pathname.match(regex);
  const logoLocationUrl = locationUrl ? locationUrl[1] : "";

  const i =
    logoLocationUrl && logoLocationUrl !== undefined && logoLocationUrl !== ""
      ? locationUrl[1]
      : "pt-BR";
  const y = schemasJSON.nodes.filter(sch =>
    sch.schema[0].card[0].cardLocale.includes(i)
  );
  const card = y[0].schema[0].card[0];
  const brandPromoEmail = card.brandPromoEmail;
  console.log(`${process.env.GATSBY_URL}/.netlify/functions/emails/subscribed`);
  console.log(process.env.GATSBY_NETLIFY_EMAILS_SECRET);
  console.log(process.env.GATSBY_URL);
  console.log(process.env.DEVENV);
  console.log(brandPromoEmail);

  const handleSubmit = async event => {
    event.preventDefault();

    //call to the Netlify Function you created
    await fetch(
      `${process.env.GATSBY_URL}/.netlify/functions/emails/subscribed`,
      {
        method: "POST",
        headers: {
          "netlify-emails-secret": process.env.GATSBY_NETLIFY_EMAILS_SECRET,
        },
        body: JSON.stringify({
          from: brandPromoEmail,
          to: "miltonbolonha@gmail.com",
          subject: "testim",
          parameters: {
            name: "Milo",
          },
        }),
      }
    )
      .then(res => {
        if (res.status >= 400) {
          throw new Error("Bad response from server");
        }
        return res.json();
      })
      .then(user => {
        console.log(user);
      })
      .catch(err => {
        console.error(err);
      });
  };
  return (
    <div className='subscribe-form-container'>
      {" "}
      <form onSubmit={handleSubmit}>
        <button type='submit'>Subscribess</button>
      </form>{" "}
    </div>
  );
};
export default Subscribe;
