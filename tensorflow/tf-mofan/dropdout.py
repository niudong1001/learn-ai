# -*- coding:utf-8 -*-
from __future__ import print_function
import tensorflow as tf
from sklearn.datasets import load_digits
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelBinarizer
import logging
logging.basicConfig(level=logging.DEBUG)

# 加载数据
digits = load_digits()
X = digits.data
logging.debug(X[0], len(X[0]))  # (64, )
y = digits.target
logging.debug(y[1])  # 1
y = LabelBinarizer().fit_transform(y)  # 转成向量
logging.debug(y[1])  # [0 1 0 0 0 0 0 0 0 0]
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=.3)


# 增加层函数
def add_layer(inputs, in_size, out_size, layer_name, activation_function=None):
    v = tf.random_normal([in_size, out_size])
    # logging.DEBUG(str(v))
    weights = tf.Variable(v)
    biases = tf.Variable(tf.zeros([1, out_size]) + 0.1)
    plus_v = tf.matmul(inputs, weights) + biases
    plus_v = tf.nn.dropout(plus_v, keep_prob)
    if activation_function is None:
        outputs = plus_v
    else:
        outputs = activation_function(plus_v)
    tf.summary.histogram(layer_name + "/outputs", outputs)
    return outputs


# 定义输入tf节点
keep_prob = tf.placeholder(tf.float32)
xs = tf.placeholder(tf.float32, [None, 64])
ys = tf.placeholder(tf.float32, [None, 10])

# 建立网络
l1 = add_layer(xs, 64, 50, "l1", activation_function=tf.nn.tanh)
prediction = add_layer(l1, 50, 10, "l2", activation_function=tf.nn.softmax)

# 评价函数
cross_entropy = tf.reduce_mean(-tf.reduce_sum(ys*tf.log(prediction), reduction_indices=[1]))
tf.summary.scalar("loss", cross_entropy)
train_step = tf.train.GradientDescentOptimizer(0.5).minimize(cross_entropy)

# 训练准备
sess = tf.Session()
merged = tf.summary.merge_all()
train_writer = tf.summary.FileWriter("logs/train", sess.graph)
test_writer = tf.summary.FileWriter("logs/test", sess.graph)
init = tf.global_variables_initializer()
sess.run(init)

# 开始训练
for i in range(500):
    # here to determine the keeping probability
    sess.run(train_step, feed_dict={xs: X_train, ys: y_train, keep_prob: 0.5})
    if i % 50 == 0:
        # record loss
        train_result = sess.run(merged, feed_dict={xs: X_train, ys: y_train, keep_prob: 1})
        test_result = sess.run(merged, feed_dict={xs: X_test, ys: y_test, keep_prob: 1})
        train_writer.add_summary(train_result, i)
        test_writer.add_summary(test_result, i)
