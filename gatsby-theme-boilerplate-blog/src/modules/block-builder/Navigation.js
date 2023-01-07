import React from "react";
import { Link } from "gatsby";
import LocalizedLink from "../../components/localizedLink";
import useTranslations from "../../tools/useTranslations";

const Navigation = () => {
  const { backToHome } = useTranslations();

  return (
    <nav>
      <LocalizedLink to='/' aria-label={backToHome}>
        Homepage
      </LocalizedLink>
      <div>
        <Link to='/' hrefLang='pt'>
          Português
        </Link>
        {` `}/{` `}
        <Link to='/en' hrefLang='en'>
          English
        </Link>
      </div>
    </nav>
  );
};

export default Navigation;
