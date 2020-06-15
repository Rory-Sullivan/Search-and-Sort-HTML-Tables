# Search and Sort HTML Tables

A simple and easy way to add sorting and search/filter functionality to your
HTML table. See
[here](https://rory-sullivan.github.io/Search-and-Sort-HTML-Tables/) for a
working example.

## Features

* Support for multiple tables on a single page
* Icons indicating sort direction
* Support for hidden sort values
* Preserves previous sort

Note that this package will not work with paginated tables, the whole table has
to be visible on the page.

## Installation and Usage

Download the [latest version](https://github.com/Rory-Sullivan/Search-and-Sort-HTML-Tables/releases)
into your project (unpack it wherever you keep your static files or packages).
Add the following scripts to the page containing the table you wish to sort or
search (make sure to add the local path to the scripts). Put the script
somewhere after the table, usually just before the closing body tag.

```html
<script src="./LOCAL_PATH/scripts/searchTable.js"></script>
<script src="./LOCAL_PATH/scripts/sortTable.js"></script>
```

Use the example table provided in the example folder to build up your table or,
if you have and existing table follow the instructions bellow.

### Sort Feature

To make your table sortable add a class of `.sortTable` to the `<table>` element
and give it an `id` if it does not have one already. Make sure you have a
`<thead>` section, all the headers in this section will become clickable and
will sort the table based on the relevant column. By default, the sort function
sorts alphanumerically, if you would rather sort a column numerically add
`data-type="number"` to the appropriate header tag.

#### Custom sort values

Sometimes you will want to sort based on a value other than that displayed in
the table. For example if you have a status column with categories 'low',
'medium' and 'high', sorting this alphabetically would not make sense. In
this case you can add a `data-sort-value` attribute to the relevant `<td>`
tags. Data with a sort value will be sorted based on that value instead of
the inner text. In the example above we might assign a value of 1 to 'low', 2 to
'medium' and 3 to 'high' so that they are sorted in a more sensible order.

```html
<td data-sort-value="1">Low</td>
<td data-sort-value="2">Medium</td>
<td data-sort-value="3">High</td>
```

### Search/Filter Feature

Add a search input with a class of `.searchInput` as below. Set the
`data-table-id` attribute to the id of the table you wish to search.

```html
<input class="searchInput" data-table-id="TABLE_ID" type="search" placeholder="Search" aria-label="Search" aria-target="TABLE_ID">
```

### Multiple tables

For multiple tables simply repeat the above steps for each table, making sure
each table has a unique id.

## Notes on the Implementation

The sort function uses a simple bubble sort algorithm. While this is definitely
not the fastest or most efficient algorithm for the job it has some advantages.
Firstly the algorithm is small and easy to understand making the code base small
and easy for an end user to jump in and see what is going on. Secondly it is
very memory efficient, consuming virtually no extra memory above what it takes
to store the table. Finally bubble sort is stable meaning it preserves the
previous sort order of the elements.

If a header is clicked multiple times in order to swap between ascending and
descending order, the sort function is only implemented the first time.
Subsequent sorts make a call to a reverse function which simply reverses the
order of the table rather than sorting it again. This increases the efficiency
of subsequent sorts.
