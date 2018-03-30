function binaryIP(decimalIPStr) {
  return decimalIPStr.split('.').map(function(octet) {
    return Number(octet).toString(2).padStart(8, '0')
  }).join('.');
}

binaryIP('192.168.2.1');
