import React, { useEffect, useState } from 'react';
import { fetchUsers } from '../../utils/httpApi';
import User from './User';
import classes from './index.module.scss';

interface DataProps {
  incomplete_results?: boolean;
  items?: Array<UserItemsProps>;
  total_count?: number;
}

interface UserItemsProps {
  login: string;
  avatar_url: string;
}

interface ChangeToggleProps {
  setIsUserDetails: (value: boolean) => void;
}

const UsersSearch: React.FC<ChangeToggleProps> = ({ setIsUserDetails }) => {
  const [query, setQuery] = useState('');
  const [requestText, setRequestText] = useState('');
  const [users, setUsers] = useState<DataProps>({});

  useEffect(() => {
    const timeOutId = setTimeout(() => setRequestText(query), 1000);
    return () => clearTimeout(timeOutId);
  }, [query]);

  useEffect(() => {
    if (requestText) {
      fetchUsers(requestText).then((data) => {
        setUsers(data);
        localStorage.setItem('usersData', JSON.stringify(data));
        localStorage.setItem('usersReposCount', JSON.stringify([]));
      });
    }
  }, [requestText]);

  const usersData =
    JSON.parse(localStorage.getItem('usersData') || 'false') || users;
  // console.log(
  //   JSON.parse(sessionStorage.getItem('usersData') || 'null') || users
  // );

  const usersList = React.useMemo(
    () =>
      usersData?.items?.map((user: any) => (
        <User
          key={user.login}
          setIsUserDetails={setIsUserDetails}
          userData={user}
        />
      )),
    [users]
  );

  return (
    <div className={classes.usersSearch}>
      <input
        type="text"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      <div className={classes.usersList}>{usersList}</div>
    </div>
  );
};
export default UsersSearch;
