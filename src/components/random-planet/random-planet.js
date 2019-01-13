import React, { Component } from 'react';

import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner/';
import ErrorIndicator from '../error-indicator/';

import './random-planet.css';

export default class RandomPlanet extends Component {

    swapiService = new SwapiService();

    state = {
        planet: {},
        loading: true,
    };

    componentDidMount() {
        this.updatePlanet();
        setInterval(this.updatePlanet, 15000);
    }

    onPlanetLoaded = (planet) => {
        this.setState({
            planet,
            loading: false,
            error: false,
        });
    };

    onError = (err) => {
        this.setState({
            error: true
        });
    };

    updatePlanet = () => {
        const id = Math.floor(Math.random() * 19);

        this.swapiService
            .getPlanet(id)
            .then(this.onPlanetLoaded)
            .catch(this.onError);
    };

    render() {

        const { planet, loading, error } = this.state;

        const content = loading ? <Spinner /> : <PlanetView planet={planet} />;
        const result = error ? <ErrorIndicator /> : content;

        return (
          <div className="random-planet jumbotron rounded">
              {result}
          </div>
        );
    }
}

const PlanetView = ({ planet }) => {
    const { id, name, population, rotationPeriod, diameter } = planet;

    return (
      <React.Fragment>
          <img className="planet-image"
               src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}
               alt="Planet" />
          <div>
              <h4>{name}</h4>
              <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                      <span className="term">Population</span>
                      <span>{population}</span>
                  </li>
                  <li className="list-group-item">
                      <span className="term">Rotation Period</span>
                      <span>{rotationPeriod}</span>
                  </li>
                  <li className="list-group-item">
                      <span className="term">Diameter</span>
                      <span>{diameter}</span>
                  </li>
              </ul>
          </div>
      </React.Fragment>
    );
};