// 独立处理函数

class Signal {
  constructor() {
    this.observers = []
  }

  add(observer) {
    this.observers.push(observer)
    return this
  }

  remove(observer) {
    this.observers.filter(obs => obs !== observer)
    return this
  }

  emit(observer) {
    if(observer && this.observers[observer]) {
      this.observers[observer][update]()
      return this
    }
    this.observers.forEach(obs => obs.update())
    return this
  }
}