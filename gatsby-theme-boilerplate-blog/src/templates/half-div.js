import React, { useState } from "react";
import { GatsbyImage, getImage, getSrc } from "gatsby-plugin-image";

import addToMailchimp from "gatsby-plugin-mailchimp";

import HalfDivWrapper from "@BlockBuilder/HalfDivWrapper";
import { useSiteMetadatas } from "../tools/useSiteMetadatas";
function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
function validateDate(input) {
  const reg = /(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d/;
  const dates = input.split("/");
  if (parseInt(dates[2]) > 2022) {
    return reg.test(String(input).toLowerCase());
  } else {
    return false;
  }
}
function validateWhats(input) {
  const whatSlipt = input.split("-");
  if (input.length > 12) {
    if (whatSlipt[1].length === 4) {
      const reW = /(\([0-9]{2}\)\s?[0-9]{4,5}-?[0-9]{3,4})|([0-9]{10,11})|([0-9]{2}\s?[0-9]{8,9})/gm;
      return input.match(reW) ? true : false;
    }
  }
}
const HalfDiv = ({ location, pageContext }) => {
  const [btnClick, setBtnClick] = useState(null);
  const [email, setEmail] = useState("");
  const [emailSuccess, setEmailSuccess] = useState(false);
  const [date, setDate] = useState("");
  const [dateSuccess, setDateSuccess] = useState(false);
  const [peopleA, setPeopleA] = useState("");
  const [peopleASuccess, setPeopleASuccess] = useState(false);
  const [peopleB, setPeopleB] = useState("");
  const [peopleBSuccess, setPeopleBSuccess] = useState(false);
  const [city, setCity] = useState("");
  const [citySuccess, setCitySuccess] = useState(false);

  const [peopleAWhats, setPeopleAWhats] = useState("");
  const [peopleAWhatsSuccess, setPeopleAWhatsSuccess] = useState("");

  const [honey, setHoney] = useState("");
  const [mcRes, setMcRes] = useState("");
  const [msg, setMsg] = useState("");
  const [success, setSuccess] = useState("");
  const handleMcRes = (msgReceived, resReceived) => {
    setMcRes(resReceived);
    handleMsg(msgReceived, resReceived);
    handleSuccess(resReceived);
  };
  const handleMsg = (msgNow, resReceived) => {
    let msgNull = null;
    if (resReceived === "error") {
      msgNull = "E-mail inválido ou já cadastrado.";
    }
    if (resReceived === "success") {
      msgNull = "Lembrete definido. Até logo!";
    }
    setMsg(msgNull);
  };
  const handleSuccess = successNow => {
    setSuccess(successNow);
  };
  const handlePeopleAWhatsChange = peopleAWhatsTyping => {
    const whatsValidated = validateWhats(peopleAWhatsTyping);
    setPeopleAWhats(peopleAWhatsTyping);
    if (whatsValidated) {
      return setPeopleAWhatsSuccess(true);
    } else {
      return setPeopleAWhatsSuccess(false);
    }
  };

  const handleCityChange = cityTyping => {
    setCity(cityTyping);
    if (cityTyping.length >= 2) {
      return setCitySuccess(true);
    } else {
      return setCitySuccess(false);
    }
  };
  const handlePeopleBChange = peopleBTyping => {
    setPeopleB(peopleBTyping);
    if (peopleBTyping.length >= 2) {
      return setPeopleBSuccess(true);
    } else {
      return setPeopleBSuccess(false);
    }
  };
  const handlePeopleAChange = peopleATyping => {
    setPeopleA(peopleATyping);
    if (peopleATyping.length >= 2) {
      return setPeopleASuccess(true);
    } else {
      return setPeopleASuccess(false);
    }
  };
  const handleDateChange = dateTyping => {
    setDate(dateTyping);
    const validatedDate = validateDate(dateTyping);
    if (validatedDate) {
      return setDateSuccess(true);
    } else {
      return setDateSuccess(false);
    }
  };
  const handleEmailChange = emailTyping => {
    setEmail(emailTyping);

    console.log("yeah setEmail typing");
    const validatedEmail = validateEmail(emailTyping);
    if (validatedEmail) {
      return setEmailSuccess(true);
    } else {
      return setEmailSuccess(false);
    }
  };
  const handleHoneypotChange = honeyTyping => {
    setHoney(honeyTyping);
  };
  const handleSubmit = async (e, email, honey) => {
    e.preventDefault();
    honey ||
      (await addToMailchimp(email).then(({ msg, result }) => {
        handleMcRes(msg, result);
      }));
  };
  const {
    imgHolder,
    bgPatternImg,
    boilerplateLogoSmall,
    site,
    bandeiraWhats,
    bandeiraQuestion,
    dateImageButton,
    fingerButton,
  } = useSiteMetadatas();
  const badgeWhats = getImage(bandeiraWhats.childrenImageSharp[0]);
  const badgeQuestion = getImage(bandeiraQuestion.childrenImageSharp[0]);
  const defaultQuestions = site.siteMetadata.questions;

  const bgPatternSrc = getSrc(bgPatternImg.childrenImageSharp[0]);
  const logoQuery = getImage(boilerplateLogoSmall.childrenImageSharp[0]);
  const {
    title,
    content,
    headline,
    questions,
    excerpt,
    featureImage,
  } = pageContext;
  const mainImage = getImage(featureImage.childrenImageSharp[0]);
  const dateImage = getImage(dateImageButton.childrenImageSharp[0]);
  const fingerImage = getImage(fingerButton.childrenImageSharp[0]);

  function handleClick(clickedBtn) {
    setBtnClick(clickedBtn);
    console.log(btnClick);
  }
  // btn name
  // state neutral
  // state clicked
  // state closed

  // modal name
  // state open
  // state close
  // content inputs
  return (
    <HalfDivWrapper
      backgroundImage={{
        src: bgPatternSrc,
      }}
      logo={
        <GatsbyImage
          image={logoQuery}
          alt={"Logotipo d'As Casamenteiras"}
          width={200}
          placeholder={"NONE"}
          critical='true'
          className={""}
        />
      }
      opt={{
        titleSeo: `${title}`,
        classes: "half-div",
        pageQuestions: questions || defaultQuestions,
        featuredImage:
          site.siteMetadata.siteUrl +
          featureImage.childrenImageSharp[0].gatsbyImageData.images.fallback
            .src,
        cardImage:
          featureImage.childrenImageSharp[0].gatsbyImageData.images.fallback
            .src,
        articleBody: content,
        mainLogo: imgHolder,
        description: excerpt,
        serverUrl: location.origin || site.siteMetadata.siteUrl || "/",
        articleUrl: location.href,
        social: site.siteMetadata.social.twitter,
        badgesWhats: (
          <GatsbyImage
            image={badgeWhats}
            alt={"Botão do Whats"}
            width={70}
            height={70}
            placeholder={"NONE"}
            critical='true'
            className={"whatsMe"}
          />
        ),
        badgesQuestion: (
          <GatsbyImage
            image={badgeQuestion}
            alt={"Botão de Perguntas Frequentes"}
            width={70}
            height={70}
            placeholder={"NONE"}
            critical='true'
            className={"whatsMe"}
          />
        ),
      }}
    >
      <main>
        <div className='main-image'>
          <GatsbyImage
            image={mainImage}
            alt={"Algo aqui"}
            width={923}
            height={1050}
            layout='contain'
            placeholder={"NONE"}
            critical='true'
            className={""}
          />
        </div>
        <div className='main-content'>
          <GatsbyImage
            image={logoQuery}
            alt={"Logotipo d'As Casamenteiras"}
            width={300}
            height={230}
            placeholder={"NONE"}
            critical='true'
            className={""}
          />
          <div
            className='full-width'
            dangerouslySetInnerHTML={{ __html: content }}
          ></div>
          {/* <GatsbyImage
            image={fingerImage}
            alt={"Algo aqui"}
            width={60}
            height={60}
            layout='contain'
            placeholder={"NONE"}
            className={"finger-button"}
          /> */}
          <h3>
            Clique nos botões abaixo e preencha as informações para liberar o
            PDF.
          </h3>
          {msg ? (
            <p
              className={
                success === "success" ? "successHTMLstyle" : "errorHTMLstyle"
              }
            >
              {msg}
            </p>
          ) : null}
          {success !== "success" ? (
            <>
              <form
                action='https://ascasamenteiras.us21.list-manage.com/subscribe/post?u=7788204f1e9c743f2274eb8bc&amp;id=07328022a5&amp;f_id=0076c4e1f0'
                method='post'
                id='mc-embedded-subscribe-form'
                name='mc-embedded-subscribe-form'
                className='validate'
                target='_blank'
                onSubmit={e => handleSubmit(e, email, honey)}
                noValidate
              >
                <p className='hidden'>
                  <label>
                    Don’t fill this out if you’re human:{" "}
                    <input
                      name='bot-field'
                      onChange={e => handleHoneypotChange(e.target.value)}
                      value={honey}
                    />
                  </label>
                </p>
                <br />
                {/* 
                <div className='landing-date input-wrapper email'>
                    <button onClick={e => handleClick("email")}>
                      <GatsbyImage
                        image={dateImage}
                        alt={"Algo aqui"}
                        width={60}
                        height={60}
                        layout='contain'
                        placeholder={"NONE"}
                        className={`image-button ${
                          dateSuccess === true
                            ? "success-color"
                            : email === ""
                            ? ""
                            : "error-color"
                        }`}
                      />

                      <label htmlFor='mce-EMAIL'>
                        E-mail
                        <br />
                        Cônjuge A
                      </label>
                    </button>

                    <div
                      className={
                        btnClick === "email"
                          ? "landing-modal-wrapper"
                          : "hidden"
                      }
                    >
                      <div
                        className='modal-background'
                        onClick={e => handleClick(null)}
                      ></div>
                      <div className='modal-landing'>
                        <input
                          type='email'
                          placeholder='seu@email.com (avise-me por e-mail)'
                          onChange={e => handleEmailChange(e.target.value)}
                          value={email}
                          name='EMAIL'
                          className={`required email`}
                          id='mce-EMAIL'
                          required
                        />
                        <button
                          className='landing-input-ok'
                          onClick={e => handleClick(null)}
                        >
                          OK
                        </button>
                      </div>
                      <span
                        className='close-modal'
                        onClick={e => handleClick(null)}
                      >
                        x
                      </span>
                    </div>
                  </div> */}

                <div className='grid-me-please'>
                  <div className='landing-date input-wrapper date'>
                    <button onClick={e => handleClick("date")}>
                      <GatsbyImage
                        image={dateImage}
                        alt={"Algo aqui"}
                        width={60}
                        height={60}
                        layout='contain'
                        placeholder={"NONE"}
                        className={`image-button ${
                          dateSuccess === true
                            ? "success-color"
                            : date === ""
                            ? ""
                            : "error-color"
                        }`}
                      />

                      <label htmlFor='mce-DATE1-day'>
                        Data do
                        <br />
                        Casamento
                      </label>
                    </button>

                    <div
                      className={
                        btnClick === "date" ? "landing-modal-wrapper" : "hidden"
                      }
                    >
                      <div
                        className='modal-background'
                        onClick={e => handleClick(null)}
                      ></div>
                      <div className='modal-landing'>
                        <input
                          type='text'
                          name='fulldate'
                          id='fulldate'
                          size='10'
                          maxLength={10}
                          placeholder='DD/MM/AAAA'
                          pattern='/(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d/'
                          onChange={e => handleDateChange(e.target.value)}
                        />
                        <button
                          className='landing-input-ok'
                          onClick={e => handleClick(null)}
                        >
                          OK
                        </button>
                        {/* <input
                        className='datepart '
                        type='text'
                        pattern='[0-9]*'
                        placeholder='DD'
                        size='2'
                        maxLength='2'
                        name='DATE1[day]'
                        id='mce-DATE1-day'
                      />
                      <input
                        className='datepart '
                        type='text'
                        pattern='[0-9]*'
                        placeholder='MM'
                        size='2'
                        maxLength='2'
                        name='DATE1[month]'
                        id='mce-DATE1-month'
                      />
                      <input
                        className='datepart '
                        type='text'
                        pattern='[0-9]*'
                        placeholder='AAAA'
                        size='4'
                        maxLength='4'
                        name='DATE1[year]'
                        id='mce-DATE1-year'
                      /> */}
                      </div>
                      <span
                        className='close-modal'
                        onClick={e => handleClick(null)}
                      >
                        x
                      </span>
                    </div>
                  </div>

                  <div className='landing-date input-wrapper peopleA'>
                    <button onClick={e => handleClick("peopleA")}>
                      <GatsbyImage
                        image={dateImage}
                        alt={"Algo aqui"}
                        width={60}
                        height={60}
                        layout='contain'
                        placeholder={"NONE"}
                        className={`image-button ${
                          peopleASuccess === true
                            ? "success-color"
                            : peopleA === ""
                            ? ""
                            : "error-color"
                        }`}
                      />
                      <label htmlFor='mce-PEOPLEA'>
                        Nome
                        <br />
                        Cônjuge A
                      </label>
                    </button>

                    <div
                      className={
                        btnClick === "peopleA"
                          ? "landing-modal-wrapper"
                          : "hidden"
                      }
                    >
                      <div
                        className='modal-background'
                        onClick={e => handleClick(null)}
                      ></div>
                      <div className='modal-landing'>
                        <input
                          type='text'
                          name='PEOPLEA'
                          className=''
                          id='mce-PEOPLEA'
                          onChange={e => handlePeopleAChange(e.target.value)}
                        />
                        <button
                          className='landing-input-ok'
                          onClick={e => handleClick(null)}
                        >
                          OK
                        </button>
                      </div>

                      <span
                        className='close-modal'
                        onClick={e => handleClick(null)}
                      >
                        x
                      </span>
                    </div>
                  </div>

                  <div className='landing-date input-wrapper whatsPeopleA'>
                    <button onClick={e => handleClick("whatsPeopleA")}>
                      <GatsbyImage
                        image={dateImage}
                        alt={"Algo aqui"}
                        width={60}
                        height={60}
                        layout='contain'
                        placeholder={"NONE"}
                        className={`image-button ${
                          peopleAWhatsSuccess === true
                            ? "success-color"
                            : peopleAWhats === ""
                            ? ""
                            : "error-color"
                        }`}
                      />
                      <label htmlFor='mce-PHONE'>
                        Whatsapp
                        <br />
                        Cônjuge A
                      </label>
                    </button>

                    <div
                      className={
                        btnClick === "whatsPeopleA"
                          ? "landing-modal-wrapper"
                          : "hidden"
                      }
                    >
                      <div
                        className='modal-background'
                        onClick={e => handleClick(null)}
                      ></div>
                      <div className='modal-landing'>
                        <input
                          type='text'
                          name='PHONE'
                          className=''
                          id='mce-PHONE'
                          onChange={e =>
                            handlePeopleAWhatsChange(e.target.value)
                          }
                        />
                        <button
                          className='landing-input-ok'
                          onClick={e => handleClick(null)}
                        >
                          OK
                        </button>
                      </div>

                      <span
                        className='close-modal'
                        onClick={e => handleClick(null)}
                      >
                        x
                      </span>
                    </div>
                  </div>

                  <div className='landing-date input-wrapper email'>
                    <button onClick={e => handleClick("email")}>
                      <GatsbyImage
                        image={dateImage}
                        alt={"Algo aqui"}
                        width={60}
                        height={60}
                        layout='contain'
                        placeholder={"NONE"}
                        className={`image-button ${
                          emailSuccess === true
                            ? "success-color"
                            : email === ""
                            ? ""
                            : "error-color"
                        }`}
                      />

                      <label htmlFor='mce-EMAIL'>
                        E-mail
                        <br />
                        Cônjuge A
                      </label>
                    </button>

                    <div
                      className={
                        btnClick === "email"
                          ? "landing-modal-wrapper"
                          : "hidden"
                      }
                    >
                      <div
                        className='modal-background'
                        onClick={e => handleClick(null)}
                      ></div>
                      <div className='modal-landing'>
                        <input
                          type='email'
                          placeholder='seu@email.com (avise-me por e-mail)'
                          onChange={e => handleEmailChange(e.target.value)}
                          value={email}
                          name='EMAIL'
                          className={`required email`}
                          id='mce-EMAIL'
                          required
                        />
                        <button
                          className='landing-input-ok'
                          onClick={e => handleClick(null)}
                        >
                          OK
                        </button>
                      </div>
                      <span
                        className='close-modal'
                        onClick={e => handleClick(null)}
                      >
                        x
                      </span>
                    </div>
                  </div>

                  <div className='landing-date input-wrapper peopleB'>
                    <button onClick={e => handleClick("peopleB")}>
                      <GatsbyImage
                        image={dateImage}
                        alt={"Algo aqui"}
                        width={60}
                        height={60}
                        layout='contain'
                        placeholder={"NONE"}
                        className={`image-button ${
                          peopleBSuccess === true
                            ? "success-color"
                            : peopleB === ""
                            ? ""
                            : "error-color"
                        }`}
                      />
                      <label htmlFor='mce-PEOPLEB'>
                        Nome
                        <br />
                        Cônjuge B
                      </label>
                    </button>

                    <div
                      className={
                        btnClick === "peopleB"
                          ? "landing-modal-wrapper"
                          : "hidden"
                      }
                    >
                      <div
                        className='modal-background'
                        onClick={e => handleClick(null)}
                      ></div>
                      <div className='modal-landing'>
                        <input
                          type='text'
                          name='PEOPLEB'
                          className=''
                          id='mce-PEOPLEB'
                          onChange={e => handlePeopleBChange(e.target.value)}
                        />
                        <button
                          className='landing-input-ok'
                          onClick={e => handleClick(null)}
                        >
                          OK
                        </button>
                      </div>
                      <span
                        className='close-modal'
                        onClick={e => handleClick(null)}
                      >
                        x
                      </span>
                    </div>
                  </div>

                  <div className='landing-date input-wrapper city'>
                    <button onClick={e => handleClick("city")}>
                      <GatsbyImage
                        image={dateImage}
                        alt={"Algo aqui"}
                        width={60}
                        height={60}
                        layout='contain'
                        placeholder={"NONE"}
                        className={`image-button ${
                          citySuccess === true
                            ? "success-color"
                            : city === ""
                            ? ""
                            : "error-color"
                        }`}
                      />
                      <label htmlFor='mce-CITY'>Cidade</label>
                    </button>

                    <div
                      className={
                        btnClick === "city" ? "landing-modal-wrapper" : "hidden"
                      }
                    >
                      <div
                        className='modal-background'
                        onClick={e => handleClick(null)}
                      ></div>
                      <div className='modal-landing'>
                        <input
                          type='text'
                          name='CITY'
                          className=''
                          id='mce-CITY'
                          onChange={e => handleCityChange(e.target.value)}
                        />
                        <button
                          className='landing-input-ok'
                          onClick={e => handleClick(null)}
                        >
                          OK
                        </button>
                      </div>
                      <span
                        className='close-modal'
                        onClick={e => handleClick(null)}
                      >
                        x
                      </span>
                    </div>
                  </div>
                </div>

                <input
                  type='submit'
                  value='Inscreva-se'
                  name='subscribe'
                  id='mc-embedded-subscribe'
                  className='button submit-button'
                  disabled={
                    emailSuccess &&
                    dateSuccess &&
                    peopleASuccess &&
                    peopleBSuccess &&
                    citySuccess &&
                    peopleAWhatsSuccess
                      ? false
                      : true
                  }
                />

                <br />
                <br />
              </form>

              {honey || email === "" ? null : (
                <>
                  <button
                    type='submit'
                    name='subscribe'
                    id='mc-embedded-subscribe'
                    disabled={email ? false : true}
                  >
                    Alerta-me!
                  </button>
                </>
              )}
            </>
          ) : (
            <>
              <br />
            </>
          )}
        </div>
      </main>
    </HalfDivWrapper>
  );
};

export default HalfDiv;
