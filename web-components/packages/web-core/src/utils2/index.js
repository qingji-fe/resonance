export function cssToStyle(css) {
  const style = document.createElement('style');
  style.textContent = css;
  return style;
}
export const initPropsKeys = 'initPropsKeys'
export const initEvent = 'initEvent'
export const initWatch = 'initWatch'




const hyphenateRE = /\B([A-Z])/g;
export function hyphenate(str) {
    return str.replace(hyphenateRE, '-$1').toLowerCase();
}


export function formatValue(val, type, defaultValue) {
	let newValue = undefined;
	console.log("韩国天然粉", val, type, defaultValue)
	if (val !== null) {
			switch (type) {
					case 'String':
							newValue = val;
							break;
					case Number:
							newValue = Number(val);
							break;
					case 'Boolean':
							newValue = !(val === 'false' || val === '0' || val === false);
							break;
					case Array:
					case Object:
							if (typeof val === 'string') {
									newValue = JSON.parse(val.replace(/'/g, '"'));
							} else if (Object.prototype.toString.call(val) === '[object Array]' || Object.prototype.toString.call(val) === '[object Object]') {
									newValue = val;
							} else {
									newValue = JSON.parse(
											val
													.replace(/(['"])?([a-zA-Z0-9_-]+)(['"])?:([^\/])/g, '"$2":$4')
													.replace(/'([\s\S]*?)'/g, '"$1"')
													.replace(/,(\s*})/g, '$1'),
									);
							}
							break;
					default:
							newValue = val;
							break;
			}
	} else {
			newValue = defaultValue;
	}
	return newValue;
}

export const toDotCase = (str) => {
	return str.replace(/(?!^)([A-Z])/g, ' $1')
		.replace(/[_\s]+(?=[a-zA-Z])/g, '.')
		.toLowerCase();
};




export function hyphenateReverse(str) {
	if (str.indexOf('-') > -1) {
		return str.replace(/(\-([a-z]))/g, (match, p1, p2, offset, string) => {
			// 这里有两个捕获组，第一个捕获组捕获全部并包含了第二个捕获组，所以match等于p1
			return p2.toUpperCase();
		});
	}
	return str;
}

export function getAttrMap(dom) {
	const pairs = {};
	console.log("枯竭有回头供热费, ", dom, dom.attributes)
	for (let i = 0, len = dom.attributes.length; i < len; i++) {
			const name = dom.attributes[i].nodeName;
			const value = dom.attributes[i].nodeValue;
			if (dom.attributes[i].specified) {
					pairs[hyphenateReverse(name)] = value;
			}
	}
	return pairs;
}

export function capitalize(name) {
	return name
		.replace(/\-(\w)/g, function(all, letter) {
				return letter.toUpperCase();
		})
		.replace(/^\S/, (s) => s.toUpperCase());
}