import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import SearchForm from './Components/SearchForm';
import GifList from './Components/GifList';

export default class App extends Component {

  constructor() {
    super();     // Allows 'this' keyword to reference 'App' from within constructor, rather than 'Component'
    this.state = {
      gifs: [],
      loading: true
    }
  }

  componentDidMount() {
    // fetch('http://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC')
    //   .then(response => response.json())
    //   .then(responseData => {
    //     this.setState({ gifs: responseData.data });
    //   })
    //   .catch(error => {
    //     console.log
    //     ('Error fetching and parsing data', error);
    //   });

    this.performSearch();
  }

  performSearch = (query = 'marijuana') => {
    axios.get(`http://api.giphy.com/v1/gifs/search?q=${query}&limit=24&api_key=dc6zaTOxFJmzC`)
      .then(response => {
        // handle success
        this.setState({
          gifs: response.data.data,    // second 'data' is from Giphy's API response
          loading: false
        });
      })
      .catch(error => {
        // handle error
        console.log('Error fetching and parsing data', error);
      });

  }

  render() {
    console.log(this.state.gifs);
    return (
      <div>
        <div className="main-header">
          <div className="inner">
            <h1 className="main-title">GifSearch</h1>
            <SearchForm onSearch={this.performSearch} />
          </div>
        </div>
        <div className="main-content">
          {
            (this.state.loading)
            ? <p>Loading...</p>
            : <GifList data={this.state.gifs} />
          }
        </div>
      </div>
    );
  }
}
