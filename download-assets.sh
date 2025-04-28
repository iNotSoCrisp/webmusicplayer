#!/bin/bash

# Create assets directory if it doesn't exist
mkdir -p public/assets

# Download lofi desk background
echo "Downloading lofi desk background..."
curl -o public/assets/lofi-desk-bg.jpg "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1470&auto=format&fit=crop"

# Download placeholder images for parallax effects (these would be better with proper transparent PNGs)
echo "Downloading lamp image..."
curl -o public/assets/lamp.png "https://img.icons8.com/?size=512&id=9iMwi4nD4Wv9&format=png&color=000000"

echo "Downloading plant images..."
curl -o public/assets/plant-left.png "https://img.icons8.com/?size=512&id=iZS-OLrg4Ezk&format=png&color=000000"
curl -o public/assets/plant-right.png "https://img.icons8.com/?size=512&id=tpQ7xoOUvIxn&format=png&color=000000"

echo "Downloading window glow effect..."
curl -o public/assets/window-glow.png "https://img.icons8.com/?size=512&id=g8MbmU7kGVkE&format=png&color=FFFFFF"

echo "All assets downloaded to public/assets/"
echo "Note: These are placeholder images. Consider replacing them with your own custom images for better quality."