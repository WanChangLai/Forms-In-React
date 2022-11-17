import {useState,useRef} from "react";

const SimpleInput = (props) => {

  const nameInputRef = useRef();
  const[enteredName,setEnteredName] = useState('');

  const nameInputChangeHandler = event =>{
    setEnteredName(event.target.value )
  };

  const formSubmissionHandler = event =>{
    //this to prevent the browser to send a http request to the server once the form is submitted
    event.preventDefault();

    console.log(enteredName);
    const enteredValue = nameInputRef.current.value;

    console.log(enteredValue);

    //nameInputRef.current.value = "" => this is not ideal and dont manipulate the DOM
    setEnteredName('');
  };

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className='form-control'>
        <label htmlFor='name'>Your Name</label>
        <input ref={nameInputRef} type='text' id='name' onChange={nameInputChangeHandler} value={enteredName}/>
      </div>
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
