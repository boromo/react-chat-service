import React from 'react';
import { Link } from 'react-router';

const Header = () => (
  <div className="header clearfix">
    <nav>
      <ul className="nav nav-pills pull-right">
        <li role="presentation"><Link to="/">Home</Link></li>
        <li role="presentation"><Link to="/active-users">Active users</Link></li>
        <li role="presentation"><Link to="/admin">Admin</Link></li>
      </ul>
    </nav>
    <h3 className="text-muted">Chat Service</h3>
  </div>
  );

export default Header;
