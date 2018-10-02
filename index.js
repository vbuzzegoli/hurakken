const throttled = {};

const clone = src => Object.assign({}, src);

const hurakken = store => next => action => {
  if (!action.hurakken) return next(action);
  const {
    throttle: time = false,
    log = false,
    xlog = false,
    onAccepted = false,
    onRejected = false,
    _skip = false
  } = action.hurakken;

  if (_skip) {
    return next(action);
  } else {
    if (!time) {
      return next(action);
    } else {
      const newAction = clone(action);
      newAction.hurakken._skip = true;
      // Ignore the action if already throttled
      if (throttled[action.type]) {
        if (log) {
          console.log(`[Already Throttled] - ${action.type}`);
          console.log(`[Action Rejected] - ${action.type}`);
          if (xlog) console.log(`[Hurakken done for: ${action.type}]`, action);
        }
        if (onRejected) {
          onRejected(newAction, next, store.dispatch);
        }
        return;
      } else {
        // Throttling
        throttled[action.type] = true;
        setTimeout(() => (throttled[action.type] = false), time);
        if (log) {
          console.log(`[Throttling for ${time} ms] - ${action.type}`);
          console.log(`[Action Accepted] - ${action.type}`);
          if (xlog) console.log(`[Hurakken done for: ${action.type}]`, action);
        }
        if (onAccepted) {
          onAccepted(newAction, next, store.dispatch);
        } else {
          return next(newAction);
        }
        return;
      }
    }
  }
};

export default hurakken;
