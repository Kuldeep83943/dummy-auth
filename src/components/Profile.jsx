import React, { useEffect, useState } from "react";

const Profile = ({ id, setIsLoggedIn }) => {
  const [data, setData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const displayData = async () => {
      id = localStorage.getItem("id", id);
      //   console.log(id);
    //   console.log(setIsLoggedIn);
    //  michaelw michaelwpass
      try {
        const res = await fetch(`https://dummyjson.com/users/${id}`);
        const result = await res.json();
        setData(result);
        console.log(result);
      } catch (error) {
        setError(error);
        console.log(error);
      }
      setLoading(false);
    };
    displayData();
  }, [id]);

  const handleLogout = () => {
    localStorage.removeItem("id");
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  if (loading) {
    return (
      <div className="App">
        <p className="custom-loader">Loading...</p>
      </div>
    );
  }

  if (error) {
    return <p className="error-box">Error : {error.message}</p>;
  }

  return (
    <div className="bg-dark  min-vh-100 d-flex justify-content-center align-item-center">
      <div className="border border-2 text-center w-25 m-auto bg-white rounded">
        <h1>
          {data.firstName} {data.lastName}
        </h1>
        <img className="rounded-circle" src={data.image} alt="" />
        <button className="btn btn-dark" onClick={handleLogout}>
          Logout
        </button>
        <p><span className="fw-bold">Email :</span> {data.email}</p>
        <p><span className="fw-bold">Phone :</span> {data.phone}</p>
        <p><span className="fw-bold">Birthday :</span>  {data.birthDate}</p>
        <p><span className="fw-bold">Gender :</span>  {data.gender}</p>
        <p><span className="fw-bold">University :</span>  {data.university}</p>
        <p><span className="fw-bold">Blood group :</span> {data.bloodGroup}</p>
        <p><span className="fw-bold">Eye color :</span>  {data.eyeColor}</p>
        <p><span className="fw-bold">Height :</span>  {data.height}</p>
        <p><span className="fw-bold">Weight :</span>  {data.weight}</p>
      </div>
    </div>
  );
};

export default Profile;
