import React, { useContext, useEffect, useState } from "react";
import "./singlePost.css";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { Context } from "../../context/Context";
export default function SinglePost() {
  const PF = "http://localhost:5000/images/";
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  useEffect(() => {
    fetch(`/posts/` + path).then((response) =>
      response
        .json()
        .then((postInfo) => {
          console.log(postInfo);
          setPost(postInfo);
          setTitle(postInfo.title);
          setDesc(postInfo.desc);
        })
        .catch((err) => console.log(err))
    );
  }, []);

  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${post._id}`, {
        data: { username: user.username },
      });
      window.location.replace("/");
    } catch (err) {}
  };
  const handleUpdate = async () => {
    try {
      await axios.delete(`/posts/${post._id}`, {
        data: { username: user.username, title, desc },
      });
      window.location.reload();
    } catch (err) {}
  };

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {post.photo && (
          <img className="singlePostImg" src={PF + post.photo} alt="" />
        )}
        {updateMode ? (
          <input
            type="text"
            value={title}
            className="singlePostTitleInput"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h1 className="singlePostTitle">
            {post.title}
            {post.username === user?.username && (
              <div className="singlePostEdit">
                <i
                  className="singlePostIcon fa-regular fa-pen-to-square"
                  onClick={() => setUpdateMode(true)}
                ></i>
                <i
                  class="singlePostIcon fa-sharp fa-solid fa-xmark"
                  onClick={handleDelete}
                ></i>
              </div>
            )}
          </h1>
        )}
        <div className="singlePostInfo">
          <span className="singlePostAuthor">
            Author:{" "}
            <b>
              {" "}
              <Link className="link" to={`/?username=${post.username}`}>
                {post.username}
              </Link>
            </b>
          </span>
          <span className="singlePostDate">
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>
        {updateMode ? (
          <textarea
            value={post.desc}
            onChange={(e) => setDesc(e.target.value)}
            className="singlePostDescInput"
          >
            {" "}
          </textarea>
        ) : (
          <p className="singlePostDesc">{post.desc}</p>
        )}
        {updateMode && <button className="singlePostButton">Update</button>}
      </div>
    </div>
  );
}
