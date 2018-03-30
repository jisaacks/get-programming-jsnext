function Fish(name) {
  this.name = name;
  this.hunger = 1;
  this.dead = false;
  this.born = new Date();
}
Fish.prototype = {
  eat(amount=1) {
    if (this.dead) {
      console.log(`${this.name} is dead and can no longer eat.`);
      return;
    }
    this.hunger -= amount;
    if (this.hunger < 0) {
      this.dead = true;
      console.log(`${this.name} has died from over eating.`)
      return
    }
  },
  sleep() {
    this.hunger++;
    if (this.hunger >= 5) {
      this.dead = true;
      console.log(`${this.name} has starved.`)
    }
  },
  isHungry: function() {
    return this.hunger > 0;
  }
}

const oscar = new Fish('oscar');
console.assert(oscar instanceof Fish);
console.assert(oscar.isHungry());
while(oscar.isHungry()) {
  oscar.eat();
}
console.assert(!oscar.isHungry());
console.assert(!oscar.dead);
oscar.eat();
console.assert(oscar.dead);
