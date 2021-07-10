import React from 'react'
import Spinner  from './Spinner'
import Post from './Post'


const Posts = ({posts, loading}) => {
    

    return (
        <div>
            {loading ? <Spinner /> : posts.map(post => <Post key={post.id} date={post.createdAt} username={post.username} body={post.body}/>)}
        </div>
    )
}

export default Posts
