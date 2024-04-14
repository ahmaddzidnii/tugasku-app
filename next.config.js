/** @type {import('next').NextConfig} */
const nextConfig = {};

// Make sure adding Sentry options is the last code to run before exporting
module.exports = nextConfig;

// const { withSentryConfig } = require("@sentry/nextjs");

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   // Optional build-time configuration options
//   sentry: {
//     hideSourceMaps: true,
//     disableLogger: true,
//     // See the sections below for information on the following options:
//     //   'Configure Source Maps':
//     //     - disableServerWebpackPlugin
//     //     - disableClientWebpackPlugin
//     //     - hideSourceMaps
//     //     - widenClientFileUpload
//     //   'Configure Legacy Browser Support':
//     //     - transpileClientSDK
//     //   'Configure Serverside Auto-instrumentation':
//     //     - autoInstrumentServerFunctions
//     //     - excludeServerRoutes
//     //   'Configure Tunneling to avoid Ad-Blockers':
//     //     - tunnelRoute
//     //   'Disable the Sentry SDK Debug Logger to Save Bundle Size':
//     //     - disableLogger
//   },
// };

// const sentryWebpackPluginOptions = {
//   // Additional config options for the Sentry webpack plugin. Keep in mind that
//   // the following options are set automatically, and overriding them is not
//   // recommended:
//   //   release, url, configFile, stripPrefix, urlPrefix, include, ignore

//   org: "education-4j4",
//   project: "tugasku-app",

//   // An auth token is required for uploading source maps.
//   authToken: process.env.SENTRY_AUTH_TOKEN,

//   silent: true,
//   // Suppresses all logs

//   // For all available options, see:
//   // https://github.com/getsentry/sentry-webpack-plugin#options.
// };

// // Make sure adding Sentry options is the last code to run before exporting
// module.exports = withSentryConfig(nextConfig, sentryWebpackPluginOptions);
