import axios from 'axios';
import React from 'react';
import SignUp from './SignUp';
import UserHome from './UserHome';
import FilmProfile from './FilmProfile';
import UserProfile from './UserProfile';
import exampleVideoData from './exampleVideoData';
import exampleFriendData from './exampleFriendData';
import helpers from '../lib/helpers';
import SearchUser from './SearchUser';
import SearchFilm from './SearchFilm';
import NavBar from './NavBar';
import Forum from './Forum';
import CreateTopic from './CreateTopic';
import Thread from './Thread';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    	isLoggedIn: false,
      profile: {},
      clickedFilm: {},
      clickedFilmRecommend: false,
      clickedUser: {},
      view: '',
      feed: [],
      searchUser: [],
      searchFilm: [],
      username: '',
      userID: null,
      topics: [],
      currentTopicID: null,
      topicMessages: []
    }

    this.handleSearchUserClick = this.handleSearchUserClick.bind(this);
    this.handleSearchFilmClick = this.handleSearchFilmClick.bind(this);
    this.handleFilmClick = this.handleFilmClick.bind(this);
    this.handleHomeClick = this.handleHomeClick.bind(this);
    this.handleUserClick = this.handleUserClick.bind(this);
    this.handleLogInClick = this.handleLogInClick.bind(this);
    this.handleLogOutClick = this.handleLogOutClick.bind(this);
    this.addFriend = this.addFriend.bind(this);
    this.rateFilm = this.rateFilm.bind(this);
    this.handleForumClick = this.handleForumClick.bind(this);
    this.handleCreateTopicClick = this.handleCreateTopicClick.bind(this);
    this.handleTopicClick = this.handleTopicClick.bind(this);

  }
  componentWillMount () {
    this.getTopics();
    if (window.localStorage.getItem('filmedInToken')) {
      this.setState({isLoggedIn:true});
      this.handleHomeClick();
    }
  }

  addFriend(friend) {
    helpers.addFriend(friend.id).then(res => {
      this.handleHomeClick();
    });
  }

  handleSearchUserClick(searchUser) {
    this.setState({
      searchUser: searchUser,
      view: 'showSearchUserView'
    })
  }

  rateFilm(rating, filmid) {

    helpers.addRating(filmid, rating, '').then(response => {
      console.log('rated');
    })
  }

  getTopics() {
    helpers.getTopics()
      .then(resp => {
        this.setState({
          topics: resp.data
        });
      })
      .catch(err => {
        console.log('ERROR: ', err);
      });
  }

  handleCreateTopicClick() {
    this.setState({
      view: 'showCreateTopicView'
    })
  }

  handleCreateMessageClick() {
    this.setState({
      view: 'showCreateMessageView'
    })
  }

  handleSearchFilmClick(searchFilm) {
    this.setState({
      searchFilm: searchFilm,
      view: 'showSearchFilmView'
    })
  }

  handleForumClick() {
    this.setState({
      view: 'showForumView'
    })
  }

  handleTopicClick(data) {
    this.setState({
      topicMessages: data,
      view: 'showThreadView'
    });
    console.log('Current Messages for Thread View === ', this.state.topicMessages);
  }

  handleLogOutClick() {
    window.localStorage.removeItem('filmedInToken');
    this.setState({
      isLoggedIn: false,
      view: ''
    })
  }

  handleLogInClick(username) {
    this.handleHomeClick();
    this.setState({
      username: username
    });
    helpers.getUserIdByName(username)
      .then(resp => {
        const userID = Number(resp.data[0].id)
        this.setState({
          userID: userID
        })
      })
      .catch(err => {
        console.log('error clientside', err);
      })
  }


  handleUserClick(user) {
    helpers.getProfile((user.id || user.ID)).then(response => {
      response.data.friends = response.data.friends.filter(friend => (friend.ID !== 0))
      response.data.isFriend = this.state.profile.friends.map(friend => friend.ID).includes(user.id || user.ID);
      this.setState({
        view: 'showUserView',
        clickedUser: response.data
      })
    })
  }

  handleFilmClick(film) {
    helpers.getFilm(film.guideBox || film.id).then(response => {
      var recommend = this.state.profile.recs.map(rec => rec.filmID).includes(response.data.id);
      this.setState({
        view: 'showFilmView',
        clickedFilm: response.data,
        clickedFilmRecommend: recommend
      })
    })
  }

  handleHomeClick() {
    helpers.getHome().then(response => {
      helpers.getFeed().then(feed => {
        response.data.friends = response.data.friends.filter(friend => (friend.ID !== 0))
        this.setState({
          isLoggedIn: true,
          profile: response.data,
          username: response.data.username,
          feed: feed.data,
          view: 'showUserHomeView'
        })
      })

    })
  }

  render() {
	  if (!this.state.isLoggedIn) {
      return (
        <SignUp
          handleLogInClick={this.handleLogInClick}
        />
      )
    } else {
      return (
        <div>
          <NavBar
            handleHomeClick={this.handleHomeClick}
            handleLogOutClick={this.handleLogOutClick}
            searchUser={this.handleSearchUserClick}
            searchFilm={this.handleSearchFilmClick}
            handleForumClick={this.handleForumClick}
          />
          <div className="bodyContent">
          {
            (this.state.view === 'showFilmView') ? (
                <FilmProfile
                  film={this.state.clickedFilm}
                  clickedFilmRecommend={this.state.clickedFilmRecommend}
                  rateFilm={this.rateFilm}
                />
            ) : (this.state.view === 'showUserHomeView') ? (
                <UserHome
                  profile={this.state.profile}
                  username={this.state.username}
                  feed={this.state.feed}
                  handleFilmClick={this.handleFilmClick}
                  handleUserClick={this.handleUserClick}
                />
            ) : (this.state.view === 'showUserView') ? (
                <UserProfile
                  handleFilmClick={this.handleFilmClick}
                  handleUserClick={this.handleUserClick}
                  user={this.state.clickedUser}
                  addFriend={this.addFriend}
                />
            ) : (this.state.view === 'showSearchFilmView') ? (
                <SearchFilm
                  search={this.state.searchFilm}
                  handleFilmClick={this.handleFilmClick}
                />
            ) : (this.state.view === 'showForumView') ? (
                <Forum
                  topics={this.state.topics}
                  handleCreateTopicClick={this.handleCreateTopicClick}
                  handleTopicClick={this.handleTopicClick}
                />
            ) : (this.state.view === 'showCreateTopicView') ? (
                <CreateTopic
                  userID={this.state.userID}
                />
            ) : (this.state.view === 'showCreateMessageView') ? (
                <CreateMessage

                />
            ) : (this.state.view === 'showThreadView') ? (
                <Thread
                  messages={this.state.topicMessages}
                  userID={this.state.userID}
                />
            ) : (
                <SearchUser
                  friends={this.state.profile.friends}
                  search={this.state.searchUser}
                  handleUserClick={this.handleUserClick}
                  addFriend={this.addFriend}
                />
            )
          }
          </div>
        </div>
      );
    }
  }
}
export default App;
