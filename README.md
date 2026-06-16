# Proxify Scripts

This repository contains utilities to fetch, download, and utilize free proxies from the Proxifly network. 

## Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

## 1. Installation

First, install the necessary dependencies for the Node.js scripts:

```bash
npm install
```

---

## 2. Fetching Proxies

Because certain networks might block direct API access to anonymizers, we've provided multiple ways to fetch the proxies.

### Option A: Using Node.js (via CDN)
To fetch proxies programmatically via the GitHub CDN, run:

```bash
node fetch-proxies.js
```

### Option B: Downloading Text Lists (PowerShell)
If you just want the raw `.txt` files containing thousands of proxies, run the PowerShell script:

```powershell
powershell -ExecutionPolicy Bypass -File download-proxies.ps1
```
*This will create a `proxy_lists` folder and download `all.txt`, `http.txt`, and `socks5.txt`.*

---

## 3. Running the Local Proxy Server

We have created a local forward proxy server that intercepts your traffic and dynamically routes it through one of the randomly downloaded proxies from `http.txt`. 

To start the server, run:
```bash
node proxy-server.js
```

**How to use the local proxy server:**
A proxy server is not a website. **Do not type `http://127.0.0.1:18080` into your browser's address bar.** This will result in a "Target '/' could not be parsed" or "400 Bad Request" error.

Instead, you must configure your tools or browser's proxy settings to use it as a middleman:

**Using cURL:**
```bash
curl.exe -x http://127.0.0.1:18080 https://api.myip.com
```

**Using Windows Proxy Settings:**
1. Open Windows Settings -> Network & Internet -> Proxy.
2. Under "Manual proxy setup", turn it On.
3. Set Address to `127.0.0.1` and Port to `18080`.
4. Click Save. 
*(Note: Because free proxies are often unreliable or slow, your internet might feel disconnected if it picks a dead proxy. Just turn the setting off if that happens).*

---

## 4. "Activating" / Using the Proxy (For Scripts)

We have also provided an example script (`use-proxy-example.js`) that demonstrates how to route a single Node.js HTTP request through a specific proxy securely.

1. Open `proxy_lists/socks5.txt` or `proxy_lists/http.txt` and copy one of the proxy addresses.
2. Open `use-proxy-example.js` in your editor and replace the `proxyUrl` variable with your copied proxy.
3. Run the script:
   ```bash
   node use-proxy-example.js
   ```
