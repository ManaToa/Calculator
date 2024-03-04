const isNumber = (str: string) => /[0-9]/.test(str)
const isOperator = (str: string) => /[+*/-]/.test(str)
const isPoint = (str: string) => str === '.'

export function handleInput(operation: string[], input: string) {
  const lastInput = operation.slice(-1)[0]

  const lastInputHasPoint = lastInput?.includes('.')
  const currentInputIsPoint = isPoint(input)

  const lastInputIsNumber = isNumber(lastInput) && !lastInputHasPoint
  const lastInputIsOperator = isOperator(lastInput)

  const currentInputIsOperator = isOperator(input)
  const currentInputIsNumber = isNumber(input)

  if (
    (currentInputIsNumber && (lastInputIsNumber || lastInputHasPoint)) ||
    (currentInputIsPoint && lastInputIsNumber)
  )
    return [...operation.slice(0, -1), `${operation.slice(-1)}${input}`]

  if (
    (currentInputIsOperator && (lastInputIsNumber || lastInputHasPoint)) ||
    (currentInputIsNumber && lastInputIsOperator)
  )
    return [...operation, input]

  if (currentInputIsOperator && lastInputIsOperator)
    return [...operation.slice(0, -1), input]

  if (
    (currentInputIsOperator && !lastInput) ||
    (currentInputIsPoint && lastInputHasPoint)
  )
    return [...operation]

  if (currentInputIsPoint && (lastInputIsOperator || !lastInput))
    return [...operation, `0${input}`]

  return [input]
}

export function getResult(operation: string[]): number {
  const formattedOperation = formatNumbers(operation)
  const mulOrdiv = multiplyOfDivide(formattedOperation)
  const addOrSub = addOrSubstract(mulOrdiv)
  return addOrSub[0] as number
}

function formatNumbers(operation: string[]) {
  return operation.map((item: string) => {
    return !isOperator(item) ? parseFloat(item) : item
  })
}

function multiplyOfDivide(operation: (string | number)[]) {
  const hasMultiplyOrDivide = (item: string | number) =>
    item === '*' || item === '/'

  return findOperators(operation, hasMultiplyOrDivide)
}

function addOrSubstract(operation: (string | number)[]) {
  const hasPlusOrMinus = (item: string | number) => item === '+' || item === '-'
  return findOperators(operation, hasPlusOrMinus)
}

function findOperators(
  operation: (string | number)[],
  condition: (item: string | number) => boolean,
) {
  let result = [...operation]
  let index = result.findIndex(condition)

  while (index !== -1) {
    result = [
      ...result.slice(0, index - 1),
      calculate(
        result[index - 1] as number,
        result[index + 1] as number,
        result[index] as string,
      ),
      ...result.slice(index + 2),
    ]
    index = result.findIndex(condition)
  }

  return result
}

const calculate = (a: number, b: number, operator: string) => {
  switch (operator) {
    case '+':
      return Math.round((a + b) * 10000) / 10000
    case '-':
      return Math.round((a - b) * 10000) / 10000
    case '*':
      return Math.round(a * b * 10000) / 10000
    case '/':
      return Math.round((a / b) * 10000) / 10000
    default:
      return 0
  }
}
