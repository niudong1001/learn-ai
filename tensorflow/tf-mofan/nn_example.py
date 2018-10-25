# -*- coding:utf-8 -*-
import tensorflow as tf
import numpy as np
from matplotlib import pyplot as plt
import logging
logging.basicConfig(level=logging.DEBUG)


def add_layer(inputs, in_size, out_size, activation_function=None):
    # add one more layer and return the output of this layer
    weights = tf.Variable(tf.random_normal([in_size, out_size]))
    logging.debug(weights)
    biases = tf.Variable(tf.zeros([1, out_size]) + 0.1)
    logging.debug(biases)
    wx_plus_b = tf.matmul(inputs, weights) + biases
    if activation_function is None:
        outputs = wx_plus_b
    else:
        outputs = activation_function(wx_plus_b)
    return outputs


def plot(x_data, y_data):
    fig = plt.figure()
    ax = fig.add_subplot(1, 1, 1)  # 1行1列第一个图
    ax.scatter(x_data, y_data)
    plt.ion()
    plt.show()
    return ax


if __name__ == "__main__":
    # Make up some real data
    x_data = np.linspace(-1, 1, 300)  # (300,)
    x_data = x_data[:, np.newaxis]  # (300, 1)
    noise = np.random.normal(0, 0.05, x_data.shape)
    y_data = np.square(x_data) - 0.5 + noise
    ax = plot(x_data, y_data)

    # define placeholder for inputs to network
    xs = tf.placeholder(tf.float32, [None, 1])
    ys = tf.placeholder(tf.float32, [None, 1])
    # add hidden layer
    l1 = add_layer(xs, 1, 10, activation_function=tf.nn.relu)
    # add output layer
    prediction = add_layer(l1, 10, 1, activation_function=None)

    # 计算误差
    loss = tf.reduce_mean(tf.reduce_sum(tf.square(ys - prediction), reduction_indices=[1]))
    train_step = tf.train.GradientDescentOptimizer(0.1).minimize(loss)

    # 训练准备
    init = tf.global_variables_initializer()
    sess = tf.Session()
    sess.run(init)

    for i in range(1000):
        # 开始训练
        sess.run(train_step, feed_dict={xs: x_data, ys: y_data})
        if i % 50 == 0:
            # to see the step improvement
            try:
                ax.lines.remove(lines[0])
            except Exception:
                pass
            # 画图
            prediction_value = sess.run(prediction, feed_dict={xs: x_data})
            print(sess.run(loss, feed_dict={xs: x_data, ys: y_data}))
            lines = ax.plot(x_data, prediction_value, "r-", lw=5)
            plt.pause(1)
