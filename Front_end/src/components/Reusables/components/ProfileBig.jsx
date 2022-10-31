import React from 'react'
import { ProfileIcon } from './ProfileIcon'

const ProfileBig = ({profile, position}) => {

  return (
    <div className="WeeklyCal-Profiles myProfile">

        <div className="title">
          <div className="iconNme">
            <ProfileIcon position={position} />
            <div className="me">me</div>
          </div>
          <div className="position">{profile?.type}</div>
        </div>
        <div className="Name-container">
          <div className="name">
            {profile?.firstname}, {profile?.lastname}
          </div>
        </div>
      </div>
  )
}

export default ProfileBig