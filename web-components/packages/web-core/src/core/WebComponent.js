import { diff } from "../runtime/vNode/diff";
import { render } from 'react-dom'
// import { render } from '../runtime/vNode/render'
import { capitalize, cssToDom, hyphenate, isArray } from "../utils/utils.ts";

export class WebComponent extends HTMLElement {

    static is = 'WebComponent'

    static get observedAttributes() {
      return (this).observedAttrs || [];
    }
		rootNode
    constructor() {
			super();
			this.props = Object.assign({}, this.constructor.defaultProps, this.props);
			this.computed = {};
			this.isInstalled = false;
			this._shadowRoot = null;
			console.log("或过热", this.props)
    }

		renderDom() {
			const renderDom = this.render();
			console.log("给他人ss", renderDom)
			// this._shadowRoot.appendChild(renderDom)
			render(renderDom, this._shadowRoot)
		}
    initshadowRoot() {
			let _shadowRoot = this._shadowRoot || this.attachShadow({ mode: 'open' });
			// 挂载实例上
			let fc;
			while ((fc = _shadowRoot.firstChild)) {
				_shadowRoot.removeChild(fc);
			}
			this._shadowRoot = _shadowRoot
			return _shadowRoot
    }
    attrsToProps(ignoreAttrs = []) {
			// if (ignoreAttrs || (this.store && this.store.ignoreAttrs) || this.props.ignoreAttrs) return;
			const ele = this;
			ele.props['css'] = ele.getAttribute('css');
			const attrs = this.constructor.propTypes;
			
			if (!attrs) return;
			Object.keys(attrs).forEach((key) => {
					const type = attrs[key];
					const val = ele.getAttribute(hyphenate(key));
					console.log("和他个人",type, val, attrs, attrs[key])
					if (val !== null) {
						switch (type) {
								case String:
									ele.props[key] = val;
									break;
								case Number:
									ele.props[key] = Number(val);
									break;
								case Boolean:
									if (val === 'false' || val === '0') {
											ele.props[key] = false;
									} else {
											ele.props[key] = true;
									}
									break;
								case Array:
								case Object:
									ele.props[key] = JSON.parse(
										val.replace(/(['"])?([a-zA-Z0-9_-]+)(['"])?:([^\/])/g, '"$2":$4')
												.replace(/'([\s\S]*?)'/g, '"$1"')
												.replace(/,(\s*})/g, '$1')
									);
									break;
						}
					} else {
						if (
							ele.constructor.defaultProps && ele.constructor.defaultProps.hasOwnProperty(key)) {
							ele.props[key] = ele.constructor.defaultProps[key];
						} else {
							ele.props[key] = null;
						}
					}
			});
	  }
    connectedCallback() {
			this.attrsToProps();
			// this.beforeInstall();
			this.install();
			// this.afterInstall();
			this.initshadowRoot();
			// const rendered = this.render(this.props);
			// this.rootNode = diff(null, rendered);
			// console.log("给他人ss", this._shadowRoot, rendered,this.rootNode, this.props)
			this.renderDom()
    }

   
    initCssStyle(_shadowRoot) {
        const elClass = this.constructor;
        if (elClass.elementStyles) {
            _shadowRoot.adoptedStyleSheets = elClass.elementStyles;
        } else {
            const css = elClass.css;
            if (css) {
                if (typeof css === 'string') {
                    const styleSheet = new CSSStyleSheet();
                    // @ts-ignore
                    styleSheet.replaceSync(css);
                    _shadowRoot.adoptedStyleSheets = [ styleSheet ];
                } else if (Object.prototype.toString.call(css) === '[object Array]') {
                    const styleSheets = [];
                    css.forEach((styleSheet) => {
                        if (typeof styleSheet === 'string') {
                            const adoptedStyleSheet = new CSSStyleSheet();
                            // @ts-ignore
                            adoptedStyleSheet.replaceSync(styleSheet);
                            styleSheets.push(adoptedStyleSheet);
                        } else {
                            styleSheets.push(styleSheet);
                        }
                        _shadowRoot.adoptedStyleSheets = styleSheets;
                    });
                } else {
                    _shadowRoot.adoptedStyleSheets = [ css ];
                }
                elClass.elementStyles = _shadowRoot.adoptedStyleSheets;
            }
        }
        return _shadowRoot;
    }
    _dispatchEvent(name, data) {
			const handler = this.props[`on${capitalize(name)}`];
			console.log("股份", handler, name, data)
			if (handler) {
				handler(
					new CustomEvent(name, {
						detail: data,
						bubbles: true,
						composed: true,
					})
				);
			} else {
				this.dispatchEvent(
					new CustomEvent('change', {
						detail: data,
						bubbles: true,
						composed: true,
					})
				);
			}
    }
}

