# reinforcement learning

## 基础

1. 两大基本要素: `Agent`, `Environment`
2. 状态转移矩阵: 存状态转移概率，也就是根据当前的状态`s(t)`和`a(t)`转移到`s(t+1)`的概率
3. 马尔可夫决策(MDP): 系统下一时间状态仅由当前时刻状态与action决定
```latex
P(s_{t+1}|s_t) = P(s_{t+1}|s_t,s_{t-1},...,s_0)
```
4. 价值函数(Value Function): v(s), 表示一个状态的未来潜在价值
5. Bellman方程: 当前状态的值函数与下个状态的值函数的关系, 可迭代
6. 动作价值函数(Action-value Function): 从状态s出发，执行动作a后再使用策略π的累计奖赏
