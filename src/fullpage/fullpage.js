import React, { Component } from 'react';

import { SectionsContainer, Section} from 'react-fullpage';

import WelcomePage from '../welcomePage/welcomePage.js';
// import Heroes from '../heroes/heroes.js';
import Category from '../category/category.js';
import "./fullpage.css";

export default class FullPage extends Component {
  render(){

    let options = {
      sectionClassName:     'section',
      anchors:              ['sectionOne', 'sectionTwo'],
      scrollBar:            false,
      navigation:           true,
      verticalAlign:        false,
      sectionPaddingTop:    '0px',
      sectionPaddingBottom: '0px',
      arrowNavigation:      true
    };

    return(
      <div>
        <SectionsContainer {...options} className="customSection">
          <Section><WelcomePage /></Section>
          {/* <Section><Heroes /></Section> */}
          <Section><Category /></Section>
        </SectionsContainer>
      </div>
    );
  }
}
