import EventObserver from "../src/plugin/event-observer/EventObserver";

const observer = new EventObserver();

const functionPlug = jest.fn()


describe('test of Observer ', () => {
  test('addObserver', () => {
    observer.subscribe(functionPlug);
    expect(observer.observers.length).toBe(1);
    observer.broadcast(1)
    expect(functionPlug).toHaveBeenCalledWith(1)
  });

  test('removeObserver', () => {
    observer.unsubscribe(functionPlug);
    expect(observer.observers.length).toBe(0);
  });
});