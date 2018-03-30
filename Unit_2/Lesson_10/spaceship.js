const baseSpaceShip = {
  fly: function() {
    // ... fly function implementation
  },
  shoot: function() {
    // ... shoot function implementation
  },
  destroy: function() {
    // ... function for when the ship is destroyed
  }
}

function enhancedSpaceShip(enhancements) {
  return Object.assign({}, baseSpaceShip, enhancements);
}

function createBomberSpaceShip() {
  return enhancedSpaceShip({
    bomb: function() {
      // ... make the ship drop a bomb
    }
  });
}

function createStealthSpaceShip() {
  return enhancedSpaceShip({
    stealth: function() {
      // ... make the ship invisible
    }
  });
}
