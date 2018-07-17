import matplotlib.pyplot as plt
import numpy as np

x = np.linspace(-1, 1, 50)  # 范围是(-1,1);个数是50
y = 2 * x + 1

plt.figure()  # 定义一个图像窗口
plt.plot(x, y)
plt.show()