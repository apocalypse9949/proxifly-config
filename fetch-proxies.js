process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

async function fetchProxiesCDN() {
    try {
        console.log('Fetching proxies from CDN (jsdelivr)...');
        
        // Fetch all proxies
        const response = await fetch('https://cdn.jsdelivr.net/gh/proxifly/free-proxy-list@main/proxies/all/data.txt');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const text = await response.text();
        const proxies = text.split('\n').filter(p => p.trim() !== '');
        
        console.log(`\nSuccessfully fetched ${proxies.length} proxies.`);
        console.log('\n--- First 10 Proxies ---');
        console.log(proxies.slice(0, 10));

    } catch (error) {
        console.error('Error fetching proxies:', error);
    }
}

fetchProxiesCDN();
