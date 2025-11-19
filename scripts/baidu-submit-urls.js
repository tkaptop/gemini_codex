#!/usr/bin/env node
/**
 * 百度站长平台 - URL主动推送脚本
 *
 * 使用前提：
 * 1. 已在百度站长平台验证网站所有权
 * 2. 已获取推送token（在站长平台 > 数据引入 > 链接提交 > 主动推送）
 *
 * 使用方法：
 * 1. 在 .env 中添加：BAIDU_PUSH_TOKEN="your_token_here"
 * 2. 运行：node scripts/baidu-submit-urls.js
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

// 从 .env 读取配置
require('dotenv').config();

const SITE_URL = process.env.NEXT_PUBLIC_WEB_URL || 'https://www.gempix2.site';
const BAIDU_TOKEN = process.env.BAIDU_PUSH_TOKEN;

if (!BAIDU_TOKEN) {
  console.error('❌ 错误：请在 .env 中设置 BAIDU_PUSH_TOKEN');
  console.log('\n获取 Token 步骤：');
  console.log('1. 访问 https://ziyuan.baidu.com/linksubmit/index');
  console.log('2. 选择你的网站');
  console.log('3. 点击"链接提交" > "主动推送"');
  console.log('4. 复制推送接口调用地址中的 token 参数');
  process.exit(1);
}

// 从 sitemap.xml 提取 URL
function extractUrlsFromSitemap() {
  const sitemapPath = path.join(__dirname, '../public/sitemap.xml');

  if (!fs.existsSync(sitemapPath)) {
    console.error('❌ 未找到 sitemap.xml');
    return [];
  }

  const sitemap = fs.readFileSync(sitemapPath, 'utf-8');
  const urlMatches = sitemap.match(/<loc>(.*?)<\/loc>/g) || [];

  return urlMatches.map(match =>
    match.replace('<loc>', '').replace('</loc>', '')
  );
}

// 推送 URL 到百度
async function pushUrlsToBaidu(urls) {
  if (urls.length === 0) {
    console.error('❌ 没有要推送的 URL');
    return;
  }

  const apiUrl = `http://data.zz.baidu.com/urls?site=${SITE_URL}&token=${BAIDU_TOKEN}`;
  const urlsText = urls.join('\n');

  console.log(`📤 准备推送 ${urls.length} 个 URL 到百度...`);
  console.log('URL列表：');
  urls.forEach((url, i) => console.log(`  ${i + 1}. ${url}`));
  console.log('');

  return new Promise((resolve, reject) => {
    const req = https.request(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain',
        'Content-Length': Buffer.byteLength(urlsText)
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const result = JSON.parse(data);

          if (result.success) {
            console.log('✅ 推送成功！');
            console.log(`   当日剩余可推送数量: ${result.remain}`);
            console.log(`   本次成功推送: ${result.success} 条`);
            if (result.not_same_site && result.not_same_site.length > 0) {
              console.log(`   ⚠️  非本站URL: ${result.not_same_site.length} 条`);
            }
          } else {
            console.log('⚠️  推送结果:', result);
          }

          resolve(result);
        } catch (e) {
          console.error('❌ 解析响应失败:', data);
          reject(e);
        }
      });
    });

    req.on('error', (e) => {
      console.error('❌ 请求失败:', e.message);
      reject(e);
    });

    req.write(urlsText);
    req.end();
  });
}

// 主函数
async function main() {
  console.log('🚀 百度URL主动推送工具');
  console.log('='.repeat(50));
  console.log(`网站: ${SITE_URL}`);
  console.log('='.repeat(50));
  console.log('');

  const urls = extractUrlsFromSitemap();

  if (urls.length === 0) {
    console.error('❌ 未找到URL，请检查 public/sitemap.xml');
    process.exit(1);
  }

  try {
    await pushUrlsToBaidu(urls);
    console.log('\n✨ 完成！');
  } catch (error) {
    console.error('❌ 推送失败:', error.message);
    process.exit(1);
  }
}

main();
