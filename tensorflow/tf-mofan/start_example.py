import tensorflow as tf
import numpy as np

# 创建data
x_data = np.random.rand(100).astype(np.float32)
y_data = x_data*0.1 + 0.3

# 创建模型
v1= tf.random_uniform([1], -1.0, 1.0)
v2 = tf.zeros([1])
print(v1, v2)
weight = tf.Variable(v1)
bias = tf.Variable(v2)
print(weight, bias)

y = weight*x_data + bias

# 计算loss
loss = tf.reduce_mean(tf.square(y-y_data))

# 回传loss
optimizer = tf.train.GradientDescentOptimizer(0.5)
train = optimizer.minimize(loss)

# 开始训练
init = tf.global_variables_initializer()  # 初始化变量
sess = tf.Session()
sess.run(init)

for step in range(201):
    sess.run(train)
    if step % 20 == 0:
        print(step, sess.run(weight), sess.run(bias))
