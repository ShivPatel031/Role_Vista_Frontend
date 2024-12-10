import { AnimatePresence } from "framer-motion"
import { useSelector } from "react-redux";
import { PostCard } from "./PostCard";


const UsersPosts = () =>
{
    const posts = useSelector(state=>state?.posts?.posts || []);
    const userId = useSelector(state=>state?.user?.userData?._id);
    const userPosts = posts.filter(post=>post.userId._id===userId);

    return (<>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {userPosts.length > 0 ? (
              userPosts.map((post) => (
                <PostCard key={post.id || post._id} post={post} userId={userId} />
              ))
            ) : (
              <p className="text-gray-500 text-center">No posts available.</p>
            )}
          </AnimatePresence>
        </div>
    </>)
}

export {UsersPosts};