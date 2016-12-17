import React from 'react';
import SheetEditor from './SheetEditor';
import SheetText from "./SheetText";
import "./App.css";


class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {sheet: "{}"}
    }

    onChange = (sheet) => {
        this.setState({sheet: sheet});
    }

    render(){
        return <div>
            <div className="header"></div>
            <div>
                <div className="half"><SheetEditor sheet={this.state.sheet} onChange={this.onChange}/></div>
                <div className="half"><SheetText sheet={this.state.sheet} onChange={this.onChange}/></div>
            </div>
        </div>
    }
}

export default App;
