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
    canvas.width = 1200;
    canvas.height = 675; // Standard Twitter aspect ratio
    const ctx = canvas.getContext('2d');

    // 1. Background
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 2. Draw subtle 'Green Grid' pattern
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1;
    for (let x = 0; x < canvas.width; x += 40) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += 40) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
    }

    // 3. Top Banner (Emerald)
    ctx.fillStyle = '#10b981';
    ctx.fillRect(0, 0, canvas.width, 120);

    // 4. Title Text
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 50px Arial';
    ctx.fillText('YeildPulse Analytics', 60, 80);

    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 65px Arial';
    ctx.fillText('Top Market Yields', 60, 230);

    // 5. Draw the Top Pools
    let startY = 350;
    const medals = ['🥇', '🥈', '🥉'];
    
    topPools.forEach((pool, index) => {
      const symbol = pool.symbol.split('-').map(s => `$${s}`).join('/');
      let projectName = pool.project.charAt(0).toUpperCase() + pool.project.slice(1).replace('-', ' ');
      if(projectName.includes(" slipstream")) projectName = projectName.replace(" slipstream", "");

      // Draw Pool Background Box
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = 'rgba(0,0,0,0.05)';
      ctx.shadowBlur = 10;
      ctx.shadowOffsetY = 4;
      ctx.fillRect(60, startY - 60, 1080, 90);
      ctx.shadowColor = 'transparent'; // Reset shadow

      // Draw text
      ctx.fillStyle = '#0f172a';
      ctx.font = 'bold 40px Arial';
      ctx.fillText(`${medals[index]} ${projectName} (${symbol})`, 90, startY);

      // Draw APY (Right aligned)
      ctx.fillStyle = '#10b981';
      const apyText = `${pool.apy.toFixed(1)}% APY`;
      const textWidth = ctx.measureText(apyText).width;
      ctx.fillText(apyText, 1140 - textWidth, startY);

      startY += 120;
    });

    // 6. Footer URL
    ctx.fillStyle = '#64748b';
    ctx.font = '30px Arial';
    ctx.fillText('Data analyzed in real-time at www.yeildpulse.xyz', 60, 630);

    // 7. Convert to Data URL and return
    resolve(canvas.toDataURL('image/png'));
  });
}
