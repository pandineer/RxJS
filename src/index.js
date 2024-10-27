import {catchError, filter, from, interval, map, Observable, of, Subscription, timer} from "rxjs";

const chapter = process.argv[2];

switch (chapter) {
    // chapter 2 オブザーバブルの基本
    case '2-1': // オブザーバブルの作成
        // オブザーバブルの作成
        const simpleObservable = new Observable(subscriber => {
            // 値の発行
            subscriber.next(1);
            subscriber.next(2);
            subscriber.next(3);

            // 完了の通知
            subscriber.complete();
        });

        // オブザーバブルの購読
        simpleObservable.subscribe({
            next(x) {
                console.log('値: ' + x);
            },
            complete() {
                console.log('完了');
            }
        });
        break;
    case '2-2': // オブザーバの役割と実装
        // オブザーバブルの作成
        const observable2 = new Observable(subscriber => {
            subscriber.next('Hello');
            subscriber.next('World');
            subscriber.complete();
        });

        // オブザーバの定義
        const observer = {
            next: value => console.log(`受け取った値: ${value}`),
            error: error => console.error(`エラー発生: ${error}`),
            complete: () => console.log('完了')
        };

        // オブザーバブルの購読
        observable2.subscribe(observer);
        break;
    case '2-3': // サブスクリプションの管理
        // オブザーバブルの作成
        const observable3 = new Observable(subscriber => {
            subscriber.next('Hello');
            subscriber.next('World');
        });

        // サブスクリプションの開始
        const subscription = observable3.subscribe(value => console.log(value));

        // サブスクリプションの解除
        subscription.unsubscribe();
        break;
    case '2-4': // 複数のサブスクリプションの管理
        // 複数のオブザーバブルの定義
        const observable41 = new Observable(subscriber => subscriber.next('Observable 41'));
        const observable42 = new Observable(subscriber => subscriber.next('Observable 42'));

        // サブスクリプションオブジェクトの作成
        const allSubscriptions = new Subscription();

        // オブザーバブルを購読し、サブスクリプションオブジェクトに追加
        allSubscriptions.add(observable41.subscribe(value => console.log(value)));
        allSubscriptions.add(observable42.subscribe(value => console.log(value)));

        // 必要に応じてすべてのサブスクリプションを一括で解除
        allSubscriptions.unsubscribe();
        break;
    case '3-1': // 主要な作成オペレータ
        // ofオペレータの使用例
        const observableOf = of(1, 2, 3);
        observableOf.subscribe(value => console.log(`of: ${value}`));

        // fromオペレータの使用例
        const observableFrom = from([1, 2, 3]);
        observableFrom.subscribe(value => console.log(`from: ${value}`));

        // intervalオペレータの使用例
        const observableInterval = interval(1000); // 1秒間隔
        observableInterval.subscribe(value => console.log(`interval: ${value}`));

        // timerオペレータの使用例
        const observableTimer = timer(3000); // 3秒後に発行
        observableTimer.subscribe(value => console.log(`timer: ${value}`));
        break;
    case '3-2': // パイプ可能オペレータ
        const source = of(1, 2, 3, 4, 5);
        const result = source.pipe(
            filter(x => x % 2 === 0), // 偶数のみをフィルタリング
            map(x => x * 10),         // 値を10倍に変換
            catchError(err => of('エラー発生: ' + err)) // エラー処理
        );

        result.subscribe(value => console.log(value));
        break;
    default:
        console.log('無効なチャプターです');
        break;
}
