import React, { useEffect } from "react";
import Posts from "../../Components/Posts";
import { useDispatch, useSelector } from "react-redux";
import { getPostsByUserId } from "../../app/actions/post.actions";
import PostAdd from "../../Components/PostAdd";

function User() {
  const dispatch = useDispatch();
  const post = useSelector((state) => state.post);
  const user = useSelector((state) => state.user);
  useEffect(() => {
    if(user.userId){
      dispatch(getPostsByUserId(user.userId));
    }
  }, [dispatch,user.userId]);
  return (
    <div className="container mt-5 mb-5 row">
      <div className="col-md-2"></div>
      <div className="col-md-8">
        <PostAdd/>
        <Posts posts={post.posts} fetchType="GET_ALL_USER_POSTS"/>
      </div>
      <div className="col-md-2"></div>
    </div>
  );
}

export default User;
