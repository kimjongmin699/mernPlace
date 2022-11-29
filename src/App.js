import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NewPlace from './places/pages/NewPlace'
import MainNavigation from './shared/components/Navigation/MainNavigation'
import User from './user/pages/User'
import UserPlaces from './places/pages/UserPlaces'
import UpdatePlace from './places/pages/UpdatePlace'
import Auth from './user/pages/Auth'
import { AuthContext } from './shared/context/auth-context'
import Upload from './user/pages/Upload'
import { AuthHook } from './shared/hooks/auth-hook'

function App() {
  const { login, logout, userId, token } = AuthHook()

  let routes

  if (!token) {
    routes = (
      <Routes>
        <Route path="/" element={<User />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/:userId/places" element={<UserPlaces />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/*" elemen={<Auth />} />
      </Routes>
    )
  } else {
    routes = (
      <Routes>
        <Route path="/" element={<User />} />
        <Route path="/places/new" element={<NewPlace />} />
        <Route path="/places/:placeId" element={<UpdatePlace />} />
        <Route path="/:userId/places" element={<UserPlaces />} />
      </Routes>
    )
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token, //!!두개 붙이면 true/false를 return 해줌.
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <BrowserRouter>
        <MainNavigation />
        <main>{routes}</main>
      </BrowserRouter>
    </AuthContext.Provider>
  )
}

export default App
