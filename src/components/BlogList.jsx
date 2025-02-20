import { useState, useEffect } from 'react';
import axios from 'axios';



const BlogList = () => {

    // UTILIZZO USESTATE PER LA GESTIONE DEI DATA 

    const [blogs, setBlogs] = useState([]);

    // FUNZIONE DI GESTIONE CHIAMATA API

    function fetchPosts() {

        axios.get("http://localhost:3000/posts")

            .then((res) =>

                setBlogs(res.data)
            )
    }

    // CHIAMATA SOLO AL PRIMO RENDERING
    useEffect(fetchPosts, []);

    return (
        <>

            {/* MAP */}

            {
                blogs.map((post) => (

                    <div key={post.id}>
                        <h2>{post.title}</h2>
                        <img src={post.image} alt={post.title} />
                        <p>{post.content}</p>
                        <span>{post.tags} </span>
                    </div>

                ))
            }
        </>
    )
}
















export default BlogList