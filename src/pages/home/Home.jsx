import React, { useState, useEffect } from "react";
import Header from "../../components/header/Header";
import Posts from "../../components/Posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import "./home.css";
import axios from "axios";
import { useLocation } from "react-router-dom";

export default function Home() {
  const { search } = useLocation();

  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch(`/posts` + search).then((response) =>
      response
        .json()
        .then((postInfo) => {
          console.log(postInfo);
          setPosts(postInfo);
        })
        .catch((err) => console.log(err))
    );
  }, [search]);

  return (
    <>
      <Header />
      <div className="home">
        <Posts posts={posts} />
        <Sidebar />
      </div>
    </>
  );
}
