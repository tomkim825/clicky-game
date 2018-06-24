import React, { Component } from "react";
import BossCard from "./components/BossCard";
import Wrapper from "./components/Wrapper";
import bosses from "./bosses.json";
import "./App.css";

let curScore = 0;
let topScore = 0;
let message = "Click an image to begin!";

class App extends Component {
  // Setting this.state.dolphins to the dolphins json array
  state = {
    bosses,
    message,
    topScore,
    curScore
  };

  setSelected = id => {
    // Copy the bosses array state
    const bosses = this.state.bosses;
    // Filter this.state.dolphins for the clicked dolphin
    const chosenbosses = bosses.filter(boss => boss.id === id);

    // If the dolphin has been picked, game over
    if (chosenbosses[0].clicked) {
      curScore = 0;
      message = "Clicked on the same boss twice!";

      for (let i = 0; i < bosses.length; i++) {
        bosses[i].clicked = false;
      }
      
      this.setState({ message });
      this.setState({ curScore });
      this.setState({ bosses });
    }
    // If the dolphin has not been clicked yet
    else if(curScore < 11 ) {
      // Set the clicked dolphin's clicked value to true
      chosenbosses[0].clicked = true;
      // Increment curScore
      curScore++;
      message = "New boss selected. Get a point.";

      // Check topScore and update if curScore is higher
      if (curScore > topScore) {
        topScore = curScore;
        this.setState({ topScore });
      }

      // Shuffle the dolphins array to render in a random order
      bosses.sort(() => (0.5 - Math.random()));

      this.setState({ bosses });
      this.setState({ curScore });
      this.setState({ message });
    }
    else {
      chosenbosses[0].clicked = true;
      // Restart the score
      curScore = 0;
      message = "You defeated them all. Ready for Sigma?";
      topScore = 12;
      this.setState({ topScore });

      for(let i = 0; i < bosses.length; i++) {
        bosses[i].clicked = false;
      }

      bosses.sort(() => (0.5 - Math.random()));
      this.setState({ bosses });
      this.setState({ curScore });
      this.setState({ message });
    }

   
  };

  // Map over this.state.dolphins and render a DolphinCard component for each friend object
  render() {
    return (
  
      <Wrapper>
      <div>
      <nav class="row navbar fixed-top navbar-dark bg-primary py-3">
          <div class="col-4 nav-item">
          <h2 class='nav-logo'>Megaman Clicky Dolphin</h2>
          </div>
          <div class="col-4 nav-item">
            <h5>{this.state.message}</h5>
          </div>
          <div class="col-4 nav-item">
            <h3>Score: {this.state.curScore}   HighScore: {this.state.topScore}</h3>
          </div>
      </nav>
      <div class="row justify-content-center">
        <div class="col-12 jumbotron text-center">
          <h1>Fight all megaman bosses</h1>
          <h2>Don't fight the same boss twice!</h2>
        </div>
      </div>
        <div class="container">
          <div class ="row justify-content-center">
            {this.state.bosses.map(boss => (
            <BossCard
              setSelected={this.setSelected}
              id={boss.id}
              key={boss.id}
              image={boss.image}
            />
          ))}
          </div>
        </div>
        </div>
      </Wrapper>
    );
  }
}

export default App;
