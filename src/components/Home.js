import React,{useState, useEffect} from 'react'
import PostForm from './PostForm'
import Posts from './Posts'
import { db } from '../firebase'

const Home = () => {

    const [docs, setDocs] = useState([])
    const [loadingData, setLoadingData] = useState(true)

    useEffect(() => {
        db.collection("userPosts").orderBy('createdAt', 'desc').get()
        .then(querySnapshot => {
            const posts = []
            querySnapshot.forEach(doc => {
                posts.push(doc.data())
            })
            setDocs(posts)
            setLoadingData(false)
        }).catch(err => console.log(err))
        
        
    }, [loadingData])

    return (
        <div>
            <PostForm posts={docs} setPosts={setDocs}/>
            <Posts posts={docs} loading={loadingData}/>
        </div>
    )
}

export default Home
