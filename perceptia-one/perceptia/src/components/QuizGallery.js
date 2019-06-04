import React, {Fragment} from 'react';
import {Grid, CircularProgress } from '@material-ui/core';

import { QuizInfo, SearchBar, SnackBar } from './';
import constants from './constants';

class QuizGallery extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      quizlist: [],
      currentQuiz: [],
      fetchInProgress:false,
      fetchStatus: "Starting...",
      fetchStep: 0,
      fetchTotalStep: 5,
      errorMessage: ""
    };
  }

  componentDidMount() {
    fetch(`${constants.api.url}/api/v1/anyquiz/list`)
      .then(response => response.json())
      .then(response => {
        let list = [];
        for (let i = 0; i < response.quizzes.length; i++) {
          list.push(response.quizzes[i].keyword);
        }

        return list;
      })
      .then(list => this.setState({
        quizlist: list,
        currentQuiz: list,
        loading: false,
      }));
  }

  fetchStatus(InProgress, quiz) {
    if (InProgress) {
      fetch(`${constants.api.url}/api/v1/anyquiz/status/` + quiz)
        .then(response => response.json())
        .then(response => this.setState({
          fetchStatus: response.status_string,
          fetchStep: parseInt(response.progress) + 1,
        }));
    }

  }

  handleFilterQuiz(quiz)
  {
    if (quiz === "") {
      this.setState({
        currentQuiz: this.state.quizlist
      });
    } else {
      let temp = this.state.quizlist.filter((curQuiz) => curQuiz.includes(quiz));

      this.setState({
        currentQuiz: temp
      });
    }
  }

  handleSearchQuiz(quiz) {
    this.setState(prevState => ({
      fetchInProgress: true,
      currentQuiz: [...prevState.quizlist],
    }));

    fetch(`${constants.api.url}/api/v1/anyquiz/read/` + quiz)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then(response => {
        this.setState(prevState => ({
          fetchInProgress: false,
          fetchStatus: "Complete...",
          fetchStep: 0,
          quizlist: [...prevState.quizlist, quiz],
          currentQuiz: [...prevState.quizlist, quiz]
        }));

      })
      .catch(error => this.setState({
        fetchInProgress: false,
        fetchStatus: "Error...",
        fetchStep: 0,
        errorMessage: error
      }));

    this.interval = setInterval(() => {
      this.fetchStatus(this.state.fetchInProgress, quiz);
    }, 5000);

  }

  render() {

    return <Fragment>
      <SearchBar onSearchQuiz={this.handleSearchQuiz.bind(this)} onFilterQuiz={this.handleFilterQuiz.bind(this)}/>
      {
        this.state.fetchInProgress &&
        <SnackBar
          variant="success"
          status={this.state.fetchStatus}
          fetchStep={this.state.fetchStep}
          fetchTotalStep={this.state.fetchTotalStep} />
      }
      <Grid container spacing={4}>
        {!this.state.loading ? this.state.currentQuiz.map(name => (
          <Grid container item key={name} sm={6} md={4} lg={3}>
            <QuizInfo quizName={name}/>
          </Grid>
        )):<div className={"Center-Align"}><CircularProgress/></div>}
      </Grid>
    </Fragment>;
  }
}

export default QuizGallery;
