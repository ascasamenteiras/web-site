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
          href='https://web.whatsapp.com/send?phone=5516992452437&text=Ol%C3%A1%2C%20Pri.%20Eu%20gostaria%20de%20falar%20sobre%20assessoria%20e%20cerimonial%20de%20casamento'
          rel='noopener noreferrer'
          target={"_blank"}
          className={"badge-whats desktop-only"}
          id='btn-whats-web'
        >
          Whats Btn
          {opt.badgesWhats}
        </a>
        <a
          href='https://api.whatsapp.com/send?phone=5516992452437&text=Ol%C3%A1%2C%20Pri.%20Eu%20gostaria%20de%20falar%20sobre%20assessoria%20e%20cerimonial%20de%20casamento'
          rel='noopener noreferrer'
          target={"_blank"}
          className={"badge-whats mobile-only"}
          id='btn-whats-api'
        >
          Whats Btn
          {opt.badgesWhats}
        </a>
      </div>
    </>
  );
};

export default BadgesButtonsBlock;
