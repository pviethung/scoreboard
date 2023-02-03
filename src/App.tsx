import clsx from 'clsx';
import { useEffect, useState } from 'react';
import Admin from './components/admin/Admin';
import LeaderChart from './components/home/LeaderChart';
import Scoreboard from './components/home/Scoreboard';

/*
  
theme: daisyui halloween
funny text this team win
dark layer

***** LEADERBOARD
- ui animate up down, with avatar
  https://dribbble.com/shots/16108018-Gamification-education-app
https://dribbble.com/shots/15017987-Takeoff-App-Leaderboard


   ---   ---   ---   ---
  |   | |   | |   | |   |

- leaderboard animated up down, with nums of questions, [nums of right/wrong answers], up, down arrow, points
https://dribbble.com/shots/15017987-Takeoff-App-Leaderboard

|  TEAM                                             Point    Rank  |

|  XXXX                                                            |
|   x    v    x    v     x    v     v ...            300     4  ▲  |
|__________________________________________________________________|
|  XXXX                                                            |
|   x    v    x    v     x    v     v ...            250     5  ▼  |
|__________________________________________________________________|
|  XXXX                                                            |
|   x    v    x    v     x    v     v ...            200     6  ▲  |
|__________________________________________________________________|
|  XXXX                                                            |
|   x    v    x    v     x    v     v ...            100     4  ▲  |
|__________________________________________________________________|




***** ADMIN 
_ fns: undo, check right answers, team point, delete losed team, 
if lose

|        Team       | Q1 | Q2 | Q3 | Q4 ... Q20 |  Point   |       fn      |
|  AAAAAAAAAAAAAAA  | x  |  v |  v |  x ... v   |    20    | remove |      | 
|  AAAAAAAAAAAAAAA  | x  |  v |  v |  x ... v   |    20    | remove |      | 
|  AAAAAAAAAAAAAAA  | x  |  v |  v |  x ... v   |    20    | remove |      | 
|  AAAAAAAAAAAAAAA  | x  |  v |  v |  x ... v   |    20    | remove |      | 
|  AAAAAAAAAAAAAAA  | x  |  v |  v |  x ... v   |    20    | remove |      | 

| GAME END |







*/

const App = () => {
  const [path, setPath] = useState('');
  useEffect(() => {
    setPath(window.location.pathname);
  }, []);

  return (
    <div
      className={clsx(
        'mx-auto max-w-7xl',
        'flex flex-col items-center justify-center py-10'
      )}
    >
      {path === '/' && (
        <>
          <LeaderChart />
          <Scoreboard />
        </>
      )}

      {path === '/admin' && (
        <>
          <Admin />
        </>
      )}

      {/* <Confetti /> */}
      <img
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAYAAAA5ZDbSAAAAAXNSR0IArs4c6QAAAadJREFUeF7t0wERAAAIg0DXv7Q9/rAB4HYdbWA0XXBXYPwJClxg3ACO14ILjBvA8VpwgXEDOF4LLjBuAMdrwQXGDeB4LbjAuAEcrwUXGDeA47XgAuMGcLwWXGDcAI7XgguMG8DxWnCBcQM4XgsuMG4Ax2vBBcYN4HgtuMC4ARyvBRcYN4DjteAC4wZwvBZcYNwAjteCC4wbwPFacIFxAzheCy4wbgDHa8EFxg3geC24wLgBHK8FFxg3gOO14ALjBnC8Flxg3ACO14ILjBvA8VpwgXEDOF4LLjBuAMdrwQXGDeB4LbjAuAEcrwUXGDeA47XgAuMGcLwWXGDcAI7XgguMG8DxWnCBcQM4XgsuMG4Ax2vBBcYN4HgtuMC4ARyvBRcYN4DjteAC4wZwvBZcYNwAjteCC4wbwPFacIFxAzheCy4wbgDHa8EFxg3geC24wLgBHK8FFxg3gOO14ALjBnC8Flxg3ACO14ILjBvA8VpwgXEDOF4LLjBuAMdrwQXGDeB4LbjAuAEcrwUXGDeA47XgAuMGcLwWXGDcAI7XgguMG8DxWjAe+AEtfgB5rDoaYgAAAABJRU5ErkJggg=="
        alt=""
      />
    </div>
  );
};
export default App;
