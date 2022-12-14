import React, { useState } from "react";
import { GatsbyImage, getImage, getSrc } from "gatsby-plugin-image";

import addToMailchimp from "gatsby-plugin-mailchimp";

import HalfDivWrapper from "@BlockBuilder/HalfDivWrapper";
import { useSiteMetadatas } from "../tools/useSiteMetadatas";

const HalfDiv = ({ location, pageContext }) => {
  const [btnClick, setBtnClick] = useState(null);
  // btnClick.wich === "email"
  const [email, setEmail] = useState("");
  const [emailFocus, setEmailFocus] = useState("");
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

  const handleEmailChange = emailTyping => {
    if (emailTyping.includes("@")) {
      if (emailTyping.lenght >= 8) {
        return setEmail(emailTyping);
      }
    }
    return null;
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

                <div className='grid-me-please'>
                  <div className='landing-date input-wrapper'>
                    <GatsbyImage
                      image={dateImage}
                      alt={"Algo aqui"}
                      width={60}
                      height={60}
                      layout='contain'
                      placeholder={"NONE"}
                      className={"image-button"}
                    />

                    <label htmlFor='mce-DATE1-day'>
                      Data do
                      <br />
                      Casamento
                    </label>
                    <div className='hidden'>
                      <input
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
                      />
                    </div>
                  </div>

                  <div className='landing-date input-wrapper'>
                    <GatsbyImage
                      image={dateImage}
                      alt={"Algo aqui"}
                      width={60}
                      height={60}
                      layout='contain'
                      placeholder={"NONE"}
                      className={"image-button"}
                    />
                    <label htmlFor='mce-PEOPLEA'>
                      Nome
                      <br />
                      Cônjuge A
                    </label>
                    <div className='hidden'>
                      <input
                        type='text'
                        name='PEOPLEA'
                        className=''
                        id='mce-PEOPLEA'
                      />
                    </div>
                  </div>

                  <div className='landing-date input-wrapper'>
                    <GatsbyImage
                      image={dateImage}
                      alt={"Algo aqui"}
                      width={60}
                      height={60}
                      layout='contain'
                      placeholder={"NONE"}
                      className={"image-button success-color"}
                    />
                    <label htmlFor='mce-PHONE'>
                      Whatsapp
                      <br />
                      Cônjuge A
                    </label>
                    <div className='hidden'>
                      <input
                        type='text'
                        name='PHONE'
                        className=''
                        id='mce-PHONE'
                      />
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
                        className={"image-button error-color"}
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
                          className='required email'
                          id='mce-EMAIL'
                          required
                        />
                      </div>
                      <span
                        className='close-modal'
                        onClick={e => handleClick(null)}
                      >
                        x
                      </span>
                    </div>
                  </div>

                  <div className='landing-date input-wrapper'>
                    <GatsbyImage
                      image={dateImage}
                      alt={"Algo aqui"}
                      width={60}
                      height={60}
                      layout='contain'
                      placeholder={"NONE"}
                      className={"image-button"}
                    />
                    <label htmlFor='mce-PEOPLEB'>
                      Nome
                      <br />
                      Cônjuge B
                    </label>
                    <div className='hidden'>
                      <input
                        type='text'
                        name='PEOPLEB'
                        className=''
                        id='mce-PEOPLEB'
                      />
                    </div>
                  </div>

                  <div className='landing-date input-wrapper'>
                    <GatsbyImage
                      image={dateImage}
                      alt={"Algo aqui"}
                      width={60}
                      height={60}
                      layout='contain'
                      placeholder={"NONE"}
                      className={"image-button"}
                    />
                    <label htmlFor='mce-CITY'>Cidade</label>
                    <div className='hidden'>
                      <input
                        type='text'
                        name='CITY'
                        className=''
                        id='mce-CITY'
                      />
                    </div>
                  </div>
                </div>

                <input
                  type='submit'
                  value='Inscreva-se'
                  name='subscribe'
                  id='mc-embedded-subscribe'
                  className='button submit-button'
                  disabled={email ? false : true}
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
