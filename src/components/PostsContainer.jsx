
import React, { useCallback, useRef, useState } from 'react'
import PostCard from './PostCard'
import useInfinityPost from '../hooks/useInfinityPost'
import useAuth from '../hooks/useAuth';

export default function () {
  //state
  const [numPage,setNumPage] = useState(1);

  
  const{
    posts,
    loading,
    error,
    hasMore
  }= useInfinityPost(numPage)

  const{getFromLocalStorage} = useAuth();

  const userData = getFromLocalStorage();
  // console.log(userData);


  //Ref
  const initObserverScrollElement = useRef();

  const triggerElement = useCallback((post)=>{
    if(loading) return

    if(initObserverScrollElement.current) initObserverScrollElement.current.disconnect();

    initObserverScrollElement.current = new IntersectionObserver((posts_)=>{
      if(posts_[0].isIntersecting && hasMore) setNumPage(prev => prev+1)
    })


    if(post) initObserverScrollElement.current.observe(post)


  },[loading , hasMore])



if(error) return(
  <>
  <div className=' mt-2 md:w-[600px] flex flex-col gap-5  items-center m-auto'>
    <p>Erorr is {error.message}</p>
  </div>
  </>
)
  



  return (
    <>
    <div className=' mt-2 md:w-[600px] flex flex-col gap-5  items-center m-auto'>
    {
      posts.map((p,i)=>{
        // console.log(p._id);
        if(posts.length-1 === i) return <PostCard ref={triggerElement} key={p._id} post={p} userId={userData._id} />

        return <PostCard key={p._id} post={p} userId={userData._id} />
      })
    }

    {
      loading && <span> it is loading for now .....</span>
    }

    </div>
    
    </>
  )
}
