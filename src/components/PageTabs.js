import React from 'react';
import { Link } from 'react-router-dom';

import './PageTabs.css';

class PageTabs extends React.Component {
  state = { currentPage: '/' }

  isActiveTab(tabName) {
    return (tabName === this.state.currentPage) ? 'nav-link active' : 'nav-link';
  }

  onTabClick(event, tabName) {
    this.setState({ currentPage: tabName })
  }

  render () {
    return (
      <ul className='nav page-tabs'>
        <li className='nav-item'>
          <Link className={this.isActiveTab('/')} to="/"
                onClick={event => this.onTabClick(event, '/')}>
            Grid View
          </Link>
        </li>
        <li className='nav-item'>
          <Link className={this.isActiveTab('/list-items')} to="/list-items"
                onClick={event => this.onTabClick(event, '/list-items')}>
            List View
          </Link>
        </li>
        <li className='nav-item'>
          <Link className={this.isActiveTab('/add-task')} to="/add-task"
                onClick={event => this.onTabClick(event, '/add-task')}>
            Add Task
          </Link>
        </li>
      </ul>
    )
  }

};

export default PageTabs;