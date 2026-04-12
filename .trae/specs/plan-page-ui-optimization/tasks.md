# 减脂计算器计划页 UI/UX 优化 - 实施计划

## [ ] Task 1: 创建折叠面板组件
- **Priority**: P0
- **Depends On**: None
- **Description**: 
  - 创建一个可复用的折叠面板组件
  - 实现展开/收起功能
  - 添加平滑的动画效果
  - 确保组件与现有设计风格一致
- **Acceptance Criteria Addressed**: AC-2, AC-4
- **Test Requirements**:
  - `programmatic` TR-1.1: 折叠面板应该默认收起
  - `programmatic` TR-1.2: 点击折叠面板标题应该触发展开/收起
  - `human-judgment` TR-1.3: 展开/收起动画应该流畅
- **Notes**: 可以使用 React 的 useState 和 CSS 动画来实现折叠面板功能

## [ ] Task 2: 优化页面顶部关键信息
- **Priority**: P0
- **Depends On**: None
- **Description**: 
  - 将“每日总热量目标”移到页面顶部，与“预计达成目标时间”一起显示
  - 设计醒目的样式，突出显示这些关键信息
  - 确保在不同设备上都能良好显示
- **Acceptance Criteria Addressed**: AC-1
- **Test Requirements**:
  - `human-judgment` TR-2.1: “每日总热量目标”和“预计达成目标时间”应该以醒目的方式显示在页面顶部
  - `human-judgment` TR-2.2: 关键信息应该在不同设备上都能良好显示
- **Notes**: 可以使用更大的字体、醒目的颜色和适当的间距来突出关键信息

## [ ] Task 3: 重构饮食计划模块
- **Priority**: P1
- **Depends On**: Task 1
- **Description**: 
  - 使用折叠面板组件重构饮食计划模块
  - 将“每日三大营养素分配”作为核心数据，默认显示
  - 将“餐盘示例”、“常见食物的宏量参考”和“注意事项”放入折叠面板
  - 确保核心数据在卡片展开前可见
- **Acceptance Criteria Addressed**: AC-3
- **Test Requirements**:
  - `human-judgment` TR-3.1: “每日三大营养素分配”应该在卡片展开前可见
  - `human-judgment` TR-3.2: “餐盘示例”、“常见食物的宏量参考”和“注意事项”应该默认收起
  - `human-judgment` TR-3.3: 折叠面板的展开/收起功能应该正常工作
- **Notes**: 可以将相关信息分组到同一个折叠面板中，以减少页面的信息密度

## [ ] Task 4: 重构训练计划模块
- **Priority**: P1
- **Depends On**: Task 1
- **Description**: 
  - 使用折叠面板组件重构训练计划模块
  - 将“训练类型”和“建议时长”作为核心数据，默认显示
  - 将“训练类型详情”、“周训练计划”、“强度说明”和“注意事项”放入折叠面板
  - 确保核心数据在卡片展开前可见
- **Acceptance Criteria Addressed**: AC-3
- **Test Requirements**:
  - `human-judgment` TR-4.1: “训练类型”和“建议时长”应该在卡片展开前可见
  - `human-judgment` TR-4.2: “训练类型详情”、“周训练计划”、“强度说明”和“注意事项”应该默认收起
  - `human-judgment` TR-4.3: 折叠面板的展开/收起功能应该正常工作
- **Notes**: 可以将相关信息分组到同一个折叠面板中，以减少页面的信息密度

## [ ] Task 5: 测试和优化
- **Priority**: P2
- **Depends On**: Task 2, Task 3, Task 4
- **Description**: 
  - 测试页面在不同设备上的显示效果
  - 优化页面的响应式设计
  - 确保所有功能正常工作
  - 调整样式和布局，确保页面美观
- **Acceptance Criteria Addressed**: AC-5
- **Test Requirements**:
  - `human-judgment` TR-5.1: 页面应该在不同设备上都能正常显示
  - `human-judgment` TR-5.2: 页面布局应该适应不同的屏幕尺寸
  - `programmatic` TR-5.3: 所有功能应该正常工作
- **Notes**: 可以使用浏览器的开发者工具来测试不同设备的显示效果