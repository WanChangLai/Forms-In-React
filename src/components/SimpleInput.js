import {useState,useRef} from "react";

const SimpleInput = (props) => {

  const nameInputRef = useRef();
  const[enteredName,setEnteredName] = useState('');
  const [enteredNameIsValid,setEnteredNameIsValid] = useState(true);

  const nameInputChangeHandler = event =>{
    setEnteredName(event.target.value )
  };

  const formSubmissionHandler = event =>{
    //this to prevent the browser to send a http request to the server once the form is submitted
    event.preventDefault();

    if (enteredName.trim() === ""){
      setEnteredNameIsValid(false);
      return;
    }

    setEnteredNameIsValid(true);
    console.log(enteredName);
    const enteredValue = nameInputRef.current.value;

    console.log(enteredValue);

    //nameInputRef.current.value = "" => this is not ideal and dont manipulate the DOM
    setEnteredName('');
  };

// change the css by assign a new class to it when error exist 
const nameInputClasses = enteredNameIsValid ? 'form-control' : 'form-control invalid';

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor='name'>Your Name</label>
        <input ref={nameInputRef} type='text' id='name' onChange={nameInputChangeHandler} value={enteredName}/>
        {!enteredNameIsValid && <p className="error-text">Name must no be empty.</p>}
      </div>
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
