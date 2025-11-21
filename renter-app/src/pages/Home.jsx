import React from 'react'
import StationMap from '../views/StationMap'

export default function Home(){
  return (
    <div className="page container">
      <h1>Find EV Stations Nearby</h1>
      <StationMap />
    </div>
  )
}
