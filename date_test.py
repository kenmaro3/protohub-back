from datetime import datetime as dt

tstr = '2012-12-29 13:49:37'
tmp = dt.strptime(tstr, '%Y-%m-%d %H:%M:%S')
print(tmp.split(" "))
