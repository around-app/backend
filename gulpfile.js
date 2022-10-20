const fs = require('fs');
const path = require('path');
const gulp = require('gulp');
const async = require('async');
const rimraf = require('rimraf');
const install = require('gulp-install');
const ts = require('gulp-typescript');

const info = (text) => console.log('\x1b[33m%s\x1b[0m', `\n${text}`);
const success = (text) => console.log('\x1b[32m%s\x1b[0m', `\n${text}`);
const error = (text) => console.log('\x1b[31m%s\x1b[0m', `\n${text}`);

const getDirectories = (source) =>
  fs
    .readdirSync(source, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

gulp.task('build-libs', function (cb) {
  console.log('\x1b[36m%s\x1b[0m', '\n[BUILD LIBS]');
  const baseDir = process.cwd();
  const libList = getDirectories(path.join(baseDir, './lib'));

  async.mapSeries(
    libList,
    function (libPath, done) {
      info(`library: ${libPath}`);
      process.chdir(path.join('./lib', libPath));
      async.series(
        [
          // cleanup
          function (cleanDone) {
            const toClean = [
              'node_modules',
              '*.js',
              '**/*.js.map',
              '**/*.d.ts',
            ];
            async.eachSeries(
              toClean,
              function (matchString, deleteDone) {
                rimraf(matchString, deleteDone);
              },
              cleanDone,
            );
          },
          // npm install
          function (installDone) {
            const cwd = path.join(process.cwd(), 'package.json');

            info('npm install ' + cwd);
            gulp
              .src('.', { cwd })
              .pipe(install({ args: ['--no-package-lock'] }, installDone));
          },
          // build
          function (buildDone) {
            const cwd = process.cwd();
            const cfgPath = path.join(cwd, 'tsconfig.json');
            const cfg = require(cfgPath);
            const tsProject = ts.createProject(cfg.compilerOptions);

            info(`Building: ${libPath} in ${cwd}`);

            const stream = gulp
              .src('*.ts', { cwd })
              .pipe(tsProject())
              .pipe(gulp.dest(cwd));

            stream
              .on('error', (e) => {
                error('build with errors');
                buildDone(e);
              })
              .on('end', () => {
                buildDone();
              });
          },
        ],
        function (err) {
          if (err) {
            error('error: ' + JSON.stringify(err));
          } else {
            success('build lib complete');
          }
          process.chdir(baseDir);
          done(err, null);
        },
      );
    },
    function (err) {
      cb(err);
    },
  );
});
