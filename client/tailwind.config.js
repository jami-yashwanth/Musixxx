module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      fontFamily: {
       Nunito: ["Poppins", "sans-serif"]
      },
      backgroundImage: {
        'featuredPlaylists': "url('./images/pic32.jpg')",
        'displayFavs': "url('./images/pic54.jpg')",
        'searchPage': "url('./images/pic37.jpg')",
        'getPlaylists': "url('./images/pic36.jpg')",
        'customPlaylists': "url('./images/pic49.jpg')",
        'spotifyAuth': "url('./images/gif4.gif')",
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
