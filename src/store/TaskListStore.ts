import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
import getDateNow from "../utils/getDateNow";
import { IFormInput } from "../components/FormAddTask";

type ITask = {
  id: string;
  taskTitle: string;
  createdAt: string;
  isCompleted: boolean;
};

type ITaskListStore = {
  taskList: ITask[];
  addNewTask: (data: IFormInput) => void;
  removeTask: (id: string) => void;
  completeTask: (id: string) => void;
};

const useTaskListStore = create<ITaskListStore>((set) => ({
  taskList: [],
  addNewTask: (data: IFormInput) => {
    const formattedDate = getDateNow();

    const newTask = {
      id: uuidv4(),
      taskTitle: data.taskTitle,
      createdAt: formattedDate,
      isCompleted: false,
    };

    set((state) => ({ taskList: [...state.taskList, newTask] }));
  },
  removeTask: (id: string) => {
    set((state) => ({
      taskList: state.taskList.filter((task) => task.id !== id),
    }));
  },
  completeTask: (id: string) => {
    set((state) => ({
      taskList: state.taskList.map((task) =>
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
      ),
    }));
  },
}));

export default useTaskListStore;
