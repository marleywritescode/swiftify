import React from "react";

import "./App.css";

import Login from "../Login/Login";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import PlayList from "../Playlist/Playlist";
import Spotify from "../../util/Spotify";
import Footer from "../Footer/Footer";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: [],
      playlistName: "",
      playlistTracks: [],
      showLogin: true,
      searchTerm: "",
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  checkLogin() {
    let accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    if (accessTokenMatch) {
      this.setState({ showLogin: false });
      Spotify.getAccessToken();
    }
  }

  login() {
    Spotify.login();
  }

  addTrack(track) {
    let tracks = this.state.playlistTracks;
    let searchResults = this.state.searchResults;
    if (tracks.find((savedTrack) => savedTrack.id === track.id)) {
      return;
    } else {
      tracks.push(track);
      this.setState({ playlistTracks: tracks });
      for (let i = searchResults.length - 1; i >= 0; i--) {
        if (searchResults[i] === track) {
          searchResults.splice(i, 1);
        }
      }

      this.setState({ searchResults: searchResults });
    }
  }

  removeTrack(track) {
    let tracks = this.state.playlistTracks;
    tracks.splice(track, 1);
    this.setState({ playlistTracks: tracks });
  }

  updatePlaylistName(name) {
    this.setState({ playlistName: name });
  }

  savePlaylist() {
    const trackURIs = this.state.playlistTracks.map((track) => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() => {
      this.setState({
        playlistName: "New Playlist",
        playlistTracks: [],
      });
    });
  }

  search(term) {
    Spotify.search(term).then((searchResults) => {
      this.setState({ searchResults: searchResults });
    });
    this.setState({ searchTerm: term });
  }

  componentDidMount() {
    this.checkLogin();
  }

  render() {
    return (
      <div className="body">
        <div className="titleheader">
          <h1>
            Taylorify
            <p>Reclaim your spotify playlists</p>
          </h1>
        </div>
        <div className="App">
          {this.state.showLogin && <Login onClick={this.login} />}
          {!this.state.showLogin && (
            <>
              <SearchBar onSearch={this.search} />
              <div className="App-playlist">
                <SearchResults
                  searchResults={this.state.searchResults}
                  onAdd={this.addTrack}
                />

                <PlayList
                  playlistName={this.state.playlistName}
                  playlistTracks={this.state.playlistTracks}
                  onRemove={this.removeTrack}
                  onNameChange={this.updatePlaylistName}
                  onSave={this.savePlaylist}
                />
              </div>
            </>
          )}
          
        </div>
        <Footer />  
      </div>
      
    );
  }
}

export default App;
