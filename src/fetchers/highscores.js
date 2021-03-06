'use strict';

function Highscores($) {

  this.data = [];

  var self = this;

  var tables = $('b:contains("Rank")').parent('td').parent('tr').parent('table');
  var bodyData = $(tables[0]).find('tr');
  var headers = [];
  $(bodyData[0]).find('td').each(function(index, item) {
    headers.push($(item).text().toLowerCase());
  });

  $(bodyData).each(function(index, item) {
    if(index < 2) { return; }
    var highscores = {};
    $(item).find('td').each(function(columnIndex, columnValue) {
      var headerName = headers[columnIndex];
      columnValue = $(columnValue).text();
      if(['rank', 'level', 'points'].indexOf(headerName) !== -1) {
        columnValue = parseInt(columnValue);
      }
      highscores[headerName] = columnValue;
    });

    self.data.push(highscores);
  });

  return this.data;
  
}

module.exports = Highscores;
