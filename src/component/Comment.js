import React from 'react';
import getFormattedDate from '../util/dateUtils';
import CommentReplies from './CommentReplies';

export default function Comment({ comment, counter }) {
  return (
    <div className="card w-80 mb-1 mx-1">
      <div className="card-header">{comment.user.name}</div>
      <div className="card-body">
        <blockquote className="blockquote mb-0">
          <p>{comment.text}</p>
          <footer className="blockquote-footer">{getFormattedDate(comment.createdAt)}</footer>
        </blockquote>
      </div>
      <CommentReplies eventKey={counter} commentId={comment._id} movieId={comment.movie} />
    </div>
  );
}
