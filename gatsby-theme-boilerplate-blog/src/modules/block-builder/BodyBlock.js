import React from "react";
import SeoContainer from "../../containers/SeoContainer";

const BodyBlock = ({ children, opt, killSEO }) => {
  const { options } = opt;
  return (
    <div
      className={options.classes}
      style={{ background: `url(${opt.bgImg}) repeat` }}
    >
      <SeoContainer
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
      />

      {children}
    </div>
  );
};

export default BodyBlock;
