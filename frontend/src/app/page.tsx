'use client';

import React, { useState, useEffect } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { motion } from 'framer-motion';
import { Search, Shield, ArrowRight, ShieldCheck, LockOpen, ArrowDownToLine, RefreshCw, HandCoins, BarChart3, Layers, Activity, TrendingUp, Globe, Users, Rocket, ChevronRight, ExternalLink } from 'lucide-react';
import { useRouter } from 'next/navigation';
import poolsData from '../data/pools.json'; 

function AnimatedCounter({ target, prefix = '', suffix = '' }: { target: number; prefix?: string; suffix?: string }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(current));
    }, duration / steps);
    return () => clearInterval(timer);
  }, [target]);
  return <span>{prefix}{count.toLocaleString()}{suffix}</span>;
}

export default function Home() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [loadingPool, setLoadingPool] = useState<string | null>(null);
  
  const filteredPools = poolsData.filter(pool => 
    pool.project.toLowerCase().includes(searchTerm.toLowerCase()) || 
    pool.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalTVL = poolsData.reduce((sum, p) => sum + p.tvlUsd, 0);
  const avgAPY = poolsData.reduce((sum, p) => sum + p.apy, 0) / poolsData.length;
  const protocols = new Set(poolsData.map(p => p.project)).size;
  const chains = new Set(poolsData.map(p => p.chain)).size;

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-border px-6 py-3 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Activity className="text-white w-4 h-4" />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900">
              Yield<span className="text-primary">Pulse</span>
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-500">
            <a href="#markets" className="hover:text-primary transition-colors">Markets</a>
            <a href="#features" className="hover:text-primary transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-primary transition-colors">How It Works</a>
          </nav>
          <ConnectButton />
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero with Mesh Background */}
        <section className="relative overflow-hidden bg-mesh">
          <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-24">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center max-w-4xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-primary text-sm font-semibold mb-8 border border-blue-100">
                <div className="w-2 h-2 rounded-full bg-emerald-500 pulse-dot" />
                Live — Tracking {protocols} Protocols Across {chains} Networks
              </div>
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-6 leading-[1.1]">
                Maximize Your <br/><span className="text-gradient">DeFi Yields.</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed mb-10">
                The intelligent yield aggregator that finds, compares, and auto-compounds the highest returning opportunities across all major DeFi protocols.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="#markets" className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white font-semibold px-8 py-4 rounded-xl shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:shadow-primary/30 active:scale-[0.98]">
                  <Rocket className="w-5 h-5" /> Explore Markets
                </a>
                <a href="#how-it-works" className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 font-semibold px-8 py-4 rounded-xl border border-slate-200 shadow-sm transition-all">
                  How It Works <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>

            {/* Live Stats Bar */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }} className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {[
                { label: 'Total Value Locked', value: <AnimatedCounter target={Math.round(totalTVL / 1e9)} prefix="$" suffix="B+" />, icon: <TrendingUp className="w-5 h-5 text-blue-500" /> },
                { label: 'Protocols Tracked', value: <AnimatedCounter target={protocols} suffix="+" />, icon: <Globe className="w-5 h-5 text-indigo-500" /> },
                { label: 'Avg. Net APY', value: <AnimatedCounter target={Math.round(avgAPY)} suffix="%" />, icon: <BarChart3 className="w-5 h-5 text-emerald-500" /> },
                { label: 'Networks Covered', value: <AnimatedCounter target={chains} />, icon: <Layers className="w-5 h-5 text-purple-500" /> },
              ].map((stat, i) => (
                <div key={i} className="glass-card px-5 py-4 text-center hover:!transform-none">
                  <div className="flex items-center justify-center gap-2 mb-2">{stat.icon}<span className="text-xs font-medium text-slate-400 uppercase tracking-wider">{stat.label}</span></div>
                  <div className="text-2xl font-bold font-mono text-slate-900">{stat.value}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="py-24 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Platform Advantages</p>
              <h2 className="text-4xl font-bold text-slate-900 mb-4">Built for Serious Investors</h2>
              <p className="text-slate-500 max-w-xl mx-auto">Every feature is designed to maximize returns while minimizing risk.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="gradient-border shadow-sm hover:shadow-xl transition-all duration-300 group">
                <div className="p-8 pt-10">
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"><BarChart3 className="w-7 h-7" /></div>
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-500 mb-3 block">Real-Time Scanning</span>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">Highest Market Yields</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">Our aggregator scans Aave, Curve, Pendle, and dozens of protocols in real-time to surface the absolute highest returns available in DeFi.</p>
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="gradient-border shadow-sm hover:shadow-xl transition-all duration-300 group">
                <div className="p-8 pt-10">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"><ShieldCheck className="w-7 h-7" /></div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-500 mb-3 block">Triple-Audited</span>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">Audited &amp; Secure</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">Every pool listed has passed rigorous smart contract audits by firms like OpenZeppelin and Trail of Bits. We never list unverified protocols.</p>
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="gradient-border shadow-sm hover:shadow-xl transition-all duration-300 group">
                <div className="p-8 pt-10">
                  <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"><LockOpen className="w-7 h-7" /></div>
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-500 mb-3 block">No Lock-ups</span>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">Instant Liquidity</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">Zero lock-up periods. Withdraw your initial deposit and all accumulated interest instantly, directly to your wallet, at any time.</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-24 px-6 bg-mesh relative">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Simple Process</p>
              <h2 className="text-4xl font-bold text-slate-900 mb-4">How Your Money Grows</h2>
              <p className="text-slate-500 max-w-xl mx-auto">A fully automated, non-custodial process. You maintain full control at every step.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              <div className="hidden md:block absolute top-16 left-[20%] right-[20%] h-[2px] bg-gradient-to-r from-blue-200 via-emerald-200 to-indigo-200 z-0" />
              
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative z-10 text-center">
                <div className="w-20 h-20 rounded-2xl bg-white border-2 border-blue-100 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-500/10 relative">
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-sm shadow-md">1</div>
                  <ArrowDownToLine className="w-8 h-8 text-blue-600" />
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-3">Deposit Assets</h4>
                <p className="text-sm text-slate-500 leading-relaxed max-w-xs mx-auto">Connect your Web3 wallet (MetaMask, WalletConnect, Coinbase) and deposit stablecoins or crypto into a secure smart vault of your choice.</p>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }} className="relative z-10 text-center">
                <div className="w-20 h-20 rounded-2xl bg-white border-2 border-emerald-100 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-500/10 relative">
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-sm shadow-md">2</div>
                  <RefreshCw className="w-8 h-8 text-emerald-600" />
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-3">Auto-Compound</h4>
                <p className="text-sm text-slate-500 leading-relaxed max-w-xs mx-auto">Our smart contracts automatically harvest yields every 24 hours and restake them — exponentially accelerating your effective APY over time.</p>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="relative z-10 text-center">
                <div className="w-20 h-20 rounded-2xl bg-white border-2 border-indigo-100 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-indigo-500/10 relative">
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-sm shadow-md">3</div>
                  <HandCoins className="w-8 h-8 text-indigo-600" />
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-3">Withdraw Anytime</h4>
                <p className="text-sm text-slate-500 leading-relaxed max-w-xs mx-auto">Withdraw your original capital plus all compounded interest instantly. No waiting periods, no penalties, no hidden fees. It goes straight to your wallet.</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Data Table Section */}
        <section id="markets" className="py-24 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-end sm:items-center mb-8 gap-4">
              <div>
                <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-1">Live Data</p>
                <h2 className="text-3xl font-bold text-slate-900">Yield Markets</h2>
              </div>
              <div className="relative w-full sm:w-auto">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input type="text" placeholder="Search protocols, assets..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 text-slate-900 w-full sm:w-80 transition-all placeholder:text-slate-400" />
              </div>
            </div>

            <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-50/80 text-xs uppercase tracking-wider text-slate-400">
                      <th className="px-6 py-4 font-semibold">Protocol</th>
                      <th className="px-6 py-4 font-semibold">Asset</th>
                      <th className="px-6 py-4 font-semibold">Network</th>
                      <th className="px-6 py-4 font-semibold">Net APY</th>
                      <th className="px-6 py-4 font-semibold">TVL</th>
                      <th className="px-6 py-4 font-semibold">YP Score</th>
                      <th className="px-6 py-4 font-semibold text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredPools.map((pool) => (
                      <tr key={pool.pool} onClick={() => { setLoadingPool(pool.pool); router.push(`/pools/${pool.pool}/`); }} className={`group transition-all cursor-pointer ${loadingPool === pool.pool ? 'bg-blue-50/80 pointer-events-none' : 'hover:bg-blue-50/40'}`}>
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500 group-hover:bg-primary group-hover:text-white transition-colors">{pool.project.substring(0, 2).toUpperCase()}</div>
                            <span className="font-semibold text-slate-900">{pool.project}</span>
                          </div>
                        </td>
                        <td className="px-6 py-5"><span className="font-mono text-sm font-medium text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg">{pool.symbol}</span></td>
                        <td className="px-6 py-5"><span className="text-xs font-medium text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-100">{pool.chain}</span></td>
                        <td className="px-6 py-5"><span className="font-mono text-emerald-600 font-bold text-lg">{pool.apy.toFixed(2)}%</span></td>
                        <td className="px-6 py-5 font-mono text-sm text-slate-500">${(pool.tvlUsd / 1e6).toFixed(1)}M</td>
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-2">
                            <div className="w-12 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                              <div className={`h-full rounded-full ${pool.yieldScore >= 80 ? 'bg-emerald-500' : pool.yieldScore >= 50 ? 'bg-amber-500' : 'bg-rose-500'}`} style={{ width: `${pool.yieldScore}%` }} />
                            </div>
                            <span className={`text-xs font-bold ${pool.yieldScore >= 80 ? 'text-emerald-600' : pool.yieldScore >= 50 ? 'text-amber-600' : 'text-rose-600'}`}>{pool.yieldScore}</span>
                          </div>
                        </td>
                        <td className="px-6 py-5 text-right">
                          {loadingPool === pool.pool ? (
                            <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
                              <RefreshCw className="w-4 h-4 animate-spin" /> Loading...
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-sm font-medium text-slate-400 group-hover:text-primary transition-colors">Deposit <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filteredPools.length === 0 && <div className="p-16 text-center text-slate-400">No pools found matching your search.</div>}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-slate-900 text-white py-16 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center"><Activity className="text-white w-4 h-4" /></div>
                <span className="font-bold text-xl">Yield<span className="text-blue-400">Pulse</span></span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed max-w-sm">The intelligent yield aggregator for DeFi. We find, compare, and auto-compound the best opportunities across all major protocols.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-slate-400">Platform</h4>
              <ul className="space-y-3 text-sm text-slate-300">
                <li><a href="#markets" className="hover:text-white transition-colors">Markets</a></li>
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-slate-400">Resources</h4>
              <ul className="space-y-3 text-sm text-slate-300">
                <li><a href="#" className="hover:text-white transition-colors flex items-center gap-1">Documentation <ExternalLink className="w-3 h-3" /></a></li>
                <li><a href="#" className="hover:text-white transition-colors flex items-center gap-1">GitHub <ExternalLink className="w-3 h-3" /></a></li>
                <li><a href="#" className="hover:text-white transition-colors flex items-center gap-1">Security Audits <ExternalLink className="w-3 h-3" /></a></li>
              </ul>
            </div>
          </div>
          <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
            © 2025 YieldPulse. All rights reserved. Smart contract interactions carry inherent risk.
          </div>
        </footer>
      </main>
    </div>
  );
}
