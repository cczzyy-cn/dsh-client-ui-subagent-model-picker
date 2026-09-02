export const en = {
  'card.title': 'Subagent model capabilities',
  'card.description': 'Describe each model so the main session can choose a subagent model wisely.',
  'field.provider': 'Provider', 'field.model': 'Model', 'field.capabilities': 'Capabilities',
  'field.noModels': 'No models available',
  'action.add': 'Add model', 'action.save': 'Save', 'action.remove': 'Remove', 'action.saved': 'Saved',
}
export const zh = {
  'card.title': '子代理模型能力描述',
  'card.description': '给每个模型填写能力描述，供主会话挑选子代理模型时参考。',
  'field.provider': 'Provider', 'field.model': '模型', 'field.capabilities': '能力描述',
  'field.noModels': '无可用模型',
  'action.add': '添加模型', 'action.save': '保存', 'action.remove': '移除', 'action.saved': '已保存',
}
export type SettingsKey = keyof typeof en
