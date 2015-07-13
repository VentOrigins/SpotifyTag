var lastSelectedRow;
var trs;

function getTRS() {

  trs = document.getElementById('list-of-tracks').tBodies[0].getElementsByTagName('tr');
  // disable text selection
  document.onselectstart = function() {
      return false;
  }


}


function rowClick(currenttr, lock) {
  console.log(currenttr);
  if (window.event.ctrlKey) {
      toggleRow(currenttr);
  }
  
  if (window.event.button === 0) {
      if (!window.event.ctrlKey && !window.event.shiftKey) {
          clearAll();
          toggleRow(currenttr);
      }
  
      if (window.event.shiftKey) {
          selectRowsBetweenIndexes([lastSelectedRow.rowIndex, currenttr.rowIndex])
      }
  }
}

function toggleRow(row) {
  row.className = row.className == 'selected' ? '' : 'selected';
  lastSelectedRow = row;
}

function selectRowsBetweenIndexes(indexes) {
  indexes.sort(function(a, b) {
      return a - b;
  });
  for (var i = indexes[0]; i <= indexes[1]; i++) {
        trs[i].className = 'selected';
  }
}

function clearAll() {
  for (var i = 0; i < trs.length; i++) {
      trs[i].className = 'not-header-row';
  }
}