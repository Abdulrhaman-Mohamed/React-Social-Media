import React, { useEffect } from 'react'

import { useInfiniteQuery } from '@tanstack/react-query'
import { useInView } from 'react-intersection-observer';

import { api } from '../api/axios'
import PostCard from './PostCard'

export default function ProfilePostsContainer({userId = ""}) {

  const { ref, inView } = useInView();


  const fetchProfilePosts =async ({pageParam}) => {
    const response = await api.get(`/post/userposts?user=${userId}&page=${pageParam}`)
    return response.data;
}

    const {data , isLoading , error , fetchNextPage, hasNextPage } = useInfiniteQuery({
        queryKey: ['profilePosts'],
        initialPageParam: 1,
        queryFn:fetchProfilePosts,
        getNextPageParam: (lastPage,allpage) => lastPage.length? allpage.length + 1 : undefined
    });

    useEffect(() => {
      
        if(inView && hasNextPage) fetchNextPage()
    }, [inView , hasNextPage , fetchNextPage ])
    

    if(isLoading) return <div>Loading...</div>
    if(error) return <div>Error...</div>

  return (
    <>
    <div className='w-full flex flex-col  items-center mt-10'>
    {
      data.pages.map((group,index) => (
        <div key={index}>
          {group.map((post , index) => {
            if(index + 1 === group.length ){
              return (
                <div ref={ref} key={post._id}>
                  
                <PostCard post={post} userId={userId} />
              </div>
              )
            }
            return(
              <React.Fragment key={post._id}>
              <PostCard post={post} userId={userId} />
              </React.Fragment>
            )

          })}
        </div>
      ))
    }
    </div>
    

      {hasNextPage ? <button onClick={fetchNextPage}>Load More</button> : null}

    </>
  )
}
