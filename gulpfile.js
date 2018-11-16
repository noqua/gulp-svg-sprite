var gulp = require('gulp'),
svgSprite = require('gulp-svg-sprite');

// タスク
gulp.task('sprite', function() {
    return gulp.src('_src/images/svg-sprite/*.svg') // 元となるSVGアイコンのパス（*.svg で全SVGを対象に）
        .pipe(svgSprite({
            mode: {
                symbol: {
                    // スプライト画像を置くディレクトリ名。指定しないとデフォルト設定（svg）に。
                    dest: 'images',

                    // スプライト画像のファイル名
                    sprite: 'sprite.svg',

                    // スプライト画像のプレビュー用HTMLが欲しい人はこちらも記述してください。
                    // 任意の場所とファイル名を指定してください。
                    example: {
                        dest: '../css/svg-sprite-preview/sprite.html',
                    }
                },
            } // mode
        }))

        // 書き出し先
        .pipe(gulp.dest('_dest')),

    // 背景用スプライト画像
    gulp.src('_src/images/svg-sprite-bg/*.svg')
        .pipe(svgSprite({
            mode: {
                css: {
                    // 背景用スプライト画像のファイル名を指定
                    // ただし自動で接尾辞がつく
                    sprite: '../images/sprite-bg.svg',

                    // class名の接頭辞を指定できます。
                    // なぜか頭のドットが必要でした。
                    prefix: '.icon_%s',

                    // サイズ指定用のclassの接尾辞
                    dimensions: "_dims",

                    render: {
                        // CSSファイル名を指定
                        css: {
                            dest: 'sprite.css',
                        },

                        // SCSSファイルが必要な場合はこちらも記述します。
                        // 相対パスで _src ディレクトリを指定しています。
                        scss: {
                            dest: '../../_src/sass/_sprite.scss',
                        }
                    },

                    // スプライト画像のプレビュー用HTMLが欲しい人はこちらも記述してください。
                    // 任意の場所とファイル名を指定してください。
                    example: {
                        dest: 'svg-sprite-preview/sprite-bg.html',
                    }
                }, // css

            } // mode
        }))

        // 書き出し先
        .pipe(gulp.dest('_dest'));
});


// 自動処理の設定
gulp.task('default', function() {
    gulp.watch('_src/images/{,**/}*.svg',['sprite']);
});