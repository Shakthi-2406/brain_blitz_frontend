import './App.css';
import React from 'react';

const ansstyle = {
  "background-color" : "rgba(23, 149, 67, 0.37)"
}
const delstyle = {
  "background-color" : "rgba(149, 29, 23, 0.27)"
}

class example extends React.Component {
  
  constructor(props){
      super(props);
      this.state = {
        ans : ""
      }
    }
    addval = (ele) => {
      this.setState({
        ans : this.state.ans + ele.target.innerText
      });
    }

    delval = () => {
      this.setState({
        ans : String(this.state.ans).slice(0,-1)
      });
    }
    clear = () => {
      this.setState({
        ans : ""
      });
    }

    calc = () => {
      this.setState({
        ans : eval(this.state.ans)
      });
    }

  render(){
    return (
      <div className="App">
        <table>
        <tr>
            <td id="ans" colSpan={4}>{this.state.ans}</td>
        </tr>
        <tr>
            <td onClick={this.clear}>AC</td>
            <td style={delstyle} onClick={this.delval}>DEL</td>
            <td onClick={this.addval}>%</td>
            <td onClick={this.addval}>/</td>
        </tr>
        <tr>
            <td onClick={this.addval}>7</td>
            <td onClick={this.addval}>8</td>
            <td onClick={this.addval}>9</td>
            <td onClick={this.addval}>*</td>
        </tr>
        <tr>
            <td onClick={this.addval}>4</td>
            <td onClick={this.addval}>5</td>
            <td onClick={this.addval}>6</td>
            <td onClick={this.addval}>-</td>
        </tr>
        <tr>
            <td onClick={this.addval}>1</td>
            <td onClick={this.addval}>2</td>
            <td onClick={this.addval}>3</td>
            <td onClick={this.addval}>+</td>
        </tr>
        <tr>
            <td onClick={this.addval}>.</td>
            <td onClick={this.addval}>0</td>
            <td style={ansstyle} colSpan={2} onClick={this.calc}>ANS</td>
        </tr>
        </table>
      </div>
    );
  }
}
export default example;
  