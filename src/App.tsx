import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchTasks, fetchUsers, updateTask } from './api/api';
import { IUserModel } from './models/IUserModel';
import { ITaskModel } from './models/ITaskModel';
import ListComponent from './components/listComponent/listComponent';
import Task from './components/task/task';
import styles from './App.module.scss';
import Layout from './components/layout/layout';
import { KEY_TASKS, TASKS_LIST_TITLE, USERS_LIST_TITLE } from './constants/constants';

const App: React.FC = () => {
  const params = useParams();

  const [ users, setUsers ] = useState<IUserModel[]>([]);

  const [ tasks, setTasks ] = useState<ITaskModel[]>([]);

  useEffect(() => {
    let subscribe = true;
    if (!subscribe) return;
    
    const userId = params.id ?? '0'
    
    const fetchData = async (id: number) => {
      const fetchedUsers = await fetchUsers();
      if (!subscribe) return;
      setUsers(fetchedUsers);
  
      let userId = id !== 0 ? id : fetchedUsers[0].id;

      const fetchedTasks = await fetchTasks(userId);

      if (!subscribe) return;
      setTasks(fetchedTasks);
    }
    fetchData(parseInt(userId));

    return () => {
      subscribe = false;
    }
  }, [params.id]);

  const completeTask = async (task: ITaskModel) => {

    const updatedTask = await updateTask(task);

    const currentStorage = localStorage.getItem(KEY_TASKS);

    if (!currentStorage) {
      localStorage.setItem(KEY_TASKS, JSON.stringify([updatedTask]));
    } else {
      const parsedVal = JSON.parse(currentStorage)
      localStorage.setItem(KEY_TASKS, JSON.stringify([...parsedVal, updatedTask]));
    }

    const updatedTasks = tasks.map(task => {
      if (task.id === updatedTask.id) task.completed = true;
      return task;
    })

    setTasks(updatedTasks);
  }

  return (
    <Layout>
    <div className={styles.wrapper}>
      <ListComponent title={USERS_LIST_TITLE}>
        {users.map(user => (
          <Link key={`${user.id}`} className={styles.link} to={`/users/${user.id}`}>{user.name}</Link>
        ))}
      </ListComponent>
      <ListComponent title={TASKS_LIST_TITLE}>
        {tasks.map(task => (
          <Task key={`${task.id}`} title={task.title} isCompleted={task.completed} onComplete={() => completeTask({...task, completed: true})} />
        ))}
      </ListComponent>
    </div>
    </Layout>
  );
}

export default App;