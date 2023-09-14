//front end
import { useRef , useState} from "react";

function HomePage() {

  const [feedbackItems, setFeedbackItems] = useState([]);
  const emailInputRef = useRef ();
  const feedbackInputRef = useRef();

  function submitFormHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredFeedback = feedbackInputRef.current.value;

    const reqBody = {email: enteredEmail, text: enteredFeedback}

    fetch('/api/feedback', { //targeting a feedback file by starting (/) 
    method: 'POST', //confirguring the request by setting the method to POST
    body: JSON.stringify(reqBody), // the data that should be appended to thenrequest
    headers: {
      'Content-Type': 'application/json'
    },
    })
    .then((response) => response.json())
    .then ((data) => console.log(data));
}

  function loadFeedbackHandler() {
    fetch('/api/feedback')
    .then((response) => response.json())
    .then ((data) => {
      setFeedbackItems(data.feedback)
    });
  }
  
  return (
    <div>
      <h1>The Home Page</h1>
      <form onSubmit={submitFormHandler}>
        <div>
          <label htmlFor="email">Email Adress</label>
          <input type="email" id="email" ref={emailInputRef}/>
        </div>
        <div>
          <label htmlFor="feedback">Your Feedback</label>
          <textarea id="feedback" rows="5" ref={feedbackInputRef}></textarea>
        </div>
        <button>Send feedback</button>
      </form>
      <hr />
      <button onClick={loadFeedbackHandler}>Load Feedback</button>
      <ul>
        {feedbackItems.map(item => (
        <li key={item.id}>
          {item.text}</li>
          ))}
      </ul>
    </div>
  );
}

export default HomePage;