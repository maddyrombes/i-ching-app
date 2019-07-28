import React from 'react';
import './App.css';
const iChing = require('i-ching');


class App extends React.Component {
  constructor() {
    super()
    this.state = {
      question: "",
      reading: {
        hex_number: null,
        hex_character: "",
        hex_names: "",
        are_changing_lines: true,
        changing_lines: "",
        change_to_hex_num: "",
        change_to_hex_char: "",
        change_to_hex_names: ""
      }
    }
  }

  getReading = () => {
    const reading = iChing.ask(this.state.question);

    this.setState({
      reading: {
        hex_number: reading.hexagram.number,
        hex_character: reading.hexagram.character,
        hex_names: reading.hexagram.names.join(', ')
      }
    })

    if (reading.change) {
      this.setState({
        are_changing_lines: true,
        changing_lines: reading.change.changingLines,
        change_to_hex_num: reading.change.to.number,
        change_to_hex_char: reading.change.to.character,
        change_to_hex_names: reading.change.to.names.join(', ')
      })

    } else {
      this.setState({ are_changing_lines: false })
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
        <h1>Consult the I-Ching (易經)</h1>
        <form onSubmit={this.handleFormSubmit}>
          What is your question? <br />
          <input type="text" value={this.state.question} onChange={this.handleFormChange} />
        </form>

        {this.state.reading.hex_number &&
          <div>
            <p>{this.state.reading.hex_number} {this.state.reading.hex_character} {this.state.reading.hex_names}</p>
            {this.state.are_changing_lines &&
              <div>
                <p>Changing lines: {this.state.changing_lines}</p>
                <p>Change to hexagram: {this.state.change_to_hex_num} {this.state.change_to_hex_char} {this.state.change_to_hex_names}</p>
              </div>}
            {!this.state.are_changing_lines &&
              <p>No changing lines.</p>
            }
          </div>
        }
      </div>
    );
  }
}

export default App;
