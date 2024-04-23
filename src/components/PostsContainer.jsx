import React, { useCallback, useEffect, useRef, useState } from "react";
import PostCard from "./PostCard";
import useAuth from "../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPostsPaginagtions,
  loadingPosts,
} from "../feature/post/postSlice";

import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function () {
  
  //state
  const { posts, loading, error, hasMore, pages } = useSelector(
    (state) => state.post
  );

  const [numPage, setNumPage] = useState(pages[pages.length - 1] || 1);

  const dispatch = useDispatch();

  useEffect(() => {
    if (pages.includes(numPage)) return;
    // dispatch for loading while scrolling
    dispatch(loadingPosts(true));
    // dispatch for fetching data while pagenum is change and not imcludeed in pages state
    const dispatchingPromise = dispatch(fetchPostsPaginagtions(numPage));

    return () => dispatchingPromise.abort();
  }, [numPage]);

  const { getFromLocalStorage } = useAuth();

  const userData = getFromLocalStorage();

  //Ref
  const initObserverScrollElement = useRef();

  const triggerElement = useCallback(
    (post) => {
      if (loading) return;

      if (initObserverScrollElement.current)
        initObserverScrollElement.current.disconnect();

      initObserverScrollElement.current = new IntersectionObserver((posts_) => {
        if (posts_[0].isIntersecting && hasMore) setNumPage((prev) => prev + 1);
      });

      if (post) initObserverScrollElement.current.observe(post);
    },
    [loading, hasMore]
  );

  if (error)
    return (
      <>
        <div className=" mt-2 md:w-[600px] flex flex-col gap-5  items-center m-auto">
          <p>Erorr is {error.message}</p>
        </div>
      </>
    );

  return (
    <>
      <div className=" mt-2 md:w-[600px] flex flex-col gap-5  items-center m-auto">
        {posts.map((p, i) => {
          // console.log(p._id);
          if (posts.length - 1 === i)
            return (
              <PostCard
                ref={triggerElement}
                key={p._id}
                post={p}
                userId={userData._id}
              />
            );

          return <PostCard key={p._id} post={p} userId={userData._id} />;
        })}

        {loading && <span> it is loading for now .....</span>}
      </div>
      <ToastContainer />
    </>
  );
}
