const gulp = require('gulp')
const replace = require('gulp-replace')
const jsonminify = require('gulp-jsonminify')
const rename = require("gulp-rename")

const theme = {
  watch: './src/gravity-base-theme.jsonc'
}

const accentColors = {
  blue: {
    color: '#007aff',
    colorlight: '#3696ff',
    colordark: '#0063cf',
    text: '#ffffff',
    name: 'gravity-blue-theme'
  },
  purple: {
    color: '#af52de',
    colorlight: '#bb6ce3',
    colordark: '#a338d9',
    text: '#ffffff',
    name: 'gravity-purple-theme'
  },
  pink: {
    color: '#ff2d55',
    colorlight: '#ff4b6d',
    colordark: '#ff0f3d',
    text: '#ffffff',
    name: 'gravity-pink-theme'
  },
  red: {
    color: '#ff3b30',
    colorlight: '#ff584e',
    colordark: '#ff1e12',
    text: '#ffffff',
    name: 'gravity-red-theme'
  },
  orange: {
    color: '#ff9500',
    colorlight: '#ffac36',
    colordark: '#e68600',
    text: '#2c2c2c',
    name: 'gravity-orange-theme'
  },
  yellow: {
    color: '#ffcc00',
    colorlight: '#ffe477',
    colordark: '#e6b800',
    text: '#2c2c2c',
    name: 'gravity-yellow-theme'
  },
  green: {
    color: '#28cd41',
    colorlight: '#4ddc62',
    colordark: '#20a635',
    text: '#2c2c2c',
    name: 'gravity-green-theme'
  },
  gray: {
    color: '#8e8e93',
    colorlight: '#adadb1',
    colordark: '#7f7f85',
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
