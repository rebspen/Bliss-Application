import React from "react";
import { update as sendAnswer } from "../../Services/api";
import "./style.css";

function SingleList(props) {
  const data = props.data;

  async function updateQuestion(id) {
    props.data.choices[id].votes += 1;
    const body = JSON.stringify(props.data);
    try {
      const done = await sendAnswer(props.data.id, body);
      console.log("done", done);
     props.update(data.id);
    } catch (error) {
      console.log(error);
      console.log("Error in service.");
    }
  }

  return (
    <div className ="single">
      <h1>{data.id}. {data.question}</h1>
      <img src={data.image_url} alt=""/>
      <div>
        {data.choices.map((val, ind) => {
          return (
            <div>
              {" "}
              <p>{val.choice}</p>{" "}
              {/* iteration 3 - vote on a question answer and send it via PATCH API call */}
              <button onClick={() => updateQuestion(ind)}>
                {" "}
                votes so far : {val.votes}
              </button>{" "}
            </div>
          );
        })}
      </div>
      <p><small>Published at{data.published_at}</small></p>
    </div>
  );
}

export default SingleList;
