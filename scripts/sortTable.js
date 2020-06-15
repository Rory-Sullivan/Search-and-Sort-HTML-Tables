function sortTable (tableId, col, type) {
  const table = document.getElementById(tableId)
  const rows = table.rows

  let sorting = true

  while (sorting) {
    sorting = false

    for (let i = 1; i < rows.length - 1; i++) {
      let swap = false
      let x = rows[i].querySelectorAll('th, td')[col]
      let y = rows[i + 1].querySelectorAll('th, td')[col]

      if (x.dataset.sortValue) {
        x = x.dataset.sortValue
        y = y.dataset.sortValue
      } else {
        x = x.innerHTML
        y = y.innerHTML
      }

      if (type === 'number') {
        x = Number(x)
        y = Number(y)
      }

      if (x > y) {
        swap = true
      }

      if (swap) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i])
        sorting = true
      }
    }
  }
}

function reverseTable (tableId) {
  const table = document.getElementById(tableId)
  const rows = table.rows
  const lastRow = rows.length - 1

  for (let i = 1; i < rows.length; i++) {
    rows[i].parentNode.insertBefore(rows[lastRow], rows[i])
  }
}

function getHeaders (table) {
  const head = table.getElementsByTagName('thead')[0]
  return Array.from(head.getElementsByTagName('th'))
}

function addSortListeners (tables) {
  tables.forEach(table => {
    const headers = getHeaders(table)
    const tableId = table.id

    for (let i = 0; i < headers.length; i++) {
      const header = headers[i]
      const columnNo = i
      let sortType

      if (header.dataset.type) {
        sortType = header.dataset.type
      } else {
        sortType = ''
      }

      header.addEventListener('click', (event) => {
        const target = event.target
        const sorted = (target.dataset.sorted === 'true')

        if (sorted) {
          reverseTable(tableId)
          const arrow = target.getElementsByTagName('span')[0]
          if (arrow.innerHTML === '↑') {
            arrow.innerHTML = '↓'
          } else {
            arrow.innerHTML = '↑'
          }
        } else {
          headers.forEach(header2 => {
            const arrow = header2.getElementsByTagName('span')[0]
            if (arrow) {
              if (header2.dataset.sorted === 'true') {
                arrow.innerHTML = '•'
              } else {
                arrow.innerHTML = ''
              }
            } else {
              header2.innerHTML += '<span></span>'
            }
            header2.dataset.sorted = false
          })

          sortTable(tableId, columnNo, sortType)
          target.dataset.sorted = true
          target.getElementsByTagName('span')[0].innerHTML = '↑'
        }
      })
    }
  })
}

const TABLES = Array.from(document.getElementsByClassName('sortTable'))

addSortListeners(TABLES)
