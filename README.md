# time-system
A realtime application for companies to track their employees' working hours.


1. Open time-system folder
2. Open terminal here
3. Run - 
```
      git remote add upstream https://github.com/tanmaychandekar98/time-system
      git fetch upstream master
      git reset --hard FETCH_HEAD
```
4.To make yur own changes - 
```
git checkout -b newfeature
```
5. Make changes in the files and stage them\
```
git add *
git commit -m "Commit Message"
```
6. Now update and push to github
```
git checkout master
git fetch upstream master
git reset --hard FETCH_HEAD
git checkout newfeature
git push origin master
```
