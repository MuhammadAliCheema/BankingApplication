import React, { useState, useEffect, createContext } from 'react';

const UserContext = createContext(null);

function UserProvider({ children }) {
  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem('users');
    return savedUsers ? JSON.parse(savedUsers) : [];
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const savedCurrentUser = localStorage.getItem('currentUser');
    return savedCurrentUser ? JSON.parse(savedCurrentUser) : null;
  });

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
  }, [currentUser]);

  const userExists = (email) => {
    return users.some((user) => user.email === email);
  };

  const addUser = (user) => {
    if (userExists(user.email)) {
      return false; // User already exists
    }
    setUsers((prevUsers) => [...prevUsers, user]);
    return true;
  };

  const authenticateUser = (email, password) => {
    const user = users.find((u) => u.email === email && u.password === password);
    if (user) {
      setCurrentUser({ ...user, balance: user.balance || 0 });
      return true;
    }
    return false;
  };

  const updateUserBalance = (email, newBalance) => {
    const updatedUsers = users.map((user) =>
      user.email === email ? { ...user, balance: newBalance } : user
    );
    setUsers(updatedUsers);
    if (currentUser && currentUser.email === email) {
      setCurrentUser((prevUser) => ({ ...prevUser, balance: newBalance }));
    }
  };

  const updateUser = (email, updatedUser) => {
    setUsers(users.map(user => user.email === email ? updatedUser : user));
  };

  const deleteUser = (email) => {
    setUsers(users.filter(user => user.email !== email));
  };

  return (
    <UserContext.Provider value={{ users, currentUser, addUser, authenticateUser, updateUserBalance, updateUser, deleteUser }}>
      {children}
    </UserContext.Provider>
  );
}

export { UserProvider, UserContext };
