import React, { useState, useRef } from "react";
import _ from "lodash";

const formData = {
  form: "form",
  formID: "formID",
  popupText: "popupText",
  textButton: "textButton",
  buttonColor: "buttonColor",
  textButtonColor: "textButtonColor",
  tksMsg: "tksMsg",
  popupBackgroundColor: "popupBackgroundColor",
};

import ABpopup from "../components/ABpopup";
import useListenOutsideEvents from "../tools/useListenOutsideEvents";

const ABpopupcontainer = ({ buttonContent, heading }) => {
  const [refState, setRefState] = useState(false);
  const handleRefState = () => {
    setRefState(!refState);
  };

  const wrapperRef = useRef(null);

  const pageParams = {
    querySelector: "querySelector",
    wrapperRef: wrapperRef,
    handleRefState: handleRefState,
    refState: refState,
  };

  useListenOutsideEvents({
    handleRefState: pageParams.handleRefState,
    refState: pageParams.refState,
    wrapperRef: pageParams.wrapperRef,
    mouseDown: {
      on: false,
      clickElement: ".close-button",
    },
    outsideClick: true,
    hasOverlay: true,
    scroll: false,
    resize: false,
  });

  const { form } = formData;
  const { formID } = formData;
  const { textButton } = formData;

  const { buttonColor } = formData;
  const { popupText } = formData;
  const { textButtonColor } = formData;
  const { popupBackgroundColor } = formData;

  const formIdSlug = _.kebabCase(formID);
  const visibleClassState = refState ? "visible" : "not-visible";

  return (
    <ABpopup
      handleRefState={handleRefState}
      wrapperRef={wrapperRef}
      visibleClassState={visibleClassState}
      popupBackgroundColor={popupBackgroundColor}
      heading={heading}
      popupText={popupText}
      formID={formID}
      formIdSlug={formIdSlug}
      form={form}
      buttonColor={buttonColor}
      textButtonColor={textButtonColor}
      textButton={textButton}
      buttonContent={buttonContent}
    />
  );
};

export default ABpopupcontainer;
