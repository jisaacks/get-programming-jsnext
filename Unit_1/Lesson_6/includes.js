let locationA = 'Atlanta, Ga';
let locationB = 'Galveston, Tx';

locationA.includes('Ga');
locationB.includes('Ga');

locationA.includes('Ga', locationA.indexOf(' '));
locationB.includes('Ga', locationB.indexOf(' '));
