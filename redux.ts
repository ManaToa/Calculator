import { configureStore, createSlice } from '@reduxjs/toolkit'
import { handleInput, getResult } from './functions'

export interface CalculatorState {
  operation: string[]
  result: number | null
}

const calculatorSlice = createSlice({
  name: 'calculator',
  initialState: { operation: [], result: null } as CalculatorState,
  reducers: {
    addOperation: (state, action) => ({
      ...state,
      operation: handleInput([...state.operation], action.payload),
    }),
    resetOperation: state => ({ ...state, operation: [], result: 0 }),
    executeOperation: state => {
      const result = getResult([...state.operation])
      return {
        ...state,
        result: result,
        operation: [`${result}`],
      }
    },
  },
})

export const { addOperation, resetOperation, executeOperation } =
  calculatorSlice.actions

export const store = configureStore({
  reducer: calculatorSlice.reducer,
})
