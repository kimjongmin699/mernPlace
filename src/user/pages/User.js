import React, { useEffect, useState } from 'react'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import UserList from '../components/UserList'

const User = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()
  const [loadedUsers, setLoadedUsers] = useState()
  useEffect(() => {
    const sendRequest = async () => {
      setIsLoading(true)
      try {
        const response = await fetch('https://mern-place123.herokuapp.com/api/users')
        const responseData = await response.json()
        if (!response.ok) {
          throw new Error(responseData.message)
        }

        setLoadedUsers(responseData.users)
      } catch (err) {
        setError(err.message)
      }
      setIsLoading(false)
    }
    sendRequest()
  }, [])

  //console.log(loadedUsers)
  const errorHandler = () => {
    setError(null)
  }

  return (
    <>
      <ErrorModal error={error} onclear={errorHandler} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedUsers && <UserList items={loadedUsers} />}
    </>
  )
}

export default User
