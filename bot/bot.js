require('dotenv').config();
const { TwitterApi } = require('twitter-api-v2');
const fs = require('fs');
const path = require('path');

// Initialize the Twitter client
const client = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_SECRET,
});

const rwClient = client.readWrite;

async function generateAndPostTweet() {
  try {
    console.log('Loading pools data...');
    const poolsPath = path.join(__dirname, '../frontend/src/data/pools.json');
    
    if (!fs.existsSync(poolsPath)) {
      throw new Error(`Could not find pools.json at ${poolsPath}`);
    }

    const poolsData = JSON.parse(fs.readFileSync(poolsPath, 'utf8'));

    // Sort by APY and take the top 3 (filtering for realistic high yields and TVL > 1M to avoid scam pools)
    const validPools = poolsData.filter(p => p.tvlUsd > 1000000 && p.apy > 0 && p.apy < 300);
    const topPools = validPools.sort((a, b) => b.apy - a.apy).slice(0, 3);

    if (topPools.length === 0) {
      console.log('No valid pools found to post.');
      return;
    }

    // Format the tweet
    let tweetText = `Today's Top Market Yields 📊 | Capitalizing on multi-asset liquidity.\n\n`;
    
    topPools.forEach((pool, index) => {
      // e.g. 1. $USDC / $WETH (Uniswap v3) - 40.4% APY
      const symbol = pool.symbol.split('-').map(s => `$${s}`).join(' / ');
      const projectName = pool.project.charAt(0).toUpperCase() + pool.project.slice(1).replace('-', ' ');
      tweetText += `${index + 1}. ${symbol} (${projectName}) - ${pool.apy.toFixed(1)}% APY\n`;
    });

    tweetText += `\nExplore the full data terminal at www.yeildpulse.xyz #DeFi #YieldFarming #Crypto`;

    console.log('Generated Tweet Draft:\n');
    console.log('-----------------------------------');
    console.log(tweetText);
    console.log('-----------------------------------\n');

    // Post the tweet
    console.log('Publishing to X...');
    const response = await rwClient.v2.tweet(tweetText);
    
    console.log('✅ Successfully posted to X!');
    console.log('Tweet ID:', response.data.id);
  } catch (error) {
    console.error('❌ Error posting to X:');
    if (error.code === 403) {
      console.error('Permission Denied. Please ensure your Twitter Developer App is set to "Read and Write" in the User Authentication Settings.');
    } else {
      console.error(error);
    }
    process.exit(1);
  }
}

// Execute the function
generateAndPostTweet();
