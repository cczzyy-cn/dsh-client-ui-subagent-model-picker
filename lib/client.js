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
		let react_jsx_runtime = require("react/jsx-runtime");
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
				style: {
					display: "flex",
					flexDirection: "column",
					gap: 12
				},
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("strong", { children: t("card.title") }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						style: { color: "var(--dsh-foreground-2,#000000a6)" },
						children: t("card.description")
					})] }),
					draft.map((row, i) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						style: {
							display: "grid",
							gridTemplateColumns: "1fr 1fr 1fr auto",
							gap: 8
						},
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
								placeholder: t("field.provider"),
								value: row.provider,
								onChange: (e) => updateRow(i, "provider", e.target.value)
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
								placeholder: t("field.model"),
								value: row.model,
								onChange: (e) => updateRow(i, "model", e.target.value)
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
								placeholder: t("field.capabilities"),
								value: row.capabilities,
								onChange: (e) => updateRow(i, "capabilities", e.target.value)
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => removeRow(i),
								children: t("action.remove")
							})
						]
					}, i)),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						style: {
							display: "flex",
							gap: 8
						},
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: addRow,
								children: t("action.add")
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => void save(),
								children: t("action.save")
							}),
							savedAt > 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: t("action.saved") })
						]
					})
				]
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