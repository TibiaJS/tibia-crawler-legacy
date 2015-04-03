'use strict';

function Highscores($) {

  this.rank = [];

  var self = this;

  var tables = $('b:contains("Rank")').parent('td').parent('tr').parent('table');
  var bodyData = $(tables[0]).find('tr');
  var headers = [];
  $(bodyData[0]).find('td').each(function(index, item) {
    headers.push($(item).text().toLowerCase());
  });

  $(bodyData).each(function(index, item) {
    if(index < 2) { return; }
    var rank = {};
    $(item).find('td').each(function(columnIndex, columnValue) {
      var headerName = headers[columnIndex];
      columnValue = $(columnValue).text();
      if(['rank', 'level', 'points'].indexOf(headerName) !== -1) {
        columnValue = parseInt(columnValue);
      }
      rank[headerName] = columnValue;
    });

    self.rank.push(rank);
  });

  return this.rank;
}

module.exports = Highscores;
