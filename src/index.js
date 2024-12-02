import {
    asyncScheduler,
    catchError,
    filter,
    from,
    interval,
    map,
    Observable,
    observeOn,
    of,
    scan,
    share,
    Subscription,
    takeWhile,
    timer
} from "rxjs";

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
        const observable22 = new Observable(subscriber => {
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
        observable22.subscribe(observer);
        break;
    case '2-3': // サブスクリプションの管理
        // オブザーバブルの作成
        const observable23 = new Observable(subscriber => {
            subscriber.next('Hello');
            subscriber.next('World');
        });

        // サブスクリプションの開始
        const subscription = observable23.subscribe(value => console.log(value));

        // サブスクリプションの解除
        subscription.unsubscribe();
        break;
    case '2-4': // 複数のサブスクリプションの管理
        // 複数のオブザーバブルの定義
        const observable241 = new Observable(subscriber => subscriber.next('Observable 241'));
        const observable242 = new Observable(subscriber => subscriber.next('Observable 242'));

        // サブスクリプションオブジェクトの作成
        const allSubscriptions = new Subscription();

        // オブザーバブルを購読し、サブスクリプションオブジェクトに追加
        allSubscriptions.add(observable241.subscribe(value => console.log(value)));
        allSubscriptions.add(observable242.subscribe(value => console.log(value)));

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
        const source32 = of(1, 2, 3, 4, 5);
        const result = source32.pipe(
            filter(x => x % 2 === 0), // 偶数のみをフィルタリング
            map(x => x * 10),         // 値を10倍に変換
            catchError(err => of('エラー発生: ' + err)) // エラー処理
        );

        result.subscribe(value => console.log(value));
        break;
    case '3-3': // その他のオペレータ関数
        // インターバルオブザーバブル
        const source33 = interval(1000).pipe(share());

        // takeWhileオペレータの使用
        const takeWhileExample = source33.pipe(
            takeWhile(value => value < 5)
        );

        // scanオペレータの使用
        const scanExample = source33.pipe(
            scan((acc, value) => acc + value, 0)
        );

        takeWhileExample.subscribe(value => console.log(`takeWhile: ${value}`));
        scanExample.subscribe(value => console.log(`scan: ${value}`));
        break;
    case '4-1': // スケジューラの種類と役割
        // 非同期スケジューラを使用
        const observableWithAsyncScheduler = new Observable(subscriber => {
            subscriber.next(1);
            subscriber.next(2);
            subscriber.complete();
        }).pipe(observeOn(asyncScheduler));

        observableWithAsyncScheduler.subscribe(value => console.log(value));
        break;
    case '4-2-1': // 同期と非同期処理の制御 - 同期処理
        const observable421 = new Observable(subscriber => {
            subscriber.next(1);
            subscriber.next(2);
            subscriber.complete();
        });

        console.log('購読前');
        observable421.subscribe(value => console.log(`同期的な値: ${value}`));
        console.log('購読後');
        break;
    case '4-2-2': // 同期と非同期処理の制御 - 非同期処理
        const asyncObservable = of(1, 2, 3).pipe(observeOn(asyncScheduler));

        console.log('購読前');
        asyncObservable.subscribe(value => console.log(`非同期的な値: ${value}`));
        console.log('購読後');
        break;
    case '5': // RxJSパターンとベストプラクティス：コードの再利用とモジュラリティ
        // カスタムオペレータの定義
        const doubleEvenNumbers = source => source.pipe(
            filter(value => value % 2 === 0),
            map(value => value * 2)
        );

        // オブザーバブルの作成とカスタムオペレータの適用
        const numbers = of(1, 2, 3, 4, 5).pipe(doubleEvenNumbers);

        numbers.subscribe(value => console.log(value));
        break;
    default:
        console.log('無効なチャプターです');
        break;
}
