let jwtToken = '';

const setAuthToken = (token: string) => (jwtToken = token);

const getAuthToken = () => jwtToken;

const authorizationStore = {
  setAuthToken,
  getAuthToken,
};

export default authorizationStore;
