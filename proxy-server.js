const ProxyChain = require('proxy-chain');
const fs = require('fs');
const path = require('path');

// Load proxies from the downloaded SOCKS5 list (better for HTTPS tunneling)
const listPath = path.join(__dirname, 'proxy_lists', 'socks5.txt');
if (!fs.existsSync(listPath)) {
    console.error('Error: Proxy list not found at', listPath);
    console.error('Please run the download script first.');
    process.exit(1);
}

const proxies = fs.readFileSync(listPath, 'utf8')
    .split('\n')
    .filter(line => line.trim().startsWith('socks5://') || line.trim().startsWith('socks4://'))
    .map(line => line.trim());

if (proxies.length === 0) {
    console.error('Error: No valid proxies found in the list.');
    process.exit(1);
}

console.log(`Loaded ${proxies.length} proxies from ${listPath}.`);

const server = new ProxyChain.Server({
    // Port where the local proxy server will listen
    port: 18080,
    
    // Disable verbose logging to avoid console spam (enable if debugging)
    verbose: false,

    // This function is called for every incoming request to prepare the upstream proxy
    prepareRequestFunction: ({ request, username, password, hostname, port, isHttp, connectionId }) => {
        // Select a random proxy from the list
        const randomProxy = proxies[Math.floor(Math.random() * proxies.length)];
        console.log(`[PROXY] Routing request to ${hostname}:${port} via ${randomProxy}`);
        
        return {
            requestAuthentication: false,
            upstreamProxyUrl: randomProxy,
        };
    },
});

server.listen(() => {
    console.log(`\n========================================`);
    console.log(`Local Forward Proxy Server is running!`);
    console.log(`Point your browser or tools to: http://127.0.0.1:18080`);
    console.log(`Traffic will be routed randomly through ${proxies.length} downloaded proxies.`);
    console.log(`========================================\n`);
});

server.on('error', (serverError) => {
    console.error(`Server error:`, serverError);
});

// Handle graceful shutdown
process.on('SIGINT', () => {
    console.log('\nShutting down proxy server...');
    server.close(() => {
        process.exit(0);
    });
});
