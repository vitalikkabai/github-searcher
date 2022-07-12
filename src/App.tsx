import React, { useState } from 'react';
import UserRepositories from './components/UserRepositories';
import UserSearch from './components/UsersSearch';
import classes from './App.module.scss';

const App: React.FC = () => {
  const [isUserDetails, setIsUserDetails] = useState<boolean>(true);
  return (
    <div className={classes.app}>
      {isUserDetails ? (
        <UserSearch setIsUserDetails={setIsUserDetails} />
      ) : (
        <UserRepositories
          isUserDetails={isUserDetails}
          setIsUserDetails={setIsUserDetails}
        />
      )}
    </div>
  );
};

export default App;
