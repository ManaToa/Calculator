export interface ButtonType {
  val: string
  large: boolean
  tall: boolean
  operator: boolean
}

const buttons: ButtonType[] = [
  { val: 'AC', large: true, tall: false, operator: true },
  { val: '/', large: false, tall: false, operator: true },
  { val: 'x', large: false, tall: false, operator: true },
  { val: '7', large: false, tall: false, operator: false },
  { val: '8', large: false, tall: false, operator: false },
  { val: '9', large: false, tall: false, operator: false },
  { val: '-', large: false, tall: false, operator: true },
  { val: '4', large: false, tall: false, operator: false },
  { val: '5', large: false, tall: false, operator: false },
  { val: '6', large: false, tall: false, operator: false },
  { val: '+', large: false, tall: false, operator: true },
  { val: '1', large: false, tall: false, operator: false },
  { val: '2', large: false, tall: false, operator: false },
  { val: '3', large: false, tall: false, operator: false },
  { val: '0', large: true, tall: false, operator: false },
  { val: '.', large: false, tall: false, operator: false },
  { val: '=', large: false, tall: true, operator: true },
]

export default buttons
