import React, { useState } from 'react';

import { Header } from '../components/Header';
import { MyTasksList } from '../components/MyTasksList';
import { TodoInput } from '../components/TodoInput';

interface Task {
  id: number;
  title: string;
  done: boolean;
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    if (!newTaskTitle) return;

    const task: Task = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    }

    setTasks(oldState => [...oldState, task]);
  }

  function handleMarkTaskAsDone(id: number) {
    const listBackup = [...tasks];

    const index = listBackup.findIndex(item => item.id === id);

    if (index === -1) return;

    listBackup[index].done = !(listBackup[index].done);

    setTasks(listBackup);
  }

  function handleRemoveTask(id: number) {
    const listBackup = tasks.filter((task) => task.id !== id);
    
    setTasks(listBackup);
  }

  return (
    <>
      <Header />

      <TodoInput addTask={handleAddTask} />

      <MyTasksList 
        tasks={tasks} 
        onPress={handleMarkTaskAsDone} 
        onLongPress={handleRemoveTask} 
      />
    </>
  )
}