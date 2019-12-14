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

    document.getElementById("itemName").value = "";

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

// $(document).ready(function() {
//     $('#storeSubmit').click(function() {
//         var storeid = $("#stores :selected").val();
//         console.log("From chooseList", storeid);
    
//         $.get("/get-store", storeid, function(result) {
//             if (result.success) {
//                 console.log("success in storeLists", result);
                
//                 var rows = JSON.parse(result);
//                 for (i=0 ; i < rows.length ; i++){
//                     var num = (i + 1);
//                     $('#tableBody').append('<tr><th scope="row">' + num + '</th><td class="text-left">' + result[i].item_name + '</td></tr>');
//                 }
//             }
//         });
//     });
// });


