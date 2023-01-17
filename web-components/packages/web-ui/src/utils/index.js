const hasOwn = {}.hasOwnProperty;
function classNames() {
	const classes = [];
	for (let i = 0; i < arguments.length; i++) {
			const arg = arguments[i];
			if (!arg) continue;

			const argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
					classes.push(arg);
			} else if (Array.isArray(arg) && arg.length) {
					// @ts-ignore
					const inner = classNames.apply(null, arg);
					if (inner) {
							classes.push(inner);
					}
			} else if (argType === 'object') {
					for (const key in arg) {
							if (hasOwn.call(arg, key) && arg[key]) {
									classes.push(key);
							}
					}
			}
	}

	return classes.join(' ');
}
export function extractClass(a, b, c) {
	const [ props, ...args ] = Array.prototype.slice.call(arguments, 0);
	if (props.class) {
		args.unshift(props.class);
		delete props.class;
	} else if (props?.className) {
		args.unshift(props?.className);
		delete props?.className;
	}
	if (args.length > 0) {
		return { className: classNames?.apply(null, args) };
	}
	return { className: '' };
}