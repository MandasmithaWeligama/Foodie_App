import React, { useEffect } from "react";
import Posts from "../../Components/Posts";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../app/actions/post.actions";
import NewUsersSuggest from "../../Components/NewUsersSuggest";

function Home() {
  const dispatch = useDispatch();
  const post = useSelector((state) => state.post);
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);
  return (
    <div className="container mt-5 mb-5 row">
      <div className="col-md-2"></div>
      <div className="col-md-7">
        <Posts posts={post.posts} fetchType="GET_ALL_POSTS"/>
      </div>
      <div className="col-md-3 p-2">
        <NewUsersSuggest/>
      </div>
    </div>
  );
}

export default Home;
