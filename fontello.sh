yarn fontello-cli install --config src/assets/fonts/fontello/config.json
find ./ -maxdepth 1 -name 'fontello-*' -exec mv {} fontello \;
rm -rf src/assets/fonts/fontello
mv fontello src/assets/fonts
rm .fontello-session
