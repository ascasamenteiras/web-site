import React, { useState, useEffect, useRef } from "react";
import fetch from "cross-fetch";
import { useSiteMetadatas } from "../tools/useSiteMetadatas";

import { navigate } from "gatsby";
import { GatsbyImage, getImage, getSrc } from "gatsby-plugin-image";
import moment from "moment";
import "moment/locale/pt-br";
import VMasker from "vanilla-masker";
// import addToMailchimp from "gatsby-plugin-mailchimp";
import HalfDivWrapper from "@Slices/HalfDivWrapper";
import Cookies from "universal-cookie";

require("moment-precise-range-plugin");

function validateEmail(email) {
  if (email.slice(-1) === ".") {
    return false;
  }
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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
      const reW =
        /(\([0-9]{2}\)\s?[0-9]{4,5}-?[0-9]{3,4})|([0-9]{10,11})|([0-9]{2}\s?[0-9]{8,9})/gm;
      return input.match(reW) ? true : false;
    }
  }
}
function toISOString(string, callback) {
  try {
    if (new Date(string) == "Invalid Date") {
      callback("1900-01-01T00:00:00.000Z");
    } else {
      callback(new Date(string).toISOString());
    }
  } catch (err) {
    callback("1900-01-01T00:00:00.000Z");
  }
}
const HalfDiv = ({ pageContext, location }) => {
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
  const [success, setSuccess] = useState(null);

  const [countdown, setCountdown] = useState([12, 60, 60]);
  const [promoEnd, setPromoEnd] = useState(false);

  const [loadingForm, setLoadingForm] = useState(null);

  const mensagem = promoEnd
    ? "Quero 🛍5% de desconto🛍"
    : "Quero o 🎫 Voucher 🎫 de 🛍R$500 (quinhentos reais)🛍";

  // useRef
  const refDate = useRef();
  const refEmail = useRef();
  const refPeopleA = useRef();
  const refWhatsPeopleA = useRef();
  const refPeopleB = useRef();
  const refCity = useRef();

  // PageContext
  const {
    title,
    questions,
    featuredImage,
    landingCTA,
    emailCTA,
    content,
    excerpt,
  } = pageContext;

  // handle Images
  const {
    imgHolder,
    bgPatternImg,
    boilerplateLogoSmall,
    bandeiraWhats,
    bandeiraQuestion,
    dateImageButton,
    floralCimaImg,
    floralMeioImg,
    florBaixoImg,
    marcaImg,
    voucherImg,
    pdfImg,
    schemasJSON,
  } = useSiteMetadatas();

  const badgeWhats = getImage(bandeiraWhats.childrenImageSharp[0]);
  const badgeQuestion = getImage(bandeiraQuestion.childrenImageSharp[0]);
  const defaultQuestions = ["site.siteMetadata.questions:opiriri"];

  const bgPatternSrc = getSrc(bgPatternImg.childrenImageSharp[0]);
  const logoQuery = getImage(boilerplateLogoSmall.childrenImageSharp[0]);
  const floralCima = getImage(floralCimaImg.childrenImageSharp[0]);
  const floralMeio = getImage(floralMeioImg.childrenImageSharp[0]);
  const florBaixo = getImage(florBaixoImg.childrenImageSharp[0]);
  const marca = getImage(marcaImg.childrenImageSharp[0]);
  const voucher = getImage(voucherImg.childrenImageSharp[0]);
  const pdf = getImage(pdfImg.childrenImageSharp[0]);

  const mainImage = getImage(featuredImage.childrenImageSharp[0]);
  const dateImage = getImage(dateImageButton.childrenImageSharp[0]);

  let urlParams = null;
  let longDate = null;
  let diffDays = null;
  let months = null;
  let condEndPromo = null;

  const cookies = new Cookies();

  const hasSuccessCookies =
    cookies.get("successValue") ||
    cookies.set("successValue", null, {
      path: "/",
    });

  const cookiesValues =
    cookies.get("submitedValues") && hasSuccessCookies
      ? cookies.get("submitedValues")
      : cookies.set("submitedValues", null, {
          path: "/",
        });

  const sentMCCookies =
    cookies.get("cookiesSentMC") ||
    cookies.set("cookiesSentMC", null, {
      path: "/",
    });

  console.log("cookiesValues ");
  console.log(cookiesValues);
  console.log("hasSuccessCookies");
  console.log(hasSuccessCookies);
  console.log("sentMCCookies");
  console.log(sentMCCookies);

  // const addToMC = async x =>
  //   await addToMailchimp(x.EMAIL, {
  //     EMAIL: x.EMAIL,
  //     PEOPLEA: x.PEOPLEA,
  //     PEOPLEB: x.PEOPLEB,
  //     PHONE: x.PHONE,
  //     DATE1: x.DATE1,
  //     CITY: x.CITY,
  //   }).then(({ msg, result }) => {
  //     if (result === "error") {
  //       cookies.remove("cookiesSentMC");
  //       cookies.set("cookiesSentMC", false);
  //       return console.log(`Error message: ${msg}`);
  //     } else {
  //       console.log("result");
  //       console.log(result);
  //       console.log("msg");
  //       console.log(msg);
  //       cookies.remove("cookiesSentMC");
  //       cookies.set("cookiesSentMC", true);
  //     }
  //   });

  let queries = [];
  const urlQueries = decodeURI(location?.search).slice(1).split("&");
  urlQueries.map((e, i) => {
    const splitE = e.split("=");
    queries[splitE[0]] = splitE[1];
  });
  const whatsMSG = (peopleA, peopleB, longDate, months, diffDays, mensagem) =>
    encodeURI(
      "🆘 ❤️ 🆘 ❤️ 🆘 ❤️ 🆘 ❤️ 🆘\n\n" +
        "🥂Oi Pri!🥂 \n\nMeu nome é *" +
        peopleA +
        "* 💍 e vou casar com *" +
        peopleB +
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
    );
  const promoEndMSG = promoEnd
    ? `Perdeu a Promoção? Clique aqui e receba um desconto de 5%`
    : `Resgatar VOUCHER agora !`;
  const successUrl = location?.search?.includes("success=1");

  if (location?.search?.includes("success=1") && !condEndPromo) {
    urlParams = new Proxy(new URLSearchParams(location?.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    });
    const dateNow = urlParams.fullDate.split("/");
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

    longDate = casalDate.toLocaleString("pt-BR", options1);

    const diffTime = Math.abs(casalDate - now);
    diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const diffResult = Math.round((casalDate - now) / (1000 * 60 * 60 * 24));
    months = Math.floor(diffResult / 30);
    const yt = !sentMCCookies && successUrl;
    const oo =
      queries.fullDate.split("/")[2] +
      "-" +
      queries.fullDate.split("/")[1] +
      "-" +
      queries.fullDate.split("/")[0] +
      "T00:00:00.001Z";
    console.log({
      EMAIL: queries.emailPeopleA,
      PEOPLEA: queries.peopleA,
      PEOPLEB: queries.peopleB,
      PHONE: queries.whatsPeopleA,
      DATE1: oo,
      CITY: queries.city,
    });
    if (yt) {
      console.log("adding it to MC");
      // addToMC({
      //   EMAIL: queries.emailPeopleA,
      //   PEOPLEA: queries.peopleA,
      //   PEOPLEB: queries.peopleB,
      //   PHONE: queries.whatsPeopleA,
      //   DATE1: oo,
      //   CITY: queries.city,
      // });
    } else {
      console.log("cookies detected, not sent");
    }

    // vou gravar um obj disso e fazer
    //  ?: success=1
    //  &: fullDate=${date}
    //  &: peopleA=${peopleA}
    //  &: whatsPeopleA=${peopleAWhats}
    //  &: emailPeopleA=${email}
    //  &: peopleB=${peopleB}
    //  &: city=${city}
    //  &: confirmDate=${new Date()}`
  }
  console.log("process.env.GATSBY_URL");
  console.log(process.env.GATSBY_URL);
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
      !location?.search?.includes("success=1") &&
      !location?.search?.includes("success=0")
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
    if (location?.search?.includes("success=1") && !promoEnd) {
      setSuccess(true);
      let promoDate = new Date(urlParams.confirmDate);
      promoDate.setHours(promoDate.getHours() + 12);
      const nowDate = new Date();
      condEndPromo = moment(nowDate) > moment(promoDate);
      if (condEndPromo) {
        setPromoEnd(true);
        handleCountDown([0, 0, 0]);
      } else {
        const diffMoment = moment.preciseDiff(nowDate, promoDate, true);
        // look for cookie, if not, try record
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

  // halfdiv working begin
  const regex = /\/(\w{2})\//;
  const locationUrl = location?.pathname?.match(regex);
  const logoLocationUrl = locationUrl ? locationUrl[1] : "";

  const i =
    logoLocationUrl && logoLocationUrl !== undefined && logoLocationUrl !== ""
      ? locationUrl[1]
      : "pt-BR";
  const y = schemasJSON.nodes.filter(sch =>
    sch.schema[0].card[0].cardLocale.includes(i)
  );
  const card = y[0].schema[0].card[0];
  const brandPromoEmail = card.brandPromoEmail;
  const siteUrlf = card.brandUrl;

  const handleSubmit = async event => {
    event.preventDefault();
    setLoadingForm(false);

    const myForm = event.target;
    const formData = new FormData(myForm);
    let landingUrl = myForm["landingUrl"].value;
    const botFieldPrevent = myForm["searchUrl"].value !== "" || false;
    const landingSlashCheck = landingUrl.slice(-1) === "/" || false;

    if (!formData) {
      return console.log({
        message: "No body was sent. Try a POST request or query",
      });
    }
    if (myForm["botField"].value !== "") {
      console.log("bot field detectado");
      return console.log(myForm["botField"].value);
    }
    if (botFieldPrevent) {
      return console.log({ message: "Você não deveria estar aqui!" });
    }

    if (landingSlashCheck) {
      landingUrl = landingUrl.slice(0, -1);
    }

    const fullUrl = encodeURI(
      `${
        siteUrlf + landingUrl
      }?success=1&fullDate=${date}&peopleA=${peopleA}&whatsPeopleA=${peopleAWhats}&emailPeopleA=${email}&peopleB=${peopleB}&city=${city}&confirmDate=${new Date()}`
    );

    const payload = {
      from: brandPromoEmail,
      to: email,
      subject: `${peopleA}, confirme o seu e-mail - As Casamenteiras - Todo Amor Importa!`,
      parameters: {
        PROSPECT_NAME: peopleA,
        LANDING_URL: fullUrl,
      },
    };
    cookies.remove("submitedValues");
    cookies.remove("successValue");

    cookies.set("submitedValues", fullUrl, {
      path: "/",
    });
    cookies.set("successValue", false, {
      path: "/",
    });
    //call to the Netlify Function you created
    await fetch(`${process.env.GATSBY_URL}/.netlify/functions/emails/maio`, {
      method: "POST",
      headers: {
        "netlify-emails-secret": process.env.GATSBY_NETLIFY_EMAILS_SECRET,
      },
      body: JSON.stringify(payload),
    })
      .then(res => {
        if (res.status >= 400) {
          throw new Error("Bad response from server");
        }
        setLoadingForm(true);
        cookies.set("successValue", true, {
          path: "/",
        });

        return navigate(`?success=0&email=${email}`);
      })
      .catch(err => {
        console.error(err);
      });

    console.log("newww cookiesValues ");
    console.log(cookiesValues);
    console.log("newww hasSuccessCookies");
    console.log(hasSuccessCookies);
  };

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
          "https://ascasamenteiras.com.br" +
          featuredImage.childrenImageSharp[0].gatsbyImageData.images.fallback
            .src,
        cardImage:
          featuredImage.childrenImageSharp[0].gatsbyImageData.images.fallback
            .src,
        articleBody: content,
        mainLogo: imgHolder,
        description: excerpt,
        serverUrl: location?.origin || "https://ascasamenteiras.com.br" || "/",
        articleUrl: location?.href,
        social: "site.siteMetadata.social.twitter",
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
        <div className={successUrl ? "hidden" : "main-image"}>
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
        <div
          className={
            !location?.search?.includes("success=0")
              ? "main-content"
              : "main-content success"
          }
        >
          <GatsbyImage
            image={logoQuery}
            alt={"Logotipo d'As Casamenteiras"}
            width={300}
            height={230}
            placeholder={"NONE"}
            critical='true'
            className={"logo-half-div"}
          />
          {loadingForm === false && !location?.search?.includes("success")
            ? "CARREGANDO RESPOSTA ..."
            : null}
          {success !== true &&
          !location?.search?.includes("success=0") &&
          !loadingForm ? (
            <>
              <div
                className='full-width'
                dangerouslySetInnerHTML={{ __html: content }}
              ></div>
              <form
                onSubmit={handleSubmit}
                method='POST'
                id='ac-subscribe-landing-form'
                name='ac-subscribe-landing-form'
                className='validate'
                data-netlify='true'
                netlify-honeypot='botField'
                // target='_blank'
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
                    <input
                      type='hidden'
                      name='form-name'
                      value='ac-subscribe-landing-form'
                    />
                    <input
                      name='landingUrl'
                      defaultValue={location?.pathname}
                    />
                    <input name='searchUrl' defaultValue={location?.search} />
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
                      defaultValue={"https://ascasamenteiras.com.br"}
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
                          onChange={e => handleDateChange(e.target.value)}
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
                      id='ac-subscribe'
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
          ) : location?.search?.includes("success=1") ? (
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
                    <a
                      href='https://ascasamenteiras.com.br/docs/catalogo-PriBarb-As-Casamenteiras-2023-24.pdf'
                      download
                    >
                      <GatsbyImage
                        image={pdf}
                        alt={"Algo aqui"}
                        width={80}
                        layout='contain'
                        placeholder={"NONE"}
                        className={`halfdiv-voucher`}
                      />
                    </a>
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
                    <>
                      <a
                        href={`https://web.whatsapp.com/send?phone=5516992452437&text=${whatsMSG(
                          queries.peopleA,
                          queries.peopleB,
                          longDate,
                          months,
                          diffDays,
                          mensagem
                        )}`}
                        className='voucher-btn-whats desktop-only'
                      >
                        {promoEndMSG}
                      </a>
                      <a
                        href={`https://api.whatsapp.com/send?phone=5516992452437&text=${whatsMSG(
                          queries.peopleA,
                          queries.peopleB,
                          longDate,
                          months,
                          diffDays,
                          mensagem
                        )}`}
                        className='voucher-btn-whats mobile-only'
                      >
                        {promoEndMSG}
                      </a>
                    </>
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
                  <p>
                    Cheque o seu e-mail: <strong>{queries.email}</strong>.
                  </p>
                  <p>
                    Enviamos um e-mail de segurança para evitar robôs (
                    <em>SPAM</em>) no nosso sistema.
                  </p>
                  <p>
                    Procure o email da{" "}
                    <i>
                      <strong>cerimonial@ascasamenteiras.com.br</strong>
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
