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

      // 3. Generate "Top Notch" Tweet Copy (Shortened for 280 character limit)
      const medals = ['🥇', '🥈', '🥉'];
      let tweetText = `Top Market Yields 📊 | YeildPulse\n\n`;

      topPools.forEach((pool, index) => {
        const symbol = pool.symbol.split('-').map(s => `$${s}`).join('/');
        let projectName = pool.project.charAt(0).toUpperCase() + pool.project.slice(1).replace('-', ' ');
        // Shorten long project names
        if(projectName.includes(" slipstream")) projectName = projectName.replace(" slipstream", "");
        
        tweetText += `${medals[index]} ${projectName} (${symbol}) - ${Math.round(pool.apy)}% APY\n`;
      });

      tweetText += `\n🌐 www.yeildpulse.xyz\n#DeFi #YieldPulse`;

      statusDiv.innerText = 'Generating custom graphic...';

      // 4. Generate the beautiful image and DOWNLOAD it!
      const dataUrl = await generateImageAndDownload(topPools);
      
      // Trigger the download via Chrome API
      chrome.downloads.download({
        url: dataUrl,
        filename: "YeildPulse_Market_Update.png"
      });

      statusDiv.innerText = 'Image downloaded! Opening X...';

      // 5. Open X (Twitter) Intent URL
      const encodedTweet = encodeURIComponent(tweetText);
      const twitterUrl = `https://x.com/intent/tweet?text=${encodedTweet}`;
      
      chrome.tabs.create({ url: twitterUrl });

      // Reset UI and tell user what to do
      setTimeout(() => {
        postBtn.disabled = false;
        spinner.style.display = 'none';
        btnText.innerText = 'Generate & Auto-Post';
        statusDiv.innerText = '✅ Drag the downloaded image into the Twitter box!';
        statusDiv.style.color = '#10b981';
      }, 1000);

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

// --- Graphics Engine ---
async function generateImageAndDownload(topPools) {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    canvas.width = 1080;
    canvas.height = 1080; // Square, perfect for Twitter & Instagram
    const ctx = canvas.getContext('2d');

    // 1. Background
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 2. Draw subtle 'Green Grid' pattern
    ctx.strokeStyle = '#f1f5f9';
    ctx.lineWidth = 2;
    for (let x = 0; x < canvas.width; x += 60) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += 60) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
    }

    // 3. Header
    ctx.fillStyle = '#10b981';
    ctx.font = 'bold 45px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillText('YEILDPULSE ANALYTICS', 80, 120);

    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 80px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillText('Top Market Yields', 80, 220);

    // 4. Draw the Top Pools (Cards)
    let startY = 320;
    const medals = ['🥇', '🥈', '🥉'];
    
    topPools.forEach((pool, index) => {
      const symbol = pool.symbol.split('-').map(s => `$${s}`).join('/');
      let projectName = pool.project.charAt(0).toUpperCase() + pool.project.slice(1).replace('-', ' ');
      if(projectName.includes(" slipstream")) projectName = projectName.replace(" slipstream", "");

      // Shadow
      ctx.shadowColor = 'rgba(100, 116, 139, 0.15)';
      ctx.shadowBlur = 20;
      ctx.shadowOffsetY = 10;
      
      // Card Background (Rounded Rectangle)
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.roundRect(80, startY, 920, 160, 24);
      ctx.fill();
      ctx.shadowColor = 'transparent'; // Reset shadow

      // Pool Name
      ctx.fillStyle = '#0f172a';
      ctx.font = 'bold 45px -apple-system, BlinkMacSystemFont, sans-serif';
      ctx.fillText(`${medals[index]} ${projectName}`, 130, startY + 70);

      // Pool Symbols
      ctx.fillStyle = '#64748b';
      ctx.font = '35px -apple-system, BlinkMacSystemFont, sans-serif';
      ctx.fillText(symbol, 130, startY + 125);

      // APY Text
      ctx.fillStyle = '#10b981';
      ctx.font = 'bold 65px -apple-system, BlinkMacSystemFont, sans-serif';
      const apyText = `${pool.apy.toFixed(1)}%`;
      const textWidth = ctx.measureText(apyText).width;
      ctx.fillText(apyText, 960 - textWidth, startY + 105);

      startY += 200;
    });

    // 5. Clean Footer
    ctx.fillStyle = '#94a3b8';
    ctx.font = '35px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Live data available at www.yeildpulse.xyz', canvas.width / 2, 1000);

    // 6. Convert to Data URL and return
    resolve(canvas.toDataURL('image/png'));
  });
}
