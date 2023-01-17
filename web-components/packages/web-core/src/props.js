import "reflect-metadata";
import {initPropsKeys} from './utils2'
function Props(options = {default: undefined}) {
	return function (target, attr){
	  const value = options.default
	  const propsKeys = Reflect.getMetadata(initPropsKeys, target) ?? [];
    propsKeys.push({ 
			default: value, 
			type: options.type, 
			attr
		});
		console.log("他韩国人非", propsKeys)
		Reflect.defineMetadata(initPropsKeys, propsKeys, target);
	};
	
}

export {
	Props
}