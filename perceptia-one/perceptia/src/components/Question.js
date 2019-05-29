import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import QuizInfo from './QuizInfo';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { DeleteForever, Edit, SaveOutlined, NotInterested, NavigateNext } from "@material-ui/icons";
import "./quiz.css"
import constants from "./constants";
import CircularProgress from '@material-ui/core/CircularProgress';

class Question extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            edit: false,
            question:"",
            question_type:null,
            questionId:"",
            answerOptions:[],
            newText:"",
            newAnswer:"",
            busy: false,
        }
    }

    static getDerivedStateFromProps(nextProps) {
        return {
            question:nextProps.question,
            newText:nextProps.question,
            question_type:+nextProps.question_type,
            questionId:nextProps.questionId,
            answerOptions:nextProps.answerOptions,
            newAnswer:"",
            busy: false,
        }
    }

    deleteQuestion(){
        var body = JSON.stringify({
            "questionID":`${this.state.questionId}`,
        });

        this.setState({"busy": true});
        fetch(`${constants.api.url}/api/v1/anyquiz/questions/delete`, {
            method: 'post',
            body: body,
        })
        .then( response => response.json())
        .then( response =>{
            this.setState({"busy": false});
            window.alert(response.msg);
        });
    }

    sendQuestionEdit(){
        var body = JSON.stringify({
            "questionID":`${this.state.questionId}`,
            "newText": `${this.state.newText}`,
            "newAnswer": `${this.state.newAnswer}`,
        });

        this.setState({"busy":true});
        fetch(`${constants.api.url}/api/v1/anyquiz/questions/edit`, {
            method: 'post',
            body: body,
        })
        .then( response => response.json())
        .then( response =>{
            this.setState({"busy": false});
            window.alert(response.msg);
        });
    }

    renderOptions(){
        console.log(this.state);

        switch(this.state.question_type) {
            case 1:
                console.log("q_type 1")
                return (<ul className="answerOptions">
                    {this.state.answerOptions.map(option => {
                    return (<li className="answerOption">
                        <div  key={""+this.state.question_id+option}>
                        <label className="radioCustomLabel">
                            {this.state.edit?<TextField defaultValue={option}/>:<input 
                                value={option}
                                type="radio"
                                name="radioGroup"
                                className="radioCustomButton"
                                checked={false}
                                onChange={()=>{
                                    console.log("option",option);
                                    this.setState({"busy":true});
                                    this.props.onAnswerSelected(option);
                                }}
                            />}
                            {option}
                        </label>
                        </div>
                        </li>);})}</ul>
                );

            case 2:
                console.log("q type 2")
                return (<ul className="answerOptions">
    
                <li className="answerOption">
                    <label className="radioCustomLabel">
                    <input 
                        type="radio"
                        className="radioCustomButton"
                        name="radioGroup"
                        checked={false}
                        onChange={()=>{
                            this.setState({"busy":true});
                            this.props.onAnswerSelected("t");
                        }}
                        value="t"
                    />
                    True</label>
                </li>
                <li className="answerOption">
                    <label className="radioCustomLabel">
                    <input 
                        type="radio"
                        className="radioCustomButton"
                        name="radioGroup"
                        checked={false}
                        onChange={()=>{
                            this.setState({"busy":true});
                            this.props.onAnswerSelected("f");
                        }}
                        value="f"
                    />
                    False</label>
                </li>

            </ul>);

            default:
                return (<div>
                    <span>Unknown Question Type</span>
                    <Button onClick={()=>this.props.onAnswerSelected("")}>
                        Next <NavigateNext/>
                    </Button>
                </div>
                );
        }//close switch
    }

    render() {
            var optionsNodes = this.renderOptions();
            console.log(optionsNodes);
            return (
                // <MultipleChoice />
                <div>
                    {this.state.edit?<TextField
        id="standard-multiline-flexible"
        label="Edit Question"
        multiline
        style={{"width": "80%"}}
        rowsMax="4"
        //value={values.multiline}
        onChange={(event)=>this.setState({"newText":event.target.value})}
        defaultValue={this.state.question}
      />:<h2 className="question">{this.state.question}</h2>}
                        <div id="editControls">
                            <Edit onClick={()=>{ if(!this.state.edit) this.setState({"edit": true})} }/>
                            <NotInterested onClick={()=>{ if(this.state.edit) this.setState({"edit":false})} } style={{"color":this.state.edit?"black":"grey"}}/>
                            <SaveOutlined onClick={()=>{
                                if(this.state.edit) {
                                    this.sendQuestionEdit(); 
                                    this.setState({"edit":false});
                                    } 
                                }} style={{"color":this.state.edit?"black":"grey"}}/>
                            <DeleteForever onClick={()=>{
                                var confirmation = window.confirm("This will permanently delete this question. Are you sure?");
                                if(confirmation) {
                                    this.deleteQuestion();
                                    this.props.onAnswerSelected("");
                                }
                            }}/>
                        </div>
                        {this.state.busy?<CircularProgress/>:optionsNodes}
                </div>
            )
    }

}

export default Question;