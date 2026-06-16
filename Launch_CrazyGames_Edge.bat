@echo off
echo Launching Microsoft Edge with local proxy (127.0.0.1:18080) for www.crazygames.com...
echo WARNING: Certificate errors are ignored. Do NOT log into any accounts or enter sensitive info!
start msedge --user-data-dir="%TMP%\edge_proxy_session" --ignore-certificate-errors --proxy-server="127.0.0.1:18080" "https://www.crazygames.com"
exit
