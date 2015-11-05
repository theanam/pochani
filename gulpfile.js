var gulp = require('gulp');
var uglify = require('gulp-uglify');
var exec = require('child_process').exec;
var browserSync = require('browser-sync').create();
var autoprefixer = require('gulp-autoprefixer');
var cssmin = require('gulp-cssmin');
//browsersync
gulp.task('browsersync',function(){
    browserSync.init({
        server: {
            baseDir: "./test"
        }
    });
});
gulp.task('minify',function(){
	gulp.src('functions.js')
	.pipe(uglify())
	.pipe(gulp.dest('./resources'));
});
gulp.task('test-compile',function(){
    process.chdir('./test');
	exec('../pochani.js test.md',function(){
        //now reload
        browserSync.reload();
    });
    process.chdir('..');
    
});
gulp.task('css',function(){
    gulp.src('default.css')
    .pipe(autoprefixer())
    .pipe(cssmin())
    .pipe(gulp.dest('./resources'));
});
//watchers
gulp.task('watch.js',function(){
	gulp.watch('functions.js',['minify','test-compile']);
});
gulp.task('watch.html',function(){
    gulp.watch('resources/template.html',['test-compile']);
});
gulp.task('watch.test',function(){
    gulp.watch('test/test.md',['test-compile']);
});
gulp.task('watch.css',function(){
    gulp.watch('default.css',['css','test-compile']);
});
gulp.task('watch',['watch.js','watch.html','watch.test','watch.css']);
//default
gulp.task('default',['watch','browsersync']);