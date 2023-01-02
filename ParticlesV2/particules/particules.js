!function(t, i) {
  "object" == typeof exports && "undefined" != typeof module ? i(exports) : "function" == typeof define && define.amd ? define(["exports"], i) : i((t = t || self).lil = {})
}(this, (function(t) {
  "use strict";
  class i {
    constructor(t, e, s, n, l = "div") {
      this.parent = t,
        this.object = e,
        this.property = s,
        this._disabled = !1,
        this._hidden = !1,
        this.initialValue = this.getValue(),
        this.domElement = document.createElement("div"),
        this.domElement.classList.add("controller"),
        this.domElement.classList.add(n),
        this.$name = document.createElement("div"),
        this.$name.classList.add("name"),
        i.nextNameID = i.nextNameID || 0,
        this.$name.id = "lil-gui-name-" + ++i.nextNameID,
        this.$widget = document.createElement(l),
        this.$widget.classList.add("widget"),
        this.$disable = this.$widget,
        this.domElement.appendChild(this.$name),
        this.domElement.appendChild(this.$widget),
        this.parent.children.push(this),
        this.parent.controllers.push(this),
        this.parent.$children.appendChild(this.domElement),
        this._listenCallback = this._listenCallback.bind(this),
        this.name(s)
    }
    name(t) {
      return this._name = t,
        this.$name.innerHTML = t,
        this
    }
    onChange(t) {
      return this._onChange = t,
        this
    }
    _callOnChange() {
      this.parent._callOnChange(this),
        void 0 !== this._onChange && this._onChange.call(this, this.getValue()),
        this._changed = !0
    }
    onFinishChange(t) {
      return this._onFinishChange = t,
        this
    }
    _callOnFinishChange() {
      this._changed && (this.parent._callOnFinishChange(this),
        void 0 !== this._onFinishChange && this._onFinishChange.call(this, this.getValue())),
        this._changed = !1
    }
    reset() {
      return this.setValue(this.initialValue),
        this._callOnFinishChange(),
        this
    }
    enable(t = !0) {
      return this.disable(!t)
    }
    disable(t = !0) {
      return t === this._disabled || (this._disabled = t,
        this.domElement.classList.toggle("disabled", t),
        this.$disable.toggleAttribute("disabled", t)),
        this
    }
    show(t = !0) {
      return this._hidden = !t,
        this.domElement.style.display = this._hidden ? "none" : "",
        this
    }
    hide() {
      return this.show(!1)
    }
    options(t) {
      const i = this.parent.add(this.object, this.property, t);
      return i.name(this._name),
        this.destroy(),
        i
    }
    min(t) {
      return this
    }
    max(t) {
      return this
    }
    step(t) {
      return this
    }
    decimals(t) {
      return this
    }
    listen(t = !0) {
      return this._listening = t,
        void 0 !== this._listenCallbackID && (cancelAnimationFrame(this._listenCallbackID),
          this._listenCallbackID = void 0),
        this._listening && this._listenCallback(),
        this
    }
    _listenCallback() {
      this._listenCallbackID = requestAnimationFrame(this._listenCallback);
      const t = this.save();
      t !== this._listenPrevValue && this.updateDisplay(),
        this._listenPrevValue = t
    }
    getValue() {
      return this.object[this.property]
    }
    setValue(t) {
      return this.object[this.property] = t,
        this._callOnChange(),
        this.updateDisplay(),
        this
    }
    updateDisplay() {
      return this
    }
    load(t) {
      return this.setValue(t),
        this._callOnFinishChange(),
        this
    }
    save() {
      return this.getValue()
    }
    destroy() {
      this.listen(!1),
        this.parent.children.splice(this.parent.children.indexOf(this), 1),
        this.parent.controllers.splice(this.parent.controllers.indexOf(this), 1),
        this.parent.$children.removeChild(this.domElement)
    }
  }
  class e extends i {
    constructor(t, i, e) {
      super(t, i, e, "boolean", "label"),
        this.$input = document.createElement("input"),
        this.$input.setAttribute("type", "checkbox"),
        this.$input.setAttribute("aria-labelledby", this.$name.id),
        this.$widget.appendChild(this.$input),
        this.$input.addEventListener("change", () => {
          this.setValue(this.$input.checked),
            this._callOnFinishChange()
        }
        ),
        this.$disable = this.$input,
        this.updateDisplay()
    }
    updateDisplay() {
      return this.$input.checked = this.getValue(),
        this
    }
  }
  function s(t) {
    let i, e;
    return (i = t.match(/(#|0x)?([a-f0-9]{6})/i)) ? e = i[2] : (i = t.match(/rgb\(\s*(\d*)\s*,\s*(\d*)\s*,\s*(\d*)\s*\)/)) ? e = parseInt(i[1]).toString(16).padStart(2, 0) + parseInt(i[2]).toString(16).padStart(2, 0) + parseInt(i[3]).toString(16).padStart(2, 0) : (i = t.match(/^#?([a-f0-9])([a-f0-9])([a-f0-9])$/i)) && (e = i[1] + i[1] + i[2] + i[2] + i[3] + i[3]),
      !!e && "#" + e
  }
  const n = {
    isPrimitive: !0,
    match: t => "string" == typeof t,
    fromHexString: s,
    toHexString: s
  }
    , l = {
      isPrimitive: !0,
      match: t => "number" == typeof t,
      fromHexString: t => parseInt(t.substring(1), 16),
      toHexString: t => "#" + t.toString(16).padStart(6, 0)
    }
    , r = {
      isPrimitive: !1,
      match: Array.isArray,
      fromHexString(t, i, e = 1) {
        const s = l.fromHexString(t);
        i[0] = (s >> 16 & 255) / 255 * e,
          i[1] = (s >> 8 & 255) / 255 * e,
          i[2] = (255 & s) / 255 * e
      },
      toHexString: ([t, i, e], s = 1) => l.toHexString(t * (s = 255 / s) << 16 ^ i * s << 8 ^ e * s << 0)
    }
    , o = {
      isPrimitive: !1,
      match: t => Object(t) === t,
      fromHexString(t, i, e = 1) {
        const s = l.fromHexString(t);
        i.r = (s >> 16 & 255) / 255 * e,
          i.g = (s >> 8 & 255) / 255 * e,
          i.b = (255 & s) / 255 * e
      },
      toHexString: ({ r: t, g: i, b: e }, s = 1) => l.toHexString(t * (s = 255 / s) << 16 ^ i * s << 8 ^ e * s << 0)
    }
    , a = [n, l, r, o];
  class h extends i {
    constructor(t, i, e, n) {
      var l;
      super(t, i, e, "color"),
        this.$input = document.createElement("input"),
        this.$input.setAttribute("type", "color"),
        this.$input.setAttribute("tabindex", -1),
        this.$input.setAttribute("aria-labelledby", this.$name.id),
        this.$text = document.createElement("input"),
        this.$text.setAttribute("type", "text"),
        this.$text.setAttribute("spellcheck", "false"),
        this.$text.setAttribute("aria-labelledby", this.$name.id),
        this.$display = document.createElement("div"),
        this.$display.classList.add("display"),
        this.$display.appendChild(this.$input),
        this.$widget.appendChild(this.$display),
        this.$widget.appendChild(this.$text),
        this._format = (l = this.initialValue,
          a.find(t => t.match(l))),
        this._rgbScale = n,
        this._initialValueHexString = this.save(),
        this._textFocused = !1,
        this.$input.addEventListener("input", () => {
          this._setValueFromHexString(this.$input.value)
        }
        ),
        this.$input.addEventListener("blur", () => {
          this._callOnFinishChange()
        }
        ),
        this.$text.addEventListener("input", () => {
          const t = s(this.$text.value);
          t && this._setValueFromHexString(t)
        }
        ),
        this.$text.addEventListener("focus", () => {
          this._textFocused = !0,
            this.$text.select()
        }
        ),
        this.$text.addEventListener("blur", () => {
          this._textFocused = !1,
            this.updateDisplay(),
            this._callOnFinishChange()
        }
        ),
        this.$disable = this.$text,
        this.updateDisplay()
    }
    reset() {
      return this._setValueFromHexString(this._initialValueHexString),
        this
    }
    _setValueFromHexString(t) {
      if (this._format.isPrimitive) {
        const i = this._format.fromHexString(t);
        this.setValue(i)
      } else
        this._format.fromHexString(t, this.getValue(), this._rgbScale),
          this._callOnChange(),
          this.updateDisplay()
    }
    save() {
      return this._format.toHexString(this.getValue(), this._rgbScale)
    }
    load(t) {
      return this._setValueFromHexString(t),
        this._callOnFinishChange(),
        this
    }
    updateDisplay() {
      return this.$input.value = this._format.toHexString(this.getValue(), this._rgbScale),
        this._textFocused || (this.$text.value = this.$input.value.substring(1)),
        this.$display.style.backgroundColor = this.$input.value,
        this
    }
  }
  class d extends i {
    constructor(t, i, e) {
      super(t, i, e, "function"),
        this.$button = document.createElement("button"),
        this.$button.appendChild(this.$name),
        this.$widget.appendChild(this.$button),
        this.$button.addEventListener("click", t => {
          t.preventDefault(),
            this.getValue().call(this.object)
        }
        ),
        this.$button.addEventListener("touchstart", () => { }
          , {
            passive: !0
          }),
        this.$disable = this.$button
    }
  }
  class c extends i {
    constructor(t, i, e, s, n, l) {
      super(t, i, e, "number"),
        this._initInput(),
        this.min(s),
        this.max(n);
      const r = void 0 !== l;
      this.step(r ? l : this._getImplicitStep(), r),
        this.updateDisplay()
    }
    decimals(t) {
      return this._decimals = t,
        this.updateDisplay(),
        this
    }
    min(t) {
      return this._min = t,
        this._onUpdateMinMax(),
        this
    }
    max(t) {
      return this._max = t,
        this._onUpdateMinMax(),
        this
    }
    step(t, i = !0) {
      return this._step = t,
        this._stepExplicit = i,
        this
    }
    updateDisplay() {
      const t = this.getValue();
      if (this._hasSlider) {
        let i = (t - this._min) / (this._max - this._min);
        i = Math.max(0, Math.min(i, 1)),
          this.$fill.style.width = 100 * i + "%"
      }
      return this._inputFocused || (this.$input.value = void 0 === this._decimals ? t : t.toFixed(this._decimals)),
        this
    }
    _initInput() {
      this.$input = document.createElement("input"),
        this.$input.setAttribute("type", "number"),
        this.$input.setAttribute("step", "any"),
        this.$input.setAttribute("aria-labelledby", this.$name.id),
        this.$widget.appendChild(this.$input),
        this.$disable = this.$input;
      const t = t => {
        const i = parseFloat(this.$input.value);
        isNaN(i) || (this._snapClampSetValue(i + t),
          this.$input.value = this.getValue())
      }
        ;
      let i, e, s, n, l, r = !1;
      const o = t => {
        if (r) {
          const s = t.clientX - i
            , n = t.clientY - e;
          Math.abs(n) > 5 ? (t.preventDefault(),
            this.$input.blur(),
            r = !1,
            this._setDraggingStyle(!0, "vertical")) : Math.abs(s) > 5 && a()
        }
        if (!r) {
          const i = t.clientY - s;
          l -= i * this._step * this._arrowKeyMultiplier(t),
            n + l > this._max ? l = this._max - n : n + l < this._min && (l = this._min - n),
            this._snapClampSetValue(n + l)
        }
        s = t.clientY
      }
        , a = () => {
          this._setDraggingStyle(!1, "vertical"),
            this._callOnFinishChange(),
            window.removeEventListener("mousemove", o),
            window.removeEventListener("mouseup", a)
        }
        ;
      this.$input.addEventListener("input", () => {
        let t = parseFloat(this.$input.value);
        isNaN(t) || (this._stepExplicit && (t = this._snap(t)),
          this.setValue(this._clamp(t)))
      }
      ),
        this.$input.addEventListener("keydown", i => {
          "Enter" === i.code && this.$input.blur(),
            "ArrowUp" === i.code && (i.preventDefault(),
              t(this._step * this._arrowKeyMultiplier(i))),
            "ArrowDown" === i.code && (i.preventDefault(),
              t(this._step * this._arrowKeyMultiplier(i) * -1))
        }
        ),
        this.$input.addEventListener("wheel", i => {
          this._inputFocused && (i.preventDefault(),
            t(this._step * this._normalizeMouseWheel(i)))
        }
          , {
            passive: !1
          }),
        this.$input.addEventListener("mousedown", t => {
          i = t.clientX,
            e = s = t.clientY,
            r = !0,
            n = this.getValue(),
            l = 0,
            window.addEventListener("mousemove", o),
            window.addEventListener("mouseup", a)
        }
        ),
        this.$input.addEventListener("focus", () => {
          this._inputFocused = !0
        }
        ),
        this.$input.addEventListener("blur", () => {
          this._inputFocused = !1,
            this.updateDisplay(),
            this._callOnFinishChange()
        }
        )
    }
    _initSlider() {
      this._hasSlider = !0,
        this.$slider = document.createElement("div"),
        this.$slider.classList.add("slider"),
        this.$fill = document.createElement("div"),
        this.$fill.classList.add("fill"),
        this.$slider.appendChild(this.$fill),
        this.$widget.insertBefore(this.$slider, this.$input),
        this.domElement.classList.add("hasSlider");
      const t = t => {
        const i = this.$slider.getBoundingClientRect();
        let e = (s = t,
          n = i.left,
          l = i.right,
          r = this._min,
          o = this._max,
          (s - n) / (l - n) * (o - r) + r);
        var s, n, l, r, o;
        this._snapClampSetValue(e)
      }
        , i = i => {
          t(i.clientX)
        }
        , e = () => {
          this._callOnFinishChange(),
            this._setDraggingStyle(!1),
            window.removeEventListener("mousemove", i),
            window.removeEventListener("mouseup", e)
        }
        ;
      let s, n, l = !1;
      const r = i => {
        i.preventDefault(),
          this._setDraggingStyle(!0),
          t(i.touches[0].clientX),
          l = !1
      }
        , o = i => {
          if (l) {
            const t = i.touches[0].clientX - s
              , e = i.touches[0].clientY - n;
            Math.abs(t) > Math.abs(e) ? r(i) : (window.removeEventListener("touchmove", o),
              window.removeEventListener("touchend", a))
          } else
            i.preventDefault(),
              t(i.touches[0].clientX)
        }
        , a = () => {
          this._callOnFinishChange(),
            this._setDraggingStyle(!1),
            window.removeEventListener("touchmove", o),
            window.removeEventListener("touchend", a)
        }
        , h = this._callOnFinishChange.bind(this);
      let d;
      this.$slider.addEventListener("mousedown", s => {
        this._setDraggingStyle(!0),
          t(s.clientX),
          window.addEventListener("mousemove", i),
          window.addEventListener("mouseup", e)
      }
      ),
        this.$slider.addEventListener("touchstart", t => {
          t.touches.length > 1 || (this._hasScrollBar ? (s = t.touches[0].clientX,
            n = t.touches[0].clientY,
            l = !0) : r(t),
            window.addEventListener("touchmove", o, {
              passive: !1
            }),
            window.addEventListener("touchend", a))
        }
          , {
            passive: !1
          }),
        this.$slider.addEventListener("wheel", t => {
          if (Math.abs(t.deltaX) < Math.abs(t.deltaY) && this._hasScrollBar)
            return;
          t.preventDefault();
          const i = this._normalizeMouseWheel(t) * this._step;
          this._snapClampSetValue(this.getValue() + i),
            this.$input.value = this.getValue(),
            clearTimeout(d),
            d = setTimeout(h, 400)
        }
          , {
            passive: !1
          })
    }
    _setDraggingStyle(t, i = "horizontal") {
      this.$slider && this.$slider.classList.toggle("active", t),
        document.body.classList.toggle("lil-gui-dragging", t),
        document.body.classList.toggle("lil-gui-" + i, t)
    }
    _getImplicitStep() {
      return this._hasMin && this._hasMax ? (this._max - this._min) / 1e3 : .1
    }
    _onUpdateMinMax() {
      !this._hasSlider && this._hasMin && this._hasMax && (this._stepExplicit || this.step(this._getImplicitStep(), !1),
        this._initSlider(),
        this.updateDisplay())
    }
    _normalizeMouseWheel(t) {
      let { deltaX: i, deltaY: e } = t;
      Math.floor(t.deltaY) !== t.deltaY && t.wheelDelta && (i = 0,
        e = -t.wheelDelta / 120,
        e *= this._stepExplicit ? 1 : 10);
      return i + -e
    }
    _arrowKeyMultiplier(t) {
      let i = this._stepExplicit ? 1 : 10;
      return t.shiftKey ? i *= 10 : t.altKey && (i /= 10),
        i
    }
    _snap(t) {
      const i = Math.round(t / this._step) * this._step;
      return parseFloat(i.toPrecision(15))
    }
    _clamp(t) {
      return t < this._min && (t = this._min),
        t > this._max && (t = this._max),
        t
    }
    _snapClampSetValue(t) {
      this.setValue(this._clamp(this._snap(t)))
    }
    get _hasScrollBar() {
      const t = this.parent.root.$children;
      return t.scrollHeight > t.clientHeight
    }
    get _hasMin() {
      return void 0 !== this._min
    }
    get _hasMax() {
      return void 0 !== this._max
    }
  }
  class u extends i {
    constructor(t, i, e, s) {
      super(t, i, e, "option"),
        this.$select = document.createElement("select"),
        this.$select.setAttribute("aria-labelledby", this.$name.id),
        this.$display = document.createElement("div"),
        this.$display.classList.add("display"),
        this._values = Array.isArray(s) ? s : Object.values(s),
        this._names = Array.isArray(s) ? s : Object.keys(s),
        this._names.forEach(t => {
          const i = document.createElement("option");
          i.innerHTML = t,
            this.$select.appendChild(i)
        }
        ),
        this.$select.addEventListener("change", () => {
          this.setValue(this._values[this.$select.selectedIndex]),
            this._callOnFinishChange()
        }
        ),
        this.$select.addEventListener("focus", () => {
          this.$display.classList.add("focus")
        }
        ),
        this.$select.addEventListener("blur", () => {
          this.$display.classList.remove("focus")
        }
        ),
        this.$widget.appendChild(this.$select),
        this.$widget.appendChild(this.$display),
        this.$disable = this.$select,
        this.updateDisplay()
    }
    updateDisplay() {
      const t = this.getValue()
        , i = this._values.indexOf(t);
      return this.$select.selectedIndex = i,
        this.$display.innerHTML = -1 === i ? t : this._names[i],
        this
    }
  }
  class p extends i {
    constructor(t, i, e) {
      super(t, i, e, "string"),
        this.$input = document.createElement("input"),
        this.$input.setAttribute("type", "text"),
        this.$input.setAttribute("aria-labelledby", this.$name.id),
        this.$input.addEventListener("input", () => {
          this.setValue(this.$input.value)
        }
        ),
        this.$input.addEventListener("keydown", t => {
          "Enter" === t.code && this.$input.blur()
        }
        ),
        this.$input.addEventListener("blur", () => {
          this._callOnFinishChange()
        }
        ),
        this.$widget.appendChild(this.$input),
        this.$disable = this.$input,
        this.updateDisplay()
    }
    updateDisplay() {
      return this.$input.value = this.getValue(),
        this
    }
  }
  let g = !1;
  class m {
    constructor({ parent: t, autoPlace: i = void 0 === t, container: e, width: s, title: n = "Paramètres", injectStyles: l = !0, touchStyles: r = !0 } = {}) {
      if (this.parent = t,
        this.root = t ? t.root : this,
        this.children = [],
        this.controllers = [],
        this.folders = [],
        this._closed = !1,
        this._hidden = !1,
        this.domElement = document.createElement("div"),
        this.domElement.classList.add("lil-gui"),
        this.$title = document.createElement("div"),
        this.$title.classList.add("title"),
        this.$title.setAttribute("role", "button"),
        this.$title.setAttribute("aria-expanded", !0),
        this.$title.setAttribute("tabindex", 0),
        this.$title.addEventListener("click", () => this.openAnimated(this._closed)),
        this.$title.addEventListener("keydown", t => {
          "Enter" !== t.code && "Space" !== t.code || (t.preventDefault(),
            this.$title.click())
        }
        ),
        this.$title.addEventListener("touchstart", () => { }
          , {
            passive: !0
          }),
        this.$children = document.createElement("div"),
        this.$children.classList.add("children"),
        this.domElement.appendChild(this.$title),
        this.domElement.appendChild(this.$children),
        this.title(n),
        r && this.domElement.classList.add("allow-touch-styles"),
        this.parent)
        return this.parent.children.push(this),
          this.parent.folders.push(this),
          void this.parent.$children.appendChild(this.domElement);
      this.domElement.classList.add("root"),
        !g && l && (!function(t) {
          const i = document.createElement("style");
          i.innerHTML = t;
          const e = document.querySelector("head link[rel=stylesheet], head style");
          e ? document.head.insertBefore(i, e) : document.head.appendChild(i)
        }('.lil-gui{--background-color:#1f1f1f;--text-color:#ebebeb;--title-background-color:#111;--title-text-color:#ebebeb;--widget-color:#424242;--hover-color:#4f4f4f;--focus-color:#595959;--number-color:#2cff33;--string-color:#a2db3c;--font-size:11px;--input-font-size:11px;--font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif;--font-family-mono:Menlo,Monaco,Consolas,"Droid Sans Mono",monospace;--padding:4px;--spacing:4px;--widget-height:20px;--name-width:45%;--slider-knob-width:2px;--slider-input-width:27%;--color-input-width:27%;--slider-input-min-width:45px;--color-input-min-width:45px;--folder-indent:7px;--widget-padding:0 0 0 3px;--widget-border-radius:2px;--checkbox-size:calc(var(--widget-height)*0.75);--scrollbar-width:5px;background-color:var(--background-color);color:var(--text-color);font-family:var(--font-family);font-size:var(--font-size);font-style:normal;font-weight:400;line-height:1;text-align:left;touch-action:manipulation;user-select:none;-webkit-user-select:none}.lil-gui,.lil-gui *{box-sizing:border-box;margin:0;padding:0}.lil-gui.root{display:flex;flex-direction:column;width:var(--width,245px)}.lil-gui.root>.title{background:var(--title-background-color);color:var(--title-text-color)}.lil-gui.root>.children{overflow-x:hidden;overflow-y:auto}.lil-gui.root>.children::-webkit-scrollbar{background:var(--background-color);height:var(--scrollbar-width);width:var(--scrollbar-width)}.lil-gui.root>.children::-webkit-scrollbar-thumb{background:var(--focus-color);border-radius:var(--scrollbar-width)}.lil-gui.force-touch-styles{--widget-height:28px;--padding:6px;--spacing:6px;--font-size:13px;--input-font-size:16px;--folder-indent:10px;--scrollbar-width:7px;--slider-input-min-width:50px;--color-input-min-width:65px}.lil-gui.autoPlace{max-height:100%;position:fixed;right:15px;top:0;z-index:1001}.lil-gui .controller{align-items:center;display:flex;margin:var(--spacing) 0;padding:0 var(--padding)}.lil-gui .controller.disabled{opacity:.5}.lil-gui .controller.disabled,.lil-gui .controller.disabled *{pointer-events:none!important}.lil-gui .controller>.name{flex-shrink:0;line-height:var(--widget-height);min-width:var(--name-width);padding-right:var(--spacing);white-space:pre}.lil-gui .controller .widget{align-items:center;display:flex;min-height:var(--widget-height);position:relative;width:100%}.lil-gui .controller.string input{color:var(--string-color)}.lil-gui .controller.boolean .widget{cursor:pointer}.lil-gui .controller.color .display{border-radius:var(--widget-border-radius);height:var(--widget-height);position:relative;width:100%}.lil-gui .controller.color input[type=color]{cursor:pointer;height:100%;opacity:0;width:100%}.lil-gui .controller.color input[type=text]{flex-shrink:0;font-family:var(--font-family-mono);margin-left:var(--spacing);min-width:var(--color-input-min-width);width:var(--color-input-width)}.lil-gui .controller.option select{max-width:100%;opacity:0;position:absolute;width:100%}.lil-gui .controller.option .display{background:var(--widget-color);border-radius:var(--widget-border-radius);height:var(--widget-height);line-height:var(--widget-height);max-width:100%;overflow:hidden;padding-left:.55em;padding-right:1.75em;pointer-events:none;position:relative;word-break:break-all}.lil-gui .controller.option .display.active{background:var(--focus-color)}.lil-gui .controller.option .display:after{bottom:0;content:"↕";font-family:lil-gui;padding-right:.375em;position:absolute;right:0;top:0}.lil-gui .controller.option .widget,.lil-gui .controller.option select{cursor:pointer}.lil-gui .controller.number input{color:var(--number-color)}.lil-gui .controller.number.hasSlider input{flex-shrink:0;margin-left:var(--spacing);min-width:var(--slider-input-min-width);width:var(--slider-input-width)}.lil-gui .controller.number .slider{background-color:var(--widget-color);border-radius:var(--widget-border-radius);cursor:ew-resize;height:var(--widget-height);overflow:hidden;padding-right:var(--slider-knob-width);touch-action:pan-y;width:100%}.lil-gui .controller.number .slider.active{background-color:var(--focus-color)}.lil-gui .controller.number .slider.active .fill{opacity:.95}.lil-gui .controller.number .fill{border-right:var(--slider-knob-width) solid var(--number-color);box-sizing:content-box;height:100%}.lil-gui-dragging .lil-gui{--hover-color:var(--widget-color)}.lil-gui-dragging *{cursor:ew-resize!important}.lil-gui-dragging.lil-gui-vertical *{cursor:ns-resize!important}.lil-gui .title{--title-height:calc(var(--widget-height) + var(--spacing)*1.25);-webkit-tap-highlight-color:transparent;text-decoration-skip:objects;cursor:pointer;font-weight:600;height:var(--title-height);line-height:calc(var(--title-height) - 4px);outline:none;padding:0 var(--padding)}.lil-gui .title:before{content:"▾";display:inline-block;font-family:lil-gui;padding-right:2px}.lil-gui .title:active{background:var(--title-background-color);opacity:.75}.lil-gui.root>.title:focus{text-decoration:none!important}.lil-gui.closed>.title:before{content:"▸"}.lil-gui.closed>.children{opacity:0;transform:translateY(-7px)}.lil-gui.closed:not(.transition)>.children{display:none}.lil-gui.transition>.children{overflow:hidden;pointer-events:none;transition-duration:.3s;transition-property:height,opacity,transform;transition-timing-function:cubic-bezier(.2,.6,.35,1)}.lil-gui .children:empty:before{content:"Empty";display:block;font-style:italic;height:var(--widget-height);line-height:var(--widget-height);margin:var(--spacing) 0;opacity:.5;padding:0 var(--padding)}.lil-gui.root>.children>.lil-gui>.title{border-width:0;border-bottom:1px solid var(--widget-color);border-left:0 solid var(--widget-color);border-right:0 solid var(--widget-color);border-top:1px solid var(--widget-color);transition:border-color .3s}.lil-gui.root>.children>.lil-gui.closed>.title{border-bottom-color:transparent}.lil-gui+.controller{border-top:1px solid var(--widget-color);margin-top:0;padding-top:var(--spacing)}.lil-gui .lil-gui .lil-gui>.title{border:none}.lil-gui .lil-gui .lil-gui>.children{border:none;border-left:2px solid var(--widget-color);margin-left:var(--folder-indent)}.lil-gui .lil-gui .controller{border:none}.lil-gui input{-webkit-tap-highlight-color:transparent;background:var(--widget-color);border:0;border-radius:var(--widget-border-radius);color:var(--text-color);font-family:var(--font-family);font-size:var(--input-font-size);height:var(--widget-height);outline:none;width:100%}.lil-gui input:disabled{opacity:1}.lil-gui input[type=number],.lil-gui input[type=text]{padding:var(--widget-padding)}.lil-gui input[type=number]:focus,.lil-gui input[type=text]:focus{background:var(--focus-color)}.lil-gui input::-webkit-inner-spin-button,.lil-gui input::-webkit-outer-spin-button{-webkit-appearance:none;margin:0}.lil-gui input[type=number]{-moz-appearance:textfield}.lil-gui input[type=checkbox]{appearance:none;-webkit-appearance:none;border-radius:var(--widget-border-radius);cursor:pointer;height:var(--checkbox-size);text-align:center;width:var(--checkbox-size)}.lil-gui input[type=checkbox]:checked:before{content:"✓";font-family:lil-gui;font-size:var(--checkbox-size);line-height:var(--checkbox-size)}.lil-gui button{-webkit-tap-highlight-color:transparent;background:var(--widget-color);border:1px solid var(--widget-color);border-radius:var(--widget-border-radius);color:var(--text-color);cursor:pointer;font-family:var(--font-family);font-size:var(--font-size);height:var(--widget-height);line-height:calc(var(--widget-height) - 4px);outline:none;text-align:center;text-transform:none;width:100%}.lil-gui button:active{background:var(--focus-color)}@font-face{font-family:lil-gui;src:url("data:application/font-woff;charset=utf-8;base64,d09GRgABAAAAAAUsAAsAAAAACJwAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABHU1VCAAABCAAAAH4AAADAImwmYE9TLzIAAAGIAAAAPwAAAGBKqH5SY21hcAAAAcgAAAD0AAACrukyyJBnbHlmAAACvAAAAF8AAACEIZpWH2hlYWQAAAMcAAAAJwAAADZfcj2zaGhlYQAAA0QAAAAYAAAAJAC5AHhobXR4AAADXAAAABAAAABMAZAAAGxvY2EAAANsAAAAFAAAACgCEgIybWF4cAAAA4AAAAAeAAAAIAEfABJuYW1lAAADoAAAASIAAAIK9SUU/XBvc3QAAATEAAAAZgAAAJCTcMc2eJxVjbEOgjAURU+hFRBK1dGRL+ALnAiToyMLEzFpnPz/eAshwSa97517c/MwwJmeB9kwPl+0cf5+uGPZXsqPu4nvZabcSZldZ6kfyWnomFY/eScKqZNWupKJO6kXN3K9uCVoL7iInPr1X5baXs3tjuMqCtzEuagm/AAlzQgPAAB4nGNgYRBlnMDAysDAYM/gBiT5oLQBAwuDJAMDEwMrMwNWEJDmmsJwgCFeXZghBcjlZMgFCzOiKOIFAB71Bb8AeJy1kjFuwkAQRZ+DwRAwBtNQRUGKQ8OdKCAWUhAgKLhIuAsVSpWz5Bbkj3dEgYiUIszqWdpZe+Z7/wB1oCYmIoboiwiLT2WjKl/jscrHfGg/pKdMkyklC5Zs2LEfHYpjcRoPzme9MWWmk3dWbK9ObkWkikOetJ554fWyoEsmdSlt+uR0pCJR34b6t/TVg1SY3sYvdf8vuiKrpyaDXDISiegp17p7579Gp3p++y7HPAiY9pmTibljrr85qSidtlg4+l25GLCaS8e6rRxNBmsnERunKbaOObRz7N72ju5vdAjYpBXHgJylOAVsMseDAPEP8LYoUHicY2BiAAEfhiAGJgZWBgZ7RnFRdnVJELCQlBSRlATJMoLV2DK4glSYs6ubq5vbKrJLSbGrgEmovDuDJVhe3VzcXFwNLCOILB/C4IuQ1xTn5FPilBTj5FPmBAB4WwoqAHicY2BkYGAA4sk1sR/j+W2+MnAzpDBgAyEMQUCSg4EJxAEAwUgFHgB4nGNgZGBgSGFggJMhDIwMqEAYAByHATJ4nGNgAIIUNEwmAABl3AGReJxjYAACIQYlBiMGJ3wQAEcQBEV4nGNgZGBgEGZgY2BiAAEQyQWEDAz/wXwGAAsPATIAAHicXdBNSsNAHAXwl35iA0UQXYnMShfS9GPZA7T7LgIu03SSpkwzYTIt1BN4Ak/gKTyAeCxfw39jZkjymzcvAwmAW/wgwHUEGDb36+jQQ3GXGot79L24jxCP4gHzF/EIr4jEIe7wxhOC3g2TMYy4Q7+Lu/SHuEd/ivt4wJd4wPxbPEKMX3GI5+DJFGaSn4qNzk8mcbKSR6xdXdhSzaOZJGtdapd4vVPbi6rP+cL7TGXOHtXKll4bY1Xl7EGnPtp7Xy2n00zyKLVHfkHBa4IcJ2oD3cgggWvt/V/FbDrUlEUJhTn/0azVWbNTNr0Ens8de1tceK9xZmfB1CPjOmPH4kitmvOubcNpmVTN3oFJyjzCvnmrwhJTzqzVj9jiSX911FjeAAB4nG3HMRKCMBBA0f0giiKi4DU8k0V2GWbIZDOh4PoWWvq6J5V8If9NVNQcaDhyouXMhY4rPTcG7jwYmXhKq8Wz+p762aNaeYXom2n3m2dLTVgsrCgFJ7OTmIkYbwIbC6vIB7WmFfAAAA==") format("woff")}@media (pointer:coarse){.lil-gui.allow-touch-styles{--widget-height:28px;--padding:6px;--spacing:6px;--font-size:13px;--input-font-size:16px;--folder-indent:10px;--scrollbar-width:7px;--slider-input-min-width:50px;--color-input-min-width:65px}}@media (hover:hover){.lil-gui .controller.color .display:hover:before{border:1px solid #fff9;border-radius:var(--widget-border-radius);bottom:0;content:" ";display:block;left:0;position:absolute;right:0;top:0}.lil-gui .controller.option .display.focus{background:var(--focus-color)}.lil-gui .controller.option .widget:hover .display{background:var(--hover-color)}.lil-gui .controller.number .slider:hover{background-color:var(--hover-color)}body:not(.lil-gui-dragging) .lil-gui .title:hover{background:var(--title-background-color);opacity:.85}.lil-gui .title:focus{text-decoration:underline var(--focus-color)}.lil-gui input:hover{background:var(--hover-color)}.lil-gui input:active{background:var(--focus-color)}.lil-gui input[type=checkbox]:focus{box-shadow:inset 0 0 0 1px var(--focus-color)}.lil-gui button:hover{background:var(--hover-color);border-color:var(--hover-color)}.lil-gui button:focus{border-color:var(--focus-color)}}'),
          g = !0),
        e ? e.appendChild(this.domElement) : i && (this.domElement.classList.add("autoPlace"),
          document.body.appendChild(this.domElement)),
        s && this.domElement.style.setProperty("--width", s + "px"),
        this.domElement.addEventListener("keydown", t => t.stopPropagation()),
        this.domElement.addEventListener("keyup", t => t.stopPropagation())
    }
    add(t, i, s, n, l) {
      if (Object(s) === s)
        return new u(this, t, i, s);
      const r = t[i];
      switch (typeof r) {
        case "number":
          return new c(this, t, i, s, n, l);
        case "boolean":
          return new e(this, t, i);
        case "string":
          return new p(this, t, i);
        case "function":
          return new d(this, t, i)
      }
      console.error("gui.add failed\n\tproperty:", i, "\n\tobject:", t, "\n\tvalue:", r)
    }
    addColor(t, i, e = 1) {
      return new h(this, t, i, e)
    }
    addFolder(t) {
      return new m({
        parent: this,
        title: t
      })
    }
    load(t, i = !0) {
      return t.controllers && this.controllers.forEach(i => {
        i instanceof d || i._name in t.controllers && i.load(t.controllers[i._name])
      }
      ),
        i && t.folders && this.folders.forEach(i => {
          i._title in t.folders && i.load(t.folders[i._title])
        }
        ),
        this
    }
    save(t = !0) {
      const i = {
        controllers: {},
        folders: {}
      };
      return this.controllers.forEach(t => {
        if (!(t instanceof d)) {
          if (t._name in i.controllers)
            throw new Error(`Cannot save GUI with duplicate property "${t._name}"`);
          i.controllers[t._name] = t.save()
        }
      }
      ),
        t && this.folders.forEach(t => {
          if (t._title in i.folders)
            throw new Error(`Cannot save GUI with duplicate folder "${t._title}"`);
          i.folders[t._title] = t.save()
        }
        ),
        i
    }
    open(t = !0) {
      return this._closed = !t,
        this.$title.setAttribute("aria-expanded", !this._closed),
        this.domElement.classList.toggle("closed", this._closed),
        this
    }
    close() {
      return this.open(!1)
    }
    show(t = !0) {
      return this._hidden = !t,
        this.domElement.style.display = this._hidden ? "none" : "",
        this
    }
    hide() {
      return this.show(!1)
    }
    openAnimated(t = !0) {
      return this._closed = !t,
        this.$title.setAttribute("aria-expanded", !this._closed),
        requestAnimationFrame(() => {
          const i = this.$children.clientHeight;
          this.$children.style.height = i + "px",
            this.domElement.classList.add("transition");
          const e = t => {
            t.target === this.$children && (this.$children.style.height = "",
              this.domElement.classList.remove("transition"),
              this.$children.removeEventListener("transitionend", e))
          }
            ;
          this.$children.addEventListener("transitionend", e);
          const s = t ? this.$children.scrollHeight : 0;
          this.domElement.classList.toggle("closed", !t),
            requestAnimationFrame(() => {
              this.$children.style.height = s + "px"
            }
            )
        }
        ),
        this
    }
    title(t) {
      return this._title = t,
        this.$title.innerHTML = t,
        this
    }
    reset(t = !0) {
      return (t ? this.controllersRecursive() : this.controllers).forEach(t => t.reset()),
        this
    }
    onChange(t) {
      return this._onChange = t,
        this
    }
    _callOnChange(t) {
      this.parent && this.parent._callOnChange(t),
        void 0 !== this._onChange && this._onChange.call(this, {
          object: t.object,
          property: t.property,
          value: t.getValue(),
          controller: t
        })
    }
    onFinishChange(t) {
      return this._onFinishChange = t,
        this
    }
    _callOnFinishChange(t) {
      this.parent && this.parent._callOnFinishChange(t),
        void 0 !== this._onFinishChange && this._onFinishChange.call(this, {
          object: t.object,
          property: t.property,
          value: t.getValue(),
          controller: t
        })
    }
    destroy() {
      this.parent && (this.parent.children.splice(this.parent.children.indexOf(this), 1),
        this.parent.folders.splice(this.parent.folders.indexOf(this), 1)),
        this.domElement.parentElement && this.domElement.parentElement.removeChild(this.domElement),
        Array.from(this.children).forEach(t => t.destroy())
    }
    controllersRecursive() {
      let t = Array.from(this.controllers);
      return this.folders.forEach(i => {
        t = t.concat(i.controllersRecursive())
      }
      ),
        t
    }
    foldersRecursive() {
      let t = Array.from(this.folders);
      return this.folders.forEach(i => {
        t = t.concat(i.foldersRecursive())
      }
      ),
        t
    }
  }
  t.BooleanController = e,
    t.ColorController = h,
    t.Controller = i,
    t.FunctionController = d,
    t.GUI = m,
    t.NumberController = c,
    t.OptionController = u,
    t.StringController = p,
    t.default = m,
    Object.defineProperty(t, "__esModule", {
      value: !0
    })
}
));

const maxRadius = 200;
const maxClusters = 20;
const minClusterSize = 50;
const predefinedColors = ['green', 'red', 'orange', 'cyan', 'magenta', 'lavender', 'teal'];
returnColorName = (color) => {

  if (color == 'green')
    return 'Vert';
  if (color == 'red')
    return 'Rouge';
  if (color == 'lavender')
    return 'Lavande';
  if (color == 'teal')
    return 'Sarcelle';

  return color.capitalise();

}
const settings = {
  seed: 24,
  fps: 0,
  atoms: {
    count: 500,
    // Per Color
    radius: 1,
  },
  drawings: {
    // Drawing options can be expensive on performance
    lines: false,
    // draw lines between atoms that arr effecting each other
    circle: false,
    // draw atoms as circles
    clusters: false,
    background_color: '#000000',
    // Background color
  },
  explore: false,
  explorePeriod: 100,
  rules: {},
  rulesArray: [],
  radii: {},
  radii2Array: [],
  colors: [],
  numColors: 5,
  time_scale: 1.0,
  viscosity: 0.7,
  // speed-dampening (can be >1 !)
  gravity: 0.0,
  // pulling downward
  pulseDuration: 10,
  wallRepel: 40,
  reset: () => {
    randomAtoms(settings.atoms.count, true)
  }
  ,
  randomRules: () => {
    settings.seed = local_seed
    // last used seed is the new starting seed
    startRandom()
  }
  ,
  symmetricRules: () => {
    symmetricRules()
    randomAtoms(settings.atoms.count, true)
    updateGUIDisplay()
  }
  ,
  gui: null,
}

const setupClicks = () => {
  canvas.addEventListener('click', (e) => {
    pulse = settings.pulseDuration;
    if (e.shiftKey)
      pulse = -pulse;
    pulse_x = e.clientX;
    pulse_y = e.clientY;
  }
  )
}
const setupKeys = () => {
  canvas.addEventListener('keydown', function(e) {
    console.log(e.key)
    switch (e.key) {
      case 'r':
        settings.randomRules()
        break;
      case 't':
        settings.drawings.clusters = !settings.drawings.clusters
        break;
      case 'o':
        settings.reset()
        break;
      case 's':
        settings.symmetricRules()
        break;
      default:
        console.log(e.key)
    }
  })
}
const updateGUIDisplay = () => {
  console.log('gui', settings.gui)
  settings.gui.destroy()
  setupGUI()
}
Object.defineProperty(String.prototype, 'capitalise', {
  value: function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
  },
  enumerable: false
})

// Build GUI
const setupGUI = () => {
  settings.gui = new lil.GUI()
  // Configs
  const configFolder = settings.gui.addFolder('Config')
  configFolder.add(settings, 'reset').name('Réinitialiser')
  configFolder.add(settings, 'randomRules').name('Règles aléatoires')
  configFolder.add(settings, 'symmetricRules').name('Règles symétriques')
  configFolder.add(settings, 'numColors', 1, 7, 1).name('Nombre couleurs').listen().onFinishChange(v => {
    setNumberOfColors();
    startRandom();
  }
  )
  configFolder.add(settings, 'seed').name('Seed').listen().onFinishChange(v => {
    startRandom();
  }
  )
  configFolder.add(settings.atoms, 'count', 1, 1000, 1).name('Particules/couleur').listen().onFinishChange(v => {
    randomAtoms(v, true)
  }
  )
  configFolder.add(settings, 'time_scale', 0.1, 5, 0.01).name('Échelle de temps').listen()
  configFolder.add(settings, 'viscosity', 0.1, 2, 0.1).name('Viscosité').listen()

  configFolder.add(settings, 'gravity', 0., 1., 0.05).name('Gravité').listen()
  configFolder.add(settings, 'pulseDuration', 1, 100, 1).name('Durée Impulsion Click').listen()

  configFolder.add(settings, 'wallRepel', 0, 100, 1).name('Repousse des murs').listen()
  configFolder.add(settings, 'explore').name('Exploration aléatoire').listen()
  // Drawings
  const drawingsFolder = settings.gui.addFolder('Déssins')
  drawingsFolder.add(settings.atoms, 'radius', 1, 10, 0.5).name('Rayon').listen()
  drawingsFolder.add(settings.drawings, 'clusters').name('Suivre Grappes').listen()
  //drawingsFolder.add(settings.drawings, 'lines').name('Draw Lines').listen()
  // Colors
  for (const atomColor of settings.colors) {
    const colorFolder = settings.gui.addFolder(`Règles: <font color=\'${atomColor}\'>${returnColorName(atomColor)}</font>`)
    for (const ruleColor of settings.colors) {
      colorFolder.add(settings.rules[atomColor], ruleColor, -1, 1, 0.001).name(`<-> <font color=\'${ruleColor}\'>${returnColorName(ruleColor)}</font>`).listen().onFinishChange(v => {
        flattenRules()
      }
      )
    }
    colorFolder.add(settings.radii, atomColor, 1, maxRadius, 5).name('Rayon').listen().onFinishChange(v => {
      flattenRules()
    }
    )
  }

}

// Seedable 'decent' random generator
var local_seed = settings.seed;
function mulberry32() {
  let t = local_seed += 0x6D2B79F5;
  t = Math.imul(t ^ t >>> 15, t | 1);
  t ^= t + Math.imul(t ^ t >>> 7, t | 61);
  return ((t ^ t >>> 14) >>> 0) / 4294967296.;
}

function loadSeedFromUrl() {
  let hash = window.location.hash;
  if (hash != undefined && hash[0] == '#') {
    let param = Number(hash.substr(1));
    // remove the leading '#'
    if (isFinite(param)) {
      settings.seed = param;
      console.log("Using seed " + settings.seed);
    }
  }
}

function randomRules() {
  if (!isFinite(settings.seed))
    settings.seed = 0xcafecafe;
  window.location.hash = "#" + settings.seed;
  local_seed = settings.seed;
  console.log("Seed=" + local_seed);
  for (const i of settings.colors) {
    settings.rules[i] = {};
    for (const j of settings.colors) {
      settings.rules[i][j] = mulberry32() * 2 - 1;
    }
    settings.radii[i] = 80;
  }
  console.log(JSON.stringify(settings.rules));
  flattenRules()
}

function symmetricRules() {
  for (const i of settings.colors) {
    for (const j of settings.colors) {
      if (j < i) {
        let v = 0.5 * (settings.rules[i][j] + settings.rules[j][i]);
        settings.rules[i][j] = settings.rules[j][i] = v;
      }
    }
  }
  console.log(JSON.stringify(settings.rules));
  flattenRules()
}

function flattenRules() {
  settings.rulesArray = []
  settings.radii2Array = []
  for (const c1 of settings.colors) {
    for (const c2 of settings.colors) {
      settings.rulesArray.push(settings.rules[c1][c2])
    }
    settings.radii2Array.push(settings.radii[c1] * settings.radii[c1])
  }
}

function updateCanvasDimensions() {
  canvas.width = window.innerWidth * 0.9;
  canvas.height = window.innerHeight * 0.9;
}

// Initiate Random locations for Atoms ( used when atoms created )
function randomX() {
  return mulberry32() * (canvas.width - 100) + 50;
}
; function randomY() {
  return mulberry32() * (canvas.height - 100) + 50;
}
; const create = (number, color) => {
  for (let i = 0; i < number; i++) {
    atoms.push([randomX(), randomY(), 0, 0, color])
  }
}
  ;

function randomAtoms(number_of_atoms_per_color, clear_previous) {
  if (clear_previous)
    atoms.length = 0;
  for (let c = 0; c < settings.colors.length; c++) {
    create(number_of_atoms_per_color, c)
  }
  clusters.length = 0;
}

function startRandom() {
  randomRules();
  randomAtoms(settings.atoms.count, true);
  updateGUIDisplay()
}

function setNumberOfColors() {
  settings.colors = [];
  for (let i = 0; i < settings.numColors; ++i) {
    settings.colors.push(predefinedColors[i]);
  }
}

// Run Application
loadSeedFromUrl()

// Canvas
const canvas = document.getElementById('canvas');
const m = canvas.getContext("2d");
// Draw a square
const drawSquare = (x, y, color, radius) => {
  m.fillStyle = color;
  m.fillRect(x - radius, y - radius, 2 * radius, 2 * radius);
}

// Draw a circle
function drawCircle(x, y, color, radius, fill = true) {
  m.beginPath();
  m.arc(x, y, radius, 0 * Math.PI, 2 * Math.PI);
  // x, y, radius, ArcStart, ArcEnd
  m.closePath();
  m.strokeStyle = m.fillStyle = color;
  fill ? m.fill() : m.stroke()
}
;// Draw a line between two atoms
function drawLineBetweenAtoms(ax, ay, bx, by, color) {
  m.beginPath();
  m.moveTo(ax, ay);
  m.lineTo(bx, by);
  m.closePath();
  m.strokeStyle = color;
  m.stroke();
}
;// [position-x, position-y, radius, color]
//    /* tmp accumulators: */
//  {count, accum-x, accum-y, accum-d^2, accum-color}]
let clusters = [];
function newCluster() {
  return [randomX(), randomY(), maxRadius, 'white'];
}
function addNewClusters(num_clusters) {
  if (clusters.length < num_clusters / 2) {
    while (clusters.length < num_clusters)
      clusters.push(newCluster());
  }
}
function findNearestCluster(x, y) {
  let best = -1;
  let best_d2 = 1.e38;
  for (let i = 0; i < clusters.length; ++i) {
    const c = clusters[i];
    const dx = c[0] - x;
    const dy = c[1] - y;
    const d2 = dx * dx + dy * dy;
    if (d2 < best_d2) {
      best = i;
      best_d2 = d2;
    }
  }
  return [best, best_d2];
}
function moveClusters(accums) {
  let max_d = 0.;
  // record max cluster displacement
  for (let i = 0; i < clusters.length; ++i) {
    let c = clusters[i];
    const a = accums[i];
    if (a[0] > minClusterSize) {
      const norm = 1. / a[0];
      const new_x = a[1] * norm;
      const new_y = a[2] * norm;
      max_d = Math.max(max_d, Math.abs(c[0] - new_x), Math.abs(c[1] - new_y));
      c[0] = new_x;
      c[1] = new_y;
    }
  }
  return max_d;
}
function finalizeClusters(accums) {
  for (let i = 0; i < clusters.length; ++i) {
    let c = clusters[i];
    const a = accums[i];
    if (a[0] > minClusterSize) {
      const norm = 1. / a[0];
      const new_r = 1.10 * Math.sqrt(a[3] * norm);
      // with 10% extra room
      c[2] = 0.95 * c[2] + 0.05 * new_r;
      // exponential smoothing
      // 'average' color
      c[3] = settings.colors[Math.floor(a[4] * norm + .5)];
    } else {
      c[2] = 0.;
      // disable the weak cluster
    }
  }
  // note: if half of the particles are not within the average radius of the cluster, we should probably split it in two along the main axis!
}
function trackClusters() {
  addNewClusters(maxClusters);
  let accums = [];
  for (const c of clusters)
    accums.push([0, 0., 0., 0., 0]);
  const maxKMeanPasses = 10;
  for (let pass = maxKMeanPasses; pass >= 0; --pass) {
    for (let a of accums)
      a = [0, 0., 0., 0., 0];
    for (const c of atoms) {
      const [best, best_d2] = findNearestCluster(c[0], c[1]);
      if (best >= 0 && best_d2 < maxRadius * maxRadius) {
        accums[best][0] += 1;
        accums[best][1] += c[0];
        accums[best][2] += c[1];
        accums[best][3] += best_d2;
        accums[best][4] += c[4];
      }
    }
    const max_d = moveClusters(accums);
    if (max_d < 1.)
      break;
  }
  finalizeClusters(accums);
}
function drawClusters() {
  let i = 0;
  while (i < clusters.length) {
    let c = clusters[i];
    if (c[2] > 0.) {
      drawCircle(c[0], c[1], c[3], c[2], false);
      ++i;
    } else {
      // remove cluster by swapping with last
      const last = clusters.pop();
      if (i < clusters.length)
        clusters[i] = last;
    }
  }
}

// Canvas Dimensions
updateCanvasDimensions()

// Params for click-based pulse event
var pulse = 0;
var pulse_x = 0
  , pulse_y = 0;

var exploration_timer = 0;
function exploreParameters() {
  if (exploration_timer <= 0) {
    let c1 = settings.colors[Math.floor(mulberry32() * settings.numColors)];
    if (mulberry32() >= 0.2) {
      // 80% of the time, we change the strength
      let c2 = settings.colors[Math.floor(mulberry32() * settings.numColors)];
      let new_strength = mulberry32();
      // for better results, we force opposite-signed values
      if (settings.rules[c1][c2] > 0)
        new_strength = -new_strength;
      settings.rules[c1][c2] = new_strength;
    } else {
      // ...otherwise, the radius
      settings.radii[c1] = 1 + Math.floor(mulberry32() * maxRadius);
    }
    flattenRules();
    exploration_timer = settings.explorePeriod;
  }
  exploration_timer -= 1;
}

var total_v;
// global velocity as a estimate of on-screen activity

// Apply Rules ( How atoms interact with each other )
const applyRules = () => {
  total_v = 0.;
  // update velocity first
  for (const a of atoms) {
    let fx = 0;
    let fy = 0;
    const idx = a[4] * settings.numColors;
    const r2 = settings.radii2Array[a[4]]
    for (const b of atoms) {
      const g = settings.rulesArray[idx + b[4]];
      const dx = a[0] - b[0];
      const dy = a[1] - b[1];
      if (dx !== 0 || dy !== 0) {
        const d = dx * dx + dy * dy;
        if (d < r2) {
          const F = g / Math.sqrt(d);
          fx += F * dx;
          fy += F * dy;

          // Draw lines between atoms that are effecting each other.
          if (settings.drawings.lines) {
            drawLineBetweenAtoms(a[0], a[1], b[0], b[1], settings.colors[b[4]]);
          }
        }
      }
    }
    if (pulse != 0) {
      const dx = a[0] - pulse_x;
      const dy = a[1] - pulse_y;
      const d = dx * dx + dy * dy;
      if (d > 0) {
        const F = 100. * pulse / (d * settings.time_scale);
        fx += F * dx;
        fy += F * dy;
      }
    }
    if (settings.wallRepel > 0) {
      const d = settings.wallRepel
      const strength = 0.1
      if (a[0] < d)
        fx += (d - a[0]) * strength
      if (a[0] > canvas.width - d)
        fx += (canvas.width - d - a[0]) * strength
      if (a[1] < d)
        fy += (d - a[1]) * strength
      if (a[1] > canvas.height - d)
        fy += (canvas.height - d - a[1]) * strength
    }
    fy += settings.gravity;
    const vmix = (1. - settings.viscosity);
    a[2] = a[2] * vmix + fx * settings.time_scale;
    a[3] = a[3] * vmix + fy * settings.time_scale;
    // record typical activity, so that we can scale the
    // time_scale later accordingly
    total_v += Math.abs(a[2]);
    total_v += Math.abs(a[3]);
  }
  // update positions now
  for (const a of atoms) {
    a[0] += a[2]
    a[1] += a[3]

    // When Atoms touch or bypass canvas borders
    if (a[0] < 0) {
      a[0] = -a[0];
      a[2] *= -1;
    }
    if (a[0] >= canvas.width) {
      a[0] = 2 * canvas.width - a[0];
      a[2] *= -1;
    }
    if (a[1] < 0) {
      a[1] = -a[1];
      a[3] *= -1;
    }
    if (a[1] >= canvas.height) {
      a[1] = 2 * canvas.height - a[1];
      a[3] *= -1;
    }

  }
  total_v /= atoms.length;
}
  ;

// Generate Rules
setNumberOfColors()
randomRules()

// Generate Atoms
const atoms = []
randomAtoms(settings.atoms.count, true)

setupClicks()
setupKeys()
setupGUI()

console.log('settings', settings)

// Update Frames
var lastT = Date.now();
update();

function update() {
  // Update Canvas Dimensions - if screen size changed
  updateCanvasDimensions()
  // Background color
  m.fillStyle = settings.drawings.background_color;
  m.fillRect(0, 0, canvas.width, canvas.height);
  // Appy Rules
  applyRules();
  // Draw Atoms
  for (const a of atoms) {
    if (settings.drawings.circle) {
      drawCircle(a[0], a[1], settings.colors[a[4]], settings.atoms.radius);
    } else {
      drawSquare(a[0], a[1], settings.colors[a[4]], settings.atoms.radius);
    }
  }
  if (settings.drawings.clusters) {
    trackClusters();
    drawClusters();
  }

  updateParams();

  // const inRange = (a) => 0 <= a[0] && a[0] < canvas.width && 0 <= a[1] && a[1] < canvas.height
  // console.log('inRange', atoms.filter(inRange).length)

  requestAnimationFrame(update);
}
// post-frame stats and updates
function updateParams() {
  // record FPS
  var curT = Date.now();
  if (curT > lastT) {
    const new_fps = 1000. / (curT - lastT);
    settings.fps = Math.round(settings.fps * 0.8 + new_fps * 0.2)
    lastT = curT;
  }

  // adapt time_scale based on activity
  if (total_v > 30. && settings.time_scale > 5.)
    settings.time_scale /= 1.1;
  if (settings.time_scale < 0.9)
    settings.time_scale *= 1.01;
  if (settings.time_scale > 1.1)
    settings.time_scale /= 1.01;

  if (pulse != 0)
    pulse -= (pulse > 0) ? 1 : -1;
  if (settings.explore)
    exploreParameters();
}
