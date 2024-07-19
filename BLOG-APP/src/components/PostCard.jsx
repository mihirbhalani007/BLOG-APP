import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full max-w-sm h-80 bg-gray-200 border border-gray-300 rounded-xl p-4 shadow-lg hover:shadow-xl transition-shadow hover:scale-105 duration-300 ">
        <div className="w-full h-48 flex justify-center mb-4 overflow-hidden rounded-xl">
          <img
            src={appwriteService.getFilePreview(featuredImage)}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
    </Link>
  );
}

export default PostCard;
