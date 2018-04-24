import React, {Component} from 'react';
import * as kinopub from './../Api';

class VideoPage extends Component {
  constructor() {
    super();
    this.state = {
      movie: {
        genres: [],
        countries: [],
        posters: [],
        videos: []
      }
    };
  }
  onVideoLoaded(response) {
    this.setState({movie: response.item})
  }
  componentDidMount() {
    const {videoId} = this.props.match.params;
    kinopub
      .Api
      .getVideo(this.onVideoLoaded.bind(this), {id: videoId});
  }
  render() {

    return (
      <div className="details">
        <div>title: {this.state.movie.title}</div>
        <div>year: {this.state.movie.year}</div>
        <div>cast: {this.state.movie.cast}</div>
        <div>director: {this.state.movie.director}</div>
        <ul>
          {this
            .state
            .movie
            .genres
            .map((genre, idx) => {
              return <li key={idx}>{genre.title}</li>
            })}
        </ul>
        <ul>
          {this
            .state
            .movie
            .countries
            .map((country, idx) => {
              return <li key={idx}>{country.title}</li>
            })}
        </ul>
        <div>voice: {this.state.movie.voice}</div>
        <div>quality: {this.state.movie.quality}</div>
        <div>plot: {this.state.movie.plot}</div>
        <div><img src={this.state.movie.posters.medium}/></div>

        <ul>
          {this
            .state
            .movie
            .videos
            .map((video, idx) => {
              return video
                .files
                .map((video, video_idx) => {
                  return (
                    <video
                      key={video_idx}
                      width="480"
                      controls
                      poster={video.thumbnail}
                      src={video.url.http}
                      type="video/mp4"></video>
                  )
                })

            })}
        </ul>
      </div>
    );
  }
}
export default VideoPage;