import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import Container from "../components/container/Container";
import PostCard from "../components/PostCard";
import { RotatingLoader } from "../components";

function AllPosts() {
  const [posts, setPost] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[480px]">
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
    <div className="w-full py-8 min-h-[480px]">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div className="p-2 w-1/4" key={post.$id}>
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;
