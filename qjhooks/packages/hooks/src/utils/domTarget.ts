import { isFunction } from './tools';

function getTargetElement(
  target,
  defaultElement = window,
) {
  if (!target) {
    return defaultElement;
  }

  let targetElement
  if (isFunction(target)) {
    targetElement = target();
  } else if ('current' in target) {
    targetElement = target.current;
  } else {
    targetElement = target;
  }

  return targetElement;
}
export {
  getTargetElement
}