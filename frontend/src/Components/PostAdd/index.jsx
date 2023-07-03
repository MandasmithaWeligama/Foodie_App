import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPostsByUserId, savePost } from "../../app/actions/post.actions";
import storage from "../../util/firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

function PostAdd() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const fileInputRef = useRef(null);

  const [caption, setCaption] = React.useState("");
  const [imgLink, setImgLink] = React.useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const post = {
      userId: user.userId,
      caption,
      imgLink,
    };
    await dispatch(savePost(post));
    await dispatch(getPostsByUserId(user.userId));
    setCaption("");
    setImgLink("");
    fileInputRef.current.value = "";

  };

  const uploadImage = (e) => {
    const file = e.target.files[0];

    if (!file) {
      alert("Please upload an image first!");
    }

    const storageRef = ref(storage, `/posts/${file.name}`);

    // progress can be paused and resumed. It also exposes progress updates.
    // Receives the storage reference and the file to upload.
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      },
      (err) => console.log(err),
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setImgLink(url);
        });
      }
    );
  };
  
  return (
    <div className="container mb-3 card">
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <h1 className="mt-2">Create Post</h1>
          <div className="mt-2 mb-3">
            <label className="form-label">Caption</label>
            <input
              type="text"
              className="form-control"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />
          </div>
          <div className="mb-3">
            {imgLink && (
              <img
                src={imgLink}
                className="img-fluid me-3"
                alt="Profile"
              />
            )}

            <input
              type="file"
              className="form-control"
              onChange={(e) => uploadImage(e)}
              ref={fileInputRef} 
            />
          </div>

          <button type="submit" className="btn btn-primary">
            CREATE
          </button>
        </form>
      </div>
    </div>
  );
}

export default PostAdd;
