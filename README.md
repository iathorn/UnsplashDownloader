# BackgroundChanger

with unsplash api

TODO

remove all .jpg extension files before doing api things.

location: $HOME/Pictures

```
cd $HOME/Pictures
git clone https://github.com/evals4dead/UnsplashDownloader
```

1. `yarn`
2. `yarn build`
3. `yarn start`
4. `chmod +x $HOME/Pictures/UnsplashDownloader/exec.sh`
5. `crontab -e`
6. ```bash
*/30 * * * * /bin/zsh $HOME/Pictures/UnsplashDownloader/exec.sh >> /tmp/cron.out
```