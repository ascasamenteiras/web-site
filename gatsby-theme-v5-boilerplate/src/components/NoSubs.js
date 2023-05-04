import React from "react";
import { Link } from "gatsby";
import { Row } from "@Components/InsertRow";
const NoSubs = ({ toDefaultPath, openGerman, notAvailableLocale, classes }) => {
  return (
    <Row opt={{ isBoxed: false, bgColor: "#fff", classes: "nosubs-row" }}>
      <Row opt={{ classes: classes, isBoxed: true }}>
        <h1>{notAvailableLocale}</h1>
        <p>
          <Link to={toDefaultPath}>{openGerman}</Link>
        </p>
      </Row>
    </Row>
  );
};

export default NoSubs;
