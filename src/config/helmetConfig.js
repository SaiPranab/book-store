const helmet = require('helmet');

const helmetMiddleware = (env) => {
  return helmet({
    contentSecurityPolicy: env === 'prod' ? undefined : false, // Enable CSP only in production
    crossOriginResourcePolicy: { policy: 'cross-origin' }, // Helps with loading resources from other origins
    referrerPolicy: { policy: 'strict-origin-when-cross-origin' }, // Recommended strict referrer policy
    frameguard: { action: 'deny' }, // Prevent clickjacking
    hsts: env === 'prod' ? { maxAge: 31536000, includeSubDomains: true, preload: true } : false, // Strict Transport Security in prod
    xssFilter: true, // Enable XSS filter
    noSniff: true, // Prevent MIME sniffing
    ieNoOpen: true, // Prevent IE from executing downloads in site's context
    dnsPrefetchControl: { allow: false }, // Disable DNS prefetching
    permittedCrossDomainPolicies: { permittedPolicies: 'none' }, // Block Adobe Flash and Acrobat cross-domain policies
  });
};

module.exports = helmetMiddleware;