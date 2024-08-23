import React, { useState } from "react";
import ReactQuill from "react-quill";
import axios from "axios";
import "react-quill/dist/quill.snow.css";
import { useLocation, useNavigate } from "react-router-dom";

const Write = () => {

  const state = useLocation().state;

  const navigate = useNavigate();

  const [value, setValue] = useState(state?.desc || "");
  const [title, setTitle] = useState(state?.title || "");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat || "");

  const upload = async () => {
    try {
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        const res = await axios.post("http://localhost:5000/api/upload", formData);
        return res.data;
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const imgUrl = await upload();

    try {
      state ?
        await axios.put(`http://localhost:5000/api/posts/${state.id}`, { title, desc: value, img: file ? imgUrl : "", cat: cat },
          { withCredentials: true })
        :
        await axios.post(`http://localhost:5000/api/posts/`, { title, desc: value, img: imgUrl, cat: cat },
          { withCredentials: true });

      navigate("/");

    } catch (error) {
      // console.log(error);
    }


  };

  return (
    <div className="add">
      <div className="content">
        <input type="text" placeholder="title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <div className="editorContainer">
          <ReactQuill className="editor" theme="snow" value={value} onChange={setValue} />
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          <span><b>Status:</b> Draft</span>
          <span><b>Visibility:</b> Public</span>

          <input style={{ display: "none" }} type="file" id="file" name="file" onChange={(e) => setFile(e.target.files[0])} />
          <label className="file" htmlFor="file">Upload Image</label>

          <div className="buttons">
            <button>Save as a draft</button>
            <button onClick={handleSubmit}>Publish</button>
          </div>
        </div>
        <div className="item">
          <h1>Category</h1>
          <div className="cat">
            <input type="radio" checked={cat === "art"} name="cat" value={`art`} id="art" onChange={(e) => setCat(e.target.value)} />
            <label htmlFor="art">Art</label>
          </div>
          <div className="cat">
            <input type="radio" checked={cat === "science"} name="science" value={`science`} id="science" onChange={(e) => setCat(e.target.value)} />
            <label htmlFor="science">Science</label>
          </div>
          <div className="cat">
            <input type="radio" checked={cat === "technology"} name="technology" value={`technology`} id="technology" onChange={(e) => setCat(e.target.value)} />
            <label htmlFor="technology">Technology</label>
          </div>
          <div className="cat">
            <input type="radio" checked={cat === "cinema"} name="cinema" value={`cinema`} id="cinema" onChange={(e) => setCat(e.target.value)} />
            <label htmlFor="cinema">Cinema</label>
          </div>
          <div className="cat">
            <input type="radio" checked={cat === "design"} name="design" value={`design`} id="design" onChange={(e) => setCat(e.target.value)} />
            <label htmlFor="design">Design</label>
          </div>
          <div className="cat">
            <input type="radio" checked={cat === "food"} name="food" value={`food`} id="food" onChange={(e) => setCat(e.target.value)} />
            <label htmlFor="food">Food</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Write;
