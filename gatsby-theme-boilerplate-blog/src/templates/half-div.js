import React, { useState, useEffect, useRef } from "react";
import { GatsbyImage, getImage, getSrc } from "gatsby-plugin-image";

import VMasker from "vanilla-masker";

// import addToMailchimp from "gatsby-plugin-mailchimp";

// import sgMail from "@sendgrid/mail";

import HalfDivWrapper from "@BlockBuilder/HalfDivWrapper";
import { useSiteMetadatas } from "../tools/useSiteMetadatas";

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
  const [city, setCity] = useState("");
  const [citySuccess, setCitySuccess] = useState(false);

  const [peopleAWhats, setPeopleAWhats] = useState("");
  const [peopleAWhatsSuccess, setPeopleAWhatsSuccess] = useState("");

  const [honey, setHoney] = useState("");
  const [msg, setMsg] = useState("");
  const [success, setSuccess] = useState("");

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
  const subscribeText = landingCTA;

  console.log("pageContext");
  console.log(pageContext);
  console.log(location);

  console.log(site);

  let urlParams = null;

  if (location.search.includes("success=1")) {
    urlParams = new Proxy(new URLSearchParams(location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    });
    // Get the value of "some_key" in eg "https://example.com/?some_key=some_value"
    console.log(encodeURI(urlParams.fullDate));
    console.log(encodeURI(urlParams.peopleA));
    console.log(encodeURI(urlParams.whatsPeopleA));
    console.log(encodeURI(urlParams.emailPeopleA));
    console.log(encodeURI(urlParams.peopleB));
    console.log(encodeURI(urlParams.city));
  }

  // handle States

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

  // handle submit form

  const handleSubmit = async (e, email, honey) => {
    e.preventDefault();
    // sgMail.setApiKey(process.env.GATSBY_SENDGRID_API_KEY);
    const msg = {
      to: "miltonbolonha@gmail.com",
      from: "pri@ascasamenteiras.com.br",
      subject: "Sending with SendGrid is Fun",
      text: "and easy to do anywhere, even with Node.js",
      html: "<strong>and easy to do anywhere, even with Node.js</strong>",
    };
    // sgMail
    //   .send(msg)
    //   .then(() => {
    //     console.log("Email sent");
    //   })
    //   .catch(error => {
    //     console.error(error);
    //   });

    //   const fromEmail = 'cerimonial@ascasamenteiras.com.br'
    //   const subject = 'titulo'
    //   const body = 'message'

    //  const response = await fetch('http://localhost:8000/api/teste', {
    //    method: "post",
    //    headers: {
    //      "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    //    },
    //    body: new URLSearchParams({ fromEmail, subject, body }).toString(),
    //  })
    //  if (response.status === 200) {
    //    this.setState({
    //      error: null,
    //      submitting: false,
    //      message: {
    //        fromEmail: "",
    //        subject: "",
    //        body: "",
    //      },
    //    })
    //  } else {
    //    const json = await response.json()
    //    this.setState({
    //      error: json.error,
    //      submitting: false,
    //    })
    //  }
  };
  const handleKeyDown = event => {
    if (event.key === "Enter" || event.key === "Escape") {
      handleClick(event, null);
    }
  };
  useEffect(() => {
    VMasker(document.querySelector('input[name="PHONE"')).maskPattern(
      "(99) 99999-9999"
    );
    VMasker(document.querySelector('input[name="FULLDATE"')).maskPattern(
      "99/99/9999"
    );
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
    btnClick === "email";
    if (btnClick === "peopleB") {
      refPeopleB.current.focus();
    }
    if (btnClick === "city") {
      refCity.current.focus();
    }
    if (location.search.includes("success=1")) {
      setSuccess("success");
    }
  }, [btnClick]);

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
              <div
                className='full-width'
                dangerouslySetInnerHTML={{ __html: content }}
              ></div>
              <form
                action={"/api/sendtest"}
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
                      value={subscribeText}
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
          ) : (
            <>
              <h1>{location.search}</h1>
            </>
          )}
        </div>
      </main>
    </HalfDivWrapper>
  );
};

export default HalfDiv;
