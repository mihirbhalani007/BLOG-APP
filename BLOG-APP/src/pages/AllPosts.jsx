import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import Container from "../components/container/Container";
import PostCard from "../components/PostCard";
import { RotatingLoader } from "../components";
import { useSelector } from "react-redux";

function AllPosts() {
  const [posts, setPost] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const searchTerm = useSelector((state) => state.search.searchTerm);

  useEffect(() => {
    appwriteService.getPosts([]).then((posts) => {
      if (posts) {
        setPost(posts.documents);
        console.log("All posts ", posts);
        setTimeout(() => {
          setIsLoading(false);
        }, 0);
      }
    });
  }, []);

  const filteredPosts = searchTerm
    ? posts.filter((post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : posts;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[480px] py-8">
        <div className="flex flex-col items-center justify-center">
          <p className="text-xl font-medium text-gray-700 mb-8">
            Loading Posts for you, Please wait
          </p>
          <RotatingLoader />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full py-8 min-h-[480px] ">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredPosts.map((post) => (
            <div key={post.$id}>
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;



