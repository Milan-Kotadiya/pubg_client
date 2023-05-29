import { useEffect, useState } from "react";
import "./App.css";
import { io } from "socket.io-client";
const URL = "http://localhost:8080";
const socket = io(URL, {
  withCredentials: false,
});
function App() {
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState('Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJVUy0wMSIsImlhdCI6MTY4NTM2MzI4NjQ2MCwiZXhwIjoxNjg1NDQ5Njg2fQ.fNREDc7zC3PUgnNPd1LM5ts1Hx23HrmdfGRjIBRv_rWra9XicCKYxepKKToBTWLsV9mjJJd6V5toN_9Uz-MF4vIqL7L6vbHeNytVrwumUAd_kiME-YKBL_h1giQCfhosTAKyxZ83mUUzXpF6_xKfUuRm40OzSjufmqKubUQ70ccoDt1rAU2inn71lwEyRvBu5-3qVta6tQjGwNRFvbPKDKcr4V7KldbZDSju6miVDQWL2086-Q-RJH7AvMgtzyDLzGJIV-Sn9vONZbcjfrKYlQyXx7Ud8jBa1uEFcPMJ9QMtKCXwG9U1jQMxabtfovo9IHDXg4uXn9zCc7bazp55k3X9Sx6gY2Ii3unXxGsO2kZ8eDZc8QWGIwCbQ34gYgi_0ad6Bgl5huVjxTovZnnisn5mUgPoTukTvn1lqc-J6JyiWKUIcZPyoesbtGoZMaQzuZgSYHRCG9Gh-SaNy5ucrCJgplvyO8um9TZpVCf5503bntwOhJ2-nHoQoVBrrRm9gU14eEPw8mmfoqYgqYSGV3gG7cMnb8egXOjYvfPYBLT1OZaRWP-JO_r_aTlW3uU_v7Bw2j8FCEsxT1ZKlo-l5opEULFdN5gSeeEy8TBAAx9EaRGNJoIezhQZUte-m3RxcspvM-TdruRkioXcOrn3DRHqA6V2QikMBs-IpDnIyBo');
  const [gameId, setGameId] = useState('66278e3d-14ad-4581-99e7-c519fa335173');

  useEffect(() => {
    const listenEvents = () => {
      socket.on('ERROR',(data)=>{
        data = JSON.parse(data);
        console.log(data);
      })
      socket.on('FAIL',(data)=>{
        data = JSON.parse(data);
        console.log(data);
      })
      socket.on('GAME_STARTED',(data)=>{
        data = JSON.parse(data);
        console.log(data);
      })
      socket.on('TEAM_CREATED',(data)=>{
        data = JSON.parse(data);
        console.log(data);
      })
      socket.on('GAME_TIME_OVER',(data)=>{
        data = JSON.parse(data);
        console.log(data);
      })
      socket.on('REMATCH_TIME',(data)=>{
        data = JSON.parse(data);
        console.log(data);
      })
      socket.on('GAME_EXPIRE_SOON',(data)=>{
        data = JSON.parse(data);
        console.log(data);
      })
      

    }

    listenEvents();
    return () => {
      listenEvents();
    }
  }, [])

  const signUpUser = () => {
    socket.emit(
      "SIGN_UP",
      {
        userId: "US-02",
        password: "user12345",
      },
      (data) => {
        data = JSON.parse(data)
        console.log(data);
      }
    );
  };
  const signInUser = () => {
    socket.emit(
      "SIGN_IN",
      {
        userId: `US-01`,
        password: "user12345",
      },
      (data) => {
        data = JSON.parse(data)
        console.log(data)
        if(data.code === 'success'){
          setToken(data.token)
        }
      }
    );
  };
  const signInPlayer = () => {

    socket.emit(
      "SIGN_IN",
      {
        userId: `US-0${userId}`,
        password: "user12345",
        gameId: `${gameId}`,
      }, 
      (data) => {
        data = JSON.parse(data)
        console.log(data)
      }
    );
  };
  const signUpPlayer = () => {

    socket.emit(
      "SIGN_UP",
      {
        userId: `US-0${userId}`,
        password: "user12345",
        gameId: `${gameId}`,
      }, 
      (data) => {
        data = JSON.parse(data)
        console.log(data)
      }
    );
  };

  const createGame = () => {

    socket.emit(
      "CREATE_GAME",
      {
        authorization: `${token}`,
        gameName: "pubg",
        combat: {
            is_entry_fee: false,
            is_maps_available: true,
            map_ids : ["MAP!"],
            is_sub_team: true,
            players_per_match: 4,
            players_to_start: 2,
            is_end_on_time_or_score: true,
            end_on_time: 300000,
            is_team_winner: false,
            rematch_waiting_time:10000,
            player_score_to_win:500,
            is_rematch: true,
            notify_before_game_over: 30000,
            lobby_waiting_time:30000,
            team_waiting_time: 10000,
            team_per_match: 2,
            players_per_team: 2,
            teams_to_start: 2
        }
    }, 
      (data) => {
        data = JSON.parse(data)
        console.log(data)
        if(data.code === 'success'){
          setGameId(data.gameId)
        }
      }
    );
  };
  const playGame = () => {

    socket.emit(
      "PLAY_GAME",
      {
        playerId: `US-0${userId}`,
        mapId:'MAP!',
        gameId: `${gameId}`,
      }, 
      (data) => {
        data = JSON.parse(data)
        console.log(data)
      }
    );
  };
  return (
    <div className="App">
      <button onClick={signUpUser}>signUpUser</button>
      <button onClick={signInUser}>signInUser</button>
      <input type="text" name="userId" id="userId" placeholder="USERID" onChange={(e) => setUserId(e.target.value)} />
      <button onClick={signUpPlayer}>signUpPlayer</button>
      <button onClick={signInPlayer}>signInPlayer</button>
      <button onClick={createGame}>createGame</button>
      <button onClick={playGame}>playGame</button>
    </div>
  );
}

export default App;
