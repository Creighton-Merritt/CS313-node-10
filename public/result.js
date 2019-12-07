function add() {
    console.log("Enter add");
    var itemname = $("#itemName").val();
    var storeid = $("#store").val();
    console.log(itemname);
    console.log(storeid);

    var params = {
        itemname: itemname,
        storeid: storeid
    };

    $.post("/addToDb", params, function(result) {
    if (result.success) {
        console.log(result);
        var count = $('#table tr').length;
        var trHTML = "";
        trHTML += '<tr><th scope="row">' + count + '</th><td class="text-left">' + itemname + '</td></tr>';
        $('#list').append(trHTML);
        document.getElementById("itemName").innerHTML = "";
    } else {
        $("#list").text("Error");
    }
});
}