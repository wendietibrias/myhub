import { Route,Routes } from "react-router-dom";
import { Home, Login, MainAuth, Profile, Register,Post, Search, Follow } from "./pages";
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
           <Route path="post/:id" element={<Post/>}/>
           <Route path="search" element={<Search/>}/>
           <Route path="follow" element={<Follow/>}/>
        </Route>
       </Routes>
    </div>
  );
}

export default App;
