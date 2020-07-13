import React from 'react';
import { connect } from 'react-redux'
import { getUsersRequest, createUserRequest, deleteUsersRequest, usersError } from '../actions/users'
import UsersList from './usersList'
import NewUserForm from './NewUserForm'
import { Alert } from 'reactstrap';

class App extends React.Component {

  constructor(props) {
    super(props)
    this.props.getUsersRequest();
  }

  handleSubmit = ({ firstName, lastName }) => {
    this.props.createUserRequest({
      firstName, lastName
    })
  }

  handleDeleteUserClick = (id) => {
    this.props.deleteUsersRequest(id)
  }

  handleCloseAlert = () => {
    this.props.usersError({
      error: ''
    });
  };

  render() {
    const users = this.props.users
    return (
      <div style={{ margin: '0 auto', padding: '20px', maxWidth: '600px' }}>
        <h2>
          Users
                </h2>
        <Alert color="danger" isOpen={!!this.props.users.error} toggle={this.handleCloseAlert}>
          {this.props.users.error}
        </Alert>
        <NewUserForm onSubmit={this.handleSubmit} />
        {!!users.items && !!users.items.length &&
          <UsersList users={users.items} onDeleteUser={this.handleDeleteUserClick} />}
      </div>
    )
  }
}
//export default connect(mapStateToProps, mapDispatchToProps)(App)
export default connect(({ users }) => ({ users }), {
  getUsersRequest,
  createUserRequest,
  deleteUsersRequest,
  usersError
})(App);
