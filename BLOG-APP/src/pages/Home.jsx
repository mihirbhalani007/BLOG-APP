import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";
import { Link } from "react-router-dom";

function Home() {
  const [posts, setPosts] = useState([]);
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    if (authStatus) {
      // Fetch posts only if the user is logged in
      appwriteService.getPosts().then((response) => {
        if (response) {
          setPosts(response.documents);
        }
      });
    }
  }, [authStatus]);

  // Show login prompt if user is not logged in
  if (!authStatus) {
    return (
      <div className="w-full py-16 bg-white text-center">
        <Container>
          <div className="flex flex-col items-center justify-center min-h-[300px]">
            <p className="text-xl font-medium text-gray-700 mb-8">
              Please{" "}
              <Link to="/login" className="text-blue-600 hover:underline">
                log in
              </Link>{" "}
              to read blogs.
            </p>
            <a
              href="/signup"
              className="bg-blue-400 text-white text-lg px-6 py-2 rounded-full shadow-lg hover:bg-blue-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Sign Up
            </a>
          </div>
        </Container>
      </div>
    );
  }

  // Show no posts message if there are no posts available
  if (posts.length === 0) {
    return (
      <div className="w-full py-16 bg-white text-center">
        <Container>
          <div className="flex flex-col items-center justify-center min-h-[300px]">
            <p className="text-xl font-medium text-gray-700 mb-8">
              No posts available at the moment. Please check back later.
            </p>
          </div>
        </Container>
      </div>
    );
  }

  // Render posts if available
  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
