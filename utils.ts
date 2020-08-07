export function Fibonacci(num: number){
  var a = 1, b = 0, temp;

  while (num >= 0){
    temp = a;
    a = a + b;
    b = temp;
    num--;
  }

  return b;
}

export function Pi(num: number){
  return `${Math.PI}`.replace('.','').slice(0, num);
}