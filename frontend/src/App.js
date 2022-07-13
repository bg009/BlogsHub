import React , {useEffect} from 'react';
import {Routes , Route} from 'react-router-dom';
import Header from './components/Header';
import Auth from './components/Auth';
import Blogs from './components/Blogs'
import UserBlogs from './components/UserBlogs'
import BlogDetails from './components/BlogDetail'
import AddBlog from './components/AddBlog'
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from './store';

function App() {

  const dispath = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  console.log(isLoggedIn);

  useEffect(() => {
    if(localStorage.getItem("userId")){
      dispath(authActions.login());
    }
  } ,[dispath])


  return (
    <>
      <header>
        <Header />
      </header>

      <main>

        <Routes>
{
          !isLoggedIn ? 
          <Route path='/auth' element={<Auth/>} exact/>
          :<>
          <Route path="/blogs"  element={<Blogs/>} exact/>
          <Route path='/myBlogs' element={<UserBlogs/>} exact />
          <Route path='/myBlogs/:id' element={<BlogDetails/>} exact />
          <Route path='/blogs/add' element={<AddBlog/>} />
          </>
}
        </Routes>

      </main>
      
    </>
  );
}

export default App;
