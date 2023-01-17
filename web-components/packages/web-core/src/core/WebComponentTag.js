import { define } from "./define";
function WebComponentTag(options) {
	return function(target) {
	  define(options.name, target);
	};
}

export { WebComponentTag };
