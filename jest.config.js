/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleDirectories: ["ts"],
  modulePaths: ["src"],
  moduleDirectories: ["node_modules", "src"],
};