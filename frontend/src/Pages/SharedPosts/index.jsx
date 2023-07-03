import React, { useEffect } from "react";
import Posts from "../../Components/Posts";
import { useDispatch, useSelector } from "react-redux";
import { getPostShareByUserId } from "../../app/actions/postshare.actions";
import SharedPostsList from "../../Components/SharedPostsList";

function SharedPosts() {
  const dispatch = useDispatch();
  const post = useSelector((state) => state.postshare);
  const comment = useSelector((state) => state.comment);
  const user = useSelector((state) => state.user);
  useEffect(() => {
    if (user.userId) {
      dispatch(getPostShareByUserId(user.userId));
    }
  }, [dispatch, user.userId]);
  return (
    <div className="container mt-5 mb-5 row">
      <div className="col-md-2"></div>
      <div className="col-md-8">
        <SharedPostsList posts={post.posts} fetchType="GET_ALL_POSTS_SHARED"/>
      </div>
      <div className="col-md-2"></div>
    </div>
  );
}

export default SharedPosts;
