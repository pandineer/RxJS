```bash
$ node dist/main.js 2-1
値: 1
値: 2
値: 3
完了
```

```bash
$ node dist/main.js 2-2
受け取った値: Hello
受け取った値: World
完了
```

```bash
$ node dist/main.js 2-3
Hello
World
```

```bash
$ node dist/main.js 2-4
Observable 241
Observable 242
```

```bash
$ node dist/main.js 3-1
of: 1
of: 2
of: 3
from: 1
from: 2
from: 3
interval: 0
interval: 1
timer: 0
interval: 2
interval: 3
interval: 4
interval: 5
...
```

```bash
$ node dist/main.js 3-2
20
40
```

```bash
$ node dist/main.js 3-3
takeWhile: 0
scan: 0
takeWhile: 1
scan: 1
takeWhile: 2
scan: 3
takeWhile: 3
scan: 6
takeWhile: 4
scan: 10
scan: 15
scan: 21
...
```

```baseh
$ node dist/main.js 4-1
1
2
```

```bash
$ node dist/main.js 4-2-1
購読前
同期的な値: 1
同期的な値: 2
購読後
```
