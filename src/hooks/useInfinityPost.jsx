import { useEffect, useState } from "react"
import { api, getPostsPage } from "../api/axios"



const useInfinityPost = (page=1) => {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [hasMore, setHasMore] = useState(false);


    


    useEffect(() => {
        const controller = new AbortController()
        const { signal } = controller

        setLoading(true)
        getPostsPage(page ,{signal})
        .then((data)=>{
            console.log(data);
            setPosts(prevPosts => {
                return [...prevPosts, ...data]
            })
            setHasMore(data.length > 0)
            setLoading(false)
        })
        .catch((error)=>{
            setLoading(false)
            if(signal.aborted) return
            setError(error)
        })



        return ()=> controller.abort()
        
    }, [page])

    return { posts, loading, error, hasMore }
}

export default useInfinityPost;