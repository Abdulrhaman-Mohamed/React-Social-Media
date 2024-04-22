import { useInfiniteQuery } from '@tanstack/react-query'
import React from 'react'
import { api } from '../api/axios'
import PostCard from './PostCard'
import useAuth from '../hooks/useAuth'

export default function ProfilePostsContainer({userId = "661e60e01557b6b4ae2a0802"}) {

  const { getFromLocalStorage } = useAuth();
  const userData = getFromLocalStorage();

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


    if(isLoading) return <div>Loading...</div>
    if(error) return <div>Error...</div>

  return (
    <>
    <div className='w-full flex flex-col  items-center mt-10'>
    {
      data.pages.map((group,index) => (
        <div key={index}>
          {group.map((post) => (
            <React.Fragment key={post._id}>
            <PostCard post={post} userId={userData._id} />
            </React.Fragment>
          ))}
        </div>
      ))
    }
    </div>
    

      {hasNextPage ? <button onClick={fetchNextPage}>Load More</button> : null}

    </>
  )
}
