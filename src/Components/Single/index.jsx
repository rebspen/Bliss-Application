import React from "react";
import { update as sendAnswer } from "../../Services/api";

function SingleList(props) {
  const data = props.data;

  console.log("HEREEEEEE", props)


  async function updateQuestion(id) {
    props.data.choices[id].votes += 1;
    const body = JSON.stringify(props.data);
    try {
      const done = await sendAnswer(props.data.id, body);
      console.log("done", done, id);
      props.update(data.id)
    } catch (error) {
      console.log(error);
      console.log("Error in service.");
    }
  }
  
  return (
    <div>
    <h1>Question Details</h1>
    <img src={data.image_url} />
    <p>ID: {data.id}</p>
    <h2>{data.question}</h2>
    <div>
    {data.choices.map((val, ind) => {
      return (
        <div>
        {" "}
        <p>{val.choice}</p>{" "}
        <button onClick={() => updateQuestion(ind)}>
        {" "}
        votes so far :{val.votes}
        </button>{" "}
        </div>
        );
      })}
      </div>
      <p>{data.published_at}</p>
      </div>
      );
    }
    
    export default SingleList;
