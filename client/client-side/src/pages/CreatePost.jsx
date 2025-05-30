import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { usePostStore } from "../store/postStore";
import MakePost from "../components/post/make-post-page/AddPost";
import Post from "../components/post/post";
import LoadingSpinner from "../components/custom/loadingSpinner";

const PostPage = () => {
  const { id } = useParams();
  const { posts, isLoading, error, fetchPosts, initializeSocket } = usePostStore();

  useEffect(() => {
      fetchPosts(id);
      const cleanupSocket = initializeSocket();
      return cleanupSocket;
  }, [id, fetchPosts, initializeSocket]);

  if (isLoading) return <LoadingSpinner/>;

  if (error) {
    console.error("Error loading posts:", error);
    return (
      <div className="text-center text-red-500 mt-10">
        Error: {error || "Unable to load posts. Please try again later."}
      </div>
    );
  }

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4 w-full max-w-7xl mx-auto p-4 mb-10">
      <div className="flex-1 space-y-4 overflow-auto max-h-screen p-2 bg-gray-50 dark:bg-[#11182772] rounded-lg">
        {posts.length ? (
          posts.map((post,index) => <Post key={index} data={post}  />)
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400">No posts available.</p>
        )}
      </div>
      <div className="w-full md:w-2/5">
        <MakePost />
      </div>
    </div>
  );
};

export default PostPage;