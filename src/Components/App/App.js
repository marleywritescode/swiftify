import React, { useCallback, useEffect, useMemo, useState } from "react";

import "./App.css";

import Login from "../Login/Login";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import PlayList from "../Playlist/Playlist";
import Spotify from "../../util/Spotify";
import Footer from "../Footer/Footer";

export default () => {
    const [searchResults, setSearchResults] = useState([]);
    const [playlistTracks, setPlaylistTracks] = useState([]);
    const [playlistName, setPlaylistName] = useState('');
    const [showLogin, setShowLogin] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

//   constructor(props) {
//     super(props);

//     this.state = {
//       searchResults: [],
//       playlistName: "",
//       playlistTracks: [],
//       showLogin: true,
//       searchTerm: "",
//     };
//     this.addTrack = this.addTrack.bind(this);
//     this.removeTrack = this.removeTrack.bind(this);
//     this.updatePlaylistName = this.updatePlaylistName.bind(this);
//     this.savePlaylist = this.savePlaylist.bind(this);
//     this.search = this.search.bind(this);
//   }

//   const checkLogin = useCallback(
//     () => {
//         let accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
//         if (accessTokenMatch) {
//         // this.setState({ showLogin: false });
//             setShowLogin(false);
//             Spotify.getAccessToken();
//         }
//     },
//     [],
//   );
useEffect(
    () => {
        let accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        if (accessTokenMatch) {
        // this.setState({ showLogin: false });
            setShowLogin(false);
            Spotify.getAccessToken();
        }
    },
    [],
  );

  const login = () => {
    Spotify.login();
  };

  const addTrack = useCallback(
    track => {
        let tracks = playlistTracks;
        let searchresults = searchResults;
        if (tracks.find((savedTrack) => savedTrack.id === track.id)) {
            return;
        } else {
            tracks.push(track);
            // this.setState({ playlistTracks: tracks });
            setPlaylistTracks(tracks);
            for (let i = searchResults.length - 1; i >= 0; i--) {
                if (searchResults[i] === track) {
                searchResults.splice(i, 1);
                }
            }

            // this.setState({ searchResults: searchResults });
            setSearchResults(searchresults);
        }
    },
    [playlistTracks, searchResults],
  );

  const removeTrack = useCallback(
    track => {
        let tracks = playlistTracks;
        tracks.splice(track, 1);
        // this.setState({ playlistTracks: tracks });
        setPlaylistTracks(tracks);
    },
    [playlistTracks],
  );

  const updatePlaylistName = playlistname => setPlaylistName(playlistname);

  const savePlaylist = useCallback(
    () => {
    const trackURIs = playlistTracks.map((track) => track.uri);
        Spotify.savePlaylist(
            playlistName,
            trackURIs,
            ).then(
                () => {
                    // this.setState({
                    //     playlistName: "New Playlist",
                    //     playlistTracks: [],
                    // });
                    setPlaylistName('New Playlist');
                    setPlaylistTracks([]);
                },
            );
    },
    [playlistTracks],
  );

  const search = useCallback(
    term => {
        Spotify.search(term).then(
            (searchresults) => {
            setSearchResults(serachresults);
            // this.setState({ searchResults: searchResults });
            },
        );
        // this.setState({ searchTerm: term });
        setSearchTerm(term);
    },
    [],
  );

//   componentDidMount() {
//     this.checkLogin();
//   }

return <div className="body">
    {showLogin
        ? <>
            <div className="titleheader">
                <h1>
                Swiftify
                <p>Reclaim your spotify playlists</p>
                </h1>
            </div>
            <div className="App">
                {showLogin && <Login onClick={login} />}
            </div>
        </>
        : <>
            <div className="titleheader">
                <h1>
                Swiftify
                <p>Reclaim your spotify playlists</p>
                </h1>
            </div>
            <div className="App">
                {showLogin && <Login onClick={login} />}
                {!showLogin && <>
                    <SearchBar onSearch={search} />
                    <div className="App-playlist">
                    <SearchResults
                        searchResults={searchResults}
                        onAdd={addTrack}
                    />

                    <PlayList
                        playlistName={playlistName}
                        playlistTracks={playlistTracks}
                        onRemove={removeTrack}
                        onNameChange={updatePlaylistName}
                        onSave={savePlaylist}
                    />
                    </div>
                </>}
            </div>
        </>
    }
    <Footer />  
</div>;
};
