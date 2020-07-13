import React from 'react';
import { connect } from 'react-redux'
import { getUsersRequest, createUserRequest, deleteUsersRequest } from '../actions/users'
import UsersList from './usersList'
import NewUserForm from './NewUserForm'

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

  render() {
    const users = this.props.users
    return (
      <div style={{ margin: '0 auto', padding: '20px', maxWidth: '600px' }}>
        <NewUserForm onSubmit={this.handleSubmit} />
        <UsersList users={users.items} onDeleteUser={this.handleDeleteUserClick} />
      </div>
    )
  }
}
//export default connect(mapStateToProps, mapDispatchToProps)(App)
export default connect(({ users }) => ({ users }), {
  getUsersRequest,
  createUserRequest,
  deleteUsersRequest
})(App);
