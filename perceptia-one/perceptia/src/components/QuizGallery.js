import React, {Fragment} from 'react';
import {Grid, CircularProgress} from '@material-ui/core';
import {SearchBar, SnackBar, QuizInfo} from './';
import constants from './constants';

class QuizGallery extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      quizlist: [],
      currentQuiz: [],
      fetchInProgress:false,
      closeFetchSnackBar:false,
      fetchStatus: "Starting...",
      errorMessage: ""
    };
  }

  componentDidMount() {
    fetch(`${constants.api.url}/api/v1/anyquiz/list`)
      .then(response => response.json())
      .then(response => {
        let list = [];
        for (var i = 0; i < response.quizzes.length; i++) {
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
          fetchStatus: response.status_string
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
    this.setState({
      fetchInProgress: true,
      closeFetchSnackBar:false,
    });

    fetch(`${constants.api.url}/api/v1/anyquiz/read/` + quiz)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then(response => {
        var temp = [quiz];
        this.setState(prevState => ({
          fetchInProgress: false,
          quizlist: [...prevState.quizlist, quiz],
          currentQuiz: temp
        }));

      })
      .catch(error => this.setState({
        fetchInProgress: false,
        errorMessage: error
      }));

    this.interval = setInterval(() => {
      this.fetchStatus(this.state.fetchInProgress, quiz);
    }, 5000);

  }

  handleCloseFetchSnackBar() {
    this.setState({closeFetchSnackBar:true});
  }

  render() {

    return <Fragment>
      <SearchBar onSearchQuiz={this.handleSearchQuiz.bind(this)} onFilterQuiz={this.handleFilterQuiz.bind(this)}/>
      {
        this.state.fetchInProgress && !this.state.closeFetchSnackBar &&
        <SnackBar text={this.state.fetchStatus} onClickClose={this.handleCloseFetchSnackBar.bind(this)} />
      }
      <Grid container spacing={4}>
        {!this.state.loading ? this.state.currentQuiz.map(name => (
          <Grid item key={name} sm={6} md={4} lg={3}>
            <QuizInfo quizName={name}/>
          </Grid>
        )):<div className={"Center-Align"}><CircularProgress/></div>}
      </Grid>
    </Fragment>;
  }
}

export default QuizGallery;
