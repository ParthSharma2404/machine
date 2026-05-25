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
    <div className="min-h-screen flex flex-col bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-card via-background to-background">
      {/* Premium Header */}
      <header className="sticky top-0 z-50 bg-background/60 backdrop-blur-xl border-b border-white/5 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Activity className="text-primary w-6 h-6" />
            <span className="font-bold text-xl tracking-tight text-white">
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
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-8 border border-primary/20 backdrop-blur-sm"
          >
            <Shield className="w-4 h-4" /> Institutional Grade Security
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            Deploy Capital with <br/> Absolute <span className="text-primary bg-clip-text">Precision.</span>
          </h1>
          <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto font-light">
            Access real-time aggregated liquidity pools and staking vaults. Secure, audited, and optimized for maximum yield on digital assets.
          </p>
        </motion.div>

        {/* Why YieldPulse Section */}
        <div className="w-full max-w-7xl mb-28">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">The YieldPulse Advantage</h2>
            <p className="text-text-secondary max-w-2xl mx-auto">Why sophisticated investors choose our platform to deploy their capital.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-card p-8 relative overflow-hidden group">
               <div className="absolute top-0 left-0 w-1 h-full bg-blue-500 opacity-50 group-hover:opacity-100 transition-opacity"></div>
               <BarChart3 className="w-10 h-10 text-blue-500 mb-6" />
               <h3 className="text-xl font-bold text-white mb-3">Highest Market Yields</h3>
               <p className="text-text-secondary text-sm leading-relaxed">Our aggregator instantly scans Aave, Curve, Pendle, and dozens of other protocols to find you the absolute highest returning pools in DeFi.</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="glass-card p-8 relative overflow-hidden group">
               <div className="absolute top-0 left-0 w-1 h-full bg-primary opacity-50 group-hover:opacity-100 transition-opacity"></div>
               <ShieldCheck className="w-10 h-10 text-primary mb-6" />
               <h3 className="text-xl font-bold text-white mb-3">Audited & Secure</h3>
               <p className="text-text-secondary text-sm leading-relaxed">We only list pools that have undergone rigorous smart contract audits by top-tier security firms like OpenZeppelin and Trail of Bits.</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="glass-card p-8 relative overflow-hidden group">
               <div className="absolute top-0 left-0 w-1 h-full bg-purple-500 opacity-50 group-hover:opacity-100 transition-opacity"></div>
               <LockOpen className="w-10 h-10 text-purple-500 mb-6" />
               <h3 className="text-xl font-bold text-white mb-3">Zero Lock-ups</h3>
               <p className="text-text-secondary text-sm leading-relaxed">Your capital remains highly liquid. Withdraw your initial deposit and your accumulated interest at any time with absolutely no lock-up periods.</p>
            </motion.div>
          </div>
        </div>

        {/* Graphical How It Works */}
        <div className="w-full max-w-7xl mb-32 relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">How Your Money Works</h2>
            <p className="text-text-secondary max-w-2xl mx-auto">A fully automated, non-custodial process. You always maintain full control of your assets.</p>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0 relative z-10">
            {/* Step 1 */}
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="flex-1 w-full flex flex-col items-center text-center px-4">
              <div className="w-20 h-20 rounded-2xl bg-card border border-border flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.15)] mb-6 relative">
                 <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-blue-500 text-white font-bold flex items-center justify-center text-sm border-4 border-background">1</div>
                 <ArrowDownToLine className="w-8 h-8 text-blue-500" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Deposit Assets</h4>
              <p className="text-sm text-text-secondary">Connect your Web3 wallet and deposit stablecoins or crypto into our secure smart vaults.</p>
            </motion.div>

            {/* Connector */}
            <div className="hidden md:block flex-none w-16 h-[2px] bg-gradient-to-r from-blue-500/50 to-primary/50 relative -mt-20">
               <ArrowRight className="absolute -right-2 -top-2 w-4 h-4 text-primary" />
            </div>

            {/* Step 2 */}
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.15 }} className="flex-1 w-full flex flex-col items-center text-center px-4">
              <div className="w-20 h-20 rounded-2xl bg-card border border-border flex items-center justify-center shadow-[0_0_30px_rgba(0,229,153,0.15)] mb-6 relative">
                 <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-primary text-background font-bold flex items-center justify-center text-sm border-4 border-background">2</div>
                 <RefreshCw className="w-8 h-8 text-primary" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Auto-Compound</h4>
              <p className="text-sm text-text-secondary">Our contracts automatically harvest yields and restake them daily to drastically accelerate your APY.</p>
            </motion.div>

            {/* Connector */}
            <div className="hidden md:block flex-none w-16 h-[2px] bg-gradient-to-r from-primary/50 to-purple-500/50 relative -mt-20">
               <ArrowRight className="absolute -right-2 -top-2 w-4 h-4 text-purple-500" />
            </div>

            {/* Step 3 */}
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="flex-1 w-full flex flex-col items-center text-center px-4">
              <div className="w-20 h-20 rounded-2xl bg-card border border-border flex items-center justify-center shadow-[0_0_30px_rgba(168,85,247,0.15)] mb-6 relative">
                 <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-purple-500 text-white font-bold flex items-center justify-center text-sm border-4 border-background">3</div>
                 <HandCoins className="w-8 h-8 text-purple-500" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Instant Withdrawal</h4>
              <p className="text-sm text-text-secondary">Withdraw your original capital plus all compounded interest instantly directly to your wallet.</p>
            </motion.div>
          </div>
        </div>

        {/* Data Table Section */}
        <div className="w-full max-w-7xl">
          <div className="flex flex-col sm:flex-row justify-between items-end sm:items-center mb-6 gap-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Layers className="text-primary w-5 h-5"/> Live Yield Markets
            </h2>
            <div className="relative w-full sm:w-auto">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
              <input 
                type="text"
                placeholder="Search USDC, Aave..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-card/50 border border-border rounded-lg pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-white w-full sm:w-72 transition-all placeholder:text-text-muted"
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
                  <tr className="border-b border-border bg-black/20 text-xs uppercase tracking-wider text-text-muted">
                    <th className="px-6 py-5 font-semibold">Protocol</th>
                    <th className="px-6 py-5 font-semibold">Asset</th>
                    <th className="px-6 py-5 font-semibold">Network</th>
                    <th className="px-6 py-5 font-semibold">Net APY</th>
                    <th className="px-6 py-5 font-semibold">TVL (USD)</th>
                    <th className="px-6 py-5 font-semibold">Risk Tier</th>
                    <th className="px-6 py-5 font-semibold text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredPools.map((pool, i) => (
                    <tr 
                      key={pool.pool}
                      className="group hover:bg-white/[0.02] transition-colors cursor-pointer"
                    >
                      <td className="px-6 py-5">
                        <div className="font-semibold text-white group-hover:text-primary transition-colors">{pool.project}</div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="font-mono text-sm font-medium text-white bg-white/5 inline-block px-2.5 py-1 rounded">{pool.symbol}</div>
                      </td>
                      <td className="px-6 py-5">
                         <span className="text-xs font-medium text-blue-400 bg-blue-400/10 px-2.5 py-1 rounded border border-blue-400/20">{pool.chain}</span>
                      </td>
                      <td className="px-6 py-5">
                        <div className="font-mono text-primary font-bold text-base">{pool.apy.toFixed(2)}%</div>
                      </td>
                      <td className="px-6 py-5 font-mono text-sm text-text-secondary">
                        ${(pool.tvlUsd / 1000000).toFixed(1)}M
                      </td>
                      <td className="px-6 py-5">
                        <span className={`text-xs px-2.5 py-1 rounded font-semibold border ${
                          pool.riskLevel === 'Low' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                          pool.riskLevel === 'Medium' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                          'bg-rose-500/10 text-rose-400 border-rose-500/20'
                        }`}>
                          {pool.riskLevel}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-right">
                         <button className="text-text-muted group-hover:text-primary transition-colors flex items-center justify-end gap-1 w-full text-sm font-medium">
                            Trade <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-10px] group-hover:translate-x-0 duration-300" />
                         </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredPools.length === 0 && (
                <div className="p-12 text-center text-text-muted">No pools found matching your search criteria.</div>
              )}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
