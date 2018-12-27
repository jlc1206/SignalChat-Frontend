import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { logout } from './redux/actions.js';

import { history } from './App';

const UserNav = ({ user, eventkeyindex, onLogoutClick }) => {
  if (user.isLoggedIn) {
    return (
      <React.Fragment>
        <UncontrolledDropdown nav inNavbar>
          <DropdownToggle nav caret>
            {user.email}
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem>
              Account
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem onClick={onLogoutClick}>
              Log out
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </React.Fragment>
    )
  }
  else {
    return (
      <React.Fragment>
        <NavItem>
          <NavLink tag={Link} to="/login">Log in</NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} to="/register">Sign up</NavLink>
        </NavItem>
      </React.Fragment>
    )
  }
}

UserNav.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    isLoggingIn: PropTypes.bool.isRequired,
    token: PropTypes.string.isRequired
  }).isRequired
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user,
    eventkeyindex: ownProps.eventkeyindex
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLogoutClick: () => {
      dispatch(logout());
      history.push("/login");
    }
  }
}

const ConnectedUserNav = connect(mapStateToProps, mapDispatchToProps)(UserNav);

export default class Navigation extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
        <Navbar color="dark" dark expand="md">
          <NavbarBrand tag={Link} to="/">SignalChat</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink tag={Link} to="/test">Stuff</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/about">About</NavLink>
              </NavItem>
              <ConnectedUserNav />
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
