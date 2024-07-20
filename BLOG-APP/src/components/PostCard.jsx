import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`} className="block w-full">
      <div className="bg-gray-200 border border-gray-300 rounded-xl p-4 shadow-lg hover:shadow-xl transition-shadow hover:scale-105 duration-300">
        <div className="h-48 mb-4 overflow-hidden rounded-xl">
          <img
            src={appwriteService.getFilePreview(featuredImage)}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
        <h2 className="text-lg font-bold mb-2">{title}</h2>
      </div>
    </Link>
  );
}

export default PostCard;
