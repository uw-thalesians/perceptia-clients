
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
import { MDBCol, MDBIcon } from "mdbreact";

class SearchBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userInput:'',
            errorMessage:''
        }
    }
    
    handleSubmit(evt) {
        evt.preventDefault();
        this.props.onSearchQuiz(this.state.userInput);

    }

    render() {

        return (
            <form class="input-group md-form form-sm form-2 pl-0" onSubmit={evt => this.handleSubmit(evt)}>
                {
                    this.state.errorMessage ?
                        <div>
                            {this.state.errorMessage}
                        </div> :
                        undefined
                }
              
                <input 
                    class="form-control form-control-sm mr-3 w-75"
                    type="text" 
                    placeholder="Search..." 
                    value={this.state.userInput} 
                    onChange={evt => this.setState({
                        userInput:evt.target.value
                    })} />

                {/* <div class="input-group-append">
                    <span class="input-group-text lighten-2">
                        Go!
                    </span>
                </div> */}
            </form>

        )

    }



}

export default SearchBar;