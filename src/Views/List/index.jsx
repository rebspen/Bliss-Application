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
    //getting search from url
    let search = this.props.location.search
      .split("")
      .slice(1)
      .join("");
    if (parseInt(search)) {
      search = parseInt(search);
    }
    console.log("SEARRRRRRRCH mount", search);
    if (typeof search === "string"){
      this.setState({
        history: [...this.state.history, search]
      });
    }
    try {
      //checking health
      const health = await healthCheck();
      if (health.status === "OK") {
        //calling list
        const list = await listQuestions(
          this.state.offset,
          search
        );
        console.log("API RETURNS", list);
        //setting different state if it is single or list return
        if (!list.length) {
          this.setState({
            serverChecking: false,
            serverHealthy: true,
            multiple: false,
            single: true,
            questions: list,
            searchTerm: search
          });
        } else {
          this.setState({
            serverChecking: false,
            serverHealthy: true,
            questions: list,
            multiple: true,
            searchTerm: search,
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
    //keeping search history for back navigation from detail to list
    if (typeof id === "string"){
      this.setState({
        history: [...this.state.history, id]
      });
    }
    try {
      //questions api
      const list = await listQuestions(this.state.offset, id);
       //setting different state if it is single or list return
       console.log("list", list)
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
    //seperate function as we have to adjust offset to load the new questions
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
    //searchbar input used to call a new API search
    const searchTerm = "filter=" + data;
    this.updateSearch(searchTerm);
  }

  handleInputChange(event) {
    //email input updates
    this.setState({
      email: event.target.value
    });
  }

  return() {
    //navigate back to the previous search
    const index = this.state.history.length - 1;
    const search = this.state.history[index];
    this.updateSearch(search);
  }

  async share() {
    //share the url with a specific email
    try {
      const done = await shareScreen(this.state.email, this.state.offset, this.state.searchTerm);
      console.log(done);
    } catch (error) {
      console.log(error);
      console.log("Error in service.");
    }
  }

  handleRetry() {
    //retry connection to the server
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
    console.log("email", this.state.email);

    return (
      <div>
      {/* iteration 1 - checking the server health */}
        {this.state.serverChecking && <div className="loader"><h1>Checking Server Health</h1> <ReactLoading type={'bubbles'} color={'white'} height={300} width={300} /></div>}
        {!this.state.serverChecking && !this.state.serverHealthy && (
          <Retry handler={this.handleRetry} />
        )}
        {/* iteration 2 -loads list of Qs and prefils searchbar if URL had a filter=xxx inside */}
        {this.state.serverHealthy && this.state.multiple && this.state.questions && (
          <div>
            <Search searchTerm={this.state.searchTerm} search={this.search} />
            {/* iteration 4 - sharescreen functionallity that calls to API POST request*/}
            <div>
              <input
              className="seeBtn"
                type="text"
                placeholder="Email..."
                name="email"
                value={this.state.email}
                onChange={this.handleInputChange}
              />
              <button className="seeBtn" onClick={this.share}>Share search</button>
            </div>
            <SingleList data={questions} update={this.updateSearch} />
            {/* loads 10 more questions based on current offset*/}
            <button className="seeBtn" onClick={this.seeMore}>
              See more questions
            </button>
          </div>
        )}
         {/* if there are no more questions to show this will show*/}
        {this.state.serverHealthy && this.state.multiple && !this.state.questions && <div><h3>No more questions</h3> <button className= "seeBtn" onClick={this.return}>Go Back</button></div>}
         {/* iteration 3 - detail screen - navigate by a link in teh list or through the url /question?num */}
        {this.state.single && (
          <div>
            <Question data={questions} update={this.updateSearch} />
             {/* iteration 4 - share this questions url to a friend with the POST share screen API call*/}
            <div>
              <input
              className= "seeBtn"
                type="text"
                placeholder="Email..."
                name="email"
                value={this.state.email}
                onChange={this.handleInputChange}
              />
              <button className= "seeBtn" onClick={this.share}>Share Question</button>
              {/* go back to the main list and have the same filters applied as when you left - plain list if you had no filters */}
              {this.state.history && (
                <button className= "seeBtn" onClick={this.return}>Go Back to List</button>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default List;
