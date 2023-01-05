import React, { useState, useEffect, useRef } from "react";
import { GatsbyImage, getImage, getSrc } from "gatsby-plugin-image";
// import moment from "moment";
import * as moment from "moment";
import "moment/locale/pt-br";

require("moment-precise-range-plugin");
import VMasker from "vanilla-masker";
// import { useCountdown } from "../tools/useCountdown";
// import addToMailchimp from "gatsby-plugin-mailchimp";

// import sgMail from "@sendgrid/mail";

import HalfDivWrapper from "@BlockBuilder/HalfDivWrapper";
import { useSiteMetadatas } from "../tools/useSiteMetadatas";

const DateTimeDisplay = ({ value, type, isDanger }) => {
  return (
    <div className={isDanger ? "countdown danger" : "countdown"}>
      <p>{value}</p>
      <span>{type}</span>
    </div>
  );
};

const ExpiredNotice = () => {
  return (
    <div className='expired-notice'>
      <span>Expired!!!</span>
      <p>Please select a future date and time.</p>
    </div>
  );
};

const ShowCounter = ({ days, hours, minutes, seconds }) => {
  return (
    <div className='show-counter'>
      <a
        className='countdown-link'
        href='https://tapasadhikary.com'
        rel='noopener noreferrer'
        target='_blank'
      >
        <DateTimeDisplay isDanger={days <= 3} type='Days' value={days} />
        <p>:</p>
        <DateTimeDisplay isDanger={false} type='Hours' value={hours} />
        <p>:</p>
        <DateTimeDisplay isDanger={false} type='Mins' value={minutes} />
        <p>:</p>
        <DateTimeDisplay isDanger={false} type='Seconds' value={seconds} />
      </a>
    </div>
  );
};

const CountDownTimer = ({ targetDate }) => {
  const [days, hours, minutes, seconds] = useCountDown(targetDate);

  if (days + hours + minutes + seconds <= 0) {
    return <ExpiredNotice />;
  } else {
    return (
      <ShowCounter
        days={days}
        hours={hours}
        minutes={minutes}
        seconds={seconds}
      />
    );
  }
};

let validator = {
  set: function(target, key, value) {
    console.log(`The property ${key} has been updated with ${value}`);
    return true;
  },
};

function validateEmail(email) {
  if (email.slice(-1) === ".") {
    return false;
  }
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
  const [confirmDate, setConfirmDate] = useState(null);
  const [city, setCity] = useState("");
  const [citySuccess, setCitySuccess] = useState(false);

  const [peopleAWhats, setPeopleAWhats] = useState("");
  const [peopleAWhatsSuccess, setPeopleAWhatsSuccess] = useState("");

  const [honey, setHoney] = useState("");
  const [msg, setMsg] = useState("");
  const [success, setSuccess] = useState("");

  const [countdown, setCountdown] = useState([12, 60, 60]);
  const [promoEnd, setPromoEnd] = useState(false);

  // useRef
  const refDate = useRef();
  const refEmail = useRef();
  const refPeopleA = useRef();
  const refWhatsPeopleA = useRef();
  const refPeopleB = useRef();
  const refCity = useRef();

  // handle Images
  const {
    imgHolder,
    bgPatternImg,
    boilerplateLogoSmall,
    site,
    bandeiraWhats,
    bandeiraQuestion,
    dateImageButton,
    floralCimaImg,
    floralMeioImg,
    florBaixoImg,
    marcaImg,
    voucherImg,
    pdfImg,
  } = useSiteMetadatas();
  const badgeWhats = getImage(bandeiraWhats.childrenImageSharp[0]);
  const badgeQuestion = getImage(bandeiraQuestion.childrenImageSharp[0]);
  const defaultQuestions = site.siteMetadata.questions;

  const bgPatternSrc = getSrc(bgPatternImg.childrenImageSharp[0]);
  const logoQuery = getImage(boilerplateLogoSmall.childrenImageSharp[0]);
  const floralCima = getImage(floralCimaImg.childrenImageSharp[0]);
  const floralMeio = getImage(floralMeioImg.childrenImageSharp[0]);
  const florBaixo = getImage(florBaixoImg.childrenImageSharp[0]);
  const marca = getImage(marcaImg.childrenImageSharp[0]);
  const voucher = getImage(voucherImg.childrenImageSharp[0]);
  const pdf = getImage(pdfImg.childrenImageSharp[0]);

  const {
    title,
    content,
    questions,
    excerpt,
    featuredImage,
    landingCTA,
    emailCTA,
  } = pageContext;
  const mainImage = getImage(featuredImage.childrenImageSharp[0]);
  const dateImage = getImage(dateImageButton.childrenImageSharp[0]);

  // function handleConfirmDate(x) {
  // return setConfirmDate(x);
  // }

  console.log("pageContext");
  // console.log(pageContext);
  // console.log(location);

  // console.log(site);
  // queries.fullDate
  // const [clockTime, isPlaying, setIsPlaying] = useCountdown(82.5 * 60);

  let urlParams = null;
  let longDate = null;
  let shortDate = null;
  let diffDays = null;
  let months = null;
  let condEndPromo = null;
  if (location.search.includes("success=1") && !condEndPromo) {
    urlParams = new Proxy(new URLSearchParams(location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    });
    // Get the value of "some_key" in eg "https://example.com/?some_key=some_value"
    // console.log(encodeURI(urlParams.fullDate + " GMT"));
    // console.log(encodeURI(urlParams.peopleA));
    // console.log(encodeURI(urlParams.whatsPeopleA));
    // console.log(encodeURI(urlParams.emailPeopleA));
    // console.log(encodeURI(urlParams.peopleB));
    // console.log(encodeURI(urlParams.city));
    // console.log("new Date()");
    const dateNow = urlParams.fullDate.split("/");
    // console.log("dateNowdateNow");
    // console.log(dateNow);
    const casalDate = new Date(
      dateNow[1] + "-" + dateNow[0] + "-" + dateNow[2]
    );
    const now = new Date();
    const options1 = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const options2 = {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    };
    longDate = casalDate.toLocaleString("pt-BR", options1);
    shortDate = casalDate.toLocaleString("pt-BR", options2);
    const diffTime = Math.abs(casalDate - now);
    diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const diffResult = Math.round((casalDate - now) / (1000 * 60 * 60 * 24));
    months = Math.floor(diffResult / 30);

    console.log(diffTime + " milliseconds");
    console.log(diffDays + " days");
    console.log(months + " months");

    console.log("urlParams.confirmDate");
  }

  let queries = [];
  const urlQueries = decodeURI(location.search)
    .slice(1)
    .split("&");
  urlQueries.map((e, i) => {
    const splitE = e.split("=");
    queries[splitE[0]] = splitE[1];
  });
  // handle States
  // console.log("urlQueries");
  // console.log(queries.city);
  // console.log(queries.emailPeopleA);
  // console.log(queries.fullDate);
  // console.log(queries.peopleA);
  // console.log(queries.peopleB);
  // console.log(queries.success);
  // console.log(queries.whatsPeopleA);
  const handleSuccess = (e, email, honey) => {
    if (honey) {
      return setSuccess(false);
    }
    if (
      emailSuccess &&
      dateSuccess &&
      peopleASuccess &&
      peopleBSuccess &&
      citySuccess &&
      peopleAWhatsSuccess
    ) {
      setSuccess(true);
      return handleSubmit(e, email, honey);
    } else {
      return setSuccess(false);
    }
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
  const handleDateChange = (e, dateTyping) => {
    console.log(e.key);
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

  function handleClick(e, clickedBtn) {
    if (e) {
      e.preventDefault();
    }

    return setBtnClick(clickedBtn);
  }

  const handleSubmit = async (e, email, honey) => {
    e.preventDefault();
  };
  function handleCountDown(params) {
    setCountdown([params[0], params[1], params[2]]);
  }
  const handleKeyDown = event => {
    if (event.key === "Enter" || event.key === "Escape") {
      handleClick(event, null);
    }
  };
  useEffect(() => {
    if (
      !location.search.includes("success=1") &&
      !location.search.includes("success=0")
    ) {
      VMasker(document.querySelector('input[name="PHONE"')).maskPattern(
        "(99) 99999-9999"
      );
      VMasker(document.querySelector('input[name="FULLDATE"')).maskPattern(
        "99/99/9999"
      );
    }

    if (btnClick === "date") {
      refDate.current.focus();
    }
    if (btnClick === "email") {
      refEmail.current.focus();
    }
    if (btnClick === "peopleA") {
      refPeopleA.current.focus();
    }
    if (btnClick === "whatsPeopleA") {
      refWhatsPeopleA.current.focus();
    }
    if (btnClick === "peopleB") {
      refPeopleB.current.focus();
    }
    if (btnClick === "city") {
      refCity.current.focus();
    }
    if (location.search.includes("success=1") && !promoEnd) {
      setSuccess("success");
      let promoDate = new Date(urlParams.confirmDate);
      promoDate.setHours(promoDate.getHours() + 12);
      const nowDate = new Date();
      condEndPromo = moment(nowDate) > moment(promoDate);
      if (condEndPromo) {
        setPromoEnd(true);
        handleCountDown([0, 0, 0]);
      } else {
        const diffMoment = moment.preciseDiff(nowDate, promoDate, true);
        setTimeout(
          () =>
            handleCountDown([
              diffMoment.hours,
              diffMoment.minutes,
              diffMoment.seconds,
            ]),
          1000
        );
      }
    }
  }, [btnClick, countdown]);
  const mensagem = promoEnd
    ? "Quero 🛍5% de desconto🛍"
    : "Quero o 🎫 Voucher 🎫 de 🛍R$500 (quinhentos reais)🛍";
  console.log("queries");
  console.log(queries.email);
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
        classes: success ? "half-div success" : "half-div",
        pageQuestions: questions || defaultQuestions,
        featuredImage:
          site.siteMetadata.siteUrl +
          featuredImage.childrenImageSharp[0].gatsbyImageData.images.fallback
            .src,
        cardImage:
          featuredImage.childrenImageSharp[0].gatsbyImageData.images.fallback
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
        <div
          className={
            !location.search.includes("success=1") ? "main-image" : "hidden"
          }
        >
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
            className={"logo-half-div"}
          />

          {msg ? (
            <p
              className={
                success === "success" ? "successHTMLstyle" : "errorHTMLstyle"
              }
            >
              {msg}
            </p>
          ) : null}
          {success !== "success" && !location.search.includes("success=0") ? (
            <>
              <div
                className='full-width'
                dangerouslySetInnerHTML={{ __html: content }}
              ></div>
              <form
                action={"/.netlify/functions/sendgrid"}
                // onSubmit={e => handleChangeForm(e)}
                method='POST'
                id='mc-embedded-subscribe-form'
                name='mc-embedded-subscribe-form'
                className='validate'
                // target='_blank'
                // onSubmit={e => handleSuccess(e, email, honey)}
                noValidate
              >
                <p className='hidden'>
                  <label>
                    Don’t fill this out if you’re human:{" "}
                    <input
                      name='botField'
                      onChange={e => handleHoneypotChange(e.target.value)}
                      value={honey}
                    />
                    <input name='landingUrl' defaultValue={location.pathname} />
                    <input name='searchUrl' defaultValue={location.search} />
                    <input
                      name='logoImage'
                      defaultValue={logoQuery.images.fallback.src}
                    />
                    <input
                      name='floralCima'
                      defaultValue={floralCima.images.fallback.src}
                    />
                    <input
                      name='floralMeio'
                      defaultValue={floralMeio.images.fallback.src}
                    />
                    <input
                      name='florBaixo'
                      defaultValue={florBaixo.images.fallback.src}
                    />
                    <input
                      name='marca'
                      defaultValue={marca.images.fallback.src}
                    />
                    <input name='CTABUTTON' defaultValue={emailCTA} />
                    <input
                      name='siteUrl'
                      defaultValue={site.siteMetadata.siteUrl}
                    />
                    <input name='nowDate' defaultValue={new Date()} />
                  </label>
                </p>
                <br />

                <div className='grid-me-please'>
                  <div className='landing-date input-wrapper date'>
                    <button onClick={e => handleClick(e, "date")}>
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

                      <label htmlFor='FULLDATE'>
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
                        onClick={e => handleClick(e, null)}
                      ></div>
                      <div className='modal-landing'>
                        <input
                          type='text'
                          name='FULLDATE'
                          id='FULLDATE'
                          size='10'
                          onKeyDown={e => handleKeyDown(e)}
                          ref={refDate}
                          maxLength={10}
                          placeholder='DD/MM/AAAA'
                          pattern='/(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d/'
                          onChange={e => handleDateChange(e, e.target.value)}
                        />
                        <button
                          className='landing-input-ok'
                          onClick={e => handleClick(e, null)}
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
                        onClick={e => handleClick(e, null)}
                      >
                        x
                      </span>
                    </div>
                  </div>

                  <div className='landing-date input-wrapper peopleA'>
                    <button onClick={e => handleClick(e, "peopleA")}>
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
                        onClick={e => handleClick(e, null)}
                      ></div>
                      <div className='modal-landing'>
                        <input
                          onKeyDown={e => handleKeyDown(e)}
                          ref={refPeopleA}
                          type='text'
                          name='PEOPLEA'
                          onMouseDown={e => handleKeyDown(e)}
                          className=''
                          id='mce-PEOPLEA'
                          placeholder='Cônjuge A'
                          onChange={e => handlePeopleAChange(e.target.value)}
                        />
                        <button
                          className='landing-input-ok'
                          onClick={e => handleClick(e, null)}
                        >
                          OK
                        </button>
                      </div>

                      <span
                        className='close-modal'
                        onClick={e => handleClick(e, null)}
                      >
                        x
                      </span>
                    </div>
                  </div>

                  <div className='landing-date input-wrapper whatsPeopleA'>
                    <button onClick={e => handleClick(e, "whatsPeopleA")}>
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
                        onClick={e => handleClick(e, null)}
                      ></div>
                      <div className='modal-landing'>
                        <input
                          onKeyDown={e => handleKeyDown(e)}
                          ref={refWhatsPeopleA}
                          type='text'
                          placeholder='(99)99999-9999'
                          onMouseDown={e => handleKeyDown(e)}
                          name='PHONE'
                          className=''
                          id='mce-PHONE'
                          onChange={e =>
                            handlePeopleAWhatsChange(e.target.value)
                          }
                        />
                        <button
                          className='landing-input-ok'
                          onClick={e => handleClick(e, null)}
                        >
                          OK
                        </button>
                      </div>

                      <span
                        className='close-modal'
                        onClick={e => handleClick(e, null)}
                      >
                        x
                      </span>
                    </div>
                  </div>

                  <div className='landing-date input-wrapper email'>
                    <button onClick={e => handleClick(e, "email")}>
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
                        onClick={e => handleClick(e, null)}
                      ></div>
                      <div className='modal-landing'>
                        <input
                          onKeyDown={e => handleKeyDown(e)}
                          ref={refEmail}
                          type='email'
                          onMouseDown={e => handleKeyDown(e)}
                          placeholder='seu@email.com'
                          onChange={e => handleEmailChange(e.target.value)}
                          defaultValue={email}
                          name='EMAIL'
                          className={`required email`}
                          id='mce-EMAIL'
                          required
                        />
                        <button
                          className='landing-input-ok'
                          onClick={e => handleClick(e, null)}
                        >
                          OK
                        </button>
                      </div>
                      <span
                        className='close-modal'
                        onClick={e => handleClick(e, null)}
                      >
                        x
                      </span>
                    </div>
                  </div>

                  <div className='landing-date input-wrapper peopleB'>
                    <button onClick={e => handleClick(e, "peopleB")}>
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
                        onClick={e => handleClick(e, null)}
                      ></div>
                      <div className='modal-landing'>
                        <input
                          onKeyDown={e => handleKeyDown(e)}
                          ref={refPeopleB}
                          type='text'
                          placeholder='Cônjuge B'
                          onMouseDown={e => handleKeyDown(e)}
                          name='PEOPLEB'
                          className=''
                          id='mce-PEOPLEB'
                          onChange={e => handlePeopleBChange(e.target.value)}
                        />
                        <button
                          className='landing-input-ok'
                          onClick={e => handleClick(e, null)}
                        >
                          OK
                        </button>
                      </div>
                      <span
                        className='close-modal'
                        onClick={e => handleClick(e, null)}
                      >
                        x
                      </span>
                    </div>
                  </div>

                  <div className='landing-date input-wrapper city'>
                    <button onClick={e => handleClick(e, "city")}>
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
                        onClick={e => handleClick(e, null)}
                      ></div>
                      <div className='modal-landing'>
                        <input
                          onKeyDown={e => handleKeyDown(e)}
                          ref={refCity}
                          type='text'
                          name='CITY'
                          placeholder='Cidade do Casamento'
                          className=''
                          id='mce-CITY'
                          onChange={e => handleCityChange(e.target.value)}
                        />
                        <button
                          className='landing-input-ok'
                          onClick={e => handleClick(e, null)}
                        >
                          OK
                        </button>
                      </div>
                      <span
                        className='close-modal'
                        onClick={e => handleClick(e, null)}
                      >
                        x
                      </span>
                    </div>
                  </div>
                </div>
                {honey ||
                (emailSuccess &&
                  dateSuccess &&
                  peopleASuccess &&
                  peopleBSuccess &&
                  citySuccess &&
                  peopleAWhatsSuccess) === false ? null : (
                  <>
                    <input
                      type='submit'
                      value={landingCTA}
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
                  </>
                )}

                <br />
                <br />
              </form>
            </>
          ) : !location.search.includes("success=0") ? (
            <>
              <div className='success-email-check'>
                <p>
                  Obrigada, <strong>{queries.peopleA}</strong> por confirmar as
                  informações do seu casamento com{" "}
                  <strong>{queries.peopleB}</strong>. O seu casamento será{" "}
                  <strong>{longDate}</strong>.
                </p>
                <p>
                  Faltam <strong>{months} meses</strong> ({diffDays} dias).
                </p>
              </div>
              <div className='halfdiv-choose-options'>
                <div className='row-me'>
                  <div className='halfdiv-btn'>
                    <GatsbyImage
                      image={pdf}
                      alt={"Algo aqui"}
                      width={80}
                      layout='contain'
                      placeholder={"NONE"}
                      className={`halfdiv-voucher`}
                    />
                    <p>
                      <strong>Clique aqui</strong> e baixe o seu catálogo.
                    </p>
                  </div>
                  <div className='halfdiv-btn'>
                    <GatsbyImage
                      image={voucher}
                      alt={"Algo aqui"}
                      width={80}
                      layout='contain'
                      placeholder={"NONE"}
                      className={`halfdiv-voucher`}
                    />
                    <p>
                      Você ganhou: 01 (um) VOUCHER de <strong>R$500,00</strong>
                    </p>
                  </div>
                </div>
                <div>
                  {queries ? (
                    <a
                      href={`https://web.whatsapp.com/send?phone=5516992452437&text=${encodeURI(
                        "🆘 ❤️ 🆘 ❤️ 🆘 ❤️ 🆘 ❤️ 🆘\n\n" +
                          "🥂Oi Pri!🥂 \n\nMeu nome é *" +
                          queries.peopleA +
                          "* 💍 e vou casar com *" +
                          queries.peopleB +
                          "* 💍 e a data: \n\n*" +
                          longDate.charAt(0).toUpperCase() +
                          longDate.slice(1) +
                          "* 🕑 (faltam " +
                          months +
                          " meses," +
                          diffDays +
                          " dias).\n\n" +
                          mensagem +
                          "\n\nComo faço para você ser a cerimonialista do meu casamento?\n" +
                          "Também preciso de ajuda com diversos fornecedores.\n\n" +
                          "😍 Você poderia me ajudar? 😍\n\n" +
                          "🆘 ❤️ 🆘 ❤️ 🆘 ❤️ 🆘 ❤️ 🆘"
                      )}`}
                      className='voucher-btn-whats'
                    >
                      {promoEnd
                        ? `Perdeu a Promoção? Clique aqui e receba um desconto de 5%`
                        : `Resgatar VOUCHER agora !`}
                    </a>
                  ) : null}

                  <p>Esse VOUCHER expira em:</p>
                  {!promoEnd ? (
                    <p className='countdown-promo'>
                      <span>
                        {!promoEnd ? countdown[0] : 0}
                        <br />
                        horas
                      </span>{" "}
                      <span>
                        {!promoEnd ? countdown[1] : 0}
                        <br />
                        min.
                      </span>{" "}
                      <span>
                        {!promoEnd ? countdown[2] : 0}
                        <br />
                        seg.
                      </span>
                    </p>
                  ) : (
                    <p className='countdown-promo countdown-final'>
                      Voucher <strong>EXPIRADO</strong>!
                    </p>
                  )}
                </div>
              </div>
            </>
          ) : (
            <>
              {queries ? (
                <>
                  <p>Cheque o seu e-mail: {queries.email}.</p>
                  <p>
                    Enviamos um e-mail de segurança para evitar robôs (SPAM) no
                    nosso sistema.
                  </p>
                  <p>
                    Procure o email da{" "}
                    <i>
                      <strong>pri</strong>@ascasamenteiras.com.br
                    </i>
                    .
                  </p>
                  <p>E clique no botão "Baixar Catálogo".</p>
                </>
              ) : (
                "Deu certo sem querie."
              )}
            </>
          )}
        </div>
      </main>
    </HalfDivWrapper>
  );
};

export default HalfDiv;
