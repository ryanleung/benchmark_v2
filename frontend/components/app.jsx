import React from 'react';
import { Link } from 'react-router-dom';
import GreetingContainer from './greeting/greeting_container';

const App = ({ children }) => (
  <div>
    <h1>Benchmark</h1>
    <GreetingContainer />
    { children }
  </div>
);

export default App;

// import React from 'react';
// import { Link } from 'react-router';
// import GreetingContainer from './greeting/greeting_container';

// const App = ({ children }) => (
//   <div>
//     <header>
//       <Link to="/" className="header-link">
//         <h1>Bench BnB</h1>
//       </Link>
//       <GreetingContainer />
//     </header>
//     {children}
//   </div>
// );

// export default App;