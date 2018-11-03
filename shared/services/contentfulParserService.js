rootModule.factory('contentfulFactory', [function() {
    return { 
        getLinkedUrls: function(data, type) {
            var dataToUse = JSON.parse(JSON.stringify(data));
            var linkedType = type ? type : 'image';
            var resultSet = [];
            var dataLength = dataToUse ? dataToUse.length : 0;
            for (var k = 0; k < dataLength; k++) {
                var currentField =dataToUse[k].fields;
                var linkUrl;
                if (dataToUse[k].fields[linkedType]) {
                    linkUrl = dataToUse[k].fields[linkedType].fields.file.url;
                    currentField[linkedType] = linkUrl;
                }
                currentField['id'] = dataToUse[k].sys.id;;
                resultSet.push(currentField);
            }
            
            return resultSet.length ? resultSet : dataToUse;
        },

        getParagraphsListFromText: function(data, fieldName) {
            var dataToUse = JSON.parse(JSON.stringify(data));
            var dataLength = dataToUse.length;
            for (var k = 0; k < dataLength; k++) {
                // Ensure to have single \n for new line
                var text = dataToUse[k][fieldName];
                var paraList = text.replace(/\n+/g, '\n').split('\n');
                dataToUse[k][fieldName] = paraList;
            }

            return dataToUse;
        }
    };
 }]);