import React from "react";
import { Link } from "react-router-dom";

function Question(props) {
  const questions = props.data
  console.log("right here", props)
  return (
    <div>
      {questions.map(val => {
        return (
          <div>
            <img src={val.thumb_url} />
            <p>
              {val.id}. {val.question}
            </p>
            <button onClick={() => props.update(val.id)}>
              <Link to={`/questions?${val.id}`}>See details</Link>
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default Question;
