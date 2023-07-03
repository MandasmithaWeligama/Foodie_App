import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPostsByUserId } from "../../app/actions/post.actions";
import { getPostShareByUserId } from "../../app/actions/postshare.actions";
import Posts from "../../Components/Posts";
import SharedPostsList from "../../Components/SharedPostsList";

function UserPosts() {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const post = useSelector((state) => state.post);
  const postshare = useSelector((state) => state.postshare);
  const [postOptionSelected, setPostOptionSelected] = useState(true);

  useEffect(() => {
    if (userId) {
      dispatch(getPostsByUserId(userId));
      dispatch(getPostShareByUserId(userId));
    }
  }, [dispatch, userId]);

  return (
    <div>
      <div className="row">
        <div className="col-3"></div>
        <div className="col-6">
          <div className="row mt-2">
            {postOptionSelected ? (
              <div className="col-12 mt-2">
                <button
                  className="btn btn-warning w-100"
                  onClick={() => {
                    setPostOptionSelected(false);
                  }}
                >
                  CLICK TO VIEW SHARED POSTS
                </button>
              </div>
            ) : (
              <div className="col-12 mt-2">
                <button
                  className="btn btn-warning w-100"
                  onClick={() => {
                    setPostOptionSelected(true);
                  }}
                >
                  CLICK TO VIEW POSTS
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="col-3"></div>
      </div>
      <div className="row mt-5">
        <div className="col-3"></div>
        {postOptionSelected && (
          <div className="col-6">
            <h3>POSTS</h3>
            <hr />
            <Posts posts={post.posts} fetchType="GET_ALL_POSTS_USER"/>
          </div>
        )}
        {!postOptionSelected && (
          <div className="col-6">
            <h3>SHARED POSTS</h3>
            <hr />
            <SharedPostsList posts={postshare.posts} fetchType="GET_ALL_POSTS_USER"/>
          </div>
        )}
        <div className="col-3"></div>
      </div>
    </div>
  );
}

export default UserPosts;
