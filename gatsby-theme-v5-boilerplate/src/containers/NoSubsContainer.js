import React from "react";
import NoSubs from "@Components/NoSubs";
import { useSiteMetadatas } from "../tools/useSiteMetadatas";
const NoSubsContainer = ({ opt }) => {
  const { schemasJSON } = useSiteMetadatas();
  const defaultJSON = schemasJSON?.nodes?.filter(
    el => el.schema[0].card[0].cardLocale === "en-US"
  );
  const card = defaultJSON[0]?.schema[0]?.card[0];
  const legend = card?.pagesHelper?.globals?.notAvailableLocale;
  const i18n = card?.pagesHelper?.globals?.notAvailableRedirectLocale;
  const x =
    i18n === "en"
      ? "/" + opt?.toDefaultPath
      : "/" + i18n + "/" + opt?.toDefaultPath;
  const german = card?.pagesHelper?.globals?.openGerman;
  return (
    <NoSubs
      openGerman={german}
      notAvailableLocale={legend}
      toDefaultPath={x}
      classes={opt?.classes}
    />
  );
};

export default NoSubsContainer;
