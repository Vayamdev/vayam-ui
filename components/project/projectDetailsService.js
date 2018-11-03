rootModule.service('projectDetailsService', [
    'globalFactory',
    function(globalFactory) {
        this.resolvedChildProject = function(parentProject) { 
            var parentProjectData = JSON.parse(JSON.stringify(parentProject));
            var childData = parentProjectData.childProjects;
            childData = globalFactory.resolveLinksIfContentFul(childData, 'displayImage');
            childData = globalFactory.resolveParasIfContentFul(childData, 'shortDescription');
            parentProjectData.childProjects = childData;
            return parentProjectData;
        }
    }
]);
