import React, { Component } from "react";
import { Link } from "react-router-dom";
import { health as healthCheck } from "../../Services/api";
import { list as listQuestions } from "../../Services/api";
import { share as shareScreen } from "../../Services/api";
import Question from "../../Components/Single";
import Search from "../../Components/Search";
import Retry from "../../Components/Retry";


class Home extends Component {
  constructor() {
    super();
    this.state = {
      serverChecking: true,
      serverHealthy: false,
      questions: [],
      question: [],
      searchTerm: "",
      multiple: true,
      single: false,
      email: "",
      offset: 0,
      history: [],
      practice: false
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.share = this.share.bind(this);
    this.updateSearch = this.updateSearch.bind(this);
    this.search = this.search.bind(this);
    this.return = this.return.bind(this);
    this.handleRetry = this.handleRetry.bind(this);
  }

  async componentDidMount() {
    console.log("props", this.props.location.search )
    let search = this.props.location.search
      .split("")
      .slice(1)
      .join("");
    if (parseInt(search)) {
      search = parseInt(search);
    }
    console.log("SEARRRRRRRCH", search);
    this.setState({
      searchTerm: search,
      history: [...this.state.history, search]
    });
    try {
      const health = await healthCheck();
      if (health.status === "OK") {
        const list = await listQuestions(
          this.state.offset,
          this.state.searchTerm
        );
        console.log("API RETURNS", list);
        if (!list.length) {
          this.setState({
            serverChecking: false,
            serverHealthy: true,
            multiple: false,
            single: true,
            questions: list
          });
        } else {
          this.setState({
            serverChecking: false,
            serverHealthy: true,
            questions: list,
            multiple: true,
            single: false,
            offset: (this.state.offset += 10)
          });
        }
      } else {
        this.setState({
          serverChecking: false
        });
      }
    } catch (error) {
      console.log(error);
      console.log("Error in service.");
    }
  }

  async updateSearch(id) {
    console.log("fired")
    const search = id;
    this.setState({
      searchTerm: search,
      history: [...this.state.history, search]
    });
    try {
      const list = await listQuestions(this.state.offset, search);
      if (!list.length) {
        this.setState({
          multiple: false,
          single: true,
          questions: list
        });
      } else {
        this.setState({
          questions: list,
          multiple: true,
          single: false,
          offset: (this.state.offset += 10)
        });
      }
      console.log("got the new questions");
    } catch (error) {
      console.log(error);
      console.log("Error in service.");
    }
  }

  search(data) {
    const searchTerm = "filter=" + data;
    this.updateSearch(searchTerm);
  }

  handleInputChange(event) {
    this.setState({
      email: event.target.value
    });
  }

  return() {
    const index = this.state.history.length - 2;
    const search = this.state.history[index];
    this.updateSearch(search);
  }

  async share() {
    try {
      const done = await shareScreen(this.state.searchTerm, this.state.email);
    } catch (error) {
      console.log(error);
      console.log("Error in service.");
    }
  }

  handleRetry(){
    this.setState({
      serverChecking: false,
      serverHealthy: true,
    })
    this.updateSearch(this.state.searchTerm);
  }

  render() {
    const questions = this.state.questions;
    console.log("HISTORY", this.state.history);
    console.log("Search", this.state.searchTerm);
    console.log("Practice", this.state.practice);

    return (
      <div>
      <Retry handler = {this.handleRetry}/>
        {this.state.serverChecking && <h3>Checking Server Health</h3>}
        {!this.state.serverChecking && !this.state.serverHealthy && <Retry handler = {this.handleRetry}/>}
        {this.state.serverHealthy && this.state.multiple && (
          <div>
            <Search search={this.search} />
            <div>
              <input
                type="text"
                placeholder="Email..."
                name="email"
                onChange={this.handleInputChange}
              />
              <button onClick={this.share}>Share search</button>
            </div>

            {questions.map(val => {
              return (
                <div>
                  <img src={val.thumb_url} />
                  <p>
                    {val.id}. {val.question}
                  </p>
                  <button onClick={() => this.updateSearch(val.id)}>
                    <Link to={`/questions?${val.id}`}>See details</Link>
                  </button>
                </div>
              );
            })}

            <button onClick={() => this.updateSearch(this.state.search)}>
              See more questions
            </button>
          </div>
        )}
        {this.state.single && (
          <div>
            <Question data={questions} update={this.updateSearch}/>
            <div>
              <input
                type="text"
                placeholder="Email..."
                name="email"
                onChange={this.handleInputChange}
              />
              <button onClick={this.share}>Share Question</button>
              {this.state.history[1] && (
                <button onClick={this.return}>Go Back</button>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Home;
