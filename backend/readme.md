# When you're getting error "[NODEMON] INTERNAL WATCH FAILED: WATCH ENOSPC
### Use the follow command to increase the number of watches allowed for a single user.
sudo sysctl fs.inotify.max_user_watches=582222 && sudo sysctl -p