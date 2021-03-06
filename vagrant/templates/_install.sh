#!/usr/bin/env bash

echo "[-->] Installing packages now..."

echo "[-->] Configuring locales..."
export LANGUAGE=en_US.UTF-8
export LANG=en_US.UTF-8
export LC_ALL=en_US.UTF-8
sudo locale-gen en_US.UTF-8
sudo dpkg-reconfigure locales

echo "[-->] Installing supplementary tools..."
sudo apt-get install -y software-properties-common

echo "[-->] Adding node.js to apt..."
sudo add-apt-repository -y ppa:chris-lea/node.js

echo "[-->] Updating packages list..."
sudo apt-get -y update

echo "[-->] Installing dependencies..."
sudo apt-get install -y curl gcc make build-essential

echo "[-->] Installing git..."
sudo apt-get install -y git

echo "[-->] Installing latest node..."
sudo apt-get install -y  nodejs

echo "[-->] Installing global npm modules..."
sudo npm -g install gulp bunyan


echo "[-->] All packages installed!"
