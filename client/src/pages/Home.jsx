import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import DOMPurify from "dompurify";
import axios from "axios";

import Skeleton from "@mui/material/Skeleton";


const Home = () => {

  const [posts, setPosts] = useState([]);

  const cat = useLocation().search;

  console.log(cat);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URI}posts${cat}`);

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
        {posts.length ? posts.map((post) => (
          <div key={post.id} className="post" >
            <div className="img">
              {post.img !== null ? <img src={`/images/${post.img}`} alt={post.title} /> : <Skeleton variant="rectangular" width={400} height={250} />}
            </div>
            <div className="content">
              {post.title !== null ? <Link className="title-link" to={`/post/${post.id}`}>
                <h1>{post.title}</h1>
              </Link> : <Skeleton variant="text" width={400} height={50} />}
              {post.description.length ? <p
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(post.description),
                }}
              ></p> :
                <p><Skeleton variant="text" width={300} height={100} /></p>}
              <Link to={`/post/${post.id}`}>
                <button>Read More</button>
              </Link>
            </div>
          </div>
        )
        ) :
          <div className="post">
            <Skeleton variant="rectangular" width={450} height={250} />
            <div className="content">
              <Skeleton variant="text" width={400} height={30} />
              <Skeleton variant="text" width={400} height={100} />
              <Skeleton variant="button" width={100} height={50} />
            </div>
          </div>
        }
      </div>
    </div >
  );
};

export default Home;
