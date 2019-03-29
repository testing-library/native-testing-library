class NativeEvent {
  constructor(typeArg, eventInit = {}) {
    this._typeArg = typeArg;
    this._event = {
      nativeEvent: { ...eventInit },
    };
  }

  get typeArg() {
    return this._typeArg;
  }

  set target(target) {
    this._event.target = target;
  }

  get target() {
    return this._event.target;
  }

  get event() {
    return this._event;
  }
}

export { NativeEvent };
