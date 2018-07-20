import matplotlib.pyplot as plt

plt.figure("uniform")
plt.subplot(2, 2, 1)  # 2 rows and 2 cols, now (1, 1)
plt.plot([0, 1], [0, 1])
plt.subplot(2, 2, 2)
plt.plot([0, 1], [0, 2])
plt.subplot(223)
plt.plot([0, 1], [0, 3])
plt.subplot(224)
plt.plot([0, 1], [0, 4])

# not uniform
plt.figure("not_uniform")
plt.subplot(2,1,1)
plt.plot([0,1],[0,1])
plt.subplot(2,3,4)  # 1th row use 3 columns
plt.plot([0,1],[0,2])
plt.subplot(235)
plt.plot([0,1],[0,3])
plt.subplot(236)
plt.plot([0,1],[0,4])

plt.show()