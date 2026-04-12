import React from 'react';
import { ArrowRight, Zap, Info } from 'lucide-react';
import { motion } from 'motion/react';
import { CalculationResult } from '../types';

interface WorkoutDetailsPageProps {
  results: CalculationResult;
  onBack: () => void;
}

const WorkoutDetailsPage: React.FC<WorkoutDetailsPageProps> = ({ results, onBack }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen"
    >
      {/* 页面头部 */}
      <header className="bg-white border-b border-slate-100 py-6">
        <div className="max-w-4xl mx-auto px-6 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-brand font-bold"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            <span>返回计划页</span>
          </button>
          <h1 className="text-xl font-bold text-ink">训练详情</h1>
          <div className="w-12"></div> {/* 占位，保持标题居中 */}
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-10 space-y-12">
        {/* 训练计划详情 */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 px-1">
            <div className="w-8 h-8 rounded-lg bg-brand text-white flex items-center justify-center">
              <Zap className="w-4 h-4" />
            </div>
            <h2 className="text-sm font-bold uppercase tracking-widest">训练详情</h2>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100">
            <div className="max-w-2xl mx-auto space-y-8">
              {/* 训练类型详情 */}
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <p className="text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-3">训练类型详解</p>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-slate-600 mb-2">有氧运动</p>
                    <p className="text-sm text-slate-700">跑步、跳绳、快走、椭圆机等</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-600 mb-2">力量训练</p>
                    <p className="text-sm text-slate-700">深蹲、硬拉、卧推、划船、俯卧撑等（可在家或健身房进行）</p>
                  </div>
                </div>
              </div>

              {/* 周训练计划 */}
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <p className="text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-3">周训练计划</p>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-medium text-slate-600">周一</p>
                    <p className="text-sm font-mono font-bold text-slate-800">力量训练（全身）</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-medium text-slate-600">周二</p>
                    <p className="text-sm font-mono font-bold text-slate-800">休息</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-medium text-slate-600">周三</p>
                    <p className="text-sm font-mono font-bold text-slate-800">有氧运动（跑步 45 分钟）</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-medium text-slate-600">周四</p>
                    <p className="text-sm font-mono font-bold text-slate-800">力量训练（下肢）</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-medium text-slate-600">周五</p>
                    <p className="text-sm font-mono font-bold text-slate-800">休息</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-medium text-slate-600">周六</p>
                    <p className="text-sm font-mono font-bold text-slate-800">有氧运动（快走 60 分钟）</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-medium text-slate-600">周日</p>
                    <p className="text-sm font-mono font-bold text-slate-800">休息</p>
                  </div>
                </div>
              </div>

              {/* 强度说明 */}
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <p className="text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-3">强度说明</p>
                <p className="text-sm text-slate-700 leading-relaxed">
                  中等强度：运动时能说话但不能唱歌，略微出汗。
                  可以通过心率来判断：心率保持在最大心率的 60-70%（最大心率 = 220 - 年龄）。
                </p>
              </div>

              {/* 注意事项 */}
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <p className="text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-3">注意事项</p>
                <p className="text-sm text-slate-700 leading-relaxed">
                  初学者请从轻重量开始，保证动作规范；每次运动前请热身 10 分钟，结束后拉伸 10 分钟。
                  如感到身体不适，请立即停止运动并咨询医生。
                  保证充足的睡眠，有助于肌肉恢复和脂肪燃烧。
                  逐渐增加运动强度和时长，避免过度训练。
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 页脚 */}
        <footer className="flex flex-col md:flex-row items-center justify-between gap-6 pt-12 border-t border-slate-100">
          <div className="flex items-center gap-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            <span className="flex items-center gap-1.5"><Info className="w-3 h-3" /> 科学计算</span>
            <span className="flex items-center gap-1.5"><Info className="w-3 h-3" /> 隐私保护</span>
          </div>
          <p className="text-[10px] font-medium text-slate-300">© 2026 Rock的减脂小工具</p>
        </footer>
      </main>
    </motion.div>
  );
};

export default WorkoutDetailsPage;