import { Route, Router, Routes } from "react-router-dom"
import { Posts } from "./component/Posts"
import { OnePostPage } from "./component/OnePostPage"

const PostsPage = ()=>
{
  return (
    <>
    <Routes>
      <Route path="" element={<Posts />} />
      <Route path="onePostPage/:id" element={<OnePostPage />} />
    </Routes>
    </>
    
  )
}

export {PostsPage};