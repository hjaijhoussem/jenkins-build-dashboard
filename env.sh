#!/bin/bash

WORKDIR="/usr/share/nginx/html"

if [ -f $WORKDIR/env-config.js ]; then
  rm -f $WORKDIR/env-config.js
fi

touch $WORKDIR/env-config.js


# Add assignment 
echo "window._env_ = {" >> $WORKDIR/env-config.js

# Read each line in .env file
# Each line represents key=value pairs
while read -r line || [[ -n "$line" ]];
do
  # Skip comments and empty lines
  if printf '%s\n' "$line" | grep -q -e '^\s*#' -e '^\s*$'; then
    continue
  fi
  
  # Split env variables by character `=`
  if printf '%s\n' "$line" | grep -q -e '='; then
    varname=$(printf '%s\n' "$line" | sed -e 's/=.*//')
    varvalue=$(printf '%s\n' "$line" | sed -e 's/^[^=]*=//')
  fi

  # Read value of current variable if exists as Environment variable
  value=$(printf '%s\n' "${!varname}")
  # Otherwise use value from .env file
  [[ -z $value ]] && value=${varvalue}

  # Append configuration property to JS file
  echo "  $varname: \"$value\"," >> $WORKDIR/env-config.js
done < .env

echo "}" >> $WORKDIR/env-config.js