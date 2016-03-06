var gulp = require('gulp');

var jade = require('jade');
var gulpJade = require('gulp-jade');

gulp.task('jade', function(){
	return gulp.src('app/**/*.jade')
		.pipe(gulpJade({
			jade: jade,
			pretty: true
		}))
		.pipe(gulp.dest('.tmp/'))
});