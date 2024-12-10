import { AnimatePresence } from "framer-motion"
import { useSelector } from "react-redux";
import { PostCard } from "./PostCard";


const UserLikedPosts = () =>
{
    const posts = useSelector(state=>state?.posts?.posts || []);
    const userId = useSelector(state=>state?.user?.userData?._id);
    const likedPosts = posts.filter(post=>post.likes.includes(userId));

    return (<>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {likedPosts.length > 0 ? (
              likedPosts.map((post) => (
                <PostCard key={post.id || post._id} post={post} userId={userId} />
              ))
            ) : (
              <p className="text-gray-500 text-center">No posts available.</p>
            )}
          </AnimatePresence>
        </div>
    </>)
}

export {UserLikedPosts};