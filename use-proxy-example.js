const fetch = require('node-fetch');
const { HttpsProxyAgent } = require('https-proxy-agent');
const { SocksProxyAgent } = require('socks-proxy-agent');

// Example: Safely using a proxy only for a specific request in Node.js

async function makeProxyRequest() {
    // Note: Replace with a working proxy from your downloaded list
    // Format for HTTP: http://IP:PORT
    // Format for SOCKS5: socks5://IP:PORT
    const proxyUrl = 'http://192.111.137.37:18762'; 
    
    console.log(`Using proxy: ${proxyUrl}`);
    
    // Choose the right agent based on proxy type
    const agent = proxyUrl.startsWith('socks') 
        ? new SocksProxyAgent(proxyUrl)
        : new HttpsProxyAgent(proxyUrl);

    try {
        console.log('Sending request to https://api.myip.com ...');
        // This request routes ONLY through the proxy, keeping your system safe
        const response = await fetch('https://api.myip.com', { agent });
        
        if (!response.ok) {
            throw new Error(`Status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Success! Connection details:');
        console.log(data);
    } catch (error) {
        console.error('Failed to connect via proxy:', error.message);
    }
}

makeProxyRequest();
