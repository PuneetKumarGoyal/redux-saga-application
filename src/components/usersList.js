import React from 'react'
import users from '../reducers/users'
import { ListGroup, ListGroupItem, Button } from 'reactstrap'

const UsersList = ({ users, onDeleteUser }) => {
    return (
        <ListGroup>
            {users.sort((a, b) => {
                if (a.firstName > b.firstName) {
                    return 1;
                } else if (a.firstName < b.firstName) {
                    return -1;
                } else if (a.lastName > b.lastName) {
                    return 1;
                }
                else {
                    return -1;
                }
            }).map((user) => {
                return <ListGroupItem key={user.id} >
                    <section style={{ display: 'flex', margin: 'auto 0' }}>
                        <div style={{ flexGrow: 1 }}>
                            {user.firstName} {user.lastName} {user.id}
                        </div>
                        <div>
                            <Button outline color="danger" onClick={() => onDeleteUser(user.id)}>
                                Delete
                            </Button>
                        </div>
                    </section>
                </ListGroupItem>
            })}
        </ListGroup>
    )
}

export default UsersList