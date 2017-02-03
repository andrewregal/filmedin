import React from 'react';
import helpers from '../lib/helpers';
var FeedEntry = ({handleFilmClick, handleUserClick, feed}) => (
  <div className="feed-entry"> 
    {console.log(feed)}
    <div className="feed-entry-info">
      <a href="#" onClick={() => {handleUserClick(feed.id)}}>{feed.firstName} {feed.lastName}</a> rated <a href="#" onClick={() => {handleFilmClick(feed.guideBox)}}>{feed.name}</a> {feed.rating} stars.
    </div>
    <div className="feed-entry-time">{"Rated " + helpers.dateDiff(feed.createdAt) + " ago"}</div>
  </div>

)

export default FeedEntry;