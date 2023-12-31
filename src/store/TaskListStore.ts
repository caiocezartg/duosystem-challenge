import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
import getDateNow from "../utils/getDateNow";
import { createJSONStorage, persist } from "zustand/middleware";
import { IFormInput } from "../schema/InputTaskSchema";
import { UseFormReset } from "react-hook-form";

type ITask = {
  id: string;
  taskTitle: string;
  createdAt: string;
  isCompleted: boolean;
};

type ITaskListStore = {
  taskList: ITask[];
  filteredTaskList: ITask[] | [];
  addNewTask: (data: IFormInput, reset: UseFormReset<IFormInput>) => void;
  removeTask: (id: string) => void;
  completeTask: (id: string) => void;
  editTask: (id: string, newTitle: string, reset: UseFormReset<IFormInput>) => void;
  filterTaskListByType: (type: string) => void;
};

const useTaskListStore = create<ITaskListStore>()(
  persist(
    (set, get) => ({
      taskList: [],
      filteredTaskList: [],
      addNewTask: (data, reset) => {
        const formattedDate = getDateNow();

        const newTask = {
          id: uuidv4(),
          taskTitle: data.taskTitle,
          createdAt: formattedDate,
          isCompleted: false,
        };

        set(() => ({ taskList: [...get().taskList, newTask] }));
        reset();
      },
      removeTask: (id) => {
        set(() => ({
          taskList: get().taskList.filter((task) => task.id !== id),
        }));
      },
      completeTask: (id) => {
        set(() => ({
          taskList: get().taskList.map((task) =>
            task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
          ),
        }));
      },
      editTask: (id, newTitle, reset) => {
        set(() => ({
          taskList: get().taskList.map((task) =>
            task.id === id ? { ...task, taskTitle: newTitle } : task
          ),
        }));
        reset()
      },
      filterTaskListByType: (type) => {
        if (type === "completed") {
          const taskListOnlyCompleted = get().taskList.filter(
            (task) => task.isCompleted
          );

          set(() => ({ filteredTaskList: taskListOnlyCompleted }));
        }

        if (type === "uncompleted") {
          const taskListOnlyUncompleted = get().taskList.filter(
            (task) => !task.isCompleted
          );

          set(() => ({ filteredTaskList: taskListOnlyUncompleted }));
        }

        if (type === "all") {
          set(() => ({ filteredTaskList: [] }));
        }
      },
    }),
    {
      name: "task-list",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ taskList: state.taskList }),
    }
  )
);

export default useTaskListStore;
