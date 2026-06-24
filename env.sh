#!/bin/sh

cat <<EOF > /usr/share/nginx/html/env.js
window.__ENV__ = {
  BASE_API_URL: "${BASE_API_URL}"
};
EOF