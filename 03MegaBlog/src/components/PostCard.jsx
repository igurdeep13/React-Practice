import React from "react";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-100 rounded-xl p-1 ">
        <div className="w-full justify-center mb-4">
          <img
            src={appwriteService.getFilePreview(featuredImage)}
            alt="title"
            className="rounded-t-xl"
          />
        </div>
        <h5 className="text-xl p-2 font-bold text-center">{title}</h5>
      </div>
    </Link>
  );
}

export default PostCard;
