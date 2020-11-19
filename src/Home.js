import React from "react";
import { withRouter } from "react-router-dom";
import { Helmet } from "react-helmet";
import Filter from "./Filter";
import List from "./List";
import './Home.css';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      records: [],
      loading: true,
      launch_year: '',
      launch_success: undefined,
      landing_success: undefined,
      filter_string: ''
    };
    if (this.props.staticContext && this.props.staticContext.initialState) {
      this.state = Object.assign(
        this.state,
        this.props.staticContext.initialState
      );
    }
    this.filterData = this.filterData.bind(this);
  }

  filterData(value, field) {
    let filterString = `${field}=${value}`;
    if(this.state.launch_year !== '' && field !== 'launch_year') {
      filterString+= `&launch_year=${this.state.launch_year}`;
    }
    if(this.state.launch_success !== undefined && field !== 'launch_success') {
      filterString+= `&launch_success=${this.state.launch_success}`;
    }
    if(this.state.landing_success !== undefined && field !== 'landing_success') {
      filterString+= `&landing_success=${this.state.landing_success}`;
    }

    if(field === 'launch_year') {
      this.setState({ launch_year: value });
    } else if(field === 'launch_success') {
      this.setState({ launch_success: value });
    } else if(field === 'landing_success') {
      this.setState({ landing_success: value });
    }

    this.setState({ filter_string: filterString });
    console.log('origin', window.location.origin,'filterString',filterString);
    window.history.pushState('page', 'Title', `${window.location.origin}?${filterString}`);

    fetch(`https://api.spacexdata.com/v3/launches?limit=100&${filterString}`)
      .then(response => response.json())
      .then(data => {
        console.log('data', data);
        this.setState({ records: data });
      })
  }

  static async getInitialState() {
    let apiUrl = `https://api.spacexdata.com/v3/launches?limit=100`;
    if(typeof window !== "undefined" && window) {
      const filterUrl = window.location.href.split('?')[1];
    
      if(filterUrl) {
        apiUrl+=`?${filterUrl}`;
      }
    }

    if (
      typeof window !== "undefined" &&
      window.__INITIAL_STATE__ &&
      window.__INITIAL_STATE__ !== "__INITIAL_STATE__"
    ) {
      const initialState = window.__INITIAL_STATE__;
      // need to delete the initial state so that subsequent
      // navigations do not think they were server side rendered
      // and pull up the wrong initial state
      delete window.__INITIAL_STATE__;
      return initialState;
    }
    const records = await Home.getSpaceX(apiUrl);
    return {
      records,
      loading: false
    };
  }

  static async getSpaceX(apiUrl='https://api.spacexdata.com/v3/launches?limit=100') {    
    try {
      const spacexResponse = await fetch(
        apiUrl
      );
      return spacexResponse.json();
    } catch(e) {
      throw e;
    }
    
  }

  async componentDidMount() {
    this.setState({ loading: true });
    const initialState = await Home.getInitialState();
    this.setState(initialState);
  }

  render() {
    const { records, loading } = this.state;

    if (loading) {
      return <div>Loading...</div>;
    }

    return (
      <div className="container">
        <Helmet title="SpaceX Launch Programs" />
        <h1>SpaceX Launch Programs</h1>
        <div className="main">
          <Filter filterData={this.filterData} filterString={this.state.filter_string}/>
          <List records={records} />
        </div>
      </div>
    );
  }
}

export default withRouter(Home);
