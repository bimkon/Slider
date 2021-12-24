class EventObserver<T> {
  observers: ((data: T) => void)[];

  constructor() {
    this.observers = [];
  }

  subscribe(fn: (data: T) => void) {
    this.observers.push(fn);
  }

  unsubscribe(fn: (data: T) => void) {
    this.observers = this.observers.filter(
      (subscriber: (data: T) => void) => subscriber !== fn,
    );
  }

  broadcast(data: T) {
    this.observers.forEach((subscriber: (data: T) => void) => {
      subscriber(data);
    });
  }
}

export default EventObserver;
