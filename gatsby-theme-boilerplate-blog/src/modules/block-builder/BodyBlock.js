import React from "react";
import HeadContainer from "../../containers/HeadContainer";

const BodyBlock = ({ children, opt, killSEO, topology }) => {
  const { options } = opt;
  return (
    <div
      className={options.classes}
      style={{ background: `url(${opt.bgImg}) repeat` }}
    >
      <HeadContainer
        title={options.titleSeo}
        author={options.authorSeo}
        datePublished={options.datePublished}
        schemaType={options.schemaType}
        titleSeo={options.titleSeo}
        authorSeo={options.authorSeo}
        featuredImage={options.featuredImage}
        blogListing={options.blogListing}
        articleBody={options.articleBody}
        mainLogo={options.mainLogo}
        description={options.description || null}
        cardImage={options.cardImage || null}
        serverUrl={options.serverUrl || null}
        articleUrl={options.articleUrl || null}
        pageQuestions={options.pageQuestions}
        killSEO={killSEO}
        topology={topology}
      />

      {children}
    </div>
  );
};

export default BodyBlock;
