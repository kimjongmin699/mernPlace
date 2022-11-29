import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import PlaceList from '../components/PlaceList'

const UserPlaces = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()
  const [loadedPlaces, setLoadedPlaces] = useState([])

  const userId = useParams().userId

  useEffect(() => {
    const sendRequest = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(
          process.env.REACT_APP_BACKEND + `/places/user/${userId}`
        )
        const responseData = await response.json()
        if (!response.ok) {
          throw new Error(responseData.message)
        }
        // console.log(responseData.places.places)
        setLoadedPlaces(responseData.places.places)
        setIsLoading(false)
      } catch (err) {
        setError(err.message)
      }
      setIsLoading(false)
    }
    sendRequest()
  }, [userId])

  console.log(loadedPlaces)
  const errorHandler = () => {
    setError(null)
  }

  const placeDeleteHandler = (deletedPlaceId) => {
    setLoadedPlaces((prev) =>
      prev.filter((place) => place.id !== deletedPlaceId)
    )
  }

  return (
    <>
      <ErrorModal error={error} onClear={errorHandler} />
      {isLoading && (
        <div>
          <LoadingSpinner asOverlay />
        </div>
      )}
      {!isLoading && loadedPlaces && (
        <PlaceList items={loadedPlaces} onDeletePlace={placeDeleteHandler} />
      )}
    </>
  )
}

export default UserPlaces

// export const DUMMY_PLACES = [
//   {
//     id: 'p1',
//     title: 'restaurant China',
//     description: 'verty delicious',
//     imageUrl:
//       'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
//     address: '서울 서초구 ',
//     location: {
//       lat: 40,
//       lng: -73,
//     },
//     creator: 'u1',
//   },
//   {
//     id: 'p2',
//     title: 'restaurant Japan',
//     description: 'verty delicious!!!!!!!!',
//     imageUrl:
//       'https://cafe24img.poxo.com/ygnext/web/upload/NNEditor/20210518/mobile/ce60c9d56937bd70a0eaa6f5874d1665_1621331215.jpg',
//     address: '부산 서초구 ',
//     location: {
//       lat: 12,
//       lng: 12,
//     },
//     creator: 'u2',
//   },
// ]
