// Step #1
head.load(
    // First, load the main JS library
    [
        { jquery_core: "/js/jquery-1.12.4.min.js" },
        { jquery_ui: "/js/jquery-ui.min.js" }
        
    ],
    function() {
        console.debug('Loaded jQuery library files, loading jQuery plugin files..');
        jquery_plugins();
    }
);


// Step #2
function jquery_plugins() {
    head.load([
            // Load all the jQuery plugin files
            "/js/bootstrap.min.js",
            "/js/bootstrap3-wysihtml5.js",
            // "/css/bootstrap3-wysihtml5.css",

             "/js/select2.js",

            "/js/d3.v4.min.js",
            // "/js/bootstrap-editable.min.js",
            // "/js/address.js",
            // "/js/typeahead.js",
            // "/js/typeaheadjs.js",
            // "/js/wysihtml5.js",

            // "/js/mustache.js",

            // "/js/jquery.slimscroll.min.js",
            // "/js/jquery.cookie.js",
            // "/js/gritter/js/jquery.gritter.js",
            // "/js/jquery.tooltipster.js",
            // "/js/bwizard.js",
            // "/js/apps.js",
            // "/js/enhanced-select.jquery.min.js",
            // "/js/jquery.multi-select.js",
            // "/js/intro.js",
            // "/js/switchery.min.js",
            // "/js/jquery.multiselect.js",
            // "/js/parsley.js",
            // "/js/APPcustom.js",
            // "/js/parsley.remote.js",
            // "/js/bootstrap-timepicker.js",
            // "/js/bootstrap-datetimepicker.js",
            // "/js/jquery.numeric.min.js",
            // "/js/moment/moment.min.js",
            // "/js/jquery.flot.min.js",
            // "/js/jquery.flot.time.min.js",
            // "/js/jquery.flot.resize.min.js",
            // "/js/jquery.flot.pie.min.js",
            // "/js/jquery.flot.stack.min.js",
            // "/js/jquery.flot.crosshair.min.js",
            // "/js/jquery.flot.categories.js",
            // "/js/sparkline/jquery.sparkline.js",
            // "/js/bootstrap-tagsinput.min.js",
            // "/js/bootstrap-tagsinput-typeahead.js",
            // "/js/jquery-tag-it/js/tag-it.min.js",
            // "/js/bootstrap-select/bootstrap-select.min.js",
            // "/js/jquery.ui.position.js",
            // "/js/jquery.contextMenu.js",
            // "/js/jquery.mask.min.js",
            // "/js/jstree.min.js",
            // "/js/jquery.expander.js",
            // "/js/jquery-labelauty.js",
            // "/js/jquery.ui.widget.js",

            // "/js/jquery.jscroll.js",
            // "/js/modernizr.js",
            // "/js/messi.js",

            // "/js/jquery.tmpl.min.js",

            { jquery_highlight: "/js/jquery.highlight.js" },

            { datatables_core: "/js/datatables.min.js" },
            { datatables_searchHighlight: "/js/dataTables.searchHighlight.min.js" },
            { datatables_conditionalPaging: "/js/dataTables.conditionalPaging.js" },
            { datatables_ellipsis: "/js/ellipsis.js" },
            { datatables_yadcf: "/js/jquery.dataTables.yadcf.js" },

            { ckeditor: "/js/ckeditor.js" }
        ],
        function() {
            console.log('All jQuery plugins loaded, loading APP js files...');
            APP_js_files();
        });
}

// Step #3
function APP_js_files(){
    head.load([
            // Load the application JS files
            // { APP_plugins: "/js/APP_plugin.js" },
            // { APP_intro: "/js/APP_intro.js" },
            // { APP_app: "/js/APP_app.js" },
            // { APP_confirmation: "/js/APP_confirmation.js" }
        ],
        function() {
            "use strict";
            console.log('Successfully loaded all APP js files!');

            $.ajaxSetup({
                cache:false
            });

            // App.init();


            // template.init();
            // account.init();
            // admin.init();
            // assets.init();
            // forms.init();
        });
}