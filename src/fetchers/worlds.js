'use strict';

function Worlds($) {

  this.data = [];

  var self = this;

  var getWrapper = function() {
    return $('.InnerTableContainer table').closest('.TableContainer').find('.TableContent');
  };

  $(getWrapper()[1]).find('tr').each(function(index, item) {
  	// Skipping header
  	if(index > 0) {
	    item = $(item).find('td');

	    self.data.push({
	      name: $(item[0]).text(),
	      playersOnline: parseInt($(item[1]).text()),
	      location: $(item[2]).text(),
	      pvpType: $(item[3]).text(),
	      info: $(item[4]).text()
	    });
		}
  });

  return this.data;
}

module.exports = Worlds;
