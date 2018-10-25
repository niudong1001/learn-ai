import tensorflow as tf

state = tf.Variable(0, name="counter")
print(state.name)
one = tf.constant(1)

new_value = tf.add(state, one)  # 做加法
update = tf.assign(state, new_value)  # 重新赋值

init = tf.global_variables_initializer()

with tf.Session() as sess:
    sess.run(init)
    for _ in range(3):
        res = sess.run(update)
        print(res)

