function addItemToTable() {
    var item = document.getElementById(itemName).innerHTML;
    const table = document.getElementById('#table');
    const rowNumber = table.rows.length + 1;

    const newRow = '<tr><td>' + rowNumber + '</td><td>' + item + '</td><tr>';
    table.insertAdjacentHTML('beforeEnd', newRow);
}