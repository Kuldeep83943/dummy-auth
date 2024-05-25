import { useEffect, useState } from "react";
import "./App.css";
import Profile from "./components/Profile";
import Login from "./components/Login";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState("");

  useEffect(() => {
    const fetcData = async () => {
      setLoading(true);

      /* providing token in bearer */
      if (localStorage.getItem("token") && localStorage.getItem("id")) {
        /* providing token in bearer */
        const res = await fetch("https://dummyjson.com/auth/me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        // .then(res => res.json())
        // .then(console.log);
        if(res.ok){
          localStorage.getItem("id");
          setIsLoggedIn(true);
        }else{
          setIsLoggedIn(false);
        }
      }

      setLoading(false);
    };
    fetcData();
  }, []);

  if (loading) {
    return (
      <div className="App">
        <p className="custom-loader">Loading...</p>
      </div>
    );
  }


  return(
    <>
    {isLoggedIn ? <Profile id={id} setIsLoggedIn={setIsLoggedIn}/> : <Login setIsLoggedIn={setIsLoggedIn} setId={setId}/>}
    </>
  )


}

export default App;
