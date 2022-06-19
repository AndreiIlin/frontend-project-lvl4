export default () => {
  const userId = JSON.parse(localStorage.getItem('userId'));
  if (userId && userId.token) {
    return { headers: { Authorization: `Bearer ${userId.token}` } };
  }
  return {};
};
