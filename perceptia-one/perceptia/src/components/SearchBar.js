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
import constants from './constants';

class SearchBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userInput:'',
            errorMessage:''
        }
    }

    // componentDidMount() {
    // }

    handleSubmit(evt) {
        evt.preventDefault();
        this.props.onSearchQuiz(this.state.userInput);
        // console.log(this.state.userInput)
        // fetch(`${constants.api.url}/api/v1/anyquiz/read/` + this.state.userInput)
        //     .then(response => response.json())
        //     .then(response => console.log(response))
    }

    render() {

        return (
            <form className="input-group md-form form-sm form-2 pl-0" onSubmit={evt => this.handleSubmit(evt)}>
                {
                    this.state.errorMessage ?
                        <div>
                            {this.state.errorMessage}
                        </div> :
                        undefined
                }
              
                <input 
                    className="form-control my-0 py-1 lime-border"
                    type="text" 
                    placeholder="Search..." 
                    value={this.state.userInput} 
                    onChange={evt => this.setState({
                        userInput:evt.target.value
                    })} />

                <div className="input-group-append">
                    <span className="input-group-text lime lighten-2">
                        Go!
                    </span>
                </div>
            </form>

        )

    }



}

export default SearchBar;