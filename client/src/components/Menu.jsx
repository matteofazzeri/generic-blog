import axios from "axios";
import React, { useEffect, useState } from "react";

const Menu = ({cat}) => {
  
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/posts/?cat=${cat}`);
        setPosts(res.data);
      } catch (error) {
        // console.log(error);
      }
    };
    fetchPosts();
  }, [cat]);

  return (
    <div className="menu">
      <h1>Other post you may like</h1>

      {posts.map((post) => (
        <div key={post.id} className="post">
          <img src={`/images/${post.img}`} alt={post.title} />
          <h2>{post.title}</h2>
          <button>Read More</button>
        </div>
      ))}
    </div>
  );
};

export default Menu;
