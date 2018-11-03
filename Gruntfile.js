module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Copy web assets from bower_components to more convenient directories.
        copy: {
            main: {
                files: [
                    // Vendor scripts.
                    {
                        expand: true,
                        cwd: 'bower_components/bootstrap-sass/assets/javascripts/',
                        src: ['**/*.js'],
                        dest: 'scripts/bootstrap-sass/'
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/jquery/dist/',
                        src: ['**/*.js', '**/*.map'],
                        dest: 'scripts/angular/'
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/angular-datatables/dist/',
                        src: ['**/*.js', '**/*.map'],
                        dest: 'scripts/datatable/'
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/datatables.net/js/',
                        src: ['**/*.js', '**/*.map'],
                        dest: 'scripts/datatable.net/'
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/angular/',
                        src: ['**/*.js', '**/*.map'],
                        dest: 'scripts/angular/'
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/angular-route/',
                        src: ['**/*.js', '**/*.map'],
                        dest: 'scripts/angular-route/'
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/angular-bootstrap/',
                        src: ['**/*.js', '**/*.map'],
                        dest: 'scripts/angular-bootstrap/'
                    },
                    // Third party plugins
                    {
                        expand: true,
                        cwd: 'bower_components/ng-simplePagination/',
                        src: ['**/*.js', '**/*.map'],
                        dest: 'scripts/ng-simplePagination/'
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/lightgallery.js/',
                        src: ['**/*.js', '**/*.map', '**/*.css'],
                        dest: 'scripts/lightgallery/'
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/angular-animate/',
                        src: ['**/*.js', '**/*.map'],
                        dest: 'scripts/angular-animate/'
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/angular-contentful/',
                        src: ['**/*.js', '**/*.map'],
                        dest: 'scripts/angular-contentful/'
                    },
                    // Fonts.
                    {
                        expand: true,
                        filter: 'isFile',
                        flatten: true,
                        cwd: 'bower_components/',
                        src: ['bootstrap-sass/assets/fonts/**'],
                        dest: 'fonts/bootstrap/'
                    },
                    {
                        expand: true,
                        filter: 'isFile',
                        flatten: true,
                        cwd: 'bower_components/',
                        src: ['font-awesome/scss/**'],
                        dest: 'scss/font-awesome/'
                    },
                    // Stylesheets
                    {
                        expand: true,
                        cwd: 'bower_components/bootstrap-sass/assets/stylesheets/',
                        src: ['**/*.scss'],
                        dest: 'scss/'
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/datatables.net-dt/css/',
                        src: ['**/*.css'],
                        dest: 'css/datatables.net-dt'
                    }
                ]
            },
        },

        // Compile SASS files into minified CSS.
        sass: {
            options: {
                includePaths: ['bower_components/bootstrap-sass/assets/stylesheets']
            },
            dist: {
                options: {
                    outputStyle: 'compressed'
                },
                files: {
                    'css/app.css': 'scss/app.scss'
                }
            }
        },

        concat: {
          options: {
            separator: '\n\n\n',
          },
          venderscripts: {
            src: [
                'scripts/jquery/jquery.min.js',
                'scripts/datatable.net/jquery.dataTables.min.js',
                'scripts/bootstrap-sass/bootstrap.min.js',
                'scripts/angular/angular.min.js',
                'scripts/angular-route/angular-route.min.js',
                'scripts/angular-bootstrap/ui-bootstrap-tpls.min.js',
                'scripts/ng-simplePagination/simplePagination.js',
                'scripts/plugins/jquery.bootstrap.newsbox.min.js',
                'scripts/jquery.bootstrap.newsbox.min.js',
                'scripts/lightgallery/dist/js/lightgallery.min.js',
                'scripts/datatable/angular-datatables.min.js',
                'scripts/angular-contentful/dist/angular-contentful.min.js'
            ],
            dest: 'scripts/vender.js',
          },
          codescripts: {
            src: [
                'app.module.js',
                'app.config.js',
                'components/home/homeController.js',
                'components/impact/impactController.js',
                'components/aboutus/whatweare/whatweareController.js',
                'components/aboutus/journey/journeyController.js',
                'components/contactus/contactusController.js',
                'components/donate/donateController.js',
                'components/project/projectController.js',
                'components/download/downloadController.js',
                'components/aboutus/gallery/galleryController.js',
                'components/home/homeService.js',
                'components/impact/impactService.js',
                'components/aboutus/whatweare/teamService.js',
                'components/aboutus/testimonials/testimonialsService.js',
                'components/aboutus/journey/journeyService.js',
                'components/aboutus/gallery/galleryService.js',
                'components/download/downloadService.js',
                'components/project/projectDetailsService.js',
                'shared/donatelink/donatelinkDirective.js',
                'shared/contactform/contactformDirective.js',
                'shared/header/headerDirective.js',
                'shared/footer/footerDirective.js',
                'shared/googlemap/mapDirective.js',
                'shared/imagebanner/imagebannerDirective.js',
                'shared/services/globalFactory.js',
                'shared/services/contentfulParserService.js',
                'shared/services/modalService.js',
                'components/contactus/contactUsService.js'
            ],
            dest: 'scripts/app.js',
          },
          thirdpartycss: {
            src: [
                'css/app.css',
                'scripts/lightgallery/dist/css/lightgallery.min.css',
                'css/datatables.net-dt/jquery.dataTables.min.css',
            ],
            dest: 'css/app.css',
          }
        },
        // Watch these files and notify of changes.
        watch: {
            grunt: {
                files: ['Gruntfile.js'],
                tasks: ['concat']
            },
            sass: {
                files: [
                    'scss/**/*.scss'
                ],
                tasks: ['sass']
            },
            scripts: {
                files: [
                    'app.config.js',
                    'app.module.js',
                    'shared/**/*.js',
                    'components/**/*.js',
                ],
                tasks: ['concat']
            }
        }
    });

    // Load externally defined tasks.
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');

    // Establish tasks we can run from the terminal.
    grunt.registerTask('build', ['copy', 'sass', 'concat']);
    grunt.registerTask('default', ['build', 'watch']);
}
