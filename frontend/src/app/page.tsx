'use client';

import React, { useState } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { motion } from 'framer-motion';
import { Search, Shield, Zap, Activity, ArrowRight } from 'lucide-react';
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

      {/* Hero Section */}
      <main className="flex-grow flex flex-col items-center px-6 pt-24 pb-20">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center max-w-4xl mb-20"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
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

        {/* Data Table Section */}
        <div className="w-full max-w-7xl">
          <div className="flex flex-col sm:flex-row justify-between items-end sm:items-center mb-6 gap-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Zap className="text-primary w-5 h-5"/> Live Markets
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
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
                    <motion.tr 
                      key={pool.pool}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 * Math.min(i, 10) }}
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
                    </motion.tr>
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
