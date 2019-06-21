import React from 'react';
// import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

const NoteCard = ({ match, note }) => {
  console.log(note);
  return (
    <div className="card">
      <img className="card-img-top" src={note.image} alt="Note image" />
      <div className="card-body">
        <h6 className="card-title mb-2 text-muted text-center">
          <Link to={`${match.path}/${note._id}`}>{note.title}</Link>
        </h6>
        <p className="card-text mb-2 text-muted text-center">{note.content}</p>
      </div>
    </div>
  );
};

export default withRouter(NoteCard);
