/* 
This file should only hold global declarations and global setting
related to app.
*/

var rootModule = angular.module('rootModule', [
    'ngRoute',
    'ngAnimate',
    'ui.bootstrap',
    'simplePagination',
    'datatables',
    'contentful'
]);

var appConfig = {
    'useContentFul': true,
    'apiURL': 'http://localhost:3000'
};

// constant for base URL. Change this on production server
rootModule.constant('appConfig', appConfig);

if (appConfig.useContentFul) {
    rootModule.config(function (contentfulProvider) {
        contentfulProvider.setOptions({
            space: '60in3qh11j2f',
            accessToken: '73d398d77bebd3ffc71f78863345d842222fb5f7621088969da02d5b186011da'
        });
    });
}


