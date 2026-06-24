#!/bin/sh
# Generate env-config.js with runtime environment variables for the browser
cat <<EOF > /usr/share/nginx/html/env-config.js
window.__ENV__ = {
  BASE_API_URL: "${BASE_API_URL}"
};
EOF
