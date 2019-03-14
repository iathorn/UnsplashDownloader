# BackgroundChanger

with unsplash api

location: $HOME/Pictures

```
cd $HOME/Pictures
git clone https://github.com/evals4dead/UnsplashDownloader
```

go to this link: https://unsplash.com/developers

register new application for unsplash api

make file: .env (on a root of this directory)

see .env.sample and write .env

1. `yarn`
2. `yarn build`
3. `yarn start`
4. `chmod +x $HOME/Pictures/UnsplashDownloader/exec.sh`
5. `crontab -e`
6. ```bash
*/30 * * * * /bin/zsh $HOME/Pictures/UnsplashDownloader/exec.sh >> /tmp/cron.out
```

// eveery 30 minutes, this server will be turned on by cronjob.
// so the recommended port is 1234. (the port that is unusually used for your development.)