import React, { useEffect, useState } from 'react';
import { fetchUserRepositories } from '../../utils/httpApi';
import { ReactComponent as ArrowBack } from '../../assets/svg/back_arrow_icon.svg';
import classes from './index.module.scss';

interface UserRepositoriesProps {
  isUserDetails: boolean;
  // eslint-disable-next-line react/no-unused-prop-types
  setIsUserDetails: (value: boolean) => void;
}

interface UserRepoDetailsProp {
  name: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
}

const UserRepositories: React.FC<UserRepositoriesProps> = ({
  isUserDetails,
  setIsUserDetails,
}) => {
  const [repositories, setRepositories] =
    useState<Array<UserRepoDetailsProp> | null>(null);
  const [inputValue, setInputValue] = useState<string>('');
  const userDetails = JSON.parse(localStorage.getItem('userDetails') || '');

  useEffect(() => {
    if (userDetails) {
      fetchUserRepositories(userDetails.login).then((data) =>
        setRepositories(data)
      );
    }
  }, [isUserDetails]);

  const openNewBlank = (url: string): void => {
    if (repositories) {
      window.open(url, '_blank')?.focus();
    }
  };

  const repositoriesComponent = repositories
    ?.filter((item) =>
      item.name.toLocaleLowerCase().includes(inputValue.toLocaleLowerCase())
    )
    ?.map((repo) => (
      <div
        className={classes.repo}
        onClick={() => openNewBlank(repo?.html_url)}
        key={repo?.name}
      >
        <div>{repo?.name}</div>
        <div className={classes.repoDetails}>
          <span>Stars: {repo?.stargazers_count}</span>
          <span>Forks: {repo?.forks_count}</span>
        </div>
      </div>
    ));

  return (
    <div className={classes.userRepositories}>
      <div
        className={classes.backButton}
        onClick={() => setIsUserDetails(true)}
      >
        <ArrowBack className={classes.arrowBack} />
        <span>BACK</span>
      </div>
      <div className={classes.userDetails}>
        <img
          className={classes.avatar}
          src={userDetails.avatar_url}
          alt="Avatar"
        />

        <div className={classes.userInfo}>
          <span>User name: {userDetails.login}</span>
          <span>Email: {userDetails.email || 'hidden'}</span>
          <span>Location: {userDetails.location || 'hidden'}</span>
          <span>
            Join date:{' '}
            {new Date(userDetails.updated_at).toDateString() || 'hidden'}
          </span>
          <span>Followers: {userDetails.followers || 'hidden'}</span>
          <span>Following: {userDetails.following || 'hidden'}</span>
        </div>
      </div>
      <div className={classes.bio}>{userDetails.bio || ''}</div>
      <div className={classes.repositories}>
        <input
          type="text"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
        />
        {repositoriesComponent}
      </div>
    </div>
  );
};

export default UserRepositories;
