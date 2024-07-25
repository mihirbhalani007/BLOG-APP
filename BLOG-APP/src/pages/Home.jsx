import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";
import { Link } from "react-router-dom";
import { RotatingLoader } from "../components";

function Home() {
  const [posts, setPosts] = useState([]);
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    if (authStatus) {
      appwriteService.getPosts().then((response) => {
        if (response) {
          setPosts(response.documents);
        }
      });
    }
  }, [authStatus]);

  if (!authStatus) {
    return (
      <div className="w-full flex-1 py-16 bg-white text-center">
        <Container>
          <div className="flex flex-col items-center justify-center flex-1">
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

  if (posts.length === 0) {
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
    <div className="w-full py-8 min-h-[480px]">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {posts.map((post) => (
            <div key={post.$id}>
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
