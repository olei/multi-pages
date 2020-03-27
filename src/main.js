const a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
console.log(a)
class F {
  constructor() {
    this.name = 'wz'
  }
  point() {
    return (a) => {
      console.log(`${a}-${this.name}`)
    }
  }
}

const b = new F()
b.point()(1)

console.log(b, '----------------------111222225555511-')
