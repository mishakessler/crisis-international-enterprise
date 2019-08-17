// React
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';

// Components
import Hero from '../components/Hero'

// Forms
import EditSponsorForm from '../components/forms/EditSponsorForm'

// API Functions
import {
  showSponsor,
  updateSponsor,
  destroySponsor,
} from '../services/sponsor'

// Assets
import Logo from '../assets/graphics/CI-Wordmark-White.png'

class Sponsor extends Component {
  constructor(props) {
    super(props)

    this.state = {
      type: "sponsor",
      helper: null,
      sponsor: [],
      showForm: false,
      hideFormButton: false,
      errorAlert: false,
      successAlert: false,
      sponsorData: {
        sponsor_name: '',
        sponsor_email: '',
      }
    }
  }

  componentDidMount = async () => {
    const sponsor = await showSponsor(this.props.match.params.id)
    this.setState({
      sponsor: sponsor,
    })
  }

  handleChange = (e) => {
    const { name, value } = e.target
    this.setState(prevState => ({
      sponsorData: {
        ...prevState.sponsorData,
        [name]: value
      }
    }))
  }

  handleSubmit = async (ev) => {
    try {
      ev.preventDefault()
      const updatedSponsor = await updateSponsor(this.props.match.params.id, this.state.sponsorData)
      this.setState({
        sponsor: updatedSponsor,
        showForm: false,
        successAlert: true,
      })
    } catch (e) {
      console.log(e)
      this.setState({
        errorAlert: true,
      });
    }
  }

  showForm = () => {
    this.setState({
      showForm: true,
      hideFormButton: true,
    })
  }

  hideForm = () => {
    this.setState({
      showForm: false,
      hideFormButton: false,
    })
  }

  render() {
    return (
      <div className="page sponsor-page">
        <Hero
          type={this.state.type}
          title={this.state.sponsor.sponsor_name}
          tagline={this.state.sponsor.sponsor_tagline}
          description={this.state.sponsor.sponsor_desc}
          helper={this.state.helper}
        />
        <div className="sponsor-info">
          <a href={this.state.sponsor.sponsor_website} target="_blank">Website</a>
          <p>Contact: {this.state.sponsor.sponsor_phone}</p>
          <p>Location: {this.state.sponsor.sponsor_country}</p>
        </div>
        <div className="sponsors-form">
          {!this.state.hideFormButton &&
            <button
              onClick={this.showForm} >Update Sponsor</button>
          }
          {this.state.showForm && <EditSponsorForm
            sponsor_name={this.state.sponsor.sponsor_name}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            successAlert={this.state.successAlert}
            errorAlert={this.state.errorAlert}
            hideForm={this.hideForm}
          />}
        </div>
      </div>
    )
  }
}

export default withRouter(Sponsor)