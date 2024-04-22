import React from 'react'

import { HomeIcon , AcademicCapIcon , MapPinIcon , HeartIcon } from "@heroicons/react/24/solid";

export default function ProfileDataDetails() {
  return (
    <>
        <div className="p-2 lg:p-3  lg:rounded-xl lg:shadow-md w-full h-1/2 flex items-center ">
            {/* Information */}
            <ul className=' text-gray flex flex-col gap-3 justify-center'>
            <li className='flex items-center gap-1'><AcademicCapIcon className=" w-4 h-4 text-secondary" />Education</li>
                <li className='flex items-center gap-1'><HomeIcon className=" w-4 h-4 text-secondary" />Country</li>
                <li className='flex items-center gap-1'><MapPinIcon className=" w-4 h-4 text-secondary" />location</li>
                <li className='flex items-center gap-1'><HeartIcon className=" w-4 h-4 text-secondary" />Relational </li>
            </ul>
        </div>
    </>
  )
}
