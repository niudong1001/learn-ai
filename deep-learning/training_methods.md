# 神经网络优化方法

神经网络的优化方法一般包含如下：

- Stochastic Gradient Descent (SGD)
- Momentum
- AdaGrad
- RMSProp
- Adam

## Stochastic Gradient Descent (SGD)

随机梯度下降，一般也可以称为Mini-batch gradient descent，就是每次随机从数据中选小批数据（Batch size个样本）而不是全部数据（选全部数据即：批量梯度下降Batch Gradient Descent）来训练网络，这样可以加快训练，而且效果也不是很差。其更新式子为：

> $ \Delta \theta_t=- \alpha\times \nabla_{\theta_{t-1}}f(\theta_{t-1}), \ W+=\Delta \theta_t$

需要注意梯度$g_t$是整个batch的梯度，学习率$\alpha$可理解为允许当前batch的梯度多大的程度的影响参数的更新。SGD有一些缺点：

- 难以选择合适的学习率；
- SGD容易收敛到局部最优，并且在某些情况下可能被困在鞍点；

## Momentum（利用惯性）

Momentum是模拟物理里动量的概念，利用惯性原则，积累之前的动量来替代真正的梯度。其修改方式是靠修改梯度的表达式来完成，更新式子如下所示：

> $m_t=\mu\times m_{t-1} - \alpha\times\nabla_{\theta_{t-1}}f(\theta_{t-1}) , \ \ W += m_t$

$m_t$即$t$时刻的动量，$\mu$是动量因子。这样某个时刻的梯度更新受动量与梯度的双重影响。其在合理的调节$\mu$值得时候，可以在下降初期使用较大的$\mu$保持原方向快速下降；在下降中后期，当被具备最小值困住的时候，可以靠增大动量因子跳出陷阱。其可以加速SGD，抑制震荡。

## AdaGrad（阻碍走弯路）

AdaGrad约束了学习率，使得每个参数更新都有自己与众不同的学习率，从而阻碍更新走向弯路（错误方向）。其更新方式如下：

> $v+=(\nabla_{\theta_{t-1}}f(\theta_{t-1}))^2, \ \ W+=-\alpha*\nabla_{\theta_{t-1}}f(\theta_{t-1})/\sqrt v$

## RMSProp（部分结合动量与AdaGrad）

有了 momentum 的惯性原则 , 加上 adagrad 的对错误方向的阻力, 我们就能合并成这样. 让 RMSProp同时具备他们两种方法的优势。但其还没把 Momentum合并完全。

## Adam（完全结合动量与AdaGrad）

计算m 时有 momentum 下坡的属性, 计算 v 时有 adagrad 阻力的属性, 然后再更新参数时 把 m 和 V 都考虑进去。

## 参考

- https://morvanzhou.github.io/tutorials/machine-learning/torch/3-06-A-speed-up-learning/