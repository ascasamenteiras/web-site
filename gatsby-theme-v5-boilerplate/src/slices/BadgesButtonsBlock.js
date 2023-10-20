import React, { useState } from "react";
const BadgesButtonsBlock = ({ opt, questions }) => {
  const [questionState, setQuestionState] = useState(false);
  const [choosedQuestionState, setChoosedQuestionState] = useState(0);
  console.log("questions");
  console.log(questions);
  function handleQuestionBadgeClick(e) {
    e.preventDefault();
    setQuestionState(!questionState);
  }
  function handleQuestionLinkClick(e) {
    e.preventDefault();
    setChoosedQuestionState(e.target.id);
  }
  let questionsArray = [];
  questions.forEach(q => {
    questionsArray.push(q.split(":"));
  });
  const choosenQuestion = questionsArray[choosedQuestionState][0];
  const choosenAnswer = questionsArray[choosedQuestionState][1];
  const questionElement = choosenQuestion ? (
    <div className='chat-question'>{choosenQuestion}</div>
  ) : (
    ""
  );
  const questionAnswer = choosenAnswer ? (
    <p className='chat-answer'>{choosenAnswer}</p>
  ) : (
    ""
  );
  const msgEncoded = `Oi, Pri 💖 Muito prazer! 🌼 Aqui é a [SEU NOME] 😄🌷.
  Eu gostaria de sua ajuda com o meu casamento. Vou te mandar nossas informações.

  Nome do casal 💑
  
  Data do casamento 🗓️
  
  Local e cidade do casamento 🏞️🌆
  
  Número estimado de convidados 💃👰🤵🎉
  
  O valor (em reais) estimado do orçamento/budget para o casamento inteiro é de... 💰
  
  Minha principal dificuldade que você encontrei no processo de organização do meu casamento foi... 🤔
  
  Eu prefiro a [**Assessoria Completa** 😃🌸🤩] ou [**Assessoria apenas para o dia** 💼😌🌟] do casamento. Porque...
  
  Nós achamos o perfil d'As Casamenteiras [no Google, Instagram, Casamentos.com]  🌟🤝🔍
  
  Aguardo 😊📸 a sua resposta 😍💬 para darmos encaminhamento 🌟💖 para a minha proposta 😊💌🌷 de casamento perfeito! 💍💒🌼🎉`;
  return (
    <>
      <div
        className={`chat-questions-wrapper badgeClass question-hide-${questionState} question-move-${questionState}`}
      >
        <div className='question-box-wrapper'>
          {questionsArray.map((question, indx) => {
            return (
              <button
                className='chat-question'
                key={indx}
                id={indx}
                onClick={event => handleQuestionLinkClick(event)}
              >
                {question[0]}
              </button>
            );
          })}
        </div>
        <div className='chat-box-wrapper'>
          {questionElement || null}
          {questionAnswer || null}
        </div>
      </div>

      <div className={`AskMeWrapper badgeClass question-move-${questionState}`}>
        <div
          href='#'
          rel='noopener noreferrer'
          target={"_blank"}
          className={"desktop-only"}
          onClick={e => handleQuestionBadgeClick(e)}
        >
          {opt.badgesQuestion}
        </div>
        <div
          href='#'
          rel='noopener noreferrer'
          target={"_blank"}
          className={"mobile-only"}
          onClick={e => handleQuestionBadgeClick(e)}
        >
          {opt.badgesQuestion}
        </div>
      </div>

      <div className={`whatsMeWrapper badgeClass whats-move-${questionState}`}>
        <a
          href={
            "https://web.whatsapp.com/send?phone=5516992452437&text=" +
            encodeURI(msgEncoded)
          }
          rel='noopener noreferrer'
          target={"_blank"}
          className={"badge-whats desktop-only"}
        >
          {opt.badgesWhats}
        </a>
        <a
          href={
            "https://api.whatsapp.com/send?phone=5516992452437&text=" +
            encodeURI(msgEncoded)
          }
          rel='noopener noreferrer'
          target={"_blank"}
          className={"badge-whats mobile-only"}
        >
          {opt.badgesWhats}
        </a>
      </div>
    </>
  );
};

export default BadgesButtonsBlock;
