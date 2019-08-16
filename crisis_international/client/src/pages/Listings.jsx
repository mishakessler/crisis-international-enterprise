import React, { Component } from 'react'
import { Link, Route, Switch, withRouter } from 'react-router-dom';

// Components
import Hero from '../components/Hero'
import Subheader from '../components/Subheader'
import Disclaimer from '../components/Disclaimer'

// Forms
import CreateListingForm from '../components/forms/CreateListingForm'
import CreateSponsorForm from '../components/forms/CreateSponsorForm'
import EditListingForm from '../components/forms/EditListingForm'
import EditSponsorForm from '../components/forms/EditSponsorForm'
import LoginForm from '../components/forms/LoginForm'

// API Functions
import {
  createSponsor,
  indexSponsors,
  showSponsor,
  updateSponsor,
  destroySponsor,
} from '../services/sponsor'

import {
  createListing,
  indexListings,
  showListing,
  updateListing,
  destroyListing
} from '../services/listing'

// Assets
import Logo from '../assets/graphics/CI-Wordmark-White.png'

class Listings extends Component {
  constructor(props) {
    super(props)

    this.state = {
      type: "page",
      title: "View All Resources",
      tagline: null,
      description: null,
      helper: null,
      listings: [],
      showForm: false,
      hideFormButton: false,
      errorAlert: false,
      listing: {
        listing_name: '',
        listing_tagline: '',
        listing_desc: '',
        listing_industry: '',
        listing_category: '',
      }
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target
    this.setState(prevState => ({
      listing: {
        ...prevState.listing,
        [name]: value
      }
    }))
  }

  handleSubmit = async (ev) => {
    try {
      ev.preventDefault()
      const newListing = await createListing(this.state.listing);
      this.setState((prevState) => ({
        listings: [
          ...prevState.listings, newListing,
        ],
        showForm: false,
      }))
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
      <div className="page listings-page">
        <Hero
          type={this.state.type}
          title={this.state.title}
          tagline={this.state.tagline}
          description={this.state.description}
          helper={this.state.helper}
        />
        <div className="index listings-index">
          {this.props.listings.map(listing =>
            <div key={listing.id}>
              <h2>{listing.listing_name}</h2>
              <p>{listing.listing_tagline}</p>
              <Link to={`/listings/${listing.id}`}>View Resource</Link>
            </div>
          )}
        </div>
        <div className="listings-form">
          {!this.state.hideFormButton &&
            <button
              onClick={this.showForm}>Add Resource</button>
          }
          {this.state.showForm &&
            <CreateListingForm
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
              successAlert={this.state.successAlert}
              errorAlert={this.state.errorAlert}
              hideForm={this.hideForm}
            />}
          {this.props.autoForm && !this.state.showForm ?
            <CreateListingForm
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
              successAlert={this.state.successAlert}
              errorAlert={this.state.errorAlert}
              hideForm={this.hideForm}
            /> : null}
        </div>
      </div>
    )
  }
}

export default withRouter(Listings)