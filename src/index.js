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
    default:
        console.log('無効なチャプターです');
        break;
}
