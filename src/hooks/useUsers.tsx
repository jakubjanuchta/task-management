import { useEffect, useState } from 'react';
import { useCollection } from './useCollection';
import { User } from '../types/auth';
import { useAuth } from '../contexts/AuthContext';

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);

  const [loading, setLoading] = useState(true);

  const usersItemCollection = useCollection({
    db: 'task_management',
    collection: 'users',
  });

  useEffect(() => {
    let shouldUpdate = true;

    if (shouldUpdate) {
      getUsers();
    }
    return () => {
      shouldUpdate = false;
    };
  }, [usersItemCollection]);

  const getUsers = () => {
    const fetchUsers = usersItemCollection?.find({});

    fetchUsers?.then((users) => {
      setUsers(users);
      setLoading(false);
    });
  };

  const addUser = async (newUser: Partial<User>) => {
    const existingUser = users.find((user) => user.sub === newUser.sub);
    if (existingUser) return;

    try {
      await usersItemCollection?.insertOne({ ...newUser, role: 'developer' });

      getUsers();
    } catch (err) {
      console.error(err);
    }
  };

  return {
    loading,
    users,
    addUser,
  };
}
