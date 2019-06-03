import React from 'react';

import {
    Button, TextField, CircularProgress
} from '@material-ui/core';
import { DeleteForever, Edit, SaveOutlined, NotInterested, NavigateNext } from "@material-ui/icons";
import "./quiz.css";
import constants from "./constants";

const questionTypeMultipleChoice = 1;
const questionTypeTrueFalse = 2;

class Question extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            edit: false,
            question: props.question,
            question_type: +props.question_type,
            questionId: props.questionId,
            answerOptions:props.answerOptions,
            newText: props.question,
            newAnswer: "",
            busy: false,
        };
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
        .then( response => response.json() )
        .then( response =>{
            this.setState({"busy": false});
            window.alert(response["result"]["status"]);
            this.props.onAnswerSelected(null);
        });
    }

    sendQuestionEdit(){
        console.log(this.state);
        var body = JSON.stringify({
            "questionID":`${this.state.questionId}`,
            "newText": `${this.state.newText}`,
            "newAnswer": `${this.state.newAnswer}`,
        });

        console.log(body);

        this.setState({"busy":true});
        fetch(`${constants.api.url}/api/v1/anyquiz/questions/edit`, {
            method: 'post',
            body: body,
        })
        .then( response => { console.log(response); return response.json(); })
        .then( response =>{
            console.log(response);
            this.setState({"busy": false});
            console.log(response);
            var result = response["result"];
            var options = this.state.answerOptions;
            var i = options.indexOf(result["prevAnswer"]);
            options[i] = result["newAnswer"];
            this.setState({"answerOptions": options, "question": this.state.newText});
        });
    }

    renderOptions(){

        switch(this.state.question_type) {
            case questionTypeMultipleChoice:
                return (<ul className="answerOptions">
                    {this.state.answerOptions.map(option => {
                    return (<li className="answerOption" key={""+this.state.question_id+option}>
                        <div  >
                        <label className="radioCustomLabel">
                            {this.state.edit?<TextField onKeyUp={(event)=>{ 
                                var newAnswer = event.target.value;
                                this.setState({"newAnswer": newAnswer}); 
                                console.log(newAnswer);
                                console.log(this.state);
                            }} defaultValue={(option)}/>:<input 
                                value={(option)}
                                type="radio"
                                name="radioGroup"
                                className="radioCustomButton"
                                checked={false}
                                onChange={()=>{
                                    //console.log("option",option);
                                    this.setState({"busy":true});
                                    this.props.onAnswerSelected(option);
                                }}
                            />}
                            {(option)}
                        </label>
                        </div>
                        </li>);})}</ul>
                );

            case questionTypeTrueFalse:
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

            if(this.state.question == null){
                return (<div><CircularProgress/></div>);

            }
            var optionsNodes = this.renderOptions();
            return (
                <div>
                    {this.state.edit?<TextField
        id="standard-multiline-flexible"
        label="Edit Question"
        multiline
        style={{"width": "80%"}}
        rowsMax="4"
        //value={values.multiline}
        onKeyUp={(event)=>{
            var newText = event.target.value;
            this.setState({"newText": newText});
        }}
        defaultValue={(this.state.question)}
      />:<h2 className="question">{(this.state.question)}</h2>}
                        <div id="editControls">
                            <Edit onClick={()=>{ if(!this.state.edit) this.setState({"edit": true});} }/>
                            <NotInterested onClick={()=>{ if(this.state.edit) this.setState({"edit":false});} } style={{"color":this.state.edit?"black":"grey"}}/>
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
                                }
                            }}/>
                        </div>
                        {this.state.busy?<CircularProgress/>:optionsNodes}
                </div>
            );
    }

}

export default Question;