import { Provider, useDispatch, useSelector } from 'react-redux'
import {
  addOperation,
  resetOperation,
  executeOperation,
  store,
  CalculatorState,
} from './redux'
import buttons, { ButtonType } from './buttons'

function Input({ val, large, tall, operator }: ButtonType) {
  const dispatch = useDispatch()

  function handleClick(value: string) {
    if (value === 'AC') return dispatch(resetOperation())
    if (value === '=') return dispatch(executeOperation())

    dispatch(addOperation(value))
  }

  return (
    <button
      className={`
      ${operator && 'text-mainColor'}
      ${
        large
          ? 'w-[5.94rem] sm:w-[8.2rem] md:w-[10rem]'
          : 'w-[2.97rem] sm:w-[4.1rem] md:w-[5rem]'
      } 
      ${
        tall
          ? 'h-[5.94rem] sm:h-[8.2rem] md:h-[10rem] relative bottom-[2.97rem] sm:bottom-[4.1rem] md:bottom-[5rem] ml-0'
          : 'h-[2.97rem] sm:h-[4.1rem] md:h-[5rem]'
      }
        inline-block border border-gray-300 font-bold text-xl
      `}
      onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
        handleClick((e.target as HTMLButtonElement).value)
      }
      value={val === 'x' ? '*' : val}
    >
      {val}
    </button>
  )
}

function Display() {
  const operation = useSelector((state: CalculatorState) => state.operation)
  return (
    <div className='w-full bg-gray-200 py-1 px-3 text-right font-bold text-sm sm:text-md md:text-2xl shadow-inner'>
      <div>{operation.join(' ') || 0}</div>
      <div>{(operation.length > 0 && operation.slice(-1)[0]) || '_'}</div>
    </div>
  )
}

function CalculatorMachine() {
  return (
    <div className='bg-lightColor p-3 shadow-xl rounded-sm w-[13.5rem] sm:w-[18rem] md:w-[21.6rem]'>
      <Display />
      <div className='mt-3 mx-auto w-full flex justify-center items-center'>
        <div className='inline-flex flex-wrap w-full border border-gray-300 mx-auto h-[14.97rem] sm:h-[20.6rem] md:h-[25.1rem] overflow-hidden'>
          {buttons.map((btn, i) => (
            <Input key={i} {...btn} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Calculator() {
  return (
    <Provider store={store}>
      <CalculatorMachine />
    </Provider>
  )
}
