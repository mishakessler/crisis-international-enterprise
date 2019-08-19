// React
import React, { Component } from 'react'

// React Router
import { Link, withRouter } from 'react-router-dom';

// React Semantic
import { Card, Icon, Image, Button } from 'semantic-ui-react'

// Components
import Hero from '../components/Hero'

// Forms
import CreateListingForm from '../components/forms/CreateListingForm'

// API Functions
import {
  createListing,
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
      <>
        <Hero
          className="listings-hero"
          type={this.state.type}
          title={this.state.title}
          tagline={this.state.tagline}
          description={this.state.description}
          helper={this.state.helper}
        />
        <div className="listings-form">
          {!this.state.hideFormButton &&
            <Button
              animated='fade'
              size='large'
              onClick={this.showForm} >
              <Button.Content visible>Add A Resource</Button.Content>
              <Button.Content hidden>Save Lives</Button.Content>
            </Button>
          }
          {this.state.showForm &&
            <CreateListingForm
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
              successAlert={this.state.successAlert}
              errorAlert={this.state.errorAlert}
              hideForm={this.hideForm}
            />}
        </div>
        <div className="page listings-page box-shadow">
          <div className="index listings-index">
            {this.props.listings.map(listing =>
              <div key={listing.id} className="listings-cards">
                <Card.Group>
                  <Card
                    href={`/resources/${listing.id}`}
                    color='teal'
                  >
                    <Image src={listing.listing_url_to_img} wrapped ui={true} />
                    <Card.Content>
                      <Card.Header>{listing.listing_name}</Card.Header>
                      <Card.Meta>
                        {listing.listing_country}
                      </Card.Meta>
                      <Card.Description>
                        {listing.listing_tagline}
                      </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                      <a>
                        <Icon name='clock' />
                        {listing.listing_hours}
                      </a>

                    </Card.Content>
                  </Card>
                </Card.Group>
              </div>
            )}
          </div>
        </div>
      </>
    )
  }
}

export default withRouter(Listings)