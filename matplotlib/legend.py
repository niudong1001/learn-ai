import matplotlib.pyplot as plt
import numpy as np

x = np.linspace(-1, 1, 50)  # 范围是(-1,1);个数是50
y1 = 2 * x + 1
y2 = x ** 2

# 定义一个图像窗口, 编号为3；大小为(8, 5)
plt.figure(num=3, figsize=(8, 5))

# 设置坐标轴范围
plt.xlim((-1, 2))
plt.ylim((-2, 3))

# 设置坐标轴刻度
new_ticks = np.linspace(-1, 2, 5)
plt.xticks(new_ticks)
plt.yticks([-2, -1.8, -1, 1.22, 3], [r'$really\ bad$', r'$bad$', r'$normal$', r'$good$', r'$really\ good$'])

legend_way = "2"

if legend_way == "1":
    # 设置legend方式一
    plt.plot(x, y1, color="red", linewidth=1.0, linestyle='--', label="linear line")
    plt.plot(x, y2, label="square line")
    plt.legend(loc="upper right")  # legend将要显示的信息来自于上面代码中的 label
elif legend_way == "2":
    # 设置legend方式二
    # 需要注意的是 l1, l2,要以逗号结尾, 因为plt.plot() 返回的是一个列表
    l1, = plt.plot(x, y1, color="red", linewidth=1.0, linestyle='--')
    l2, = plt.plot(x, y2)
    plt.legend(handles=[l1, l2], labels=["l1", "l2"], loc="best")
# loc
#  'best' : 0,
#  'upper right'  : 1,
#  'upper left'   : 2,
#  'lower left'   : 3,
#  'lower right'  : 4,
#  'right'        : 5,
#  'center left'  : 6,
#  'center right' : 7,
#  'lower center' : 8,
#  'upper center' : 9,
#  'center'       : 10,
plt.show()
