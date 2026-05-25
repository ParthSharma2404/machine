import json
import os
import shutil

def load_pools():
    with open("backend/data/pools.json", "r") as f:
        return json.load(f)

def load_template(name):
    with open(os.path.join("templates", name), "r", encoding="utf-8") as f:
        return f.read()

def write_page(output_path, content):
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(content)

def format_tvl(val):
    if val >= 1_000_000_000:
        return f"{val / 1_000_000_000:.2f}B"
    elif val >= 1_000_000:
        return f"{val / 1_000_000:.1f}M"
    return f"{val:,}"

def generate_table_rows(pools):
    rows = []
    for p in pools:
        tvl_formatted = format_tvl(p['tvlUsd'])
        risk_class = p['riskLevel'].lower()
        
        # We append direct metadata as data attributes for our instant JS search engines
        row = f"""
        <tr data-project="{p['project']}" data-symbol="{p['symbol']}" data-chain="{p['chain']}" data-risk="{p['riskLevel']}">
            <td><strong>{p['project']}</strong></td>
            <td data-sort-value="{p['symbol']}">{p['symbol']}</td>
            <td><span class="badge badge-chain">{p['chain']}</span></td>
            <td class="badge-apy" data-sort-value="{p['apy']}">{p['apy']}%</td>
            <td data-sort-value="{p['tvlUsd']}">${tvl_formatted}</td>
            <td><span class="badge badge-risk {risk_class}">{p['riskLevel']}</span></td>
            <td><a href="/pools/{p['pool']}.html" class="btn btn-secondary btn-sm">View Pool</a></td>
        </tr>
        """
        rows.append(row)
    return "\n".join(rows)

def compile_base(base_template, page_content, title, description):
    compiled = base_template.replace("{{ title }}", title)
    compiled = compiled.replace("{{ description }}", description)
    compiled = compiled.replace("{{ content }}", page_content)
    return compiled

def main():
    print("--- YieldPulse Static Compiler Engine ---")
    pools = load_pools()
    base_tpl = load_template("base.html")
    index_tpl = load_template("index.html")
    detail_tpl = load_template("pool_detail.html")
    
    # Ensure clean output directory and copy stylesheet
    os.makedirs("dist", exist_ok=True)
    shutil.copy("templates/style.css", "dist/style.css")
    print("Style assets copied to dist/style.css")

    # 1. COMPILE MAIN DASHBOARD
    table_rows = generate_table_rows(pools)
    index_content = index_tpl.replace("{{ table_rows }}", table_rows)
    index_page = compile_base(
        base_tpl,
        index_content,
        "DeFi Yield Aggregator | Compare Best Staking & Stablecoin Rates",
        "Compare live APY returns and risk ratings across the best decentralized finance networks. Find top yields for USDC, USDT, ETH, and SOL instantly."
    )
    write_page("dist/index.html", index_page)
    print("Generated: dist/index.html")

    # 2. COMPILE INDIVIDUAL POOL DETAIL PAGES
    for p in pools:
        tvl_formatted = format_tvl(p['tvlUsd'])
        risk_class = p['riskLevel'].lower()
        project_slug = p['project'].lower().replace(" ", "-")
        
        detail_content = detail_tpl
        detail_content = detail_content.replace("{{ project }}", p['project'])
        detail_content = detail_content.replace("{{ symbol }}", p['symbol'])
        detail_content = detail_content.replace("{{ chain }}", p['chain'])
        detail_content = detail_content.replace("{{ apy }}", str(p['apy']))
        detail_content = detail_content.replace("{{ tvl }}", tvl_formatted)
        detail_content = detail_content.replace("{{ risk }}", p['riskLevel'])
        detail_content = detail_content.replace("{{ risk_class }}", risk_class)
        detail_content = detail_content.replace("{{ exposure }}", p['exposure'])
        detail_content = detail_content.replace("{{ project_slug }}", project_slug)
        
        title = f"Best DeFi Yield: {p['project']} {p['symbol']} on {p['chain']} ({p['apy']}% APY)"
        description = f"Real-time safety analysis, total locked value, and yields for the {p['project']} {p['symbol']} pool on the {p['chain']} network."
        
        pool_page = compile_base(base_tpl, detail_content, title, description)
        write_page(f"dist/pools/{p['pool']}.html", pool_page)
        
    print(f"Generated {len(pools)} individual pool detail pages in dist/pools/")

    # 3. COMPILE STABLECOIN LANDING PAGES
    stablecoins = ["USDC", "USDT", "DAI", "USDE"]
    for sc in stablecoins:
        sc_pools = [p for p in pools if p['baseAsset'] == sc]
        sc_rows = generate_table_rows(sc_pools)
        
        # Re-use index template but pre-seed with coin specific data
        sc_content = index_tpl.replace("{{ table_rows }}", sc_rows)
        # Adapt page headings for stablecoin focus
        sc_content = sc_content.replace("Find the Highest Yields in Crypto & DeFi", f"Highest {sc} Staking & Yield Rates")
        sc_content = sc_content.replace(
            "Real-time index of the highest-earning stablecoin pools, liquid staking tokens, and alternative yields.",
            f"Compare real-time yields, risks, and TVL across the most secure decentralized platforms for {sc}."
        )
        
        title = f"Best {sc} Yield Rates in 2026 | Highest APY Staking Options"
        description = f"Track the highest interest rates and staking options for {sc} stablecoins in DeFi. Secure and auto-compounding rates updated daily."
        
        sc_page = compile_base(base_tpl, sc_content, title, description)
        write_page(f"dist/stablecoins/{sc.lower()}.html", sc_page)
        print(f"Generated: dist/stablecoins/{sc.lower()}.html")

    # 4. COMPILE BLOCKCHAIN-SPECIFIC LANDING PAGES
    chains = ["Ethereum", "Solana", "Arbitrum"]
    for ch in chains:
        ch_pools = [p for p in pools if p['chain'] == ch]
        ch_rows = generate_table_rows(ch_pools)
        
        ch_content = index_tpl.replace("{{ table_rows }}", ch_rows)
        ch_content = ch_content.replace("Find the Highest Yields in Crypto & DeFi", f"Top {ch} Yield Pools & Staking")
        ch_content = ch_content.replace(
            "Real-time index of the highest-earning stablecoin pools, liquid staking tokens, and alternative yields.",
            f"Compare annual percentage returns (APY) and liquidity pools running on the high-performance {ch} network."
        )
        
        title = f"Top {ch} DeFi Staking Pools & APY Yields"
        description = f"Maximize your returns on the {ch} blockchain network. Real-time comparison of liquidity vaults and secure yield generators."
        
        ch_page = compile_base(base_tpl, ch_content, title, description)
        write_page(f"dist/chains/{ch.lower()}.html", ch_page)
        print(f"Generated: dist/chains/{ch.lower()}.html")
        
    print("------------------------------------------")
    print("Static Site Build Completed Successfully!")

if __name__ == "__main__":
    main()
