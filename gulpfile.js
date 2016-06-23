var gulp        = require('gulp');
var browserSync = require('browser-sync');
var sass        = require('gulp-sass');
var prefix      = require('gulp-autoprefixer');
var git         = require('gulp-git');
var replace     = require('gulp-replace');
var cp          = require('child_process');
var vfb         = require('vinyl-ftp-branch');
var ftp         = require('vinyl-ftp');

var jekyll   = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';
var messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

gulp.task('push', function(){
    git.push('origin', 'master', {
        //args: " -f"
    }, function (err) {
        if (err) throw err;
    });
});

/**
 * Build the Jekyll Site
 */
gulp.task('jekyll-build', function (done) {
    browserSync.notify(messages.jekyllBuild);
    return cp.spawn( jekyll , ['build'], {stdio: 'inherit'})
        .on('close', done);
});

/**
 * Rebuild Jekyll & do page reload
 */
gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
    browserSync.reload();
});

/**
 * Wait for jekyll-build, then launch the Server
 */
gulp.task('browser-sync', ['sass', 'jekyll-build'], function() {
    browserSync({
        server: {
            baseDir: '_site'
        }
    });
});

/**
 * Compile files from _scss into both _site/css (for live injecting) and site (for future jekyll builds)
 */
gulp.task('sass', function () {
    return gulp.src('public/css/main.scss')
        .pipe(sass({
            includePaths: ['scss'],
            onError: browserSync.notify
        }).on('error', sass.logError))
        .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(gulp.dest('_site/public/css'))
        .pipe(browserSync.reload({stream:true}))
        .pipe(gulp.dest('css'));
});

/**
 * Watch scss files for changes & recompile
 * Watch html/md files, run jekyll & reload BrowserSync
 */
gulp.task('watch', function () {
    gulp.watch(['public/css/*.scss', '_scss/**/*.scss'], ['sass']);
    gulp.watch(['*.html', '_layouts/*.html', '_posts/*'], ['jekyll-rebuild']);
});

/**
 * FTP upload _site
 */
gulp.task('ftp', function() {
    var globs = [
        '_site/**/',
        '!_site/**/node_modules/**'
    ];

    var options = vfb({
        host: '211.110.165.234',
        port: '21',
        userKeyFile: '.ftppass',
        userKey: 'key1',
        remotePath: '/public_html',
        log: true
    });
    var conn = ftp.create(options);

    return gulp.src(globs, {buffer: false})
        .pipe(conn.newer(options.finalRemotePath))
        .pipe(conn.dest(options.finalRemotePath));
});

/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task('default', ['browser-sync', 'watch']);