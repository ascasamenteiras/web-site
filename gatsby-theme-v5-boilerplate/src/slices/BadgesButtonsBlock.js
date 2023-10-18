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
  const msgEncoded = `Oi. 💖 Muito prazer! 🌼 Aqui é a Priscilla Barbosa 😄🌷 d'As Casamenteiras 😍😎.

  Que bom que nos encontrou! 😃 Estamos aqui 🌸 para tornar esse processo mais leve pra vocês! 😁 Somos uma empresa 🎉 de Assessoria e Cerimonial 😊💫, especializada em Casamentos 💒👰💍. Independentemente do formato (Mini Wedding 🏡💐, ao ar livre 🏞️🌤️, em chácaras 🏡🌿, salões 🏛️🌟, restaurantes 🍽️🥂, praias 🏖️🌊), vocês idealizam 😄 e nós tornamos tudo em realidade. 💫💪😃
  
  Estamos no universo 🌟 de casamentos há mais de 10 anos 😎💍. Recentemente fomos premiadas 🏆😍 na categoria de melhor empresa de cerimonial 🎉🌷 pelo Casamentos Awards 🏆😊 e Zankyou. 🌟👏
  
  Já foram mais de 80 casais subindo ao altar 💒👰🤵 junto com As Casamenteiras 🥂🌈💖. Será um prazer 😊💖 poder fazer parte da organização 💪💫 do seu casamento!
  
  Temos uma quedinha por casamentos fora do tradicional 😄🌈, autênticos e cheios de personalidade 😍💃. Vamos fazer um casamento lindo 😃💐 e inesquecível para vocês, seus convidados e familiares! 💍👰🤵🎉
  
  Nós temos uma lista de fornecedores 🌟💼 locais ativos, com mais de 1.000 (um mil) empresas parceiras 🤝💪 que prestam serviços especializados em casamentos 💖💼 para compartilhar com vocês.
  
  Dê uma stalkeada 😎👀 no nosso Instagram 📸💍 e acompanhe o nosso trabalho: 📸💕
  
  https://www.instagram.com/ascasamenteiras_
  
  Perguntas 😊🤝 para elaboração de proposta 🌷😍:
  
  Qual o nome do casal? 💑
  
  Qual a data do seu casamento? 🗓️
  
  Qual o local e cidade do casamento? 🏞️🌆
  
  Para quantos convidados será a festa de casamento? 💃👰🤵🎉
  
  Qual o budget estimado para o casamento? 💰
  
  Qual a principal dificuldade que você encontrou no processo de organização do casamento? 🤔
  
  Para o bom andamento do casamento e você ter tranquilidade 😄💒😌, você optaria pela Assessoria Completa de casamento 😃🌸🤩 ou Assessoria apenas para o dia 💼😌🌟 do casamento? Por quê?
  
  Onde você nos conheceu? 🌟🤝🔍
  
  Aguardo 😊📸 as suas respostas 😍💬 para darmos encaminhamento 🌟💖 para uma proposta 😊💌🌷 de casamento perfeito! 💍💒🌼🎉`;
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
