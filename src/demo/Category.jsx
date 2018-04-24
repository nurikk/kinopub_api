import React, {Component} from 'react';
import * as kinopub from './../Api';
import Movie from './Movie';
class Category extends Component
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
    const {contentType} = this.props.match.params;

    kinopub
      .Api
      .getVideos(this.onMoviesLoaded.bind(this), {type: contentType});
  }

  render() {
    const {contentType} = this.props.match.params;
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
export default Category;