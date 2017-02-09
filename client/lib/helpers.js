import axios from 'axios';
import react from 'react';

var getRequest = function (url) {
  var request = {
    headers: {
      'x-access-token': window.localStorage.getItem('filmedInToken'),
      'Content-Type': 'application/json; charset=utf-8',

    },
    url: url,
    baseURL: 'http://localhost:5000/',
    method: 'GET'
  }
  return request;
}

var helpers = {};

helpers.logInUser = function(data) {
  return axios.request({
    url: 'http://localhost:5000/signin',
    method: 'POST',
    data: data
  });
}
helpers.signUpUser = function(data) {
  return axios.request({
    url: 'http://localhost:5000/signup',
    method: 'POST',
    data: data
  });
}
helpers.getHome = function () {
  return axios.request(getRequest('/home'));
}
helpers.getFeed = function () {
  return axios.request(getRequest('/feed'));
}
helpers.getProfile = function (id) {
  return axios.request(getRequest('/profile/' + id));
}
helpers.getFilm = function(id) {
  return axios.request(getRequest('/film/' + id));
}

helpers.getMovies = function() {
  var url = 'http://data.tmsapi.com/v1.1/movies/showings?startDate=2017-02-08&zip=94030&imageSize=Sm&imageText=false&api_key=jpc43qej3q9yvtdy4urfh3rr'
  return axios.request(getRequest(url))
}

helpers.searchProfile = function(search) {
  return axios.request(getRequest('/searchprofile/' + search));
}
helpers.searchFilm = function(search) {
  return axios.request(getRequest('/searchfilm/' + search));
}
helpers.addFriend = function(friendID) {
  return axios.request({
    url: 'http://localhost:5000/friend',
    method: 'POST',
    headers: {
      'x-access-token': window.localStorage.getItem('filmedInToken'),
      'Content-Type': 'application/json; charset=utf-8',
    },
    data: {
      friendID: friendID
    }
  });
}
helpers.addRating = function(filmID, rating, review) {
  return axios.request({
    url: 'http://localhost:5000/rating',
    method: 'POST',
    headers: {
      'x-access-token': window.localStorage.getItem('filmedInToken'),
      'Content-Type': 'application/json; charset=utf-8',
    },
    data: {
      filmID: filmID,
      rating: rating,
      review: review
    }
  });
}

helpers.castList = function(string) {
  return string.split(';').map(pair => {
    return pair.split(':')
  })
}
helpers.dateDiff = function(date) {
  var today = new Date();
  var calcDate = new Date(date);
  var diff = today - calcDate;
  var msec = diff;
  var dd = Math.floor(msec / 1000 / 60 / 60 / 24);
  msec -= dd * 1000 * 60 * 60 * 24;
  var hh = Math.floor(msec / 1000 / 60 / 60);
  msec -= hh * 1000 * 60 * 60;
  var mm = Math.floor(msec / 1000 / 60);
  return (dd !== 0 ? (dd + "d ") : "") + (hh !== 0 ? (hh + "h ") : "") + (mm !== 0 ? (mm + "m ") : "");
}

helpers.getUserIdByName = function(username) {
  return axios({
    method: 'get',
    url: 'http://localhost:5000/users',
    params: {
      username: username
    }
  });
}

helpers.getMessagesByTopicId = function(topicId) {
  /* TODO */
}

helpers.getTopics = function () {
  return axios({
    method: 'get',
    url: 'http://localhost:5000/topics'
  });
}

<<<<<<< HEAD
helpers.postMessage = function(topicID, topicMessage, userID) {
  return axios.request({
  url: 'http://localhost:5000/postMessage',
    method: 'POST',
    headers: {
      'x-access-token': window.localStorage.getItem('filmedInToken'),
      'Content-Type': 'application/json; charset=utf-8',
    },
    data: {
      topicID: topicID,
      topicMessage: topicMessage,
      userID: userID
=======
helpers.setFavoriteGenre = (category, id) => {
  return axios.request({
    url: 'http://localhost:5000/setFavoriteGenre',
    data: {
      category: category,
      id: id
>>>>>>> 3f3ec6108190bbda5528ae7c9581c97f1e9f3078
    }
  });
}

<<<<<<< HEAD
=======
helpers.postMessage = function(topicID, topicMessage, userID) {
  return axios.request({
  url: 'http://localhost:5000/postMessage',
    method: 'POST',
    headers: {
      'x-access-token': window.localStorage.getItem('filmedInToken'),
      'Content-Type': 'application/json; charset=utf-8',
    },
    data: {
      topicID: topicID,
      topicMessage: topicMessage,
      userID: userID
    }
  });
}

>>>>>>> 3f3ec6108190bbda5528ae7c9581c97f1e9f3078
helpers.postNewTopic = function(topicName) {
  return axios.request({
  url: 'http://localhost:5000/postTopic',
    method: 'POST',
    headers: {
      'x-access-token': window.localStorage.getItem('filmedInToken'),
      'Content-Type': 'application/json; charset=utf-8',
    },
    data: {
      topicName: topicName
    }
  });
<<<<<<< HEAD
=======
}

helpers.getMessagesByTopicTitle = function(title) {
  return axios.request({
    url: 'http://localhost:5000/getMessagesByTitle',
    method: 'GET',
    headers: {
      'x-access-token': window.localStorage.getItem('filmedInToken'),
      'Content-Type': 'application/json; charset=utf-8',
    },
    params: {
      title: title
    }
  });
>>>>>>> 3f3ec6108190bbda5528ae7c9581c97f1e9f3078
}

export default helpers
