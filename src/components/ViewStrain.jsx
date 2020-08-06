import React, { useState, useEffect } from 'react';
// import _, { uniq } from 'underscore';
import axios from 'axios';
// import SearchResults from 'react-filter-search';
import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Table from 'react-bootstrap/Table'
import { config } from '../Constants' // get prod/dev urls
let BACK_END_URL = config.url.API_URL;

const ViewStrain = function (props) {
  const [strain, setStrain] = useState([]);
  const strainId = props.match.params.strainId
  useEffect( () => {
    axios.get(`http://localhost:3000/strains/${ strainId }`)
      .then(response => {
        console.log(response);
        setStrain(response.data); // [0] for id
      })
      .catch(error => {
        console.log(error);
      })
  }, []) // fetch data only once
  console.log(strain)
  const { id, name, mating_type, morphology, gm, is_child, acid_tolerance, ferment_rate, traits, image } = strain

  return (
    <div key={ id }>
      <Container>
        <img className="w-25 img-thumbnail" src={ image } alt={ id }/>
      </Container>
      <svg width="800" height="400" xmlns="http://www.w3.org/2000/svg">
       <g>
        <title>Layer 1</title>
        <line stroke="#000" stroke-linecap="undefined" stroke-linejoin="undefined" id="svg_1" y2="149.45313" x2="388" y1="54.45313" x1="388" stroke-width="1.5" fill="none"/>
        <line stroke-linecap="undefined" stroke-linejoin="undefined" id="svg_2" y2="149.45313" x2="597" y1="148.45313" x1="181" stroke-width="1.5" stroke="#000" fill="none"/>
        <line stroke="#000" stroke-linecap="undefined" stroke-linejoin="undefined" id="svg_3" y2="149.45313" x2="597" y1="268.45313" x1="597" stroke-width="1.5" fill="none"/>
        <line stroke-linecap="undefined" stroke-linejoin="undefined" id="svg_4" y2="148.45313" x2="182" y1="263.45313" x1="182" stroke-width="1.5" stroke="#000" fill="none"/>
        <line stroke="#000" stroke-linecap="undefined" stroke-linejoin="undefined" id="svg_5" y2="264.45313" x2="281" y1="263.45313" x1="83" fill-opacity="null" stroke-opacity="null" stroke-width="1.5" fill="none"/>
        <line stroke="#000" stroke-linecap="undefined" stroke-linejoin="undefined" id="svg_6" y2="269.45313" x2="699" y1="269.45313" x1="499" fill-opacity="null" stroke-opacity="null" stroke-width="1.5" fill="none"/>
        <line stroke-linecap="undefined" stroke-linejoin="undefined" id="svg_7" y2="346.45313" x2="83" y1="264.45313" x1="83" fill-opacity="null" stroke-opacity="null" stroke-width="1.5" stroke="#000" fill="none"/>
        <line stroke-linecap="undefined" stroke-linejoin="undefined" id="svg_8" y2="345.45313" x2="281" y1="264.45313" x1="281" fill-opacity="null" stroke-opacity="null" stroke-width="1.5" stroke="#000" fill="none"/>
        <line stroke="#000" stroke-linecap="undefined" stroke-linejoin="undefined" id="svg_9" y2="351.45313" x2="499" y1="270.45313" x1="499" fill-opacity="null" stroke-opacity="null" stroke-width="1.5" fill="none"/>
        <line stroke="#000" stroke-linecap="undefined" stroke-linejoin="undefined" id="svg_10" y2="354.45313" x2="698" y1="269.45312" x1="698" fill-opacity="null" stroke-opacity="null" stroke-width="1.5" fill="none"/>
       </g>
      </svg>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Name</th>
            <th>Mating Type</th>
            <th>Morphology</th>
            <th>Genetically Modified?</th>
            <th>Child Strain?</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{ name }</td>
            <td>{ mating_type }</td>
            <td>{ morphology }</td>
            <td>{ gm ? "yes" : "no" }</td>
            <td>{ is_child ? "yes" : "no" }</td>
          </tr>
        </tbody>
      </Table>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Acid Tolerance</th>
            <th>Fermentation Rate</th>
            <th>Traits</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{ acid_tolerance }</td>
            <td>{ ferment_rate }</td>
            <td>{ traits }</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );

};

export default ViewStrain;
