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
            $("#list").text("Successfully added");
        } else {
            $("#list").text("Errir");
        }
    });
}