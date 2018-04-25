import React, {Component} from 'react';
import * as kinopub from './../../Api';
import Movie from '../components/Movie';
class CategoryPage extends Component
{
  constructor() {
    super();
    this.state = {
      videos: [],
      pagination: {}
    };
  }
  onMoviesLoaded(response) {
    this.setState({videos: response.items, pagination: response.pagination});
  }

  componentDidMount() {
    const {match: {params: {contentType}}} = this.props;
    kinopub
      .Api
      .getVideos(this.onMoviesLoaded.bind(this), {type: contentType});
  }

  render() {
    const {match: {params: {contentType}}} = this.props;
    return (
      <div className="movies">
        {this
          .state
          .videos
          .map((movie, idx) => {
            return <Movie data={movie} key={idx}/>
          }, this)}
      </div>
    )
  }
}
export default CategoryPage;