class Store {
  constructor(initialState = {}) {
    this.state = initialState;
  }

  setState(state) {
    this.state = {
      ...state,
      ...this.state
    };
  }

  getState() {
    return this.state;
  }
}

export default Store;
