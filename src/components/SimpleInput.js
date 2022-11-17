import { useState} from "react";

const SimpleInput = (props) => {

  const[enteredName,setEnteredName] = useState('');
  //this state reflect that whether the user touch the name or not
  const [enteredNameTouched,setEnteredNameTouched] = useState(false);

  const enteredNameIsValid = enteredName.trim() !=='';
  const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;
  
  const nameInputChangeHandler = event =>{
    setEnteredName(event.target.value);
  };

  const nameInputBlurHandler = () =>{
    setEnteredNameTouched(true);
  };

  const formSubmissionHandler = event =>{
    //this to prevent the browser to send a http request to the server once the form is submitted
    event.preventDefault();

    setEnteredNameTouched(true);

    if (!enteredNameIsValid){
      return;
    }

    console.log(enteredName);

    //nameInputRef.current.value = "" => this is not ideal and dont manipulate the DOM
    setEnteredName('');
    setEnteredNameTouched(false);
  };




// change the css by assign a new class to it when error exist 
const nameInputClasses = nameInputIsInvalid 
  ? 'form-control invalid' 
  : 'form-control';

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor='name'>Your Name</label>
        <input 
          type='text' 
          id='name' 
          onChange={nameInputChangeHandler}
          onBlur={nameInputBlurHandler}
          value={enteredName}
        />
        {nameInputIsInvalid && (<p className="error-text">Name must no be empty.</p>)}
      </div>
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
