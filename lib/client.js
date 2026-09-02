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
		let _deepseek_ai_dsh_client_ui_primitives = require("@deepseek-ai/dsh-client-ui-primitives");
		_deepseek_ai_dsh_client_ui_primitives = __toESM(_deepseek_ai_dsh_client_ui_primitives, 1);
		let react = require("react");
		react = __toESM(react, 1);
		let react_jsx_runtime = require("react/jsx-runtime");
		//#region \0dsh-css:C:\Users\14339\Desktop\git\deepseek-harness\packages\client\dsh-client-ui-subagent-model-picker\src\client\ModelCapabilityCard.module.css.mjs
		const css = ".n6Xlqa_card{border:.5px solid var(--dsw-alias-border-l4);background:var(--dsw-alias-bg-layer-3);border-radius:16px;margin:0;list-style:none}.n6Xlqa_header{appearance:none;width:100%;font:inherit;color:inherit;text-align:left;cursor:pointer;background:0 0;border:0;border-radius:12px;align-items:center;gap:12px;padding:14px 16px;display:flex}.n6Xlqa_headText{flex-direction:column;flex:1;gap:4px;min-width:0;display:flex}.n6Xlqa_name{color:var(--dsw-alias-label-primary);font-size:15px;font-weight:600;line-height:1.4}.n6Xlqa_description{color:var(--dsw-alias-label-tertiary);font-size:13px;line-height:1.5}.n6Xlqa_chevron{color:var(--dsw-alias-label-tertiary);flex:none;transition:transform .16s}.n6Xlqa_chevronOpen{transform:rotate(180deg)}.n6Xlqa_body{border-top:.5px solid var(--dsw-alias-border-l2);flex-direction:column;gap:6px;margin:0 16px;padding:14px 0;display:flex}.n6Xlqa_label{color:var(--dsw-alias-label-secondary);margin-top:4px;font-size:13px;line-height:1.5}.n6Xlqa_select{border:.5px solid var(--dsw-alias-border-l4);background:var(--dsw-alias-bg-layer-1);width:100%;height:32px;color:var(--dsw-alias-label-primary);border-radius:8px;padding:0 8px;font-size:14px;line-height:22px}.n6Xlqa_select:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:-2px}.n6Xlqa_textarea{border:.5px solid var(--dsw-alias-border-l4);background:var(--dsw-alias-bg-layer-1);width:100%;min-height:96px;color:var(--dsw-alias-label-primary);resize:vertical;border-radius:8px;padding:8px;font-family:inherit;font-size:14px;line-height:22px}.n6Xlqa_textarea::placeholder{color:var(--dsw-alias-label-dimmed)}.n6Xlqa_textarea:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:-2px}.n6Xlqa_footer{align-items:center;gap:8px;margin-top:10px;display:flex}.n6Xlqa_saved{color:var(--dsw-alias-label-tertiary);font-size:13px}";
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
			"chevron": "n6Xlqa_chevron",
			"chevronOpen": "n6Xlqa_chevronOpen",
			"description": "n6Xlqa_description",
			"footer": "n6Xlqa_footer",
			"headText": "n6Xlqa_headText",
			"header": "n6Xlqa_header",
			"label": "n6Xlqa_label",
			"name": "n6Xlqa_name",
			"saved": "n6Xlqa_saved",
			"select": "n6Xlqa_select",
			"textarea": "n6Xlqa_textarea"
		};
		//#endregion
		//#region src/client/ModelCapabilityCard.tsx
		/**
		* Collapsible plugin configuration card: pick a model from the catalog, edit its
		* capability description, and save. Single-column layout so it fits the UI block.
		*/
		function ModelCapabilityCard({ scope, t, loadModels }) {
			const entries = (0, react.useSyncExternalStore)((cb) => scope.subscribe(cb), () => scope.getSnapshot()).value?.descriptions ?? [];
			const [open, setOpen] = (0, react.useState)(false);
			const [models, setModels] = (0, react.useState)([]);
			const [selected, setSelected] = (0, react.useState)("");
			const [cap, setCap] = (0, react.useState)("");
			const [savedAt, setSavedAt] = (0, react.useState)(-1);
			(0, react.useEffect)(() => {
				let cancelled = false;
				loadModels().then((ms) => {
					if (cancelled) return;
					setModels(ms);
					setSelected((prev) => prev || ms[0]?.key || "");
				}).catch((err) => {
					console.error("[dsh-client-ui-subagent-model-picker] loadModels failed:", err);
					setModels([]);
				});
				return () => {
					cancelled = true;
				};
			}, [loadModels]);
			(0, react.useEffect)(() => {
				setCap(entries.find((e) => `${e.provider}/${e.model}` === selected)?.capabilities ?? "");
			}, [selected, JSON.stringify(entries)]);
			const save = async () => {
				if (!selected) return;
				const sep = selected.indexOf("/");
				const provider = selected.slice(0, sep);
				const model = selected.slice(sep + 1);
				const next = [...entries.filter((e) => `${e.provider}/${e.model}` !== selected), {
					provider,
					model,
					capabilities: cap
				}];
				await scope.set("descriptions", next);
				setSavedAt(Date.now());
			};
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: ModelCapabilityCard_module_css_default.card,
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
					type: "button",
					className: ModelCapabilityCard_module_css_default.header,
					onClick: () => setOpen((v) => !v),
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
						className: ModelCapabilityCard_module_css_default.headText,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: ModelCapabilityCard_module_css_default.name,
							children: t("card.title")
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: ModelCapabilityCard_module_css_default.description,
							children: t("card.description")
						})]
					}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconChevronDownOutline14, { className: open ? `${ModelCapabilityCard_module_css_default.chevron} ${ModelCapabilityCard_module_css_default.chevronOpen}` : ModelCapabilityCard_module_css_default.chevron })]
				}), open && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: ModelCapabilityCard_module_css_default.body,
					children: [
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("label", {
							className: ModelCapabilityCard_module_css_default.label,
							children: t("field.model")
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("select", {
							className: ModelCapabilityCard_module_css_default.select,
							value: selected,
							onChange: (e) => setSelected(e.target.value),
							children: [models.length === 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("option", {
								value: "",
								children: t("field.noModels")
							}), models.map((m) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("option", {
								value: m.key,
								children: `${m.provider}/${m.model} — ${m.name}`
							}, m.key))]
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("label", {
							className: ModelCapabilityCard_module_css_default.label,
							children: t("field.capabilities")
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("textarea", {
							className: ModelCapabilityCard_module_css_default.textarea,
							placeholder: t("field.capabilities"),
							value: cap,
							rows: 4,
							onChange: (e) => setCap(e.target.value)
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: ModelCapabilityCard_module_css_default.footer,
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
								variant: "primary",
								disabled: !selected,
								onClick: () => void save(),
								children: t("action.save")
							}), savedAt > 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: ModelCapabilityCard_module_css_default.saved,
								children: t("action.saved")
							})]
						})
					]
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
			"field.noModels": "No models available",
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
			"field.noModels": "无可用模型",
			"action.add": "添加模型",
			"action.save": "保存",
			"action.remove": "移除",
			"action.saved": "已保存"
		};
		//#endregion
		//#region src/client/index.ts
		/**
		* Subagent model picker — browser half. Registers a collapsible plugin
		* configuration card under `settings.plugin.item` keyed to `subagent-model-picker`.
		*
		* Follows the dsh-market robustness pattern: `settingsScope` and `remote.session`
		* are injected NESTED (so this plugin still mounts on hosts lacking them — the
		* card just never appears), and a `missingPrimitives` guard skips registration
		* gracefully instead of crashing mid-render.
		*/
		/** Exports the card renders with; an older host lacking any disables the card. */
		const REQUIRED_PRIMITIVES = ["Button", "IconChevronDownOutline14"];
		function missingPrimitives(mod) {
			return REQUIRED_PRIMITIVES.filter((name) => typeof mod[name] !== "function");
		}
		const SETTINGS_NS = "subagent-model-picker";
		const name = "@dsh-external/dsh-client-ui-subagent-model-picker";
		const inject = ["slots", "locale"];
		const NS = "@dsh-external/dsh-client-ui-subagent-model-picker";
		function apply(ctx) {
			const gaps = missingPrimitives(_deepseek_ai_dsh_client_ui_primitives);
			if (gaps.length > 0) {
				console.warn(`[dsh-client-ui-subagent-model-picker] host ui-primitives missing ${gaps.join(", ")} — configuration card disabled`);
				return;
			}
			ctx.effect(() => ctx.locale.register(NS, {
				zh,
				en
			}), "dsh-client-ui-subagent-model-picker: dictionaries");
			const t = ctx.locale.bind(NS);
			ctx.inject([
				"settingsScope",
				"remote",
				"remote.session"
			], (scopedCtx) => {
				const scope = scopedCtx.settingsScope.bind({ namespace: SETTINGS_NS });
				const loadModels = async () => {
					const res = await scopedCtx.remote.session.modelCatalog();
					if (!res.ok || res.value === void 0) throw new Error(res.error ? `${res.error.code}: ${res.error.message}` : "model catalog unavailable");
					return (res.value.groups ?? []).flatMap((g) => (g.models ?? []).map((m) => ({
						key: `${g.id}/${m.id}`,
						provider: g.id,
						model: m.id,
						name: m.name
					})));
				};
				const injected = () => ({
					scope,
					t,
					loadModels
				});
				scopedCtx.slots.inject("settings.plugin.item", function* () {
					yield scopedCtx.slots.register({
						name: "settings.plugin.item",
						key: SETTINGS_NS,
						locale: NS,
						inject: injected
					}, ModelCapabilityCard);
				});
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