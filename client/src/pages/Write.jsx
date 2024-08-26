import React, { useContext, useState } from "react";
import ReactQuill from "react-quill";
import axios from "axios";
import "react-quill/dist/quill.snow.css";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import { AuthContext } from "../context/authcontext";

import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, catName, theme) {
  return {
    fontWeight:
      catName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}


const Write = () => {
  const { currentUser } = useContext(AuthContext);
  const state = useLocation().state;

  //console.log("state:" + state.category);

  const navigate = useNavigate();

  const [value, setValue] = useState(state?.description || "");
  const [title, setTitle] = useState(state?.title || "");
  const [file, setFile] = useState(null);
  const [catName, setCatName] = React.useState(state === null ? [] :
    state.category === null ? [] :
      state.category.slice(1, -1).split(',').map(word => word.trim().replace(/(^"|"$)/g, ''))
  );

  const escapeSingleQuotes = (text) => {
    return text.replace(/'/g, "''");
  };


  const upload = async () => {
    try {
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        const res = await axios.post(`${process.env.REACT_APP_API_URI}upload`, formData);
        return res.data;
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(value, title, file, catName); // ! to remove

    const imgUrl = await upload();

    setValue(escapeSingleQuotes(value));

    try {
      state ?
        await axios.put(`${process.env.REACT_APP_API_URI}posts/${state.id}`, { title, desc: value, img: file ? imgUrl : "", cat: catName.length > 0 ? catName : null },
          { withCredentials: true })
        :
        await axios.post(`${process.env.REACT_APP_API_URI}posts`, { title, desc: value, img: imgUrl, cat: catName },
          { withCredentials: true });

      navigate("/");

    } catch (error) {
      // console.log(error);
    }
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    // Determine the new category value
    const categories = Array.isArray(value) ? value : value.split(',');

    // If categories array is empty, set to null or an empty array
    setCatName(categories.length > 0 ? categories : []);
  };


  const names = [
    'Art',
    'Science',
    'Technology',
    'Cinema',
    'Design',
    'Food',
  ].map(name => name.toLowerCase());

  const theme = useTheme();

  return (
    <>
      {currentUser && currentUser.role.includes('admin') ? <div className="add">
        <div className="content">
          <input type="text" placeholder="title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <div className="editorContainer">
            <ReactQuill className="editor" theme="snow" value={value} onChange={setValue} />
          </div>

          <div className="category">
            <FormControl sx={{ m: 1, width: 350 }}>
              <InputLabel id="demo-multiple-chip-label">Category</InputLabel>
              <Select
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                multiple
                value={catName}
                onChange={handleChange}
                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                {names.map((name) => (
                  <MenuItem
                    key={name}
                    value={name}
                    style={getStyles(name, catName, theme)}
                  >
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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

        </div>
      </div>
        :
        <Navigate to="/unauthorized" />
      }
    </>
  );
};

export default Write;
