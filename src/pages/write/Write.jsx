import React, { useContext, useState } from "react";
import "./write.css";
import { Context } from "../../context/Context";
import axios from "axios";
export default function Write() {
  const [title, setTitle] = useState();
  const [desc, setDesc] = useState();
  const [file, setFile] = useState();
  const { user } = useContext(Context);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      desc,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await axios.post("/upload", { data });
      } catch (e) {
        console.log(e);
      }
    }
    try {
      const res = await axios.post("/posts", newPost);
      window.location.replace("/posts/" + res.data._id);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="write">
      {file && (
        <img src={URL.createObjectURL(file)} className="writeImg" alt="" />
      )}
      <form onSubmit={handleSubmit} className="writeForm">
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fa-solid fa-plus"></i>
          </label>
          <input
            onChange={(e) => setFile(e.target.files[0])}
            type="file"
            id="fileInput"
            style={{ display: "none" }}
          />
          <input
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            name=""
            className="writeInput"
            autoFocus={true}
            placeholder="Title"
            id=""
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Tell your story"
            type="text"
            className="writeInput writeText"
          ></textarea>
        </div>
        <button type="submit" className="writeSubmit">
          Publish
        </button>
      </form>
    </div>
  );
}
