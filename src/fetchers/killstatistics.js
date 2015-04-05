'use strict';

function KillStatistics($) {

  this.data = [];

  var self = this;

  var $trs = $($('table')[4]).find('tr');

  if($trs.length > 0){
    $trs.each(function(index, tr){

      var td = $(tr).find('td');

      self.data.push({
        race: $(td[0]).text().trim(),
        lastDay: {
          killedPlayers: parseInt($(td[1]).text()),
          killedByPlayers: parseInt($(td[2]).text())
        },
        lastWeek: {
          killedPlayers: parseInt($(td[3]).text()),
          killedByPlayers: parseInt($(td[4]).text())
        }
      });

    });
  } else {
    this.data = 'Unknown world';
  }

  return this.data;

}

module.exports = KillStatistics;
