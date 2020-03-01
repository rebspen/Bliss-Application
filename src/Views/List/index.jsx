import React, { Component } from "react";
import { Link } from "react-router-dom";
import { health as healthCheck } from "../../Services/api";
import { list as listQuestions } from "../../Services/api";
import { share as shareScreen } from "../../Services/api";
import Question from "../../Components/Single";
import Search from "../../Components/Search";
import Retry from "../../Components/Retry";
import SingleList from "../../Components/SingleList";
import ReactLoading from 'react-loading';
import "./style.css"

class List extends Component {
  constructor() {
    super();
    this.state = {
      serverChecking: true,
      serverHealthy: false,
      questions: [],
      searchTerm: "",
      multiple: true,
      single: false,
      email: "",
      offset: 0,
      history: [],
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.share = this.share.bind(this);
    this.updateSearch = this.updateSearch.bind(this);
    this.search = this.search.bind(this);
    this.return = this.return.bind(this);
    this.handleRetry = this.handleRetry.bind(this);
    this.seeMore = this.seeMore.bind(this);
  }

  async componentDidMount() {
    let search = this.props.location.search
      .split("")
      .slice(1)
      .join("");
    if (parseInt(search)) {
      search = parseInt(search);
    }
    console.log("SEARRRRRRRCH mount", search);
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
    if (typeof id === "string"){
      this.setState({
        history: [...this.state.history, id]
      });
    }
    try {
      const list = await listQuestions(this.state.offset, id);
      if (!list.length) {
        this.setState({
          multiple: false,
          single: true,
          questions: list,
          searchTerm: id
        });
      } else {
        this.setState({
          questions: list,
          multiple: true,
          single: false,
          searchTerm: id
        });
      }
      console.log("got the new questions");
    } catch (error) {
      console.log(error);
      console.log("Error in service.");
    }
  }

  async seeMore() {
    try {
      const list = await listQuestions(this.state.offset, this.state.searchTerm);
      if(list.length!== 0){
        this.setState({
          questions: list,
          offset: (this.state.offset += 10)
        });
        console.log("got the next questions");
      } else {
        this.setState({
          questions: "",
          offset : this.state.offset -= 10
        });
      }
      }
      catch (error) {
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
      console.log(done);
    } catch (error) {
      console.log(error);
      console.log("Error in service.");
    }
  }

  handleRetry() {
    this.setState({
      serverChecking: false,
      serverHealthy: true
    });
    this.updateSearch(this.state.searchTerm);
  }

  render() {
    const questions = this.state.questions;
    console.log("HISTORY", this.state.history);
    console.log("Searchterm", this.state.searchTerm);

    return (
      <div>
        {this.state.serverChecking && <div className="loader"><h1>Checking Server Health</h1> <ReactLoading type={'bubbles'} color={'white'} height={300} width={300} /></div>}
        {this.state.serverHealthy && this.state.multiple && !this.state.questions && <div><h3>No more questions</h3> <button className= "seeBtn" onClick={this.return}>Go Back</button></div>}
        {!this.state.serverChecking && !this.state.serverHealthy && (
          <Retry handler={this.handleRetry} />
        )}
        {this.state.serverHealthy && this.state.multiple && this.state.questions && (
          <div>
            <Search search={this.search} />
            <div>
              <input
              className="seeBtn"
                type="text"
                placeholder="Email..."
                name="email"
                onChange={this.handleInputChange}
              />
              <button className="seeBtn" onClick={this.share}>Share search</button>
            </div>
            <SingleList data={questions} update={this.updateSearch} />
            <button className="seeBtn" onClick={this.seeMore}>
              See more questions
            </button>
          </div>
        )}
        {this.state.single && (
          <div>
            <Question data={questions} update={this.updateSearch} />
            <div>
              <input
              className= "seeBtn"
                type="text"
                placeholder="Email..."
                name="email"
                onChange={this.handleInputChange}
              />
              <button className= "seeBtn" onClick={this.share}>Share Question</button>
              {this.state.history[1] && (
                <button className= "seeBtn" onClick={this.return}>Go Back</button>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default List;
