import React, {Component} from 'react';
import * as kinopub from './../Api';
import {Link} from "react-router-dom";
class Home extends Component {
  constructor() {
    super();
    this.state = {
      categories: []
    };
  }
  onCategoriesLoaded(response) {
    this.setState({categories: response.items});
  }
  componentDidMount() {
    kinopub
      .Api
      .getCategories(this.onCategoriesLoaded.bind(this));
  }
  render() {
    return (
      <ul>
        {this
          .state
          .categories
          .map((category, idx) => {
            return <li key={idx}>
              <Link to={`/category/${category.id}`}>{category.title}</Link>
            </li>
          })}
      </ul>
    );
  }
}
export default Home;