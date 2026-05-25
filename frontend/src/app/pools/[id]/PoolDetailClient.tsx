'use client';

import React, { useState, useEffect } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { ArrowLeft, ShieldCheck, Activity, LineChart, LockOpen, TrendingUp, Clock, Percent, DollarSign, AlertTriangle, Info, ArrowUpRight, Layers, ExternalLink } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const protocolDescriptions: Record<string, string> = {
  'Pendle': 'Pendle Finance is a permissionless yield-trading protocol that enables the tokenization and trading of future yield. Users can lock in fixed yields or speculate on variable yield movements.',
  'Ethena': 'Ethena Labs is a synthetic dollar protocol built on Ethereum. It provides a crypto-native, censorship-resistant stablecoin (USDe) along with a globally accessible dollar-denominated savings instrument.',
  'Aave V3': 'Aave is the world\'s largest decentralized non-custodial liquidity protocol. Users can participate as suppliers or borrowers across multiple blockchain networks.',
  'Curve': 'Curve Finance is a decentralized exchange optimized for stablecoin and like-kind asset swaps, offering extremely low slippage and competitive fees.',
  'Uniswap V3': 'Uniswap V3 is the most widely used decentralized exchange protocol, enabling concentrated liquidity positions for dramatically improved capital efficiency.',
  'Compound V3': 'Compound is an algorithmic, autonomous interest rate protocol built for developers to unlock a universe of open financial applications.',
  'Lido': 'Lido is the largest liquid staking protocol, enabling users to stake ETH and receive stETH, maintaining liquidity while earning staking rewards.',
  'MakerDAO': 'MakerDAO operates the Dai stablecoin system, allowing users to generate Dai by depositing collateral assets into Maker Vaults.',
  'default': 'A leading DeFi protocol providing competitive yields through automated strategies and battle-tested smart contracts.'
};

function generateChartData(apy: number) {
  const today = new Date();
  return Array.from({ length: 30 }, (_, i) => {
    const date = new Date(today);
    date.setDate(date.getDate() - (29 - i));
    const base = apy * 0.85;
    const variation = Math.sin(i * 0.5) * apy * 0.08 + Math.cos(i * 0.3) * apy * 0.05;
    const trend = (i / 30) * apy * 0.15;
    return {
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      apy: parseFloat((base + variation + trend).toFixed(2)),
    };
  });
}

function ChartTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-slate-200 rounded-xl px-4 py-3 shadow-lg">
      <p className="text-xs text-slate-400 mb-1">{label}</p>
      <p className="text-lg font-bold font-mono text-emerald-600">{payload[0].value.toFixed(2)}%</p>
    </div>
  );
}

function InteractiveChart({ apy }: { apy: number }) {
  const data = generateChartData(apy);
  return (
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
        <defs>
          <linearGradient id="apyGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#10B981" stopOpacity={0.2} />
            <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
        <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} interval={6} />
        <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} domain={['dataMin - 0.5', 'dataMax + 0.5']} />
        <Tooltip content={<ChartTooltip />} cursor={{ stroke: '#cbd5e1', strokeDasharray: '4 4' }} />
        <Area type="monotone" dataKey="apy" stroke="#10B981" strokeWidth={2.5} fill="url(#apyGradient)" activeDot={{ r: 6, fill: '#10B981', stroke: '#fff', strokeWidth: 2 }} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export default function PoolDetailClient({ pool }: { pool: any }) {
  const router = useRouter();
  const { isConnected } = useAccount();
  const [amount, setAmount] = useState('');
  const [activeTab, setActiveTab] = useState<'deposit' | 'withdraw'>('deposit');

  const desc = protocolDescriptions[pool.project] || protocolDescriptions['default'];
  const estimatedDaily = amount ? (parseFloat(amount) * pool.apy / 100 / 365).toFixed(4) : '0.0000';
  const estimatedMonthly = amount ? (parseFloat(amount) * pool.apy / 100 / 12).toFixed(2) : '0.00';
  const estimatedYearly = amount ? (parseFloat(amount) * pool.apy / 100).toFixed(2) : '0.00';

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-border px-6 py-3 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button onClick={() => router.back()} className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"><ArrowLeft className="w-4 h-4 text-slate-600" /></button>
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => router.push('/')}>
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center"><Activity className="text-white w-4 h-4" /></div>
              <span className="font-bold text-xl tracking-tight text-slate-900">Yield<span className="text-primary">Pulse</span></span>
            </div>
          </div>
          <ConnectButton />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 pt-10 pb-24">
        {/* Title Row */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-lg font-bold text-slate-500">{pool.project.substring(0, 2).toUpperCase()}</div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900">{pool.project}</h1>
            <span className="font-mono text-lg font-medium text-slate-400">{pool.symbol}</span>
            <span className="px-3 py-1 bg-blue-50 text-blue-600 border border-blue-100 rounded-full text-sm font-semibold">{pool.chain}</span>
          </div>
          <p className="text-slate-500 text-base max-w-2xl">{desc}</p>
        </motion.div>

        {/* Quick Stats Strip */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: 'Net APY', value: `${pool.apy.toFixed(2)}%`, icon: <Percent className="w-4 h-4 text-emerald-500" />, valueClass: 'text-emerald-600' },
            { label: 'Total Value Locked', value: `$${(pool.tvlUsd / 1e6).toFixed(1)}M`, icon: <DollarSign className="w-4 h-4 text-blue-500" />, valueClass: 'text-slate-900' },
            { label: 'YP Score', value: `${pool.yieldScore}/100`, icon: <Activity className="w-4 h-4 text-primary" />, valueClass: pool.yieldScore >= 80 ? 'text-emerald-600' : pool.yieldScore >= 50 ? 'text-amber-600' : 'text-rose-600' },
            { label: 'Exposure', value: pool.exposure === 'single' ? 'Single Asset' : 'Multi-Asset', icon: <Layers className="w-4 h-4 text-indigo-500" />, valueClass: 'text-slate-900' },
          ].map((s, i) => (
            <div key={i} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-2">{s.icon}<span className="text-xs font-medium text-slate-400 uppercase tracking-wider">{s.label}</span></div>
              <p className={`text-2xl font-bold font-mono ${s.valueClass}`}>{s.value}</p>
            </div>
          ))}
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column */}
          <div className="flex-1 space-y-8">
            {/* APY Chart */}
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="gradient-border shadow-sm hover:shadow-lg transition-shadow hover:!transform-none">
              <div className="p-6 pt-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2"><LineChart className="w-5 h-5 text-primary" /> APY Performance (30d)</h2>
                  <span className="flex items-center gap-1 text-sm font-semibold text-emerald-600"><TrendingUp className="w-4 h-4" /> +{(pool.apy * 0.05).toFixed(2)}%</span>
                </div>
                <InteractiveChart apy={pool.apy} />
              </div>
            </motion.div>

            {/* Security */}
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="gradient-border shadow-sm hover:shadow-lg transition-shadow hover:!transform-none">
              <div className="p-6 pt-8">
                <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2"><ShieldCheck className="w-5 h-5 text-primary" /> Security & Risk Analysis</h2>
                <div className="space-y-0 divide-y divide-slate-100">
                  {[
                    { label: 'Smart Contract Audit', value: 'Verified', vClass: 'text-emerald-600 bg-emerald-50' },
                    { label: 'Audit Firm', value: 'OpenZeppelin', vClass: 'text-blue-600 bg-blue-50' },
                    { label: 'Asset Exposure', value: pool.exposure === 'single' ? 'Single Asset' : 'Multi-Asset LP', vClass: 'text-slate-700 bg-slate-100' },
                    { label: 'Overall Risk', value: `${pool.riskLevel} Risk`, vClass: pool.riskLevel === 'Low' ? 'text-emerald-600 bg-emerald-50' : pool.riskLevel === 'Medium' ? 'text-amber-600 bg-amber-50' : 'text-rose-600 bg-rose-50' },
                    { label: 'Withdrawal', value: 'Instant', vClass: 'text-emerald-600 bg-emerald-50' },
                  ].map((row, i) => (
                    <div key={i} className="flex justify-between items-center py-4">
                      <span className="text-sm text-slate-500">{row.label}</span>
                      <span className={`text-xs font-semibold px-3 py-1 rounded-lg ${row.vClass}`}>{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Trade Widget */}
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="w-full lg:w-[420px]">
            <div className="gradient-border shadow-sm hover:shadow-lg transition-shadow sticky top-24 hover:!transform-none">
              <div className="p-6 pt-8">
                {/* Tabs */}
                <div className="flex gap-1 mb-6 bg-slate-100 rounded-xl p-1">
                  {(['deposit', 'withdraw'] as const).map(tab => (
                    <button key={tab} onClick={() => setActiveTab(tab)} className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${activeTab === tab ? 'bg-white shadow-sm text-slate-900' : 'text-slate-400 hover:text-slate-600'}`}>{tab === 'deposit' ? 'Deposit' : 'Withdraw'}</button>
                  ))}
                </div>

                <div className="mb-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-400 font-medium">Amount</span>
                    <span className="text-slate-400 text-xs">Balance: <span className="font-mono font-semibold text-slate-600">{isConnected ? '10,000.00' : '0.00'} {pool.symbol}</span></span>
                  </div>
                  <div className="relative">
                    <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0.00" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 pl-4 pr-20 text-lg font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
                    <button onClick={() => setAmount('10000')} className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-primary bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors">MAX</button>
                  </div>
                </div>

                {/* Estimated Returns */}
                {amount && parseFloat(amount) > 0 && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mb-6 bg-emerald-50/50 border border-emerald-100 rounded-xl p-4">
                    <p className="text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-3 flex items-center gap-1"><TrendingUp className="w-3 h-3" /> Estimated Returns at {pool.apy.toFixed(2)}% APY</p>
                    <div className="space-y-2">
                      {[
                        { label: 'Daily', value: estimatedDaily },
                        { label: 'Monthly', value: estimatedMonthly },
                        { label: 'Yearly', value: estimatedYearly },
                      ].map((r, i) => (
                        <div key={i} className="flex justify-between text-sm">
                          <span className="text-slate-500">{r.label}</span>
                          <span className="font-mono font-semibold text-emerald-700">+${r.value}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {!isConnected ? (
                  <div className="w-full flex justify-center py-2"><ConnectButton /></div>
                ) : (
                  <button className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-[0.98] hover:shadow-xl">
                    {activeTab === 'deposit' ? `Deposit ${pool.symbol}` : `Withdraw ${pool.symbol}`}
                  </button>
                )}

                <div className="mt-4 flex items-center justify-center gap-4 text-xs text-slate-400">
                  <span className="flex items-center gap-1"><LockOpen className="w-3 h-3" /> No lock-up</span>
                  <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> Audited</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Instant</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
