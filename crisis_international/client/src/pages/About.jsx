// React
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';

// Components
import Hero from '../components/Hero'

// Forms

// API Functions

// Assets
import Logo from '../assets/graphics/CI-Wordmark-White.png'

class About extends Component {
  constructor(props) {
    super(props)

    this.state = {
      type: "page",
      title: "About Crisis International",
      tagline: null,
      description: null,
      helper: null,
    }
  }
  render() {
    return (
      <div className="page about-page">
        <Hero
          type={this.state.type}
          title={this.state.title}
          tagline={this.state.tagline}
          description={this.state.description}
          helper={this.state.helper}
        />
      </div>
    )
  }
}

export default withRouter(About)