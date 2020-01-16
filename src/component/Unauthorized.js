import React from 'react';

export default function Unauthorized() {
  return (
    <div className="container">
      <div className="jumbotron jumbotron-fluid rounded">
        <div className="container">
          <h1 className="display-4 text-center">403 Unauthorized</h1>
          <p className="lead text-center">
            You don&apos;t have permisions to access this resource!
          </p>
        </div>
      </div>
    </div>
  );
}
