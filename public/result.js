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
    } else {
        $("#list").text("Error");
    }
});
}

function getList() {
    console.log("Step 1");
    var id = $("#stores").val();
    console.log(id);
    var params = {
        id: id
    };

    $.get("/stores", params, function(result) {
        if (result.success) {
            console.log("Back from get: ", result);
        } else {
            $("#list").text("Error");
        }
    });
}
    