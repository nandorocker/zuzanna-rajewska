var gulp = require('gulp'),
	gutil = require('gulp-util')
	jade = require('jade'),
	source = require('vinyl-source-stream'),
	buffer = require('vinyl-buffer'),
	gulpJade = require('gulp-jade'),
	browserify = require('browserify'),
	uglify = require('gulp-uglify');

var env = process.env.NODE_ENV || 'development';

gulp.task('jade', function(){
	return gulp.src('app/**/*.jade')
		.pipe(gulpJade({
			jade: jade,
			pretty: true
		}))
		.pipe(gulp.dest('.tmp/'))
});

gulp.task('js', function() {
	return browserify('./app/scripts/main.js', { debug: env !== 'production' })
		.bundle()
		.on('error', function (e) {
			gutil.log(e);
		})
		.pipe(source('bundle.js'))
		.pipe(gulp.dest('.tmp/scripts'))
		.pipe(buffer())
		.pipe(gutil.env.env === 'prod' ? uglify() : gutil.noop())
		.pipe(gulp.dest('.tmp/scripts'))
});
