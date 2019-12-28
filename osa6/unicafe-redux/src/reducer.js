const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  let copy ={ ...state}
  switch (action.type) {
    case 'GOOD':
      copy.good += 1
      return copy
    case 'OK':
      copy.ok += 1
      return copy
    case 'BAD':
      copy.bad += 1
      return copy
    case 'ZERO':
      copy.good = 0
      copy.bad = 0
      copy.ok = 0
      return copy
    default: return state
  }
  
}

export default counterReducer