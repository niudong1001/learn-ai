import matplotlib.pyplot as plt
import numpy as np

x = np.linspace(-1, 1, 50)  # 范围是(-1,1);个数是50
y1 = 2 * x + 1
y2 = x ** 2

# 定义一个图像窗口, 编号为3；大小为(8, 5)
plt.figure(num=3, figsize=(8, 5))
plt.plot(x, y1, color="red", linewidth=1.0, linestyle='--')
plt.plot(x, y2)

# 设置坐标轴范围
plt.xlim((-1, 2))
plt.ylim((-2, 3))

# 设置坐标轴刻度
new_ticks = np.linspace(-1, 2, 5)
plt.xticks(new_ticks)
plt.yticks([-2, -1.8, -1, 1.22, 3], [r'$really\ bad$', r'$bad$', r'$normal$', r'$good$', r'$really\ good$'])

plt.show()