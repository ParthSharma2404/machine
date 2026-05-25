'use client';

import React, { useState } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { motion } from 'framer-motion';
import { Search, Shield, Zap, Activity, ArrowRight, ShieldCheck, LockOpen, ArrowDownToLine, RefreshCw, HandCoins, BarChart3, Layers } from 'lucide-react';
import poolsData from '../data/pools.json'; 

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredPools = poolsData.filter(pool => 
    pool.project.toLowerCase().includes(searchTerm.toLowerCase()) || 
    pool.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Premium Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-border px-6 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Activity className="text-primary w-6 h-6" />
            <span className="font-bold text-xl tracking-tight text-slate-900">
              Yield<span className="text-primary">Pulse</span>
            </span>
          </div>
          <ConnectButton />
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center px-6 pt-16 pb-20">
        
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center max-w-4xl mb-24 mt-8"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.3 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-primary text-sm font-semibold mb-8 border border-blue-100"
          >
            <Shield className="w-4 h-4" /> Institutional Grade Security
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight">
            Deploy Capital with <br/> Absolute <span className="text-primary">Precision.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto font-light leading-relaxed">
            Access real-time aggregated liquidity pools and staking vaults. Secure, audited, and optimized for maximum yield on digital assets.
          </p>
        </motion.div>

        {/* Why YieldPulse Section */}
        <div className="w-full max-w-7xl mb-28">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">The YieldPulse Advantage</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">Why sophisticated investors choose our platform to deploy their capital.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-card p-8 relative overflow-hidden group">
               <div className="absolute top-0 left-0 w-1 h-full bg-blue-600 opacity-50 group-hover:opacity-100 transition-opacity"></div>
               <BarChart3 className="w-10 h-10 text-blue-600 mb-6" />
               <h3 className="text-xl font-bold text-slate-900 mb-3">Highest Market Yields</h3>
               <p className="text-slate-600 text-sm leading-relaxed">Our aggregator instantly scans Aave, Curve, Pendle, and dozens of other protocols to find you the absolute highest returning pools in DeFi.</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="glass-card p-8 relative overflow-hidden group">
               <div className="absolute top-0 left-0 w-1 h-full bg-emerald-600 opacity-50 group-hover:opacity-100 transition-opacity"></div>
               <ShieldCheck className="w-10 h-10 text-emerald-600 mb-6" />
               <h3 className="text-xl font-bold text-slate-900 mb-3">Audited & Secure</h3>
               <p className="text-slate-600 text-sm leading-relaxed">We only list pools that have undergone rigorous smart contract audits by top-tier security firms like OpenZeppelin and Trail of Bits.</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="glass-card p-8 relative overflow-hidden group">
               <div className="absolute top-0 left-0 w-1 h-full bg-indigo-600 opacity-50 group-hover:opacity-100 transition-opacity"></div>
               <LockOpen className="w-10 h-10 text-indigo-600 mb-6" />
               <h3 className="text-xl font-bold text-slate-900 mb-3">Zero Lock-ups</h3>
               <p className="text-slate-600 text-sm leading-relaxed">Your capital remains highly liquid. Withdraw your initial deposit and your accumulated interest at any time with absolutely no lock-up periods.</p>
            </motion.div>
          </div>
        </div>

        {/* Graphical How It Works */}
        <div className="w-full max-w-7xl mb-32 relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">How Your Money Works</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">A fully automated, non-custodial process. You always maintain full control of your assets.</p>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0 relative z-10">
            {/* Step 1 */}
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="flex-1 w-full flex flex-col items-center text-center px-4">
              <div className="w-20 h-20 rounded-2xl bg-white border border-slate-200 flex items-center justify-center shadow-sm mb-6 relative">
                 <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-sm border-2 border-white shadow-sm">1</div>
                 <ArrowDownToLine className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">Deposit Assets</h4>
              <p className="text-sm text-slate-600">Connect your Web3 wallet and deposit stablecoins or crypto into our secure smart vaults.</p>
            </motion.div>

            {/* Connector */}
            <div className="hidden md:block flex-none w-16 h-[2px] bg-slate-300 relative -mt-20">
               <ArrowRight className="absolute -right-2 -top-2 w-4 h-4 text-slate-400" />
            </div>

            {/* Step 2 */}
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.15 }} className="flex-1 w-full flex flex-col items-center text-center px-4">
              <div className="w-20 h-20 rounded-2xl bg-white border border-slate-200 flex items-center justify-center shadow-sm mb-6 relative">
                 <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-sm border-2 border-white shadow-sm">2</div>
                 <RefreshCw className="w-8 h-8 text-emerald-600" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">Auto-Compound</h4>
              <p className="text-sm text-slate-600">Our contracts automatically harvest yields and restake them daily to drastically accelerate your APY.</p>
            </motion.div>

            {/* Connector */}
            <div className="hidden md:block flex-none w-16 h-[2px] bg-slate-300 relative -mt-20">
               <ArrowRight className="absolute -right-2 -top-2 w-4 h-4 text-slate-400" />
            </div>

            {/* Step 3 */}
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="flex-1 w-full flex flex-col items-center text-center px-4">
              <div className="w-20 h-20 rounded-2xl bg-white border border-slate-200 flex items-center justify-center shadow-sm mb-6 relative">
                 <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-sm border-2 border-white shadow-sm">3</div>
                 <HandCoins className="w-8 h-8 text-indigo-600" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">Instant Withdrawal</h4>
              <p className="text-sm text-slate-600">Withdraw your original capital plus all compounded interest instantly directly to your wallet.</p>
            </motion.div>
          </div>
        </div>

        {/* Data Table Section */}
        <div className="w-full max-w-7xl">
          <div className="flex flex-col sm:flex-row justify-between items-end sm:items-center mb-6 gap-4">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <Layers className="text-primary w-5 h-5"/> Live Yield Markets
            </h2>
            <div className="relative w-full sm:w-auto">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text"
                placeholder="Search USDC, Aave..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-white border border-slate-300 rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-slate-900 w-full sm:w-72 transition-all placeholder:text-slate-400 shadow-sm"
              />
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="glass-card overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-border bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                    <th className="px-6 py-4 font-semibold">Protocol</th>
                    <th className="px-6 py-4 font-semibold">Asset</th>
                    <th className="px-6 py-4 font-semibold">Network</th>
                    <th className="px-6 py-4 font-semibold">Net APY</th>
                    <th className="px-6 py-4 font-semibold">TVL (USD)</th>
                    <th className="px-6 py-4 font-semibold">Risk Tier</th>
                    <th className="px-6 py-4 font-semibold text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredPools.map((pool, i) => (
                    <tr 
                      key={pool.pool}
                      className="group hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      <td className="px-6 py-4">
                        <div className="font-semibold text-slate-900 group-hover:text-primary transition-colors">{pool.project}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-mono text-sm font-medium text-slate-700 bg-slate-100 border border-slate-200 inline-block px-2.5 py-1 rounded">{pool.symbol}</div>
                      </td>
                      <td className="px-6 py-4">
                         <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2.5 py-1 rounded border border-blue-200">{pool.chain}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-mono text-emerald-600 font-bold text-base">{pool.apy.toFixed(2)}%</div>
                      </td>
                      <td className="px-6 py-4 font-mono text-sm text-slate-500">
                        ${(pool.tvlUsd / 1000000).toFixed(1)}M
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-xs px-2.5 py-1 rounded font-semibold border ${
                          pool.riskLevel === 'Low' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' :
                          pool.riskLevel === 'Medium' ? 'bg-amber-50 text-amber-600 border-amber-200' :
                          'bg-rose-50 text-rose-600 border-rose-200'
                        }`}>
                          {pool.riskLevel}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                         <button className="text-slate-500 group-hover:text-primary transition-colors flex items-center justify-end gap-1 w-full text-sm font-medium">
                            Trade <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-10px] group-hover:translate-x-0 duration-300" />
                         </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredPools.length === 0 && (
                <div className="p-12 text-center text-slate-500">No pools found matching your search criteria.</div>
              )}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
