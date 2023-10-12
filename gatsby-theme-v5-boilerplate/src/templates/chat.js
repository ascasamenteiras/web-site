import React, { useState, useEffect } from "react";
// import fetch from "cross-fetch";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
// import { Link, navigate } from "gatsby";

import moment from "moment";
import "moment/locale/pt-br";
// import { ClerkProvider } from "@clerk/clerk-react";

// import {
//   SignIn,
//   SignedIn,
//   SignedOut,
//   UserButton,
//   useUser,
// } from "gatsby-plugin-clerk";
// import { SignedIn, SignedOut, useAuth, useClerk } from "@clerk/clerk-react";
// import { ptBR } from "@clerk/localizations";

import { Row } from "@Components/InsertRow";
import MainTemplateWrapper from "@Slices/MainTemplateWrapper";
import { useSiteMetadatas } from "../tools/useSiteMetadatas";

import OpenAI from "openai";
const _ = require("lodash");

console.log("process.env.GATSBY_OPENAI_API_KEY");
console.log(process.env.GATSBY_OPENAI_API_KEY);
// delete configuration.baseOptions.headers["User-Agent"];
const openai = new OpenAI({
  apiKey: process.env.GATSBY_OPENAI_API_KEY, // defaults to process.env["OPENAI_API_KEY"]
  dangerouslyAllowBrowser: true,
});

// const openai = new OpenAI(configuration);

const userInfos = {
  finalCountDown: "2024-06-03",
  name: "Bianca & Pedro",
  couple: {
    a: "Bianca",
    b: "Pedro",
  },
  phone: 16992452437,
  email: "casal@ascasamenteiras.com.br",
  sameAs: {
    instagram: "@casal",
  },
  title: "Casamento de Bianca e Pedro",
  local: "Chácara Oranice",
  localDetails:
    "Avenida Ticiano Mazetto , 635. Chácaras Rio Pardo , Ribeirão Preto, São Paulo, Brasil",
  scheduleTime: "15:30",
  limitGuests: 90,
  eventResponsible: {
    name: "Priscilla Barbosa Oliveira dos Santos",
    phone: 16992452437,
    email: "cerimonial@ascasamenteiras.com.br",
  },
};

const userMetas = [
  {
    slug: "comprar-aliancas",
    planned: 1,
    executed: 1,
  },
  {
    slug: "comprar-vestido-da-noiva",
    planned: 1,
    executed: 0,
  },
  {
    slug: "contratar-buffet",
    planned: 1,
    executed: 1,
  },
];
const Chat = ({ pageContext, location }) => {
  const [answer, setAnswer] = useState(["Oi, como posso ajudar?"]);
  const [userQuestions, setUserQuestions] = useState([
    "Oi, Prix, vamos iniciar?",
  ]);
  const [textInput, setTextInput] = useState("");
  const [chating, setChating] = useState(false);
  const [person, setPerson] = useState(0);
  const [userPrompt, setUserPrompt] = useState([]);

  const handleChating = async param => {
    if (!chating && !userInfos) {
      return null;
    }
    return setChating(param);
  };
  console.log(pageContext);
  // const { isSignedIn, user, isLoaded } = useUser();
  // console.log("user");
  // console.log(user);
  // TODO: Profile btn with useClerk
  // TODO: user img default state plus useeffect change to user clerk img
  // TODO: Handle profile btn: Clerk.redirectToSignUp()
  // TODO: pass user chat
  // TODO: Create user panel page

  // console.log("isSignedIn");
  // console.log(isSignedIn);
  // console.log("user");
  // console.log(user);
  // console.log(user?.profileImageUrl);
  // console.log("isLoaded");
  // console.log(isLoaded);
  let totalGoal = 0;

  const {
    schemasJSON,
    brandImages,
    bandeiraWhats,
    bandeiraQuestion,
    markLogo,
  } = useSiteMetadatas();
  const clerk_pub_key = process.env.GATSBY_CLERK_PUBLISHABLE_KEY;

  // const SignInButton = () => {
  //   const { openSignIn } = useClerk();
  //   const appearance = {
  //     variables: {
  //       colorPrimary: "#639",
  //     },
  //   };

  //   return (
  //     <button
  //       className='sign-in-btn'
  //       onClick={() =>
  //         openSignIn({
  //           appearance,
  //         })
  //       }
  //     >
  //       Sign In
  //     </button>
  //   );
  // };

  function changeAnswer(arr) {
    return setAnswer(answer.concat(arr));
  }

  function handleTextInput(txt) {
    return setTextInput(txt);
  }

  function handleTextChange(e, txt) {
    if (e) {
      e.preventDefault();
    }
    return setTextInput(txt);
  }

  function handleUserQuestions(q) {
    return setUserQuestions(
      Array.isArray(userQuestions) ? [...userQuestions, q] : [q]
    );
  }

  function handleUserPrompt(p) {
    return setUserPrompt(
      userPrompt?.length > 0 && Array.isArray(userPrompt)
        ? userPrompt.push(p)
        : [p]
    );
  }

  const badgeWhats = getImage(bandeiraWhats.childrenImageSharp[0]);
  const badgeQuestion = getImage(bandeiraQuestion.childrenImageSharp[0]);

  const regex = /\/(\w{2})\//;
  const locationUrl = location.pathname.match(regex);
  const logoLocationUrl = locationUrl ? locationUrl[1] : "";

  const flags = [];
  Object.entries(pageContext.helperI18n).forEach(transl => {
    flags.push({
      i18n: transl[1].split(":")[0],
      slug: transl[1].split(":")[1],
    });
  });
  const { questions } = pageContext.SEO;
  const pattern = brandImages?.nodes?.filter(
    brandImgs => brandImgs.relativePath === "PATTERN-bg.png"
  );

  const bgPattern = pattern
    ? pattern[0]?.childImageSharp?.gatsbyImageData?.images?.fallback?.src
    : null;

  const imgMarkLogo = getImage(markLogo.nodes[0]);

  const AnswerDiv = ({ profileImg, txt }) => (
    <Row
      opt={{
        classes: "answer",
        numColumns: 1,
        widthColumns: "0.1fr 1fr",
      }}
    >
      <div className='answer-img'>{profileImg}</div>
      <div className='answer-txt'>{txt}</div>
    </Row>
  );

  const PromptDiv = ({ profileImg, txt }) => (
    <Row
      opt={{
        classes: "prompt",
        numColumns: 1,
        widthColumns: "1fr 0.1fr",
      }}
    >
      <div className='prompt-img'>{profileImg}</div>
      <div className='prompt-txt'>{txt}</div>
    </Row>
  );

  const globalSubs = schemasJSON?.pagesHelper?.globals;
  const year = 2023; // give year here
  const monthIndex = 6; // give month index

  const x = moment().add(1, "weeks").format("DD");
  const y = moment().add(1, "weeks").format("dddd");
  /*console.log(x);
  console.log(y);*/

  const getWeekNumbers = (year, month) => {
    let firstWeek = moment(new Date(year, month, 1)).isoWeek();
    let lastWeek = moment(new Date(year, month + 1, 0)).isoWeek();

    let out = [firstWeek];
    if (firstWeek === 52 || firstWeek === 53) {
      firstWeek = 0;
    }

    for (let i = firstWeek + 1; i <= lastWeek; i++) {
      out.push(i);
    }
    return out;
  };

  function getMomentDate(start, end) {
    return {
      startDate: moment([moment().year(), monthIndex - 1, start]),
      endDate: moment([moment().year(), monthIndex - 1, end]),
    };
  }

  function weeks(month) {
    const weekStartEndDay = [];
    const first = month.day() === 0 ? 6 : month.day();
    let day = 7 - first;
    const last = month.daysInMonth();
    const count = (last - day) / 7;

    weekStartEndDay.push(getMomentDate(1, day));
    for (let i = 0; i < count; i++) {
      weekStartEndDay.push(getMomentDate(day + 1, Math.min((day += 7), last)));
    }
    return weekStartEndDay;
  }

  // const month = moment([year, monthIndex - 1]);
  const weekNumbers = (y, m) => getWeekNumbers(y, m - 1);
  const weekList = weeks(moment([year, monthIndex - 1]));

  for (let index = 0; index < weekList.length; index++) {
    // console.log(index + 1);
  }
  // const weekLenght = weekNumbers(moment().year(), moment().month() + 1).length;

  const currDay = moment(new Date());
  const eventDt = moment(userInfos.finalCountDown);

  const diff = moment.duration(eventDt.diff(currDay));
  // const diffM = diff.months();
  // const diffW = diff.weeks();
  // const diffD = diff.days() % 7;
  /*console.log(
    diff.months() +
      " months, " +
      diff.weeks() +
      " weeks, " +
      (diff.days() % 7) +
      " days."
  );

  console.log(
    Math.floor(diff.asWeeks()) + " weeks, " + (diff.days() % 7) + " days."
  );
  console.log("userPrompt");
  console.log(userQuestions);*/

  const handleSubmit = async event => {
    event.preventDefault();
    handleChating(true);
    handleUserPrompt(event.target[0].value);
    handleUserQuestions(event.target[0].value);
    handleTextInput("");
    const response = await openai.chat.completions
      .create({
        model: "gpt-3.5-turbo",
        stop: ['"""'],
        stream: false,
        temperature: 0.5,
        max_tokens: 400,
        top_p: 0.4,
        frequency_penalty: 0.1,
        presence_penalty: 0.1,
        messages: [
          {
            role: "system",
            content:
              "Você é uma Assessora de Casamentos, chamada Prix e trabalha para a empresa As Casamenteiras. Você e a empresa tem a missão de assessoras todas as configurações de casais, sem distinção nenhuma, à organizarem o casamento deles. Você é sempre muito educada e conversa sempre com uma noiva, ou noivo. Você sempre está conversando sobre casamentos e responde sobre o casamento do casal em específico. Você é interessada em ajudar a resolver tarefas sobre o evento do casal. Há diversas tarefas para serem feitas, eis as categorias gerais das tarefas: Alianças, Acessórios da Cerimônia, Cerimonial, Celebrantes, Beleza & Moda do Casamento, Locais & Decor, Alimentação, Festa, Papelaria de Casamento, Convidados, Recordações e Lembrancinhas, Diversos, Serviços de Entretenimento e Lua de Mel.Sempre chame os casais pelo nome do usuário.",
          },
          {
            role: "system",
            content: `Quando alguém agradecer, seja educada e na resposta acrescente algo como 'de nada'.`,
          },
          {
            role: "system",
            content: `Esse é um objeto JSON.stringify contendo as informações do casal: ${JSON.stringify(
              pageContext
            )}`,
          },
          {
            role: "system",
            content: `O usuário é sempre parte de um casal que está noivo, a conta está sendo usada pelo cônjuge: ${pageContext.partnerA}. O nome do outro cônjugê: ${pageContext.partnerB}. De vez enquando, nas respostas, use os nomes dos casais, isso os faz sentir felizes.`,
          },
          {
            role: "system",
            content: `Você só responde em português do Brasil. Você segue o horário padrão de Brasília. A data atual é: ${new Date()}. Não responda temas aleatórios. Não responda perguntas que não são diretamente sobre casamento. Esses são os únicos assuntos permitidos abordar na As Casamenteiras: Alianças, Acessórios da Cerimônia, Cerimonial, Celebrantes, Beleza & Moda do Casamento, Locais & Decor, Alimentação, Festa, Papelaria de Casamento, Convidados, Recordações e Lembrancinhas, Diversos, Serviços de Entretenimento e Lua de Mel. Você nunca deve tentar supôr ou advinhar o nome do usuário. Ele sempre irá se identificar a cada pergunta. Existe um desenho de mascote de você Prix. A descrição é que você é jovem negra, com piercing, aparelho auditivo, macacão cor bege e camisa laranja, assim como é o laranja da As Casamenteiras. É proibido responder qualquer tipo de linguagem de programação e dar respostas contendo códigos. Nem mesmo quando o código parecer algo relacionado a casamentos. Nunca me gere nenhum código de computador e linguagem de programação, mesmo que o usuário peça.`,
          },
          {
            role: "system",
            content: `Se perguntarem qual a diferença entre a data atual de hoje e a data do casamento, você deve responder seguindo as seguintes orientações: Faltam ${diff.months()} meses; Faltam ${diff.weeks()} semanas; Faltam ${
              diff.days() % 7
            } dias.`,
          },
          {
            role: "system",
            content: `FYK: A pergunta anterior que o usuário fez foi: ${userQuestions.at(
              -2
            )}.`,
          },
          {
            role: "user",
            content: `O meu nome é ${
              person === 0 ? pageContext.partnerA : pageContext.partnerB
            }.`,
          },
          {
            role: "user",
            content: `${event.target[0].value}`,
          },
        ],
      })
      .catch(err => {
        if (err instanceof OpenAI.APIError) {
          console.log(err.status); // 400
          console.log(err.name); // BadRequestError

          console.log(err.headers); // {server: 'nginx', ...}
        } else {
          throw err;
        }
      });
    console.log(response);
    changeAnswer([response?.choices[0]?.message?.content || null]);

    return handleChating(false);
  };

  // const formattedData = pageContext.tasks.map((obj, i) => ({
  //   ...obj,
  //   userData: userMetas[i],
  // }));

  function bMath(mts) {
    const pta = [];
    mts.forEach(function (e) {
      pta.push(e.frontmatter.importance);
    });
    const rdc = (acc, curr) => acc + curr;
    const pt = pta.reduce(rdc);

    function xs(p, r, m, pt) {
      return ((p / pt) * 100 * r) / m;
    }
    const tA = [];
    mts.forEach(function (e) {
      tA.push(
        xs(
          e.frontmatter.importance,
          e.userData.executed,
          e.userData.planned,
          pt
        )
      );
    });

    const t = tA.reduce(rdc);
    // setTotalGoal(t);
    totalGoal = t;
    /* console.log("");
    console.log("aquii t = ");
    console.log(t);
    console.log("tA = ");
    console.log(tA);
    console.log("");*/
    // document.getElementById("tt").innerHTML = t;
    // document.getElementById("tts").innerHTML = tA.toString();
  }
  // bMath(formattedData);
  useEffect(() => {
    if (chating && userInfos) {
      handleChating(true);
    }
    // if (isLoaded || isSignedIn) {
    /*console.log("user.emailAddresses[0].emailAddress:::");
      console.log(user.emailAddresses[0].emailAddress);
      console.log("user::::");
      console.log(user);*/
    // const fetchData = async () =>
    //   await fetch(`/api/hello`, {
    //     method: "GET",
    //   }).then(resp => {
    //     console.log("resp isss:");
    //     console.log(resp);
    //   });
    // const jsonData = async () => await fetchData?.json();
    // console.log(jsonData);
    // }
  }, [chating]);
  // if (!isLoaded || !isSignedIn) {
  //   const isBrowser = typeof window !== "undefined";
  //   return isBrowser ? navigate("/") : null;
  // }
  // console.log("ptBRptBRptBRptBR");
  // console.log(ptBR);

  return (
    <MainTemplateWrapper
      logo={"darkLogo.publicURL"}
      backgroundImage={{
        src: bgPattern,
      }}
      opt={{
        titleSeo: `As Casamenteiras`,
        pageQuestions: questions,
        classes: "chat-page",
        schemaType: "blog",
        hasHeader: false,
        topology: "index",
        blogListing: "posts?.slice(0, 9)",
        articleUrl: "props.location.href",
        mainLogo: "imgHolder",
        cardImage: "cardImage ? getSrc(cardImage.childrenImageSharp[0]) : null",
        serverUrl: "props.location.href",
        isDarkLogo: false,
        badgesWhats: (
          <GatsbyImage
            image={badgeWhats}
            alt={"Botão do Whats"}
            placeholder={"NONE"}
            critical='true'
            className={"whatsMe"}
            width={70}
            height={70}
            id='btn-whats-api'
          />
        ),
        badgesQuestion: (
          <GatsbyImage
            image={badgeQuestion}
            alt={"Botão de Perguntas Frequentes"}
            placeholder={"NONE"}
            critical='true'
            className={"whatsMe"}
            width={70}
            height={70}
          />
        ),
        globalSubs: globalSubs,
        flags: flags,
        urlLocale: logoLocationUrl,
      }}
    >
      <main className='main-container main-chat-container'>
        <Row
          opt={{
            classes: "inner-container-chat-one-column",
            isBoxed: true,
            numColumns: 1,
            bgColor: "#fff",
          }}
        >
          <div className='top-chat wrapper-chat'>
            <div className='user-input'>
              <div className='user-bubble'>
                {/* <ClerkProvider
                  localization={ptBR}
                  publishableKey={clerk_pub_key}
                  navigate={to => navigate(to)}
                  appearance={{
                    variables: {
                      colorPrimary: "#ff5626",
                    },
                    layout: {
                      showOptionalFields: true,
                    },
                  }}
                >
                  <SignedIn>
                    <UserButton />
                  </SignedIn>
                </ClerkProvider> */}
              </div>
              <form onSubmit={handleSubmit}>
                <input
                  autoFocus
                  type='text'
                  className='text-input'
                  value={textInput}
                  disabled={chating ? true : false}
                  onChange={e => handleTextChange(e, e.target.value)}
                />
                <div className='wrapper-btn-input'>
                  <button
                    type='submit'
                    className='btn-input'
                    disabled={chating ? true : false}
                  >
                    Prix<span>IA</span>
                  </button>
                </div>
              </form>
            </div>
            <div className='goals-wrapper'>
              {/* {formattedData.map((goal, idx) => {
                const o = 1 + idx;
                return (
                  <p key={o}>
                    <input
                      type='checkbox'
                      name={_.kebabCase(goal.frontmatter.title)}
                      value='goal.frontmatter.title'
                      checked={goal.userData.executed === 0 ? false : true}
                      readOnly
                    ></input>
                    <span>{goal.frontmatter.title}</span>
                  </p>
                );
              })} */}
            </div>
          </div>
          <div className='wrapper-chat'>
            <div className='answer-wrapper'>
              {answer?.map((a, i) => {
                if (a === "") {
                  return null;
                }
                const s = i;
                return (
                  <React.Fragment key={s}>
                    <PromptDiv
                      profileImg={
                        <GatsbyImage
                          image={imgMarkLogo}
                          className='pumpikin-logo'
                          alt={"Prix"}
                          placeholder={"NONE"}
                          critical='true'
                          width={70}
                        />
                      }
                      txt={userQuestions[s]}
                    />
                    <AnswerDiv
                      profileImg={
                        <GatsbyImage
                          image={imgMarkLogo}
                          className='pumpikin-logo'
                          alt={"Prix"}
                          placeholder={"NONE"}
                          critical='true'
                          width={70}
                        />
                      }
                      txt={a}
                    />
                  </React.Fragment>
                );
              })}
              {/*               
              <AnswerDiv
                profileImg={
                  <GatsbyImage
                    image={imgMarkLogo}
                    className='pumpikin-logo'
                    alt={"Prix"}
                    placeholder={"NONE"}
                    critical='true'
                    width={70}
                  />
                }
                txt={
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident sed voluptas maxime aliquid, corporis beatae pariatur. Nisi ea porro molestiae incidunt esse, aut alias voluptas, vel enim sint amet nobis?"
                }
              />
              <AnswerDiv
                profileImg={
                  <GatsbyImage
                    image={imgMarkLogo}
                    className='pumpikin-logo'
                    alt={"Prix"}
                    placeholder={"NONE"}
                    critical='true'
                    width={70}
                  />
                }
                txt={
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident sed voluptas maxime aliquid, corporis beatae pariatur. Nisi ea porro molestiae incidunt esse, aut alias voluptas, vel enim sint amet nobis?"
                }
              />
              <AnswerDiv
                profileImg={
                  <GatsbyImage
                    image={imgMarkLogo}
                    className='pumpikin-logo'
                    alt={"Prix"}
                    placeholder={"NONE"}
                    critical='true'
                    width={70}
                  />
                }
                txt={
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident sed voluptas maxime aliquid, corporis beatae pariatur. Nisi ea porro molestiae incidunt esse, aut alias voluptas, vel enim sint amet nobis?"
                }
              />
              <AnswerDiv
                profileImg={
                  <GatsbyImage
                    image={imgMarkLogo}
                    className='pumpikin-logo'
                    alt={"Prix"}
                    placeholder={"NONE"}
                    critical='true'
                    width={70}
                  />
                }
                txt={
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident sed voluptas maxime aliquid, corporis beatae pariatur. Nisi ea porro molestiae incidunt esse, aut alias voluptas, vel enim sint amet nobis?"
                }
              />
              <AnswerDiv
                profileImg={
                  <GatsbyImage
                    image={imgMarkLogo}
                    className='pumpikin-logo'
                    alt={"Prix"}
                    placeholder={"NONE"}
                    critical='true'
                    width={70}
                  />
                }
                txt={
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident sed voluptas maxime aliquid, corporis beatae pariatur. Nisi ea porro molestiae incidunt esse, aut alias voluptas, vel enim sint amet nobis?"
                }
              />
              <AnswerDiv
                profileImg={
                  <GatsbyImage
                    image={imgMarkLogo}
                    className='pumpikin-logo'
                    alt={"Prix"}
                    placeholder={"NONE"}
                    critical='true'
                    width={70}
                  />
                }
                txt={
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident sed voluptas maxime aliquid, corporis beatae pariatur. Nisi ea porro molestiae incidunt esse, aut alias voluptas, vel enim sint amet nobis?"
                }
              /> */}
            </div>
          </div>
          <div className='bottom-chat'>Powered by: As Casamenteiras</div>
        </Row>
      </main>
    </MainTemplateWrapper>
  );
};
export default Chat;
