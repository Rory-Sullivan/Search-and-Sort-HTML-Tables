function searchTable (tableId, value) {
  const filter = value.toLowerCase()
  const table = document.getElementById(tableId)
  const rows = table.getElementsByTagName('tr')

  for (let i = 1; i < rows.length; i++) { // skip first row as this is the header row
    const row = rows[i]
    let cols = Array.from(row.getElementsByTagName('td'))
    cols = cols.concat(Array.from(row.getElementsByTagName('th')))

    let shouldHide = true

    cols.forEach(col => {
      const text = col.innerText
      if (text.toLowerCase().indexOf(filter) > -1) {
        shouldHide = false
      }
    })

    if (shouldHide) {
      row.style.display = 'none'
    } else {
      row.style.display = ''
    }
  }
}

function addSearchListeners (inputs) {
  inputs.forEach(input => {
    input.addEventListener('input', (event) => {
      const target = event.target
      const targetTableId = target.dataset.tableId
      const value = target.value
      searchTable(targetTableId, value)
    })
  })
}

const searchInputs = Array.from(document.getElementsByClassName('searchInput'))

addSearchListeners(searchInputs)
