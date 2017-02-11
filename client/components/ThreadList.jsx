import React from 'react';
import $ from 'jquery';
import helpers from '../lib/helpers';

class ThreadList extends React.Component {
  constructor(props) {
    super(props);
    this.onTopicSelect = this.onTopicSelect.bind(this);
  }

  componentDidMount() {
    this.onTopicSelect();
  }

  componentDidUpdate() {
    this.onTopicSelect();
  }

  onTopicSelect() {
    var context = this;
    $('.thread').on('click', function(e) {
      var title = $(this).text();
      context.props.handleThreadEntryClick(title);
    });
  }

  render() {
    const { threadTopics } = this.props;
    var threads = threadTopics.map((thread, i) => {
      var {dateAmerican, dateWords, timeWithTimeZone } = helpers.timestampParser(thread.createdAt);

      return (
        <tr key={i} value={thread.topic}>
          <th className="thread">{thread.topic}</th>
          <th>{dateAmerican + ' @ ' + timeWithTimeZone}</th>
        </tr>
      )
    });

    return (
      <div className="thread-list">
        <button
          className="btn btn-primary btn-lg"
          onClick={this.props.setShowCreateThreadView}
        >
          Create New Thread
        </button>
        <table className="table">
          <tbody>
            <tr>
              <th><h4><strong>Topic Title</strong></h4></th>
              <th><h4><strong>Created At</strong></h4></th>
            </tr>
            { threads }
          </tbody>
        </table>
      </div>
    )
  }
}

ThreadList.propTypes = {
  threadTopics: React.PropTypes.array.isRequired,
  handleThreadEntryClick: React.PropTypes.func.isRequired,
  setShowCreateThreadView: React.PropTypes.func.isRequired
}


export default ThreadList;