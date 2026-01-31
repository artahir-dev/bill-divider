export const fetchUsers = async () => {
  const usersJson = localStorage.getItem('users');
  try {
    const parsedUsers = JSON.parse(usersJson);
    if (!Array.isArray(parsedUsers)) return [];
    return parsedUsers;
  } catch (error) {
    return [];
  }
};

export const createUser = async (user) => {
  const users = await fetchUsers();
  user.id = Date.now().toString();
  const alreadyExists = users.find(u => u.name === user.name || u.id === user.id);
  if (alreadyExists) throw new Error('User already exists');
  users.push(user);
  localStorage.setItem('users', JSON.stringify(users));
  return user;
};
