import {useState} from "react";

import useInput from "../hooks/use-input";

const SimpleInput = (props) => {

  const { 
    value:enteredName, 
    isValid:enteredNameIsValid,
    hasError:nameInputHasError, 
    valueChangeHandler:nameChangedHandler,
    inputBlurHandler:nameBlurHandler,
    reset:resetNameInput
  } =  useInput(value => value.trim()!=='');

  const[enteredEmail,setEnteredEmail] = useState('');
  //this state reflect that whether the user touch the name or not
  const [enteredEmailTouched,setEnteredEmailTouched] = useState(false);

  const enteredEmailIsValid = enteredEmail.includes('@');
  const emailInputIsInValid = !enteredEmailIsValid && enteredEmailTouched;


  let formIsValid = false;

  if(enteredNameIsValid && enteredEmailIsValid){
    formIsValid = true;
  }

  const emailInputChangeHandler = event =>{
    setEnteredEmail(event.target.value);
  }

  const emailInputBlurHandler = () =>{
    setEnteredEmailTouched(true);
  };


  const formSubmissionHandler = event =>{
    //this to prevent the browser to send a http request to the server once the form is submitted
    event.preventDefault();

    

    if (!enteredNameIsValid){
      return;
    }

    console.log(enteredName);
    console.log(enteredEmail);

    //nameInputRef.current.value = "" => this is not ideal and dont manipulate the DOM
    resetNameInput();
    setEnteredEmail('');
    setEnteredEmailTouched(false);
  };


// change the css by assign a new class to it when error exist 
const nameInputClasses = nameInputHasError 
  ? 'form-control invalid' 
  : 'form-control';

const emailInputClasses = emailInputIsInValid
  ? 'form-control invalid' 
  : 'form-control'; 

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor='name'>Your Name</label>
        <input 
          type='text' 
          id='name' 
          onChange={nameChangedHandler}
          onBlur={nameBlurHandler}
          value={enteredName}
        />
        {nameInputHasError && (<p className="error-text">Name must no be empty.</p>)}
      </div>
      <div className={emailInputClasses}>
        <label htmlFor="email">Your Email</label>
        <input 
          type='email' 
          id='email'
          onChange={emailInputChangeHandler}
          onBlur={emailInputBlurHandler}
          value={enteredEmail}
        />
        {emailInputIsInValid && (<p className="error-text">Please enter a valid email.</p>)}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
