import {Observable} from "rxjs";

const chapter = process.argv[2];

switch (chapter) {
    case '2-1':
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
    case '2-2':
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
    case '2-3':
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
    default:
        console.log('無効なチャプターです');
        break;
}
