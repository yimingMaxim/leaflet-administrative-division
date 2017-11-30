var gulp = require('gulp'),
	sass = require('gulp-sass'),
	browserSync = require('browser-sync')

gulp.task('sass', function(){
	return gulp.src('app/scss/style.scss')
		.pipe( sass())
		.pipe( gulp.dest('app/css'))
		.pipe( browserSync.reload({
			stream: true
		}))
})

gulp.task('gogogo', ['browserSync', 'sass'], function(){
	gulp.watch('app/scss/**/*.scss', ['sass']);
	gulp.watch('app/*.html', browserSync.reload);
	gulp.watch('app/js/**/*.js', browserSync.reload);
})

gulp.task('browserSync', function(){
	browserSync({
		server:{
			baseDir: 'app'
		}
	})
})