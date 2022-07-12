import React, { useEffect, useState } from 'react';
import { fetchUserDetails } from '../../../utils/httpApi';
import classes from './index.module.scss';

interface UserItemsProps {
  userData: {
    login: string;
    avatar_url: string;
  };
  setIsUserDetails: (value: boolean) => void;
}

interface UserDetailsProps {
  public_repos?: number;
}

const User: React.FC<UserItemsProps> = ({
  userData: { login, avatar_url: avatarURL },
  setIsUserDetails,
}) => {
  const [userDetails, setUserDetails] = useState<UserDetailsProps | null>(null);
  const usersReposCount = JSON.parse(
    localStorage.getItem('usersReposCount') || ''
  );
  useEffect(() => {
    fetchUserDetails(login).then((data) => {
      setUserDetails(data);
      //   localStorage.setItem(
      //     'usersReposCount',
      //     JSON.stringify(
      //       usersReposCount.find((item: any) => {
      //         console.log(login, item.login);
      //         return item.login === login;
      //       })
      //         ? [...usersReposCount]
      //         : [...usersReposCount, { login }]
      //     )
      //   );
    });
  }, [login]);

  return (
    <div
      key={login}
      className={classes.user}
      onClick={() => {
        localStorage.setItem('userDetails', JSON.stringify(userDetails));
        setIsUserDetails(false);
      }}
    >
      <div className={classes.userInfo}>
        <img src={avatarURL} alt="avatar" className={classes.userAvatar} />
        <span>{login}</span>
      </div>

      <span>Repos: {userDetails?.public_repos}</span>
    </div>
  );
};

export default User;
