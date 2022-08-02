import React from "react";

export default ({
  wrapperRef,
  visibleClassState,
  popupBackgroundColor,
  handleRefState,
  heading,
  popupText,
  formID,
  formIdSlug,
  form,
  buttonColor,
  textButtonColor,
  textButton,
  buttonContent,
}) => {
  return (
    <>
      <div className='popup-button-wrapper'>
        <button
          onClick={handleRefState}
          className='popup-button button-black-gray'
        >
          {buttonContent}
        </button>
      </div>
      <div
        id='ref-overlay'
        ref={wrapperRef}
        className={"popup-wrapper popup-state-" + visibleClassState}
      >
        <div
          id='ref-inner'
          className='popup-inner black-row'
          style={{
            backgroundColor: popupBackgroundColor,
          }}
        >
          <button className='close-button' onClick={handleRefState}>
            X
          </button>
          <div className='popup-content'>
            <h2 className='popup-heading'>{heading}</h2>
            <iframe
              width='560'
              height='315'
              src='https://www.youtube.com/embed/07COygyW6W0'
              title='YouTube video player'
              frameborder='0'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
              allowfullscreen
            ></iframe>
            {/* <div
              className='popup-text'
              dangerouslySetInnerHTML={{ __html: popupText }}
            ></div> */}
            {/* <div id='popup-code'>
              
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};
