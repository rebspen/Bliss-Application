import React from "react";
import { Link } from "react-router-dom";
import "./style.css"

function Question(props) {
  const questions = props.data
  return (
    <div className="mainList">
      {questions.map(val => {
        return (
          <div className="list">
            <img src={val.thumb_url} />
            <div className="beside">
            <p>
              {val.id}. {val.question}
            </p>
            <button onClick={() => props.update(val.id)}>
              <Link className="link" to={`/questions?${val.id}`}>See details</Link>
            </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Question;
