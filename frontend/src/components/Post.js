import { Avatar } from "@material-ui/core";
import {
  ArrowDownwardOutlined,
  ArrowUpwardOutlined,
  MoreHorizOutlined,
  ShareOutlined,
} from "@material-ui/icons";
import React, { useState } from "react";
import "./css/Post.css";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import CloseIcon from "@material-ui/icons/Close";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ReactTimeAgo from "react-time-ago";
import axios from "axios";
import ReactHtmlParser from "html-react-parser";
import { useSelector } from "react-redux";
import { selectUser } from "../feature/userSlice";

function LastSeen({ date }) {
  return (
    <div>
      <ReactTimeAgo date={date} locale="en-US" timeStyle="round" />
    </div>
  );
}

function Post({ post }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [questionName, setQuestionName] = useState(post?.questionName || "");
  const [questionUrl, setQuestionUrl] = useState(post?.questionUrl || "");
  const [likes, setLikes] = useState(post.upvotes || 0);
  const [dislikes, setDislikes] = useState(post.downvotes || 0);
  const [answer, setAnswer] = useState("");

  const Close = <CloseIcon />;

  const user = useSelector(selectUser);

  const handleQuill = (value) => {
    setAnswer(value);
  };

  const handleDelete = async () => {
    if (post?._id) {
      await axios
        .delete(`/api/posts/${post._id}`)
        .then((res) => {
          console.log(res.data);
          alert("Post deleted successfully");
          window.location.href = "/";
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  const handleEdit = () => {
    setIsModalOpen(true);
    setQuestionName(post?.questionName || "");
    setQuestionUrl(post?.questionUrl || "");
  };

  const handleSubmit = async () => {
    if (post?._id && questionName !== "") {
      const body = {
        questionName: questionName,
        questionUrl: questionUrl,
      };
      await axios
        .put(`/api/posts/${post._id}`, body)
        .then((res) => {
          console.log(res.data);
          alert("Post updated successfully");
          setIsModalOpen(false);
          window.location.href = "/";
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  const handleShare = () => {
    const postLink = window.location.href + `post/${post?._id}`;
    navigator.clipboard.writeText(postLink);
    alert("Post link copied to clipboard.");
  };

  const handleLike = () => {
    // Only allow user to vote if they are logged in
    if (!user) {
      alert("Please log in to vote.");
      return;
    }

    // If the user has already liked the post, remove their like
    if (likes === 1) {
      setLikes(0);
    }
    // If the user has not liked the post, add their like and remove their dislike if they have previously disliked the post
    else {
      setLikes(1);
      if (dislikes === 1) {
        setDislikes(0);
      }
    }
  };

  const handleDislike = () => {
    // Only allow user to vote if they are logged in
    if (!user) {
      alert("Please log in to vote.");
      return;
    }

    // If the user has already disliked the post, remove their dislike
    if (dislikes === 1) {
      setDislikes(0);
    }
    // If the user has not disliked the post, add their dislike and remove their like if they have previously liked the post
    else {
      setDislikes(1);
      if (likes === 1) {
        setLikes(0);
      }
    }
  };

  return (
    <div className="post">
      <div className="post__info">
        <Avatar src={post?.user?.photo} />
        <h4>{post?.user?.userName}</h4>

        <small>
          <LastSeen date={post?.createdAt} />
        </small>
      </div>
      <div className="post__body">
        <div className="post__question">
          {post?.user?._id === user?._id && (
            <>
              <button onClick={handleEdit} className="post__btnEdit">
                Edit
              </button>
              <button onClick={handleDelete} className="post__btnDelete">
                Delete
              </button>
            </>
          )}
          {questionName}
        </div>
        {questionUrl !== "" && <img src={questionUrl} alt="url" />}
      </div>
      <div className="post__footer">
        <div className="post__footerAction">
          <ArrowUpwardOutlined onClick={handleLike} className={likes === 1 ? "active" : ""} />
          <span className="post__voteCount">{likes}</span>
          <span className="post__voteLabel">Like</span>
          <ArrowDownwardOutlined onClick={handleDislike} className={dislikes === 1 ? "active" : ""} />
          <span className="post__voteCount">{dislikes}</span>
          <span className="post__voteLabel">Dislike</span>
        </div>
        <div className="post__footerRight">
          <ShareOutlined onClick={handleShare} />
          <MoreHorizOutlined />
        </div>
      </div>
      <div className="post__comments">
        {Array.isArray(post?.allAnswers) && post.allAnswers.map((ans) => (
          <p className="post__comment">
            <Avatar src={ans?.user?.photo} />
            <span className="post__commentUser">{ans?.user?.userName}</span>
            <span className="post__commentText">{ReactHtmlParser(ans?.answer)}</span>
          </p>
        ))}
      </div>
      <Modal
        open={isModalOpen}
        closeIcon={Close}
        onClose={() => setIsModalOpen(false)}
        closeOnEsc
        center
        closeOnOverlayClick={false}
        styles={{
          overlay: {
            height: "auto",
          },
        }}
      >
        <div className="modal__question">
          <h1>Edit Post</h1>
        </div>
        <div className="modal__answer">
          <input
            type="text"
            value={questionName}
            onChange={(e) => setQuestionName(e.target.value)}
            placeholder="Enter question"
            required
          />
          <ReactQuill value={answer} onChange={handleQuill} />
          <input
            type="text"
            value={questionUrl}
            onChange={(e) => setQuestionUrl(e.target.value)}
            placeholder="Enter image URL (Optional)"
          />
          <div className="modal__button">
            <button type="submit" onClick={handleSubmit}>
              Update
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Post;