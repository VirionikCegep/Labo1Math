function factorialize(num) {
    if (num === 0 || num === 1)
      return 1;
    for (var i = num - 1; i >= 1; i--) {
      num = num * i;
    }
    return num;
}
function isPrime(num) {
    for(var i = 2; i < num; i++)
      if(num % i === 0) return false;
    return num > 1;
}

exports.add = (a,b) => { return a + b; }
exports.sub = (a,b) => { return a - b; }
exports.mul = (a,b) => { return a * b; }
exports.div = (a,b) => { return a / b; }
exports.mod = (a,b) => { return a % b; }
exports.fac = (a) => { return factorialize(a); }
exports.pre = (a) => { return isPrime(a); }
exports.np = (a,b) => { return a + b; }