const gulp = require('gulp')
const replace = require('gulp-replace')
const jsonminify = require('gulp-jsonminify')
const rename = require("gulp-rename")

const theme = {
  watch: './src/gravity-base-theme.jsonc'
}

const accentColors = {
  blue: {
    color: '#0a84ff',
    colorlight: '#42a0ff',
    colordark: '#006bd7',
    text: '#ffffff',
    name: 'gravity-blue-theme'
  },
  purple: {
    color: '#bf5af2',
    colorlight: '#cb79f4',
    colordark: '#d89bf7',
    text: '#ffffff',
    name: 'gravity-purple-theme'
  },
  pink: {
    color: '#ff375f',
    colorlight: '#ff5678',
    colordark: '#ff1846',
    text: '#ffffff',
    name: 'gravity-pink-theme'
  },
  red: {
    color: '#ff453a',
    colorlight: '#ff6359',
    colordark: '#ff271b',
    text: '#ffffff',
    name: 'gravity-red-theme'
  },
  orange: {
    color: '#ff9f0a',
    colorlight: '#ffb542',
    colordark: '#ef9100',
    text: '#2c2c2c',
    name: 'gravity-orange-theme'
  },
  yellow: {
    color: '#ffd60a',
    colorlight: '#ffea85',
    colordark: '#efc700',
    text: '#2c2c2c',
    name: 'gravity-yellow-theme'
  },
  green: {
    color: '#32d74b',
    colorlight: '#60e073',
    colordark: '#23b439',
    text: '#2c2c2c',
    name: 'gravity-green-theme'
  },
  gray: {
    color: '#98989d',
    colorlight: '#b9b9bd',
    colordark: '#88888e',
    text: '#ffffff',
    name: 'gravity-gray-theme'
  }
}

function themeAccentColor (done) {
  Object.keys(accentColors).forEach(val => {
    gulp.src('./src/gravity-base-theme.jsonc')
      .pipe(replace('@color_base', accentColors[val].color))
      .pipe(replace('@color_light', accentColors[val].colorlight))
      .pipe(replace('@color_dark', accentColors[val].colordark))
      .pipe(replace('@color_text', accentColors[val].text))
      .pipe(jsonminify())
      .pipe(rename({
        basename: accentColors[val].name,
        extname: ".json"
      }))
      .pipe(gulp.dest('./themes'))
  })

  done()
}

function watchfiles () {
  gulp.watch(theme.watch, gulp.series(themeAccentColor))
}

gulp.task('default', themeAccentColor)
gulp.task('watch', watchfiles)
