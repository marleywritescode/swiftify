import React from "react";

import "./Track.css";

class Track extends React.Component {
  constructor(props) {
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }
  renderAction() {
    if (this.props.isRemoval) {
      return (
        <button className="Track-action" onClick={this.removeTrack}>
          -
        </button>
      );
    } else {
      return (
        <button className="Track-action" onClick={this.addTrack}>
          +
        </button>
      );
    }
  }

  addTrack() {
    const track = this.props.track;
    this.props.onAdd(track);
  }

  removeTrack() {
    const track = this.props.track;
    this.props.onRemove(track);
  }

  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <img alt={this.props.track.album} src={this.props.track.image} />
          <div>
          <h3>{this.props.track.name}</h3>
          <p>
            {this.props.track.artists} | {this.props.track.album}
          </p>
          </div>
        </div>
        {this.renderAction()}
      </div>
    );
  }
}

export default Track;
