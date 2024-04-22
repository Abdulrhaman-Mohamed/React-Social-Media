import React from 'react'
import ProfileDataImage from '../../components/ProfileDataImage'
import ProfileDataDetails from '../../components/ProfileDataDetails'

import ProfilePostsContainer from '../../components/ProfilePostsContainer';
import { useParams } from 'react-router-dom';

export default function ProfileUser() {
   const params = useParams();
  return (
    <main className=' relative'>
        {/* Middle side */}
        <div className=' lg:w-[600px]  flex flex-col gap-5 mx-auto    order-2'>
            <ProfileDataImage />
        </div>
        {/* Right side */}
        <div className=' order-1 lg:w-[250px]   lg:flex lg:h-screen lg:items-center lg:px-2 py-2 lg:fixed lg:left-0 lg:top-0 lg:bottom-0 '>
            <ProfileDataDetails />
        </div>
        <div className=' lg:w-[600px] flex flex-col gap-5 mx-auto    order-3'>
        <ProfilePostsContainer  />
        </div>
    </main>
  )
}
