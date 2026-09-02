window.__ModuleLoader__.load({
	id: "@dsh-external/dsh-client-ui-subagent-model-picker",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		//#region \0rolldown/runtime.js
		var __create = Object.create;
		var __defProp = Object.defineProperty;
		var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
		var __getOwnPropNames = Object.getOwnPropertyNames;
		var __getProtoOf = Object.getPrototypeOf;
		var __hasOwnProp = Object.prototype.hasOwnProperty;
		var __copyProps = (to, from, except, desc) => {
			if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
				key = keys[i];
				if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
					get: ((k) => from[k]).bind(null, key),
					enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
				});
			}
			return to;
		};
		var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
			value: mod,
			enumerable: true
		}) : target, mod));
		//#endregion
		let react = require("react");
		react = __toESM(react, 1);
		let _deepseek_ai_dsh_client_ui_primitives = require("@deepseek-ai/dsh-client-ui-primitives");
		let react_jsx_runtime = require("react/jsx-runtime");
		//#region \0dsh-css:C:\Users\14339\Desktop\git\deepseek-harness\packages\client\dsh-client-ui-subagent-model-picker\src\client\ModelCapabilityCard.module.css.mjs
		const css = ".n6Xlqa_card{border:.5px solid var(--dsw-alias-border-l4);background:var(--dsw-alias-bg-layer-3);border-radius:16px;margin:0;list-style:none}.n6Xlqa_header{width:100%;font:inherit;color:inherit;text-align:left;background:0 0;border:0;border-radius:12px;align-items:center;gap:12px;padding:14px 16px;display:flex}.n6Xlqa_headText{flex-direction:column;flex:1;gap:4px;min-width:0;display:flex}.n6Xlqa_name{color:var(--dsw-alias-label-primary);font-size:15px;font-weight:600;line-height:1.4}.n6Xlqa_description{color:var(--dsw-alias-label-tertiary);font-size:13px;line-height:1.5}.n6Xlqa_body{border-top:.5px solid var(--dsw-alias-border-l2);flex-direction:column;gap:10px;margin:0 16px;padding:12px 0;display:flex}.n6Xlqa_fieldRow{grid-template-columns:1fr 1fr 1.4fr auto;align-items:center;gap:8px;display:grid}.n6Xlqa_removeBtn{justify-self:end}.n6Xlqa_footer{align-items:center;gap:8px;margin-top:2px;display:flex}.n6Xlqa_saved{color:var(--dsw-alias-label-tertiary);font-size:13px}";
		const tagId = "@dsh-external/dsh-client-ui-subagent-model-picker/ModelCapabilityCard.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "@dsh-external/dsh-client-ui-subagent-model-picker";
			tag.dataset.pluginCss = tagId;
			tag.textContent = css;
			document.head.appendChild(tag);
		}
		var ModelCapabilityCard_module_css_default = {
			"body": "n6Xlqa_body",
			"card": "n6Xlqa_card",
			"description": "n6Xlqa_description",
			"fieldRow": "n6Xlqa_fieldRow",
			"footer": "n6Xlqa_footer",
			"headText": "n6Xlqa_headText",
			"header": "n6Xlqa_header",
			"name": "n6Xlqa_name",
			"removeBtn": "n6Xlqa_removeBtn",
			"saved": "n6Xlqa_saved"
		};
		//#endregion
		//#region src/client/ModelCapabilityCard.tsx
		/** Plugin configuration card: per-model capability descriptions. */
		function ModelCapabilityCard({ scope, t }) {
			const value = (0, react.useSyncExternalStore)((cb) => scope.subscribe(cb), () => scope.getSnapshot()).value ?? { descriptions: [] };
			const [draft, setDraft] = react.default.useState(value.descriptions);
			const [savedAt, setSavedAt] = react.default.useState(-1);
			const external = JSON.stringify(value.descriptions);
			react.default.useEffect(() => {
				setDraft(value.descriptions);
			}, [external]);
			const updateRow = (i, field, v) => setDraft(draft.map((row, idx) => idx === i ? {
				...row,
				[field]: v
			} : row));
			const removeRow = (i) => setDraft(draft.filter((_, idx) => idx !== i));
			const addRow = () => setDraft([...draft, {
				provider: "",
				model: "",
				capabilities: ""
			}]);
			const save = async () => {
				await scope.set("descriptions", draft);
				setSavedAt(Date.now());
			};
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: ModelCapabilityCard_module_css_default.card,
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					className: ModelCapabilityCard_module_css_default.header,
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: ModelCapabilityCard_module_css_default.headText,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: ModelCapabilityCard_module_css_default.name,
							children: t("card.title")
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: ModelCapabilityCard_module_css_default.description,
							children: t("card.description")
						})]
					})
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: ModelCapabilityCard_module_css_default.body,
					children: [draft.map((row, i) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: ModelCapabilityCard_module_css_default.fieldRow,
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Input, {
								placeholder: t("field.provider"),
								value: row.provider,
								onChange: (e) => updateRow(i, "provider", e.target.value)
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Input, {
								placeholder: t("field.model"),
								value: row.model,
								onChange: (e) => updateRow(i, "model", e.target.value)
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Input, {
								placeholder: t("field.capabilities"),
								value: row.capabilities,
								onChange: (e) => updateRow(i, "capabilities", e.target.value)
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
								className: ModelCapabilityCard_module_css_default.removeBtn,
								onClick: () => removeRow(i),
								children: t("action.remove")
							})
						]
					}, i)), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: ModelCapabilityCard_module_css_default.footer,
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
								variant: "outline",
								onClick: addRow,
								children: t("action.add")
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
								variant: "primary",
								onClick: () => void save(),
								children: t("action.save")
							}),
							savedAt > 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: ModelCapabilityCard_module_css_default.saved,
								children: t("action.saved")
							})
						]
					})]
				})]
			});
		}
		//#endregion
		//#region src/client/locales.ts
		const en = {
			"card.title": "Subagent model capabilities",
			"card.description": "Describe each model so the main session can choose a subagent model wisely.",
			"field.provider": "Provider",
			"field.model": "Model",
			"field.capabilities": "Capabilities",
			"action.add": "Add model",
			"action.save": "Save",
			"action.remove": "Remove",
			"action.saved": "Saved"
		};
		const zh = {
			"card.title": "子代理模型能力描述",
			"card.description": "给每个模型填写能力描述，供主会话挑选子代理模型时参考。",
			"field.provider": "Provider",
			"field.model": "模型",
			"field.capabilities": "能力描述",
			"action.add": "添加模型",
			"action.save": "保存",
			"action.remove": "移除",
			"action.saved": "已保存"
		};
		//#endregion
		//#region src/client/index.ts
		/** Settings namespace this card edits (matches the host plugin's registration). */
		const SETTINGS_NS = "subagent-model-picker";
		const name = "@dsh-external/dsh-client-ui-subagent-model-picker";
		const inject = [
			"slots",
			"locale",
			"settingsScope"
		];
		const NS = "@dsh-external/dsh-client-ui-subagent-model-picker";
		function apply(ctx) {
			ctx.effect(() => ctx.locale.register(NS, {
				zh,
				en
			}), "dsh-client-ui-subagent-model-picker: dictionaries");
			const t = ctx.locale.bind(NS);
			const scope = ctx.settingsScope.bind({ namespace: SETTINGS_NS });
			const injected = () => ({
				scope,
				t
			});
			ctx.slots.inject("settings.plugin.item", function* () {
				yield ctx.slots.register({
					name: "settings.plugin.item",
					key: SETTINGS_NS,
					locale: NS,
					inject: injected
				}, ModelCapabilityCard);
			});
		}
		//#endregion
		exports.SETTINGS_NS = SETTINGS_NS;
		exports.apply = apply;
		exports.inject = inject;
		exports.name = name;
		return module.exports;
	}
});

//# sourceMappingURL=client.js.map