import React from 'react';
import { ArrowRight, Scale, Info } from 'lucide-react';
import { motion } from 'motion/react';
import { CalculationResult } from '../types';

interface DietDetailsPageProps {
  results: CalculationResult;
  onBack: () => void;
}

const DietDetailsPage: React.FC<DietDetailsPageProps> = ({ results, onBack }) => {
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
          <h1 className="text-xl font-bold text-ink">饮食详情</h1>
          <div className="w-12"></div> {/* 占位，保持标题居中 */}
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-10 space-y-12">
        {/* 饮食计划详情 */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 px-1">
            <div className="w-8 h-8 rounded-lg bg-brand text-white flex items-center justify-center">
              <Scale className="w-4 h-4" />
            </div>
            <h2 className="text-sm font-bold uppercase tracking-widest">饮食详情</h2>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100">
            <div className="max-w-2xl mx-auto space-y-8">
              {/* 餐盘示例 */}
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <p className="text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-3">餐盘示例</p>
                <div className="space-y-4">
                  <p className="text-sm text-slate-700 leading-relaxed">
                    <strong>早餐：</strong>2个鸡蛋 + 一小碗燕麦粥 + 少量蔬菜
                  </p>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    <strong>午餐：</strong>一份鸡胸肉沙拉（100g 鸡胸肉）+ 一碗糙米饭
                  </p>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    <strong>晚餐：</strong>鱼肉（150g）+ 大量蔬菜
                  </p>
                </div>
              </div>

              {/* 常见食物的宏量参考 */}
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <p className="text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-3">常见食物的宏量参考</p>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-medium text-slate-600">100g 鸡胸肉</p>
                    <p className="text-sm font-mono font-bold text-slate-800">≈ 25g 蛋白质</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-medium text-slate-600">1个鸡蛋</p>
                    <p className="text-sm font-mono font-bold text-slate-800">≈ 6g 蛋白质</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-medium text-slate-600">1碗米饭</p>
                    <p className="text-sm font-mono font-bold text-slate-800">≈ 40g 碳水</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-medium text-slate-600">100g 鱼肉</p>
                    <p className="text-sm font-mono font-bold text-slate-800">≈ 20g 蛋白质</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-medium text-slate-600">1碗燕麦粥</p>
                    <p className="text-sm font-mono font-bold text-slate-800">≈ 30g 碳水</p>
                  </div>
                </div>
              </div>

              {/* 注意事项 */}
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <p className="text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-3">注意事项</p>
                <p className="text-sm text-slate-700 leading-relaxed">
                  请优先选择优质蛋白（鸡胸肉、鱼肉、鸡蛋），复合碳水（糙米、全麦面包），健康脂肪（牛油果、坚果）。
                  保证每日充足的水分摄入，建议每天喝8杯以上的水。
                  避免高糖、高脂、高盐的加工食品。
                  饮食要规律，避免暴饮暴食。
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

export default DietDetailsPage;