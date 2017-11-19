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
          dist: {
            src: [
                'app.module.js',
                'app.config.js',
                'components/home/homeController.js',
                'components/aboutus/team/teamController.js',
                'components/aboutus/whatweare/whatweareController.js',
                'components/aboutus/testimonials/testimonialsController.js',
                'components/contactus/contactusController.js',
                'components/donate/donateController.js',
                'components/home/homeService.js',
                'components/aboutus/team/teamService.js',
                'components/aboutus/testimonials/testimonialsService.js',
                'shared/header/headerDirective.js',
                'shared/footer/footerDirective.js',
                'shared/googlemap/mapDirective.js'
            ],
            dest: 'scripts/app.js',
          },
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
