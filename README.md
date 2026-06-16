# Proxify Scripts

This repository contains utilities to fetch, download, and utilize free proxies from the Proxifly network. 

## Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

## 1. Installation

First, install the necessary dependencies for the Node.js scripts:

```bash
npm install
```

*(Note: We use `node-fetch`, `https-proxy-agent`, and `socks-proxy-agent` for the proxy usage example).*

---

## 2. Fetching Proxies

Because certain networks (like corporate or university Wi-Fi) might block direct API access to anonymizers, we've provided multiple ways to fetch the proxies.

### Option A: Using Node.js (via CDN)
To fetch proxies programmatically via the GitHub CDN, run:

```bash
node fetch-proxies.js
```
*This will print a list of fresh SOCKS5 and HTTP proxies to your console.*

### Option B: Downloading Text Lists (PowerShell)
If you just want the raw `.txt` files containing thousands of proxies, run the PowerShell script:

```powershell
powershell -ExecutionPolicy Bypass -File download-proxies.ps1
```
*This will create a `proxy_lists` folder and download `all.txt`, `http.txt`, and `socks5.txt` directly into it.*

---

## 3. "Activating" / Using the Proxy

**Security Warning:** It is highly discouraged to set free public proxies as your system-wide Windows proxy. Doing so routes all your computer's background traffic (passwords, updates, etc.) through unknown third-party servers, which can be intercepted.

Instead, you should **activate the proxy specifically for the scripts or applications that need it.** 

We have provided an example script (`use-proxy-example.js`) that demonstrates how to route a single Node.js HTTP request through a proxy.

To test it:

1. Open `proxy_lists/socks5.txt` or `proxy_lists/http.txt` and copy one of the proxy addresses (e.g., `socks5://192.111.137.37:18762`).
2. Open `use-proxy-example.js` in your editor and replace the `proxyUrl` variable with your copied proxy.
3. Run the script:
   ```bash
   node use-proxy-example.js
   ```

If the proxy is active and working, it will successfully connect and show your new IP address details!
