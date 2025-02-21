import { useState, useEffect } from 'react';
import axios from 'axios';


//  AGGIUNGIAMO I CAMPI VUOTI AL FORM
const initialFormData = {
    titolo: "",
    content: "",
    image: "",
    tags: "",
};


const BlogList = () => {

    // UTILIZZO USESTATE PER LA GESTIONE DEI DATA 

    const [blogs, setBlogs] = useState([]);

    //STATE GESTIONE INFORMAZIONI RACCOLTE DAI CAMPI DEL FORM

    const [formData, setFormData] = useState(initialFormData);

    // FUNZIONE GESTIONE INFO CAMPI
    function handleFormData(e) {

        // GESTIONE VALUE A SECONDA DEL TIPO DI INPUT
        const value = e.target.type === "" ? e.target.checked : e.target.value;

        //SETTA TRAMITE SETSTATE L'OGGETTO CON LE INFO PRESI DAI CAMPI DEL FORM
        setFormData((currentFormData) => ({
            ...currentFormData,
            [e.target.name]: value,
        }));
    }


    //FUNZIONE GESTIONE INVIO DELL'INTERO FORM
    function handleSubmit(e) {
        e.preventDefault();
        setBlogs((currentBlogs) => [...currentBlogs, {
            id:
                currentBlogs.length === 0 ? 1 : currentBlogs[currentBlogs.length - 1].id + 1,
            ...formData
        }]);
        //RESETTO IL FORM
        setFormData(initialFormData);
    }

    // FUNZIONE CANCELLAZIONE BLOG
    function deleteBlog(idBlog) {
        // NUOVO ARRAY DA SOSTITUIRE ALLO STATE BLOGS
        const updateBlogs = blogs.filter((blog) => {
            return blog.id !== idBlog;
        })
        // SOSTITUZIONE
        setBlogs(updateBlogs);
    }

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
            <form action="#" onSubmit={handleSubmit}>
                {/* valore titolo blog */}
                <input
                    type="text"
                    name="titolo"
                    onChange={handleFormData}
                    value={formData.titolo}
                    placeholder='titolo del blog'
                />


                {/* valore contenuto blog */}
                <textarea
                    type="text"
                    name="content"
                    onChange={handleFormData}
                    value={formData.contenuto}
                    placeholder='contenuto del blog'
                />

                {/* valore autore blog */}
                <input
                    type="text"
                    name="image"
                    onChange={handleFormData}
                    value={formData.autore}
                    placeholder='img'
                />


                {/* valore categoria blog */}
                <input
                    type="text"
                    name="tags"
                    onChange={handleFormData}
                    value={formData.categoria}
                    placeholder='tags'
                />

                <button>Aggiungi</button>


            </form >


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