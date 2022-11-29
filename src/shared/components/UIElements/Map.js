import React, { useRef, useEffect } from 'react'

import './Map.css'

const Map = (props) => {
  const mapRef = useRef()
  const { center, zoom } = props

  useEffect(() => {
    const map = new window.google.maps.Map(mapRef.current, {
      center: center,
      zoom: zoom,
    })
    console.log(map)
    new window.google.maps.Marker({ position: center, map: map })
  }, [center, zoom])

  return (
    <div
      ref={mapRef}
      className={`map ${props.className}`}
      style={props.style}
    ></div>
  )
}

export default Map

// let map;

// function initMap() {
//   map = new google.maps.Map(document.getElementById("map"), {
//     center: { lat: -34.397, lng: 150.644 },
//     zoom: 8,
//   });
// }

// window.initMap = initMap;
