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
        if (result) {
            var trHTML = '';
            $.each(result, function (i, item) {
            trHTML += '<th scope="row">' + (i + 1) + '</th><td class="test-left">' + result.itemname + '</td></tr>'
            });
            $('#list').append(trHTML);
        } else {
            $("#list").text("Errir");
        }
    });
}