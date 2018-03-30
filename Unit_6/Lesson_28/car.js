class Car {
  constructor() {
    this.gas = 50;
    this.milage = 0;
  }

  hasGas() {
    return this.gas > 0;
  }

  drive() {
    if (this.hasGas()) {
      this.milage++;
      this.gas--;
    }
  }
}
