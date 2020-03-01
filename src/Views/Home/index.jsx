import React, { Component } from "react";
import { Link } from "react-router-dom";
import { health as healthCheck } from "../../Services/api";
import { list as listQuestions } from "../../Services/api";
import { share as shareScreen } from "../../Services/api";
import Question from "../../Components/Single";
import Search from "../../Components/Search";

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
      email: ""
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.share = this.share.bind(this);
    this.updateSearch = this.updateSearch.bind(this);
    this.search = this.search.bind(this);
  }

  async componentDidMount() {
    let search = this.props.location.search
      .split("")
      .slice(1)
      .join("");
    if (parseInt(search)) {
      search = parseInt(search);
    }
    console.log("SEARRRRRRRCH", search);
    this.setState({
      searchTerm: search
    });
    try {
      const health = await healthCheck();
      if (health.status === "OK") {
        const list = await listQuestions(this.state.searchTerm);
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
            single: false
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
    const search = id;
    console.log("apples", search);
    this.setState({
      searchTerm: search
    });
    try {
      const list = await listQuestions(search);
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
          single: false
        });
      }
      console.log("got the new questions");
    } catch (error) {
      console.log(error);
      console.log("Error in service.");
    }
  }

  search(data) {
    this.setState({
      searchTerm: data
    });
    const searchTerm = "filter=" + data;
    this.updateSearch(searchTerm);
  }

  handleInputChange(event) {
    this.setState({
      email: event.target.value
    });
  }

  async share() {
    try {
      const done = await shareScreen(this.state.searchTerm, this.state.email);
      console.log(done, this.state.searchTerm, this.state.email);
    } catch (error) {
      console.log(error);
      console.log("Error in service.");
    }
  }

  render() {
    const questions = this.state.questions;
    console.log("questions", questions);
    console.log("single?", this.state.single);
    console.log("search", this.state.searchterm);
    return (
      <div>
        {this.state.serverChecking && <h3>Checking Server Health</h3>}
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
          </div>
        )}
        {this.state.single && (
          <div>
            <Question data={questions} />
            <div>
              <input
                type="text"
                placeholder="Email..."
                name="email"
                onChange={this.handleInputChange}
              />
              <button onClick={this.share}>Share Question</button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Home;
