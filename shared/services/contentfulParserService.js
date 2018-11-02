rootModule.factory('contentfulFactory', [function() {
    return { 
        getLinkedUrls: function(data, type) {
            var dataToUse = JSON.parse(JSON.stringify(data));
            var linkedType = type ? type : 'image';
            var resultSet = [];
            var dataLength = dataToUse.items.length;
            var items = dataToUse.items;
            for (var k = 0; k < dataLength; k++) {
                var currentField = dataToUse.items[k].fields;
                var linkUrl = items[k].fields[linkedType].fields.file.url;
                currentField[linkedType] = linkUrl;
                resultSet.push(currentField);
            }
            
            return resultSet;
        }
    };
 }]);