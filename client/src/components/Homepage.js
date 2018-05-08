import React, { Component } from 'react';

class Homepage extends Component {
  constructor(props) {
    super(props);

    this.scrollTo = this.scrollTo.bind(this);
  }

  scrollTo(elId) {

    return () => {
      document.getElementById(elId).scrollIntoView({
        "behavior" : "smooth",
        "block": "start",
        "inline": "start"
      });
    }
  }

  render() {
    return (
      <main className="homepage-main">
        <div className="homepage-hero">
          <div className="header-backcolor" />
          <div className="homepage-header">
            <h1>FoodFilter</h1>
            <p className="homepage-description">
              Welcome to Food Filter! 
              <br />
              We help you identify ingredients that you are allergic to based on your allergy profile. 
            </p>
          </div>
        </div>

        <section className="homepage-body">
          <aside>
            <div
              className="body-nav"
              onClick={this.scrollTo("overivew")}>
              Overview
            </div>
            <div
              className="body-nav"
              onClick={this.scrollTo("symptoms")}>
              Symptoms
            </div>
            <div
              className="body-nav"
              onClick={this.scrollTo("triggers")}>
              Triggers
            </div>
          </aside>

          <div className="homepage-content">
            <section>
              <div
                className="homepage-section"
                id='overivew'>

                <h3>About Food Filter</h3>
                <div className="section-content">
                  Our goal is to help you! Based off of each person's profile, we help you avoid food items by 
                  highlighting ingredients that are potentially dangerous based on your allergy profile.
                  You can type in the product name into the search bar or type the bar code
                  that is found on the product. We also have a bar code scanner where you can upload a photo!
                </div>
              </div>

              <div className="homepage-section"
                id='symptoms'>
                <h3>How to Use Food Filter</h3>
                <div className="section-content">
                  <img class="how-to-img" src="how_to.png"/>
                  <ol className="symptoms-ul">
                    <li>Login or Register</li>
                    <li>Go to "My Profile"</li>
                    <li>Save Allergies</li>
                    <li>Type barcode number or product name in the search bar, or Upload barcode photo</li>
                    <li>See your Results</li>
                  </ol> 
                  

                   </div>
              </div>

              <div
                className="homepage-section"
                id='triggers'>
                <h3>About Us</h3>
                <div className="section-content">
                 
                </div>
              </div>
            </section>
          </div>

          <div className="backToTop-col">
            <div
              id="backToTop"
              onClick={this.scrollTo("root")}>
                Top
            </div>
          </div>
        </section>
      </main>
    );
  }
}

export default Homepage;
