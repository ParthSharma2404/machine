import os
import re

def verify_build():
    print("--- YieldPulse Build Verification Audit ---")
    dist_dir = "dist"
    
    errors = 0
    warnings = 0
    
    # 1. Check folder existence
    paths_to_check = [
        "index.html",
        "style.css",
        "stablecoins/usdc.html",
        "stablecoins/usdt.html",
        "chains/ethereum.html",
        "chains/solana.html"
    ]
    
    for p in paths_to_check:
        full_path = os.path.join(dist_dir, p)
        if os.path.exists(full_path):
            print(f"[OK] Found compiled asset: {p}")
        else:
            print(f"[ERROR] Missing compiled asset: {p}")
            errors += 1
            
    # 2. Check pool detail pages
    pool_dir = os.path.join(dist_dir, "pools")
    if os.path.exists(pool_dir):
        pools = [f for f in os.listdir(pool_dir) if f.endswith(".html")]
        print(f"[OK] Found {len(pools)} compiled individual pool detail pages.")
        if len(pools) == 0:
            print("[ERROR] No pool detail pages generated!")
            errors += 1
    else:
        print("[ERROR] Pools directory is missing!")
        errors += 1
        
    # 3. Content Audit: Check for uncompiled placeholders
    placeholder_regex = re.compile(r"\{\{[^}]*\}\}")
    
    for root, dirs, files in os.walk(dist_dir):
        for file in files:
            if file.endswith(".html"):
                file_path = os.path.join(root, file)
                with open(file_path, "r", encoding="utf-8") as f:
                    content = f.read()
                    
                # Search for any unresolved placeholders like {{ project }} or {{ content }}
                matches = placeholder_regex.findall(content)
                if matches:
                    print(f"[ERROR] Uncompiled placeholders {matches} found in: {file_path}")
                    errors += 1
                    
                # SEO Audit: Check for presence of key metatags
                if "<title>" not in content or '<meta name="description"' not in content:
                    print(f"[WARNING] Missing SEO metadata in: {file_path}")
                    warnings += 1
                    
    print("\n--- Audit Summary ---")
    print(f"Errors found: {errors}")
    print(f"Warnings found: {warnings}")
    
    if errors == 0:
        print("[PASS] Static site build is fully compliant, clean, and optimized!")
    else:
        print("[FAIL] Audit failed. Correct errors in templates or compiler script.")
        
    return errors == 0

if __name__ == "__main__":
    verify_build()
