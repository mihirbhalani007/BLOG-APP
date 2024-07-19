import { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";
import { Link } from "react-router-dom";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  // if (posts.length === 0) {
  //   return (
  //     <div className="w-full py-16 bg-white text-center">
  //       <Container>
  //         <div className="flex flex-col items-center justify-center min-h-[300px]">
  //           <p className="text-xl font-medium text-gray-700 mb-8">
  //             Please{" "}
  //             <Link to="/login" className="text-blue-600 hover:underline">
  //               log in
  //             </Link>{" "}
  //             to read blogs.
  //           </p>
  //           <a
  //             href="/signup"
  //             className="bg-blue-400 text-white text-lg px-6 py-2 rounded-full shadow-lg hover:bg-blue-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
  //           >
  //             Sign Up
  //           </a>
  //         </div>
  //       </Container>
  //     </div>
  //   );
  // }
  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap ">
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
