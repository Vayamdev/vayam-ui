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
                    {
                        expand: true,
                        cwd: 'bower_components/ng-simplePagination/',
                        src: ['**/*.js', '**/*.map'],
                        dest: 'scripts/ng-simplePagination/'
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
                'scripts/bootstrap-sass/bootstrap.min.js',
                'scripts/angular/angular.min.js',
                'scripts/angular-route/angular-route.min.js',
                'scripts/angular-bootstrap/ui-bootstrap-tpls.min.js',
                'scripts/ng-simplePagination/simplePagination.js',
                'scripts/plugins/jquery.bootstrap.newsbox.min.js',
            ],
            dest: 'scripts/vender.js',
          },        
          codescripts: {
            src: [
                'app.module.js',
                'app.config.js',
                'components/home/homeController.js',
                'components/impact/impactController.js',
                'components/aboutus/team/teamController.js',
                'components/aboutus/whatweare/whatweareController.js',
                'components/aboutus/testimonials/testimonialsController.js',
                'components/aboutus/journey/journeyController.js',
                'components/contactus/contactusController.js',
                'components/donate/donateController.js',
                'components/news/newsController.js',
                'components/project/projectController.js',
                'components/gallery/galleryController.js',
                'components/home/homeService.js',
                'components/impact/impactService.js',
                'components/news/newsService.js',
                'components/aboutus/team/teamService.js',
                'components/aboutus/testimonials/testimonialsService.js',
                'components/aboutus/journey/journeyService.js',
                'components/project/projectService.js',
                'components/gallery/galleryService.js',
                'shared/header/headerDirective.js',
                'shared/footer/footerDirective.js',
                'shared/googlemap/mapDirective.js',
                'shared/imagebanner/imagebannerDirective.js',
                'shared/globalfactory/globalFactory.js',
                'components/contactus/contactUsService.js'
            ],
            dest: 'scripts/app.js',
          },
          thirdpartycss: {
            src: [
                'css/thirdparty/bootstrap_photo_gallery.css',
                'css/app.css'
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
