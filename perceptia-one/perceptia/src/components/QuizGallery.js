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
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import QuizInfo from './QuizInfo'
import QuestionView from './QuestionView'
import NavBar from './NavBar';
import Footer from './Footer';

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
            quizlist: []
        }
    }

    componentDidMount() {
        fetch('http://students.washington.edu/long27km/any_quiz/v1/list')
            .then(response => response.json())
            .then(response => {
                var list = [];
                for (var i = 0; i < response.quizzes.length; i++) {
                    list.push(response.quizzes[i].keyword);
                }

                return list

            })
            .then(list => this.setState({
                quizlist: list
            }))
    }

    render() {
        const { classes } = this.props;
        
        return (
            <div>
            <NavBar/>

            <Grid container spacing={40}>
            {this.state.quizlist.map(name => (
            <Grid item key={name} sm={6} md={4} lg={3}>
                <QuizInfo quizName={name}/>
            </Grid>
            ))}
            </Grid>

            <Footer/>
            </div>
        )
    }

}

export default withStyles(styles)(QuizGallery);
