import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import DOMPurify from "dompurify";
import axios from "axios";

const Home = () => {

  const [posts, setPosts] = useState([]);

  const cat = useLocation().search;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/posts${cat}`);
        setPosts(res.data);
      } catch (error) {
        // console.log(error);
      }
    };
    fetchPosts();
  }, [cat]);

  return (
    <div className="home">
      <div className="posts">
        {posts.map((post) => (
          <div div key={post.id} className="post" >
            <div className="img">
              <img src={`/images/${post.img}`} alt={post.title} />
            </div>
            <div className="content">
              <Link to={`/post/${post.id}`}>
                <h1>{post.title}</h1>
              </Link>
              <p
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(post.desc),
                }}
              ></p>
              <button>Read More</button>
            </div>
          </div>
        )
        )}
      </div>
    </div >
  );
};

export default Home;
