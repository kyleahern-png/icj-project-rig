import bake from './tasks/bake.js';
import clean from './tasks/clean.js';
import clear from './tasks/clear.js';
import copy from './tasks/copy.js';
import fetch from './tasks/fetch.js';
import format from './tasks/format.js';
import gulp from 'gulp';
import images from './tasks/images.js';
import lint from './tasks/lint.js';
import nunjucks from './tasks/nunjucks.js';
import runSequence from 'gulp4-run-sequence';
import scripts from './tasks/scripts.js';
import serve from './tasks/serve.js';
import styles from './tasks/styles.js';

gulp.task('default', (done) => {
  try {
    runSequence(
      [clean, styles, copy, gulp.parallel(scripts, images), nunjucks, bake],
      lint,
      format,
      done
    );
  } catch (err) {
    console.error('Error in default task:', err);
    done(err);
  }
});

gulp.task('dev', gulp.series('default', (done) => {
  try {
    serve();
    done();
  } catch (err) {
    console.error('Error starting dev server:', err);
    done(err);
  }
}));

gulp.task(clear);
gulp.task(fetch);
gulp.task(format);

gulp.task('debug', gulp.series(clean, copy, nunjucks, bake, (done) => {
  console.log('Debug tasks completed successfully');
  done();
}));
