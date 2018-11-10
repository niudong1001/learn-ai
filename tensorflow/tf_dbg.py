import tensorflow as tf
# 添加引用
from tensorflow.python import debug as tfdbg

a = tf.Variable([2, 3])
b = tf.constant([0, 2])
c = a + b

sess = tf.Session()
init = tf.global_variables_initializer()
sess.run(init)

sess = tfdbg.LocalCLIDebugWrapperSession(sess)

print(sess.run(c))
