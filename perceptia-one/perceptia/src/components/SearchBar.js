
import React from 'react';

class SearchBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userInput:'',
            errorMessage:'',
            timeoutHandle: null,
        };
    }
    
    handleSubmit(evt) {
        evt.preventDefault();
        this.props.onSearchQuiz(this.state.userInput);

    }

    render() {

        return (
            <form className="input-group md-form form-sm form-2 pl-0" onSubmit={evt => this.handleSubmit(evt)}>
                {
                    this.state.errorMessage ?
                        <div className={"Center-Align"}>
                            {this.state.errorMessage}
                        </div> :
                        undefined
                }
              
                <input 
                    className="form-control form-control-sm mr-3 w-75"
                    type="text" 
                    placeholder="Search..." 
                    
                    defaultValue={this.state.userInput}
                    onKeyUp={evt => {
                        if(this.state.timeoutHandle) {
                            clearTimeout(this.state.timeoutHandle);
                        }
                        
                        var value = evt.target.value;
                        var handle = setTimeout((value)=>{this.props.onFilterQuiz(value);}, 200, value);

                        this.setState({
                            userInput: evt.target.value,
                            timeoutHandle: handle
                    }); 
                        //this.props.onFilterQuiz(evt.target.value);
                    }} />

                {/* <div class="input-group-append">
                    <span class="input-group-text lighten-2">
                        Go!
                    </span>
                </div> */}
            </form>

        );

    }



}

export default SearchBar;