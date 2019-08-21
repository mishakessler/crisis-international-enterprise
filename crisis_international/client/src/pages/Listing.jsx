// React
import React, { Component } from 'react'

// React Router
import { withRouter } from 'react-router-dom';

// React Semantic
import { Header, Card, Icon, Image, Button, Modal } from 'semantic-ui-react'

// Components
import Hero from '../components/Hero'

// Forms
import EditListingForm from '../components/forms/EditListingForm'

// API Functions
import {
  showListing,
  updateListing,
  destroyListing
} from '../services/listing'

class Listing extends Component {
  constructor(props) {
    super(props)

    this.state = {
      type: "resource",
      title: null,
      tagline: null,
      description: null,
      helper: null,

      errorAlert: false,
      successAlert: false,

      listing: [],
      listingData: {
        listing_name: '',
        listing_tagline: '',
      }
    }
  }

  componentDidMount = async () => {
    const listing = await showListing(this.props.match.params.id)
    this.setState({
      listing: listing,
    })
  }

  handleChange = (e) => {
    const { name, value } = e.target
    this.setState(prevState => ({
      listingData: {
        ...prevState.listingData,
        [name]: value
      }
    }))
  }

  handleSubmit = async (ev) => {
    try {
      ev.preventDefault()
      const updatedListing = await updateListing(this.props.match.params.id, this.state.listingData)
      this.setState({
        listing: updatedListing,
        errorAlert: false,
        successAlert: true,
      })
    } catch (e) {
      console.log(e)
      this.setState({
        errorAlert: true,
        successAlert: false,
      });
    }
  }

  // showForm = () => {
  //   this.setState({
  //     showForm: true,
  //     hideFormButton: true,
  //   })
  // }

  // hideForm = () => {
  //   this.setState({
  //     showForm: false,
  //     hideFormButton: false,
  //   })
  // }

  render() {
    return (
      <>
        <Hero
          className="listing-hero"
          type={this.state.type}
          image={this.state.listing.listing_url_to_img}
          title={this.state.listing.listing_name}
          tagline={this.state.listing.listing_tagline}
          helper={this.state.helper}
        />
        <div className="page listing-page box-shadow">
          <div className="listing-content">
            <div className="listing-sidebar">

            </div>
            <div className="listing-detail">
              <p>Category: {this.state.listing.listing_category}</p>
              <p>Website: <a href={this.state.listing.listing_url} target="_blank" rel="noopener noreferrer">{this.state.listing.listing_name}</a></p>
              <p>Contact: {this.state.listing.listing_phone}</p>
              <p>Coverage: {this.state.listing.listing_coverage}</p>
            </div>
          </div>

          <div className="form-container listings-form">
            <Modal
              trigger={
                <Button
                  animated='fade'
                  size='large'
                  color='teal'
                  onClick={this.showModal}
                  className='modal-button'>
                  <Button.Content visible>See something wrong?</Button.Content>
                  <Button.Content hidden>Edit This Resource</Button.Content>
                </Button>}
              closeIcon
            >
              <Header icon='map marker alternate'>Edit {this.state.listing.listing_name}</Header>
              <Modal.Content
                scrolling>
                <EditListingForm
                  handleChange={this.handleChange}
                  handleSubmit={this.handleSubmit}
                  successAlert={this.state.successAlert}
                  errorAlert={this.state.errorAlert}
                />
              </Modal.Content>
            </Modal>
          </div>
        </div>
      </>
    )
  }
}

export default withRouter(Listing)