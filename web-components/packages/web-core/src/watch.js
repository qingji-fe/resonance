import "reflect-metadata";
import {initWatch} from './utils2'
export function Watch(path, options){
  return function(target, methodName, desc) {
    const functions = Reflect.getMetadata(initWatch, target) ?? [];
    const methodFun = desc.value;
    functions.push({ callback: methodFun, options: options || {}, callbackName: methodName, path });
    Reflect.defineMetadata(initWatch, functions, target);
  }
}
