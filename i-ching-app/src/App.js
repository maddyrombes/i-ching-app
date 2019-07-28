import React from 'react';
import './App.css';
const iChing = require('i-ching');


class App extends React.Component {
  constructor() {
    super()
    this.state = {
      question: "",
      reading: {
        hex_number: 0,
        hex_character: "",
        hex_names: ""
      }
    }
  }

  getReading = () => {
    const reading = iChing.ask(this.state.question);

    this.setState({
      reading: {
        hex_number: reading.hexagram.number,
        hex_character: reading.hex_character,
        hex_names: reading.hexagram.names.join(', ')
      }
    })


    if (reading.change) {
      console.log('changing lines: %j', reading.change.changingLines);
      console.log('change to hexagram: %d %s %s',
        reading.change.to.number,
        reading.change.to.character,
        reading.change.to.names.join(', '));

    } else {
      console.log('no changing lines');
    }
  }

  handleFormChange = (e) => {
    this.setState({ question: e.target.value })
  }

  handleFormSubmit = (e) => {
    e.preventDefault();
    this.getReading()
  }


  render() {
    return (
      <div className="App" >
        <form onSubmit={this.handleFormSubmit}>
          What is your question?
            <input type="text" value={this.state.question} onChange={this.handleFormChange} />
        </form>
        <p>Hexagram number: {this.state.reading.hex_number}</p>
        <p>Hexagram character: {this.state.reading.hex_character}</p>
        <p>Hexagram names: {this.state.reading.hex_names}</p>
      </div>
    );
  }
}

export default App;
