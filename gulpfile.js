/**
 * Dependencies and path declaration
 */
var gulp = require('gulp'),
    sitespeedio = require('gulp-sitespeedio'),
    argv = require('yargs').argv,
    urls = require('./config/testsConfig');


/**
 * WPO test: run test of web performance optimization
 * See doc: http://www.sitespeed.io/rules/
 * See gulp conf: https://www.npmjs.com/package/gulp-sitespeedio
 * See gpsi doc: https://github.com/dreamzmaster/gulp-sitespeedio
 */

 // Sitespeed.io rules: https://www.sitespeed.io/documentation/rules-and-best-practices/
 gulp.task('wpo', function (done) {
    var i = 0,
        j = 0;

    urls.forEach(function (element) {
        var task = sitespeedio({
            url: element.url,
            html: true,
            showFailedOnly: false,
            profile: element.profile,
            connection: element.connection,
            resultBaseDir: 'test-results/wpo/sitespeedio/'+element.testTitle,        
            budget :{
                rules: {
                    default: element.score
                }
            }
                
        });

        i += 1;
        task(function () {
            j += 1;
            if (i == j) {
                done();
            }
        });
    });
});

// Gspi rules
gulp.task('gspi', sitespeedio({
            url: urls[0].url,
            resultBaseDir: 'test-results/wpo/gpsi', 
            deepth: 1,
            html: true,
            noYslow: true,
            gpsiKey: 'AIzaSyBommpVKxKYNZIx-AyJeWuBg5Py6Y2WDdk',
            budget: {
                gpsi: {
                    score: 90
                }
            }
    })
);

// Web page test rules
gulp.task('webpagetest', sitespeedio({
        urls: [argv.url] || 'http://listado.mercadolibre.com.ar/ipod',
        noYslow: true,
        no: 5,
        html: true,
        showFailedOnly: false,
        resultBaseDir: 'test-results/wpo/webpagetest',        
        wptKey: "A.119e3623c74a25457f704a177b57ee43", // Other API KEY =  A.f2b49e6776b84d3154e55735d25336d4
        wptHost: "www.webpagetest.org",
        wptConfig: {
            location: "Dulles:Chrome",
            connectivity: argv.connectivity || 'cable',
            timeout: 800
        }
    })
);