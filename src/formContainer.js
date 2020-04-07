import React, { Component } from 'react'
import * as countries from './countries.min.json'
import * as Indiacities from './indiaCity.json'
import * as CanadaCity from './CanadaCity.json'
import * as ukCity from './ukCity.json'

export default class formContainer extends Component {

  constructor() {
    super();
    this.state = { countries: countries.default, cities: [] }
  }

  handleChange = (event) => {
    let country = event.target.value;

    if (country === "India") {
      this.setState({ cities: Indiacities.default })
    }
    else if (country === "Canada") {
      this.setState({ cities: CanadaCity.default })
    }
    else if (country === "United Kingdom") {
      this.setState({ cities: ukCity.default })
    }
    else {
      this.setState({ cities: [{ 'name': 'No City Found' }] })
    }
  };

  handleCityChange = (event) => {
    let city = event.target.value;
    let appid = 'c4fb18a1e9d7fcde14e3ac6230dc0f34';

    fetch('http://api.openweathermap.org/data/2.5/weather?q='+city+'&APPID='+appid).then((response) => {
      response.json().then((result) => {
        this.setState({
          tempdata: result
        })
      })
    })
  };

  render() {
    return (
      <div class="container mt-4">
        <h2>Country / City</h2>
        <form class="mt-4">
          <div class="row">
            <div class="form-group col-md-6">
              <label class="font-weight-bold">Country</label>
              <select class="form-control" onChange={this.handleChange}>
                {this.state.countries.map((data) =>
                  (
                    <option value={data.name}>{data.name}</option>
                  ))
                }
              </select>
            </div>
            <div class="form-group col-md-6">
              <label class="font-weight-bold">City</label>
              <select class="form-control" onChange={this.handleCityChange}>
                {this.state.cities.map((data) =>
                  (
                    <option value={data.name}>{data.name}</option>
                  ))
                }
              </select>
            </div>
          </div>
        </form>
        <h3>OpenWeathermap.org Result:</h3>
              {this.state.tempdata ? <span>{(this.state.tempdata.main.temp - 273.15).toFixed(0)}</span> : <span></span>}
        <span> °C</span>
      </div>
    )
  }

}