import React, { useState } from "react";

const functionURL = ""; // replace this with your function URL

const ContactForm = () => {
  const [state, setState] = useState({
    buttonDisabled: true,
    message: { fromEmail: "", subject: "", body: "" },
    submitting: false,
    error: null,
  });

  const onClick = async event => {
    event.preventDefault();
    setState({ ...state, submitting: true });
    const { fromEmail, subject, body } = state.message;

    const response = await fetch(functionURL, {
      method: "post",
      headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
      body: new URLSearchParams({ fromEmail, subject, body }).toString(),
    });
    if (response.status === 200) {
      setState({
        ...state,
        error: null,
        submitting: false,
        message: {
          fromEmail: "",
          subject: "",
          body: "",
        },
      });
    } else {
      const json = await response.json();
      setState({
        ...state,
        error: json.error,
        submitting: false,
      });
    }
  };

  const onChange = event => {
    const name = event.target.getAttribute("name");
    setState({
      ...state,
      message: { ...state.message, [name]: event.target.value },
    });
  };
  return (
    <>
      <div>{state.error}</div>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "500px",
        }}
        method='post'
        action={functionURL}
      >
        <label htmlFor='fromEmail'>Your email address:</label>
        <input
          type='email'
          name='fromEmail'
          id='fromEmail'
          value={state.message.fromEmail}
          onChange={onChange}
        ></input>
        <label htmlFor='subject'>Subject:</label>
        <input
          type='text'
          name='subject'
          id='subject'
          value={state.message.subject}
          onChange={onChange}
        />
        <label htmlFor='body'>Message:</label>
        <textarea
          style={{
            height: "125px",
          }}
          name='body'
          id='body'
          value={state.message.body}
          onChange={onChange}
        />
        <button
          style={{
            marginTop: "7px",
          }}
          type='submit'
          disabled={state.submitting}
          onClick={onClick}
        >
          Send message
        </button>
      </form>
    </>
  );
};

export default ContactForm;
