module.exports = {
  plugins: [require('autoprefixer')({
      browsers: [
        "iOS >= 6", 
        "Firefox >= 20",
        "Android > 4.1"
        // "Android > 4.1"
      ]
    })]
}