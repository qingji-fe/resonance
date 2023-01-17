import "reflect-metadata";
import {initEvent, toDotCase} from "./utils2";

export function Emit(event){
    return function(target, methodName, desc) {
        const functions = Reflect.getMetadata(initEvent, target) ?? [];
        const methodFun = desc.value;
        const eventName = (event) ? event: toDotCase(methodName);
        functions.push({ methodName: methodName, methodFun, eventName });
        console.log("functionsfunctions,", functions)
        Reflect.defineMetadata(initEvent, functions, target);
    }
}
