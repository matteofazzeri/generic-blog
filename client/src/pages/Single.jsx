import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Menu from "../components/Menu";
import axios from "axios";
import moment from "moment";
import { AuthContext } from "../context/authcontext";
import Edit from "../img/edit.png";
import Delete from "../img/delete.png";
import DOMPurify from "dompurify";

const Single = () => {
  const [post, setPost] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();

  const postId = location.pathname.split("/")[2];

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URI}posts/${postId}`
        );
        setPost(res.data);
      } catch (error) {
        // console.log(error);
      }
    };
    fetchPosts();
  }, [postId]);

  const handleDelete = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URI}posts/${postId}`, {
        withCredentials: true,
      });
      navigate("/");
    } catch (error) {
      // console.log(error);
    }
  };

  return (
    <div className="single">
      <div className="content">
        <img src={post ? `/images/${post.img}` : ""} alt={post.title} />
        <div className="user">
          {post.user_img && <img src={post.user_img} alt={post.username} />}

          <div className="info">
            <span>{post.username}</span>
            <p>Posted {moment(post.date).fromNow()}</p>
          </div>
          {currentUser?.username === post.username && (
            <div className="edit">
              <Link to={`/write?edit=2`} state={post}>
                <img src={Edit} alt="" />
              </Link>
              <img onClick={handleDelete} src={Delete} alt="" />
            </div>
          )}
        </div>

        <h1>{post.title}</h1>
        <p
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post.description),
          }}
        ></p>
      </div>
      <Menu cat={post.cat} />
    </div>
  );
};

export default Single;
