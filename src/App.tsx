import { Route,Routes } from "react-router-dom";
import { Home, Login, MainAuth, Profile, Register,PostDetail, SearchAccount, FollowInfo } from "./pages";
import { Main } from "./components";

const App = () => {
  return (
    <div className="w-full min-h-screen bg-gray-100">
       <Routes>
        <Route path="/auth" element={<MainAuth/>}>
           <Route path="login" element={<Login/>}/>
           <Route path="register" element={<Register/>}/>
        </Route>
        <Route path="/" element={<Main/>}>
           <Route index element={<Home/>}/>
           <Route path="profile/:id" element={<Profile/>}/>
           <Route path="post/:id" element={<PostDetail/>}/>
           <Route path="search" element={<SearchAccount/>}/>
           <Route path="follow" element={<FollowInfo/>}/>
        </Route>
       </Routes>
    </div>
  );
}

export default App;
