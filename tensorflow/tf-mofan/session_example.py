import tensorflow as tf

m1 = tf.constant([[3, 3]])
m2 = tf.constant([[2], [2]])
product = tf.matmul(m1, m2)

# 显示结果方式1
sess = tf.Session()
res = sess.run(product)
print(res)
sess.close()

# 显示结果方式2
with tf.Session() as sess:
    res = sess.run(product)
    print(res)
