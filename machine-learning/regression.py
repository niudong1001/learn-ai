import numpy as np
from keras.models import Sequential
from keras.layers import Dense
import matplotlib.pyplot as plt

# 生成数据
np.random.seed(1111)
X = np.linspace(-1, 1, 200)  # (-1, 1)内产生等差序列
np.random.shuffle(X)  # 打乱顺序
Y = 0.5*X + 2 + np.random.normal(0, 0.05, (200, ))  # 生成Y并添加噪声

# plot
plt.scatter(X, Y)  # 绘制点
plt.show()

# 创建数据集
X_train, Y_train = X[:160], Y[:160]  # 前160组数据为训练数据集
X_test, Y_test = X[160:], Y[160:]  # 后40组为测试数据集

# 构建神经网络
model = Sequential()
model.add(Dense(input_dim=1, units=1))  # 输入为1维，输出为1维

# 选取loss函数和优化器
model.compile(loss="mse", optimizer="sgd")

# 训练过程
print("训练中--------")
for potch in range(1000):
    cost = model.train_on_batch(X_train,Y_train)
    if potch % 50 ==0:
        print("在%d次训练后,cost的值为%f" % (potch, cost))

# 测试过程
print("测试中-----")
cost = model.evaluate(X_test,Y_test,batch_size=40)
print("测试cost:",cost)
W, b=model.layers[0].get_weights()
print("权值为:",W,"\n偏置为:",b)

# 绘制结果
Y_pred = model.predict(X_test)
plt.scatter(X_test,Y_test)
plt.plot(X_test,Y_pred) # 绘制直线
plt.show()