/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Info,
  ArrowRight,
  ChevronDown,
  Check,
  Zap,
  Target,
  User,
  Scale
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';
import { UserInfo, FatLossGoal, CalculationResult, Gender } from './types';
import { ACTIVITY_LEVELS, PLAN_LEVELS, BODY_FAT_REFERENCES } from './constants';

// --- Components ---

const BMIGauge = ({ bmi }: { bmi: number }) => {
  // Map BMI to a 0-1 percentage based on the 4 categories
  // Categories: <18.5, 18.5-23.9, 24-27.9, >=28
  // We'll map these to 4 equal quadrants (0-25%, 25-50%, 50-75%, 75-100%)
  const getPercentage = (val: number) => {
    if (val <= 15) return 0;
    if (val >= 40) return 1;
    
    if (val < 18.5) {
      // Map 15-18.5 to 0-0.25
      return ((val - 15) / (18.5 - 15)) * 0.25;
    } else if (val < 24) {
      // Map 18.5-24 to 0.25-0.5
      return 0.25 + ((val - 18.5) / (24 - 18.5)) * 0.25;
    } else if (val < 28) {
      // Map 24-28 to 0.5-0.75
      return 0.5 + ((val - 24) / (28 - 24)) * 0.25;
    } else {
      // Map 28-40 to 0.75-1.0
      return 0.75 + ((val - 28) / (40 - 28)) * 0.25;
    }
  };

  const safeBmi = isNaN(bmi) || bmi <= 0 ? 0 : bmi;
  const percentage = getPercentage(safeBmi);
  const rotation = percentage * 180 - 180;
  const status = safeBmi < 18.5 ? '体重过低' : safeBmi < 24 ? '体重正常' : safeBmi < 28 ? '超重' : '肥胖';

  // Total arc length for radius 44 is PI * 44 = 138.23
  // Each segment is 138.23 / 4 = 34.56
  const segment = 34.56;

  return (
    <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 w-full">
      {/* Left: Gauge */}
      <div className="relative w-72 h-56 flex flex-col items-center justify-center pt-4 shrink-0">
        <div className="absolute top-0 w-80 h-40 overflow-hidden">
          <svg className="w-full h-80" viewBox="0 0 100 100">
            {/* Background */}
            <circle cx="50" cy="50" r="44" fill="none" stroke="#F1F5F9" strokeWidth="6" strokeDasharray="138.23 138.23" transform="rotate(180 50 50)" strokeLinecap="round" />
            {/* Segment 1: Blue */}
            <circle cx="50" cy="50" r="44" fill="none" stroke="#3B82F6" strokeWidth="6" strokeDasharray={`${segment} 276.46`} strokeDashoffset="0" transform="rotate(180 50 50)" strokeLinecap="round" />
            {/* Segment 2: Green */}
            <circle cx="50" cy="50" r="44" fill="none" stroke="#10B981" strokeWidth="6" strokeDasharray={`${segment} 276.46`} strokeDashoffset={`-${segment}`} transform="rotate(180 50 50)" strokeLinecap="round" />
            {/* Segment 3: Orange */}
            <circle cx="50" cy="50" r="44" fill="none" stroke="#F59E0B" strokeWidth="6" strokeDasharray={`${segment} 276.46`} strokeDashoffset={`-${segment * 2}`} transform="rotate(180 50 50)" strokeLinecap="round" />
            {/* Segment 4: Red */}
            <circle cx="50" cy="50" r="44" fill="none" stroke="#EF4444" strokeWidth="6" strokeDasharray={`${segment} 276.46`} strokeDashoffset={`-${segment * 3}`} transform="rotate(180 50 50)" strokeLinecap="round" />
          </svg>
        </div>
        <div className="relative mt-8 z-10 w-36 h-36 rounded-full bg-white shadow-xl border border-slate-100 flex flex-col items-center justify-center">
          <div className="absolute inset-0 transition-transform duration-1000 ease-out" style={{ transform: `rotate(${rotation + 90}deg)` }}>
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[10px] border-b-brand" />
          </div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mb-0.5">BMI</p>
          <p className="text-4xl font-mono font-bold text-slate-900">{safeBmi.toFixed(1)}</p>
          <p className="text-[10px] font-bold text-brand uppercase mt-0.5">{status}</p>
        </div>
      </div>

      {/* Right: Legend */}
      <div className="flex-1 space-y-3 w-full">
        <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50/50 border border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-[#3B82F6]" />
            <span className="text-sm font-bold text-slate-600">体重过低</span>
          </div>
          <span className="text-xs font-mono font-bold text-slate-400">＜18.5</span>
        </div>
        <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50/50 border border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
            <span className="text-sm font-bold text-slate-600">体重正常</span>
          </div>
          <span className="text-xs font-mono font-bold text-slate-400">18.5-23.9</span>
        </div>
        <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50/50 border border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
            <span className="text-sm font-bold text-slate-600">超重</span>
          </div>
          <span className="text-xs font-mono font-bold text-slate-400">24.0-27.9</span>
        </div>
        <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50/50 border border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
            <span className="text-sm font-bold text-slate-600">肥胖</span>
          </div>
          <span className="text-xs font-mono font-bold text-slate-400">≥28</span>
        </div>
      </div>
    </div>
  );
};

const ActivityInfoTooltip = () => {
  return (
    <div className="group relative inline-block ml-1 align-middle">
      <Info className="w-3.5 h-3.5 text-slate-400 cursor-help hover:text-slate-600 transition-colors" />
      <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-72 p-4 bg-white border border-slate-100 shadow-xl rounded-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 pointer-events-none">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">活动水平参考</p>
        <div className="space-y-3">
          {ACTIVITY_LEVELS.map(level => (
            <div key={level.value} className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-[11px] font-bold text-ink">{level.label}</span>
                <span className="text-[10px] font-mono font-bold text-brand">{level.value}</span>
              </div>
              <p className="text-[10px] text-slate-400 leading-relaxed">{level.description}</p>
            </div>
          ))}
        </div>
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white border-r border-b border-slate-100 rotate-45" />
      </div>
    </div>
  );
};

const InputField = ({ label, value, onChange, unit, type = "number", placeholder, min, max, step }: any) => {
  // 处理显示值：如果是0或undefined，显示为空字符串
  const displayValue = value === 0 || value === undefined || value === null ? '' : String(value);
  
  return (
    <div className="space-y-1.5">
      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider pl-1">{label}</label>
      <div className="relative group">
        <input 
          type={type}
          placeholder={placeholder}
          min={min}
          max={max}
          step={step}
          className="w-full bg-white border border-slate-200 px-4 py-3 rounded-xl text-sm font-medium focus:ring-2 focus:ring-brand/10 focus:border-brand transition-all outline-none"
          value={displayValue}
          onChange={e => {
            const inputValue = e.target.value;
            
            // 如果输入为空，传递0
            if (inputValue === '') {
              onChange(0);
              return;
            }
            
            // 去除前导0（保留单个0）
            let cleanedValue = inputValue.replace(/^0+(?=\d)/, '');
            
            // 转换为数字
            let val: any = type === "number" ? Number(cleanedValue) : cleanedValue;
            
            // 检查最大值限制
            if (type === "number" && max !== undefined && val > max) val = max;
            
            // 检查最小值限制
            if (type === "number" && min !== undefined && val < min) val = min;
            
            // 根据标签处理精度
            if (type === "number") {
              if (label === "年龄" || label === "身高") {
                // 年龄和身高取整数
                val = Math.floor(val);
              } else if (label === "当前体重" || label === "目标体重" || label === "当前体脂" || label === "目标体脂") {
                // 体重和体脂精确到一位小数
                val = parseFloat(val.toFixed(1));
              }
            }
            
            onChange(val);
          }}
        />
        {unit && <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-mono">{unit}</span>}
      </div>
    </div>
  );
};

export default function App() {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: '',
    gender: 'male',
    age: 0,
    height: 0,
    weight: 0,
    activityMultiplier: 1.2,
  });

  const [goal, setGoal] = useState<Goal>({
    currentBodyFat: 0,
    targetBodyFat: 0,
    planLevel: 'standard',
    manualDays: 0,
  });

  // 模态框状态
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState('');

  const results = useMemo((): CalculationResult => {
    const { gender, age, height, weight, activityMultiplier } = userInfo;
    const { currentBodyFat, targetBodyFat, manualDays } = goal;
    
    // 处理空值情况，避免除以0
    const safeHeight = height || 1;
    const safeWeight = weight || 0;
    const safeAge = age || 0;
    const safeCurrentBodyFat = currentBodyFat || 0;
    const safeTargetBodyFat = targetBodyFat || 0;
    
    // 当关键输入为0时，BMR和TDEE显示为0
    const hasValidInput = safeAge > 0 && safeHeight > 0 && safeWeight > 0;
    const bmi = hasValidInput && safeHeight > 0 ? safeWeight / Math.pow(safeHeight / 100, 2) : 0;
    let bmr = hasValidInput ? (gender === 'male' 
      ? 88.362 + (13.397 * safeWeight) + (4.799 * safeHeight) - (5.677 * safeAge)
      : 447.593 + (9.247 * safeWeight) + (3.098 * safeHeight) - (4.330 * safeAge)) : 0;
    const tdee = hasValidInput ? bmr * activityMultiplier : 0;
    const leanBodyMass = hasValidInput ? safeWeight * (1 - safeCurrentBodyFat / 100) : 0;
    const targetBodyFatDecimal = safeTargetBodyFat > 0 && safeTargetBodyFat < 100 ? safeTargetBodyFat : 1;
    const targetWeight = hasValidInput ? leanBodyMass / (1 - targetBodyFatDecimal / 100) : 0;
    const weightToLose = hasValidInput ? Math.max(0, safeWeight - targetWeight) : 0;
    const totalCalorieDeficit = weightToLose * 7700;
    
    const dailyDeficit = hasValidInput && manualDays > 0 ? (totalCalorieDeficit / manualDays) : 0;
    const plannedDays = hasValidInput ? (manualDays > 0 ? manualDays : 0) : 0;
    
    const dailyCalorieIntake = hasValidInput ? (tdee - dailyDeficit) : 0;

    // Determine evaluation based on daily deficit
    let evaluation = {
      intensity: '自定义节奏',
      impact: '根据您的设定进行。',
      notes: '请确保每日摄入不低于基础代谢，以维持基本生理功能。',
      motivation: '每一个小目标的达成，都是迈向理想身材的一大步！'
    };

    if (dailyDeficit > 0) {
      if (dailyDeficit <= 400) {
        evaluation = {
          intensity: '舒适强度',
          impact: '对生活质量影响极小，适合长期维持，能有效防止反弹。',
          notes: '适合减脂新手或希望在不改变现有生活方式的情况下缓慢瘦身的人群。',
          motivation: '慢慢来，比较快。坚持这种舒适的节奏，时间会给你最好的答案。'
        };
      } else if (dailyDeficit <= 650) {
        evaluation = {
          intensity: '标准强度',
          impact: '减脂速度适中，能较好兼顾体能与生活，是大多数人的首选。',
          notes: '注意蛋白质摄入，配合适量力量训练，能更好地保护肌肉。',
          motivation: '你正在用最科学的方式蜕变。保持专注，终点就在不远处！'
        };
      } else {
        evaluation = {
          intensity: '严格强度',
          impact: '减脂速度极快，但可能伴随明显的饥饿感和体能下降。',
          notes: '建议缩短执行周期，并密切关注身体反馈。若感到极度疲劳请及时调整。',
          motivation: '挑战极限需要非凡的意志。你比想象中更强大，加油！'
        };
      }
    } else if (dailyDeficit < 0) {
      evaluation = {
        intensity: '增肌/维持',
        impact: '当前摄入高于消耗，适合肌肉增长或体重维持期。',
        notes: '注意营养均衡，避免过多的精制糖和加工食品。',
        motivation: '身体的每一分能量都在为你构建更好的未来。'
      };
    }

    return { bmi, bmr, tdee, leanBodyMass, targetWeight, weightToLose, totalCalorieDeficit, plannedDays, dailyDeficit, dailyCalorieIntake, evaluation };
  }, [userInfo, goal]);

  const applyPlanPreset = (planId: string, deficit: number) => {
    const safeWeight = userInfo.weight || 0;
    const safeCurrentBodyFat = goal.currentBodyFat || 0;
    const safeTargetBodyFat = goal.targetBodyFat || 0;
    
    const leanBodyMass = safeWeight * (1 - safeCurrentBodyFat / 100);
    const targetBodyFatDecimal = safeTargetBodyFat > 0 && safeTargetBodyFat < 100 ? safeTargetBodyFat : 1;
    const targetWeight = leanBodyMass / (1 - targetBodyFatDecimal / 100);
    const weightToLose = Math.max(0, safeWeight - targetWeight);
    const totalCalorieDeficit = weightToLose * 7700;
    
    // Round to nearest integer as requested
    const days = totalCalorieDeficit > 0 
      ? Math.min(999, Math.max(1, Math.round(totalCalorieDeficit / deficit)))
      : 1;
      
    setGoal({ ...goal, manualDays: days, planLevel: planId as any });
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] selection:bg-brand/20">
      {/* 图片查看模态框 */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-4xl max-h-[90vh]">
            <img 
              src={modalImage}
              alt="体脂参考大图"
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
              onError={(e) => {
                // Fallback to a placeholder if the image is missing
                (e.target as HTMLImageElement).src = `https://picsum.photos/seed/bodyfat-large/800/1000?blur=2`;
              }}
              referrerPolicy="no-referrer"
            />
            <button 
              className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2 text-white hover:bg-white/30 transition-colors"
              onClick={() => setShowModal(false)}
            >
              ×
            </button>
          </div>
        </div>
      )}
      {/* Hero Result Section */}
      <section className="bg-white border-b border-slate-100 pt-16 pb-20">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand/5 text-brand rounded-full text-[10px] font-bold uppercase tracking-widest">
            <Zap className="w-3 h-3" />
            <span>建议每日摄入热量</span>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-baseline justify-center gap-2">
              <motion.span 
                key={results.dailyCalorieIntake}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-8xl md:text-9xl font-mono font-black tracking-tighter text-ink"
              >
                {isNaN(results.dailyCalorieIntake) || results.dailyCalorieIntake <= 0 ? 0 : Math.round(results.dailyCalorieIntake)}
              </motion.span>
              <span className="text-2xl md:text-3xl font-mono font-medium text-slate-300">kcal</span>
            </div>
            <p className="text-slate-400 font-medium text-sm md:text-base max-w-md mx-auto leading-relaxed">
              根据您的身体数据与减脂目标，这是达成目标体型的最佳摄入值。
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 pt-4">
            <div className="text-center">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">每日缺口</p>
              <p className="text-xl font-mono font-bold text-ink">-{isNaN(results.dailyDeficit) || results.dailyDeficit <= 0 ? 0 : Math.round(results.dailyDeficit)} <span className="text-xs font-normal text-slate-300">kcal</span></p>
            </div>
            <div className="text-center">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">预计用时</p>
              <p className="text-xl font-mono font-bold text-ink">{isNaN(results.plannedDays) || results.plannedDays <= 0 ? 0 : results.plannedDays} <span className="text-xs font-normal text-slate-300">天</span></p>
            </div>
            <div className="text-center">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">目标体重</p>
              <p className="text-xl font-mono font-bold text-brand">{isNaN(results.targetWeight) || results.targetWeight <= 0 ? 0 : results.targetWeight.toFixed(1)} <span className="text-xs font-normal text-slate-300">kg</span></p>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-4xl mx-auto px-6 -mt-10 pb-24 space-y-12">
        
        {/* Input Sections: Stacked vertically for focus */}
        <div className="space-y-16">
          
          {/* Section 1: Basic Info */}
          <div className="space-y-8">
            <div className="flex items-center gap-3 px-1">
              <div className="w-8 h-8 rounded-lg bg-ink text-white flex items-center justify-center">
                <User className="w-4 h-4" />
              </div>
              <h2 className="text-sm font-bold uppercase tracking-widest">身体基础数据</h2>
            </div>
            
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
              <div className="max-w-2xl mx-auto space-y-6">
                <div className="flex p-1 bg-slate-50 rounded-xl">
                  {(['male', 'female'] as Gender[]).map(g => (
                    <button
                      key={g}
                      onClick={() => setUserInfo({...userInfo, gender: g})}
                      className={cn(
                        "flex-1 py-2 text-xs font-bold rounded-lg transition-all",
                        userInfo.gender === g ? "bg-white text-ink shadow-sm" : "text-slate-400 hover:text-slate-600"
                      )}
                    >
                      {g === 'male' ? '男' : '女'}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField label="年龄" value={userInfo.age} unit="岁" onChange={(v: number) => setUserInfo({...userInfo, age: v})} min={0} max={99} step="1" />
                  <InputField label="身高" value={userInfo.height} unit="cm" onChange={(v: number) => setUserInfo({...userInfo, height: v})} min={0} max={300} step="1" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField label="当前体重" value={userInfo.weight} unit="kg" onChange={(v: number) => setUserInfo({...userInfo, weight: v})} min={0} step="0.1" />
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider pl-1">
                      日常活动量
                      <ActivityInfoTooltip />
                    </label>
                    <div className="relative">
                      <select 
                        className="w-full bg-white border border-slate-200 px-4 py-3 rounded-xl text-sm font-medium focus:ring-2 focus:ring-brand/10 focus:border-brand transition-all outline-none appearance-none"
                        value={userInfo.activityMultiplier}
                        onChange={e => setUserInfo({...userInfo, activityMultiplier: Number(e.target.value)})}
                      >
                        {ACTIVITY_LEVELS.map(level => (
                          <option key={level.value} value={level.value}>{level.label}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                    </div>
                  </div>
                </div>

                <div className="pt-8 border-t border-slate-50 space-y-8">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">基础代谢 (BMR)</p>
                      <p className="text-sm font-mono font-bold text-ink">{isNaN(results.bmr) || results.bmr <= 0 ? 0 : Math.round(results.bmr)} <span className="text-[10px] font-normal text-slate-400">kcal</span></p>
                    </div>
                    <div className="text-center">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">每日总消耗 (TDEE)</p>
                      <p className="text-sm font-mono font-bold text-ink">{isNaN(results.tdee) || results.tdee <= 0 ? 0 : Math.round(results.tdee)} <span className="text-[10px] font-normal text-slate-400">kcal</span></p>
                    </div>
                  </div>
                  <BMIGauge bmi={results.bmi} />
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Fat Loss Goal */}
          <div className="space-y-8">
            <div className="flex items-center gap-3 px-1">
              <div className="w-8 h-8 rounded-lg bg-brand text-white flex items-center justify-center">
                <Target className="w-4 h-4" />
              </div>
              <h2 className="text-sm font-bold uppercase tracking-widest">减脂目标设定</h2>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
              <div className="max-w-2xl mx-auto space-y-10">
                
                {/* Body Fat Inputs and Reference */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                  <div className="md:col-span-1 space-y-8">
                    <div className="space-y-6">
                      <InputField label="当前体脂" value={goal.currentBodyFat} unit="%" onChange={(v: number) => setGoal({...goal, currentBodyFat: v})} min={0} max={100} step="0.1" />
                      <InputField label="目标体脂" value={goal.targetBodyFat} unit="%" onChange={(v: number) => setGoal({...goal, targetBodyFat: v})} min={0} max={100} step="0.1" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-50">
                      <div className="text-center">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">当前瘦体重</p>
                        <p className="text-sm font-mono font-bold text-ink">{isNaN(results.leanBodyMass) || results.leanBodyMass <= 0 ? 0 : results.leanBodyMass.toFixed(1)} <span className="text-[10px] font-normal text-slate-400">kg</span></p>
                      </div>
                      <div className="text-center">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">需减脂肪量</p>
                        <p className="text-sm font-mono font-bold text-orange-500">{isNaN(results.weightToLose) || results.weightToLose <= 0 ? 0 : results.weightToLose.toFixed(1)} <span className="text-[10px] font-normal text-slate-400">kg</span></p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="md:col-span-2 bg-slate-50 rounded-2xl p-6 flex flex-col items-center justify-center gap-4 border border-slate-100/50">
                    <div className="w-full max-w-[320px] rounded-xl overflow-hidden bg-white shadow-sm border border-slate-100 cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => {
                        const imageSrc = userInfo.gender === 'male' ? '/body_fatrate_man.jpg' : '/body_fatrate_woman.jpg';
                        setModalImage(imageSrc);
                        setShowModal(true);
                      }}
                    >
                      <img 
                        src={userInfo.gender === 'male' ? '/body_fatrate_man.jpg' : '/body_fatrate_woman.jpg'}
                        alt={`${userInfo.gender === 'male' ? '男' : '女'}性体脂参考图`}
                        className="w-full h-auto block"
                        onError={(e) => {
                          // Fallback to a placeholder if the specific image is missing
                          (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${userInfo.gender === 'male' ? 'bodyfat-male' : 'bodyfat-female'}/400/500?blur=2`;
                        }}
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="text-center">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">体脂率视觉参考图 ({userInfo.gender === 'male' ? '男' : '女'})</p>
                    </div>
                  </div>
                </div>

                {/* Duration and Presets */}
                <div className="pt-10 border-t border-slate-50 space-y-6">
                  <div className="space-y-4">
                    <InputField 
                      label="计划用时天数" 
                      value={goal.manualDays} 
                      unit="天" 
                      max={999}
                      step="1"
                      onChange={(v: number) => {
                        // 不设置最小值，允许为空（值为0）
                        const num = Math.min(999, v);
                        setGoal({...goal, manualDays: num, planLevel: 'manual'});
                      }} 
                    />
                    
                    <div className="grid grid-cols-3 gap-3">
                      {PLAN_LEVELS.filter(p => p.id !== 'manual').map(plan => (
                        <button
                          key={plan.id}
                          onClick={() => applyPlanPreset(plan.id, plan.deficit)}
                          className={cn(
                            "py-3 px-2 rounded-xl border transition-all shadow-sm flex flex-col items-center text-center",
                            goal.planLevel === plan.id 
                              ? "border-brand bg-brand/5 ring-1 ring-brand" 
                              : "border-slate-100 bg-white hover:border-brand hover:bg-brand/5"
                          )}
                        >
                          <span className={cn("text-xs font-bold", goal.planLevel === plan.id ? "text-brand" : "text-slate-600")}>{plan.label}</span>
                          <span className={cn("text-[9px] font-normal mt-0.5 leading-tight", goal.planLevel === plan.id ? "text-brand/70" : "text-slate-400")}>{plan.comment}</span>
                        </button>
                      ))}
                    </div>
                    <p className="text-[10px] text-slate-400 text-center">点击上方按钮可根据推荐强度自动映射天数</p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* Overall Review Summary */}
        <div className="space-y-8">
          <div className="flex items-center gap-3 px-1">
            <div className="w-8 h-8 rounded-lg bg-brand/10 text-brand flex items-center justify-center">
              <Scale className="w-4 h-4" />
            </div>
            <h2 className="text-sm font-bold uppercase tracking-widest">整体点评</h2>
          </div>

          <div className="bg-white rounded-3xl p-10 border border-slate-100 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-[0.02] pointer-events-none">
              <Scale className="w-48 h-48 rotate-12" />
            </div>
            
            <div className="max-w-3xl mx-auto relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
                <div className="space-y-8">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand" />
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">计划强度</p>
                    </div>
                    <p className="text-lg font-bold text-brand pl-3.5">{results.evaluation.intensity}</p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">影响与意义</p>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed pl-3.5">{results.evaluation.impact}</p>
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">注意事项</p>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed pl-3.5">{results.evaluation.notes}</p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand/30" />
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">教练寄语</p>
                    </div>
                    <div className="pl-3.5 border-l-2 border-brand/10">
                      <p className="text-sm font-medium text-ink italic leading-relaxed">
                        “{results.evaluation.motivation}”
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Minimal Footer Info */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-12 border-t border-slate-100">
          <div className="flex items-center gap-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            <span className="flex items-center gap-1.5"><Info className="w-3 h-3" /> 科学计算</span>
            <span className="flex items-center gap-1.5"><Info className="w-3 h-3" /> 隐私保护</span>
          </div>
          <p className="text-[10px] font-medium text-slate-300">© 2026 LEANCALC · 极简科学减脂工具</p>
        </div>
      </main>
    </div>
  );
}
