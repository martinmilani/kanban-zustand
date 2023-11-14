import { createWithEqualityFn } from "zustand/traditional"
import { devtools, persist } from "zustand/middleware"

const store = (set) => ({
    tasks: [],
    draggedTask: null,
    addTask: (title, state) => set((store => ({
        tasks: [...store.tasks, {title, state}]
    })),false,'addTask'),
    deleteTask: (title) => set((store => ({
        tasks: store.tasks.filter((task) => {
            return task.title !== title
        })
    })), false,'deleteTask'),
    setDraggedTask: (title) => set({draggedTask: title}, false, 'setDraggedTask'),
    moveTask: (title, state) => set((store => ({
        tasks: store.tasks.map((task) => 
            task.title === title ? {title, state} : task
        )
    })), false, 'moveTask')
})

//custom middleware
const log = (config) => (set, get, api) => config(
    (...args) => {
        console.log(args);
        set(...args)
    },  
    get,
    api
)

export const useStore = createWithEqualityFn(log(persist(devtools(store),{name: 'store'})))