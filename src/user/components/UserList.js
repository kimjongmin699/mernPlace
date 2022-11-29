import React from 'react'
import UserItem from './UserItem'
import './UserList.css'
import Card from '../../shared/components/UIElements/Card'

const UserList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="center">
        <Card>
          <h2>No Users found.</h2>
        </Card>
      </div>
    )
  }
  return (
    <ul className="users-list">
      {props.items.map((user) => {
        return (
          <UserItem
            key={user._id}
            id={user._id}
            image={user.image}
            name={user.name}
            placeCount={1}
          />
        )
      })}
    </ul>
  )
}

export default UserList
