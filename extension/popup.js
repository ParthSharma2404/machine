document.addEventListener('DOMContentLoaded', () => {
  const postBtn = document.getElementById('postBtn');
  const statusDiv = document.getElementById('status');
  const spinner = document.getElementById('spinner');
  const btnText = document.getElementById('btnText');

  postBtn.addEventListener('click', async () => {
    // UI Update
    postBtn.disabled = true;
    spinner.style.display = 'inline-block';
    btnText.innerText = 'Analyzing Data...';
    statusDiv.style.display = 'block';

    try {
      // 1. Fetch live data from the GitHub repository (acting as our database)
      const response = await fetch('https://raw.githubusercontent.com/ParthSharma2404/machine/main/frontend/src/data/pools.json');
      const poolsData = await response.json();

      statusDiv.innerText = 'Drafting Premium Copy...';

      // 2. Filter & Sort for the top 3 highest APYs with good TVL
      const validPools = poolsData.filter(p => p.tvlUsd > 1000000 && p.apy > 0 && p.apy < 300);
      const topPools = validPools.sort((a, b) => b.apy - a.apy).slice(0, 3);

      // 3. Generate "Top Notch" Tweet Copy
      const medals = ['🥇', '🥈', '🥉'];
      let tweetText = `Daily Market Intelligence 🧠 | YeildPulse Analytics\nTracking the most capital-efficient liquidity pools across DeFi.\n\n`;

      topPools.forEach((pool, index) => {
        const symbol = pool.symbol.split('-').map(s => `$${s}`).join(' / ');
        const projectName = pool.project.charAt(0).toUpperCase() + pool.project.slice(1).replace('-', ' ');
        tweetText += `${medals[index]} ${projectName} (${symbol}) — ${pool.apy.toFixed(1)}% Net APY\n`;
      });

      tweetText += `\nData analyzed in real-time. Discover 100+ market opportunities instantly:\n🌐 www.yeildpulse.xyz\n\n#DeFi #LiquidityProviding #YeildPulse #CryptoMarket`;

      statusDiv.innerText = 'Opening X...';

      // 4. Open X (Twitter) Intent URL which automatically pre-fills the tweet!
      const encodedTweet = encodeURIComponent(tweetText);
      const twitterUrl = `https://x.com/intent/tweet?text=${encodedTweet}`;
      
      // We open it in a new tab. The content.js script will inject into this tab to click "Post".
      chrome.tabs.create({ url: twitterUrl });

      // Reset UI
      setTimeout(() => {
        postBtn.disabled = false;
        spinner.style.display = 'none';
        btnText.innerText = 'Generate & Auto-Post';
        statusDiv.style.display = 'none';
      }, 2000);

    } catch (error) {
      console.error(error);
      statusDiv.innerText = 'Error fetching data. Check console.';
      statusDiv.style.color = 'red';
      postBtn.disabled = false;
      spinner.style.display = 'none';
      btnText.innerText = 'Try Again';
    }
  });
});
