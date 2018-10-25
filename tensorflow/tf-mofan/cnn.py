# -*- coding:utf-8 -*-
from __future__ import print_function
import tensorflow as tf
from tensorflow.contrib.learn.python.learn.datasets.mnist import read_data_sets
# number 1 to 10 data
mnist = read_data_sets("MNIST_data/", one_hot=True)


def compute_accuracy(v_xs, v_ys):
    global prediction
    y_pre = sess.run(prediction, feed_dict={xs: v_xs, keep_drop: 1})
    correct_prediction = tf.equal(tf.argmax(y_pre,1), tf.argmax(v_ys,1))
    accuracy = tf.reduce_mean(tf.cast(correct_prediction, tf.float32))
    result = sess.run(accuracy, feed_dict={xs: v_xs, ys: v_ys, keep_drop: 1})
    return result


def weight_variable(shape):
    """
    create tensor variable from shape
    :param shape:
    :return:
    """
    # tf.truncated_normal(shape, mean, stddev) :shape表示生成张量的维度，mean是均值，stddev是标准差
    inital = tf.truncated_normal(shape, stddev=0.1)
    return tf.Variable(inital) 


def bias_variable(shape):
    # create bias
    inital = tf.constant(0.1, shape=shape)
    return tf.Variable(inital)

def conv2d(x, W):
    # tf.nn.conv2d(input, filter, strides, padding, use_cudnn_on_gpu=None, name=None)
    # input: Tensor, [batch, in_height, in_width, in_channels][图片数量, 图片高度, 图片宽度, 图像通道数]
    # filter: Tensor, [filter_height, filter_width, in_channels, out_channels][卷积核的高度，卷积核的宽度，图像通道数，卷积核个数]
    # strides: 卷积时在图像每一维的步长，这是一个一维的向量，长度4
    # return: feature map, [batch, height, width, channels]
    return tf.nn.conv2d(x, W, strides=[1, 1, 1, 1], padding='SAME')

def max_poo_2_2(x):
    # tf.nn.max_pool(value, ksize, strides, padding, name=None)
    # value: feature map, [batch, height, width, channels]
    # ksize: 池化窗口的大小，取一个四维向量，一般是[1, height, width, 1]，因为我们不想在batch和channels上做池化，所以这两个维度设为了1
    # strides: 和卷积类似，窗口在每一个维度上滑动的步长，一般也是[1, stride,stride, 1]
    # padding: 和卷积类似，可以取'VALID' 或者'SAME'
    # return: [batch, height, width, channels]
    return tf.nn.max_pool(x, ksize=[1, 2, 2, 1], strides=[1, 2, 2, 1], padding="SAME")


xs = tf.placeholder(tf.float32, [None, 784])/255  # 28*28
ys = tf.placeholder(tf.float32, [None, 10])
keep_drop = tf.placeholder(tf.float32)  # use dropout to solve overfit
x_image = tf.reshape(xs, [-1, 28, 28, 1])  # -1代表不考虑输入图片数目, 1代表通道(黑白图片)

# conv1
W_conv1 = weight_variable([5, 5, 1, 32])  # filter size is 5*5, channel is 1, channel of feature map is 32.
# print(W_conv1)
b_conv1 = bias_variable([32])  # bias length is 32 which comes from W_conv1.
h_conv1 = tf.nn.relu(conv2d(x_image, W_conv1) + b_conv1)  # do conv
h_pool1 = max_poo_2_2(h_conv1)
print(h_conv1)
print(h_pool1)

# conv2
W_conv2 = weight_variable([5, 5, 32, 64])  # filter size is 5*5, channel is 32, channel of feature map is 64.
b_conv2 = bias_variable([64])
h_conv2 = tf.nn.relu(conv2d(h_pool1, W_conv2) + b_conv2)
h_pool2 = max_poo_2_2(h_conv2)
print(h_conv2)
print(h_pool2)

# fc1
W_fc1 = weight_variable([7*7*64, 1024])
b_fc1 = bias_variable([1024])
h_pool2_flat = tf.reshape(h_pool2, [-1, 7*7*64])  # [n_samples,7,7,64]->>[n_samples,7*7*64]
h_fc1 = tf.nn.relu(tf.matmul(h_pool2_flat, W_fc1) + b_fc1)
h_fc1_drop = tf.nn.dropout(h_fc1, keep_drop)  # use dropout to solve overfit
print(h_fc1.shape)

# fc2
W_fc2 = weight_variable([1024, 10])
b_fc2 = bias_variable([10])
prediction = tf.nn.softmax(tf.matmul(h_fc1_drop, W_fc2) + b_fc2)

# optmize
cross_entropy = tf.reduce_mean(-tf.reduce_sum(ys * tf.log(prediction), reduction_indices=[1]))
train_step = tf.train.AdamOptimizer(1e-4).minimize(cross_entropy)

# get result
sess = tf.Session()
sess.run(tf.global_variables_initializer())
for i in range(1000):
    batch_xs, batch_ys = mnist.train.next_batch(100)
    sess.run(train_step, feed_dict={xs: batch_xs, ys: batch_ys, keep_drop: 0.5})
    if i % 50 == 0:
        print(compute_accuracy(mnist.test.images[:1000], mnist.test.labels[:1000]))