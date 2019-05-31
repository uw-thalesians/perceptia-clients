import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import QuizInfo from './QuizInfo';
import QuestionView from './QuestionView';
import NavBar from './NavBar';
import Footer from './Footer';
import constants from './constants';
import SearchBar from './SearchBar';
import SnackBar from './SnackBar';

const styles = {
    cardGrid: {
        padding: `px 8`, //Need adjustment 
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
    }
};

class QuizGallery extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            quizlist: [],
            currentquiz: [],
            fetchInProgress:false,
            fetchStatus: "Starting...",
            errorMessage: ""
        }
    }

    componentDidMount() {
	    fetch(`${constants.api.url}/api/v1/anyquiz/list`)
            .then(response => response.json())
            .then(response => {
                var list = [];
                for (var i = 0; i < response.quizzes.length; i++) {
                    list.push(response.quizzes[i].keyword);
                }

                return list

            })
            .then(list => this.setState({
                quizlist: list,
                currentquiz: list
            }))
    }

    fetchStatus(InProgress, quiz) {
        if (InProgress) {
            fetch(`${constants.api.url}/api/v1/anyquiz/status/` + quiz)
                .then(response => response.json())
                .then(response => this.setState({
                    fetchStatus: response.status_string
                }))
        }

    }

    handleSearchQuiz(quiz) {
     
        if (quiz == "") {
            this.setState({
                currentquiz: this.state.quizlist
            })
        } else if (this.state.quizlist.includes(quiz)) {
            var temp = [quiz]
            this.setState({
                currentquiz: temp
            })
        } else {
            this.setState({
                fetchInProgress: true
            })

            fetch(`${constants.api.url}/api/v1/anyquiz/read/` + quiz)
                .then(response => {
                    if (!response.ok) {
                        throw Error(response.statusText)
                    }
                    return response
                })
                .then(response => {
                    var temp = [quiz]
                    this.setState(prevState => ({
                        fetchInProgress: false, 
                        quizlist: [...prevState.quizlist, quiz],
                        currentquiz: temp
                    }))
                
                })
                .catch(error => this.setState({
                    fetchInProgress: false,
                    errorMessage: error
                }))

            this.interval = setInterval(() => {
                this.fetchStatus(this.state.fetchInProgress, quiz)
            }, 5000)
        }

    }

    render() {
        const { classes } = this.props;
        
        return (
            <div>
                <NavBar/>

                <SearchBar onSearchQuiz={this.handleSearchQuiz.bind(this)}/>
                {
                    this.state.fetchInProgress ?
                        <SnackBar text={this.state.fetchStatus} /> : 
                    <Grid container spacing={40}>
                    {this.state.currentquiz.map(name => (
                    <Grid item key={name} sm={6} md={4} lg={3}>
                        <QuizInfo quizName={name}/>
                    </Grid>
                    ))}
                    </Grid>
                }

                <Footer/>
            </div>
        )
    }

}

export default withStyles(styles)(QuizGallery);
