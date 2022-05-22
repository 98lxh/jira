import { useState, useCallback, useReducer } from 'react';


interface IUndoState<T> {
  past: T[];
  present: T;
  future: T[];
}

const UNDO = 'UNDO'
const REDO = 'REDO'
const RESET = 'RESET'
const SET = 'SET'

type Action<T> = { newPresent?: T, type: typeof UNDO | typeof REDO | typeof RESET | typeof SET }
const undoReducer = <T>(state: IUndoState<T>, action: Action<T>) => {
  const { past, present, future } = state
  const { type, newPresent } = action

  switch (type) {
    case UNDO: {
      if (past.length === 0) return state
      const previous = past[past.length - 1]
      const newPast = past.slice(0, past.length - 1)

      return {
        past: newPast,
        present: previous,
        future: [present, ...future]
      }
    }

    case REDO: {
      if (future.length === 0) return state

      const next = future[0]
      const newFuture = future.slice(1)

      return {
        past: [...past, present],
        present: next,
        future: newFuture
      }
    }

    case SET: {
      if (present === newPresent) return state
      return {
        past: [...past, present],
        present: newPresent,
        future: []
      }
    }

    default: {
      return {
        past: [],
        present: newPresent,
        future: []
      }
    }

  }
}

export const useUndo = <T>(initalpresent: T) => {
  const [state, dispatch] = useReducer(undoReducer, {
    past: [],
    future: [],
    present: initalpresent
  })

  //是否可以进行撤销操作
  const canUndo = state.past.length !== 0
  //是否可以进行恢复操作
  const canRedo = state.future.length !== 0

  const undo = useCallback(() => {
    if (!canUndo) return
    dispatch({ type: UNDO })
  }, [])

  const redo = useCallback(() => {
    if (!canRedo) return
    dispatch({ type: REDO })
  }, [])

  const set = useCallback((newPresent: T) => {
    dispatch({ type: SET, newPresent })
  }, [])


  const reset = useCallback((newPresent: T) => {
    dispatch({ type: RESET, newPresent })
  }, [])

  return [
    state,
    { set, reset, undo, redo, canRedo, canUndo }
  ]
}

