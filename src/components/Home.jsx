import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Carousel from "../img/carousel-1.jpg";
import Header from "./Header";
import axios from "axios";
import WebSocketComponent from "./WebSocketComponent";

const Home = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [user, setUser] = useState({});
  const userName = state?.userName;

  const [showNotification, setShowNotification] = useState(false);
  const [quizRequest, setQuizRequest] = useState({});

  const onMessageReceived = (message) => {
    if (message["player1"] == userName) {
      return;
    }
    setShowNotification(true);
    setQuizRequest(message);

    setTimeout(() => {
      setShowNotification(false);
    }, 20000);
  };

  const onGameJoined = async (message) => {
    console.log(message)
    message["userName"] = userName;
    navigate("/waiting", {replace:true, state:message});
  };

  useEffect(() => {
    if (!userName) navigate("/login", { replace: true });
    const fetchUser = async () => {
      const response = await axios.get(
        `http://localhost:8080/users/username/${userName}`
      );
      const data = await response["data"];
      console.log(data);
      setUser(data);
    };
    fetchUser();
  }, []);

  return (
    <>
      {userName && (
        <WebSocketComponent
          userName={userName}
          onMessageReceived={onMessageReceived}
          onGameJoined={onGameJoined}
        />
      )}

      <Header userName={userName} />

        <div
          className="container-fluid page-header mb-5 p-0"
          style={{ backgroundImage: `url(${Carousel})` }}
        >
          <div className="container-fluid page-header-inner py-5">
            <div className="container text-center pb-5">
              <h1 className="display-3 text-white animated slideInDown">
                {user["name"]}
              </h1>
              <p className="text-white animated slideInDown">
                username: {user["username"]}
              </p>
              <h3 className="text-white animated slideInDown">
                {user["stream"]} {user["profession"]} from {user["institute"]} -{" "}
                {user["graduation_year"]} Batch{" "}
              </h3>
              <hr />
              <h2 className="text-white">Ratings: {user["ratings"]}</h2>
              <h2 className="text-white">Brain Coins: {user["brain_coins"]}</h2>
              <h2></h2>
            </div>
          </div>
        </div>

      {showNotification && (
        <Notification notification={quizRequest} userName={userName} />
      )}
    </>
  );
};

const Notification = (props) => {
  const notification = props.notification;
  const userName = props.userName;

  const joinBuzzer = () => {
    const buzzer_id = notification["buzzer_id"];
    const join = async () => {
      const response = await axios.get(
        `http://localhost:8080/buzzers/join/${buzzer_id}/${userName}`
      );
      const data = await response["data"];
      console.log(data);
    };
    join();
  };

  return (
    <>
      <div
        className="container-fluid booking pb-5 wow fadeIn"
        data-wow-delay="0.1s"
      >
        <div className="container">
          <div className="bg-white shadow" style={{ padding: 35 + "px" }}>
            <div className="row g-2">
              <div className="col-md-10">
                <div className="row g-2">
                  <div className="col-md-12">
                    <h6>
                      User {notification["player1"]}{" "}
                      <b className="text-muted">
                        ({notification["player1Profession"]} at{" "}
                        {notification["player1Institute"]})
                      </b>{" "}
                      with ratings
                      <b> {notification["player1Ratings"]}</b> has started a
                      buzzer round with
                      <span> {notification["count"]} questions</span> on topic
                      <b> {notification["category"]}</b> (
                      <span>{notification["difficulty"]} level</span>)
                    </h6>
                  </div>
                </div>
              </div>
              <div className="col-md-2">
                <button className="btn btn-primary w-100" onClick={joinBuzzer}>
                  Click here to join
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
