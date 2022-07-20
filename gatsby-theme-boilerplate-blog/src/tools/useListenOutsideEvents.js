import { useEffect, useState } from "react";

const useListenOutsideEvents = ({
  handleRefState,
  refState,
  wrapperRef,
  mouseDown,
  outsideClick,
  hasOverlay,
  scroll,
  resize,
}) => {
  function handleClickOutside(event) {
    const refElement = wrapperRef.current;
    const isntClickOverlay = event.target.id !== "ref-overlay";
    const isClickInside = outsideClick
      ? refElement.contains(event.target)
      : true;
    const isntOutsideClick = hasOverlay ? isntClickOverlay : isClickInside;
    const customMouseDown = mouseDown
      ? event.target.closest(mouseDown.clickElement) === null
      : true;

    if (refElement && refState && !isntOutsideClick && customMouseDown) {
      return handleRefState();
    }
  }

  const [width, setWidth] = useState(0);
  const handleWindowsEvent = event => {
    setWidth(window.innerWidth);
    if (refState !== false && width > 768 && event.type === "scroll") {
      handleRefState();
    }
  };

  useEffect(() => {
    if (mouseDown || outsideClick)
      document.addEventListener("mousedown", handleClickOutside);
    if (resize) window.addEventListener("resize", handleWindowsEvent);
    if (scroll) window.addEventListener("scroll", handleWindowsEvent);
    return () => {
      if (mouseDown || outsideClick)
        document.removeEventListener("mousedown", handleClickOutside);
      if (resize) window.removeEventListener("resize", handleWindowsEvent);
      if (scroll) window.removeEventListener("scroll", handleWindowsEvent);
    };
  });
};

export default useListenOutsideEvents;
