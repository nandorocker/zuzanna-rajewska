var gulp = require('gulp'),
	gutil = require('gulp-util')
	jade = require('jade'),
	gulpJade = require('gulp-jade'),
	sass = require('gulp-sass'),
	browserify = require('browserify'), // Does some magic shit I don't understand
	source = require('vinyl-source-stream'), // This and the next one required for browserify
	buffer = require('vinyl-buffer'),
	uglify = require('gulp-uglify');

// Sets environment variables through gulp-util
// To invoke: $ gulp --env=prod
var env = gutil.env.env;
var outputDir = '.tmp';

if (env === 'prod') {
	outputDir = 'dist';
	console.log("hello");
}
if (env === 'dev') {
}


// Process HTML
gulp.task('html', function(){
	return gulp.src('app/**/*.jade')
		.pipe(gulpJade({
			jade: jade,
			pretty: true
		}))
		.pipe(gulp.dest('outputDir'))
});

// Process scripts
gulp.task('js', function() {
	return browserify('./app/scripts/main.js', { debug: env !== 'production' })
		.bundle()
		.on('error', function (e) {
			gutil.log(e);
		})
		.pipe(source('bundle.js'))
		.pipe(gulp.dest('.tmp/scripts'))
		.pipe(buffer())
		.pipe(env === 'prod' ? uglify() : gutil.noop())
		.pipe(gulp.dest(outputDir + '/scripts'))
});

// Process styles
gulp.task('styles', function(){
	var config = {};

	if (env === 'prod') {
		config.outputStyle = 'compressed';
	}

	if (env === 'dev') {
		config.outputStyle = 'map';
	}

	return gulp.src('app/styles/**/*.{scss,sass}')
		.pipe(sass(config))
		.pipe(gulp.dest(outputDir + '/styles'))
});