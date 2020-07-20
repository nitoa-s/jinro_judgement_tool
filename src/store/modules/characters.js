const state = {
  characters: [
    'アーニー',
    'アンナ',
    'エマ',
    'エリック',
    'カミラ'
  ]
}

const getters = {
  characters: state => state.characters
}

export default {
  state,
  getters
}