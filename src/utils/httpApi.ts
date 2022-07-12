import urls from '../constants/apiUrls';

const { REACT_APP_DATA_API_URL } = process.env;

interface DataProps {
  incomplete_results?: boolean;
  items?: Array<UserItemsProps>;
  total_count?: number;
}

interface UserItemsProps {
  login: string;
  avatar_url: string;
}
interface UserDetailsProps {
  [key: string]: string | boolean | number | null;
}
interface UserRepositories {
  name: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
}
export const fetchUsers = (login: string): Promise<DataProps> =>
  fetch(REACT_APP_DATA_API_URL + urls.SEARCH_USERS + login)
    .then((response) => response.json())
    .then((data) => data);

export const fetchUserDetails = (login: string): Promise<UserDetailsProps> =>
  fetch(REACT_APP_DATA_API_URL + urls.USER_DETAILS + login)
    .then((response) => response.json())
    .then((data) => data);

export const fetchUserRepositories = (
  login: string
): Promise<Array<UserRepositories>> =>
  fetch(
    REACT_APP_DATA_API_URL + urls.USER_DETAILS + login + urls.USER_REPOSITORIES
  )
    .then((response) => response.json())
    .then((data) => data);
