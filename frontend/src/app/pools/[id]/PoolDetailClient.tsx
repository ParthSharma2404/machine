'use client';

import React, { useState } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { ArrowLeft, ShieldCheck, Activity, LineChart, LockOpen } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function PoolDetailClient({ pool }: { pool: any }) {
  const router = useRouter();
  const { isConnected } = useAccount();
  const [amount, setAmount] = useState('');

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-border px-6 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button onClick={() => router.back()} className="text-slate-500 hover:text-slate-900 transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => router.push('/')}>
              <Activity className="text-primary w-6 h-6" />
              <span className="font-bold text-xl tracking-tight text-slate-900">
                Yield<span className="text-primary">Pulse</span>
              </span>
            </div>
          </div>
          <ConnectButton />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 pt-12 pb-24">
        {/* Title */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-4xl font-bold text-slate-900">{pool.project} {pool.symbol}</h1>
            <span className="px-3 py-1 bg-blue-50 text-blue-600 border border-blue-200 rounded-full text-sm font-semibold">{pool.chain}</span>
          </div>
          <p className="text-slate-500 text-lg">Deploy capital into {pool.project}'s automated yield strategy.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column: Details */}
          <div className="flex-1 space-y-6">
            <div className="glass-card p-8">
               <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2"><LineChart className="w-5 h-5 text-primary" /> Performance Metrics</h2>
               <div className="grid grid-cols-2 gap-6">
                 <div>
                   <p className="text-sm text-slate-500 mb-1">Net APY</p>
                   <p className="text-3xl font-mono font-bold text-emerald-600">{pool.apy.toFixed(2)}%</p>
                 </div>
                 <div>
                   <p className="text-sm text-slate-500 mb-1">Total Value Locked</p>
                   <p className="text-3xl font-mono font-bold text-slate-900">${(pool.tvlUsd / 1000000).toFixed(1)}M</p>
                 </div>
               </div>
            </div>

            <div className="glass-card p-8">
               <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2"><ShieldCheck className="w-5 h-5 text-primary" /> Risk Analysis</h2>
               <div className="space-y-4">
                 <div className="flex justify-between items-center py-3 border-b border-slate-100">
                   <span className="text-slate-600">Smart Contract Risk</span>
                   <span className="font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded text-sm">Audited</span>
                 </div>
                 <div className="flex justify-between items-center py-3 border-b border-slate-100">
                   <span className="text-slate-600">Asset Exposure</span>
                   <span className="font-semibold text-slate-900">{pool.exposure === 'single' ? 'Single Asset' : 'Multi-Asset'}</span>
                 </div>
                 <div className="flex justify-between items-center py-3">
                   <span className="text-slate-600">Overall Risk Tier</span>
                   <span className={`font-semibold px-2 py-1 rounded text-sm ${
                      pool.riskLevel === 'Low' ? 'bg-emerald-50 text-emerald-600' :
                      pool.riskLevel === 'Medium' ? 'bg-amber-50 text-amber-600' :
                      'bg-rose-50 text-rose-600'
                   }`}>{pool.riskLevel} Risk</span>
                 </div>
               </div>
            </div>
          </div>

          {/* Right Column: Trade Widget */}
          <div className="w-full lg:w-[400px]">
            <div className="glass-card p-6 sticky top-24">
              <h2 className="text-xl font-bold text-slate-900 mb-6">Deploy Capital</h2>
              
              <div className="mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-500">Amount</span>
                  <span className="text-slate-500">Balance: {isConnected ? `10,000.00 ${pool.symbol}` : '0.00'}</span>
                </div>
                <div className="relative">
                  <input 
                    type="number" 
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg py-4 pl-4 pr-16 text-lg font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
                  <button onClick={() => setAmount('10000')} className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-primary bg-blue-50 px-2 py-1 rounded">MAX</button>
                </div>
              </div>

              {!isConnected ? (
                <div className="w-full flex justify-center py-2">
                  <ConnectButton />
                </div>
              ) : (
                <button className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-4 rounded-lg shadow-md transition-all active:scale-[0.98]">
                  Deposit {pool.symbol}
                </button>
              )}

              <p className="text-xs text-center text-slate-400 mt-6 flex items-center justify-center gap-1">
                <LockOpen className="w-3 h-3" /> No lock-up. Withdraw anytime.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
