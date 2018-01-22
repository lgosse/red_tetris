class Store {
  constructor(initialState = {}) {
    this.state = initialState;
  }

  setState(state) {
    this.state = state;
  }

  getState() {
    return this.state;
  }
}

export default Store;
