/*input_dirs
 *  Check if data has all the fields required for a Book
 */

MandatoryFields = {
    'book' : ['title','authors','isbn'],
}
module.exports = {
    checkFields(data, type) {
        var fields = MandatoryFields[type] !== undefined?
                MandatoryFields[type] : [];
        var missing = [];
        fields.forEach(function(field, index) {
            if (data[field] === undefined)
                missing.push(field);
        });
        return missing;
    }
}
