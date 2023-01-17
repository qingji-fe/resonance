import { WebComponent } from './WebComponent';
import options from '../webOptions.ts';

const storeHelpers = [ 'use', 'useSelf' ];

export function define(name, ctor, config) {
    if (customElements.get(name)) {
        return;
    }
    if (options.mapping[name]) {
        return;
    }
    if (ctor.is === 'WebComponent') {
        customElements.define(name, ctor);
        options.mapping[name] = ctor;
    } else {
			if (typeof config === 'string') {
				config = { css: config };
			} else {
				config = config || {};
			}

			class Ele extends WebComponent {
					static css = config.css

					static propTypes = config.propTypes

					static defaultProps = config.defaultProps

					static isLightDom = config.isLightDom

					compute = config.compute

					render() {
							return ctor.call(this, this);
					}
			}

			for (const key in config) {
				if (typeof config[key] === 'function') {
					(Ele).prototype[key] = function() {
							return config[key].apply(this, arguments);
					};
				}
			}
			storeHelpers.forEach(func => {
					if (config[func] && config[func] !== 'function') {
							(Ele).prototype[func] = function() {
									return config[func];
							};
					}
			});
			customElements.define(name, Ele);
			options.mapping[name] = Ele;
    }
}
