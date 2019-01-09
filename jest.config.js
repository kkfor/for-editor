module.exports = {
  moduleFileExtensions: ['js', 'jsx', 'scss'],
  setupTestFrameworkScriptFile: '<rootDir>/test/setupTests.js',
  testPathIgnorePatterns: ['/node_modules/'],
  collectCoverageFrom: ['src/**/*.{js}', 'src/**/*.{jsx}'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|less|scss)$': '<rootDir>/__mocks__/styleMock.js'
  },
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest'
  }
}
