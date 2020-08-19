import React, { Component } from "react";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Item from "./components/Item/Item";
import pokemon from "./pokemon.json";


class App extends Component {

  state = {
    score: 0,
    topScore: 0,
    maxScore: 12,
    message: "Choose A Pokemon!",
    messageClass:"",
    pokemon: pokemon,
    userChoice: []
  };

  countHandler = () => {
     const newScore = this.state.score + 1 

      this.setState({score: newScore, message: "Choose a new pokemon!"})

      if(newScore >= this.state.topScore) {
        this.setState({topScore: newScore})
      }
      
    
  }

  clickHandler = (event) => {
    this.shuffle(this.state.pokemon)
    if(this.state.userChoice.indexOf(event) === -1)  {
      this.countHandler()

      this.setState({userChoice: this.state.userChoice.concat(event)})

    }
    else {
      this.gameOver()
    }
  }

  gameOver = () => {
    this.setState({score: 0, message: "Sorry Trainer, You Lost!"})
  }

   shuffle = (array) => {
    array.sort(() => Math.random() - 0.5);
  }

  componentDidMount() {
    this.shuffle(this.state.pokemon)
  }
  

  
  winReset = (correctCharacters) => {
  
    if (this.state.score + 1 === this.state.maxScore) {
      this.setState({score: 0, topScore: 0})
      const updatedCharacters = correctCharacters.map(ch => (true) ? { ...ch, isClicked: false} : ch)
        return updatedCharacters
    } else {
      return correctCharacters
    }
  
  } 
  
  
  randomizeCharacters = (name) => {
  
    var resetNeeded = false;
    const pokemon = this.state.pokemon.map(ch => {
  
      if(ch.name === name) {
        if (ch.isClicked === false) {
          this.correctChoice()
          return { ...ch, isClicked: true}
        } else {
          resetNeeded = true
          return { ...ch, isClicked: false}
        }
      }
      return ch
    })
    if (resetNeeded) {
      this.setState({
        characters: this.shuffle(this.wrongChoice()),
        messageClass:"incorrect"
      })
      
    } else {
      this.setState({ pokemon: this.shuffle(this.winReset(pokemon)) })

    }
    
  } 
  
  renderCharacter = () => {
  
    return ( this.state.pokemon.map((pokemon) => 
            <Item 
              image={pokemon.image} 
              name={pokemon.name} 
              key={pokemon.id} 
              onClick={this.clickHandler} 
            />
  
          ))
  };
  
  render () {
  
    return (
      <div className="App container-fluid">
      <Header />
        <Navbar
          score={this.state.score}
          topscore={this.state.topScore}
          message={this.state.message}
          messageClass={this.state.messageClass}
        />
  
        <div className="content row">
          {this.renderCharacter()}
        </div>
      </div>
  
    );
  }
}

export default App;
