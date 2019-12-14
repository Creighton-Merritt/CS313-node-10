
function add() {
    console.log("Enter add");
    var itemname = $("#itemName").val();
    var storeid = $("#hiddenStoreId").val();
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



$(document).ready(() => {
    $('#storeSubmit').click(() => {
        const requestURL = 'stores/' + $('#stores :selected').val();
        console.log("Request url", requestURL);
        $.ajax({
            url: requestURL,
            type: 'GET',
            dataType: 'json',
            success: (result) => {
                $('#tableBody').html("");
                $('#storeName').html(result[0].store_name);
                console.log('ajax success!', result);
                for (i=0 ; i < result.length ; i++) {
                    var num = (i + 1);
                    $('#tableBody').append('<tr><th scope="row">' + num + '</th><td class="text-left">' + result[i].item_name + '</td></tr>');
                }
                
                $('#stores').prop('selectedIndex', null);
                $('#hiddenStoreId').attr("value", result[0].store_id);
                $('#adding').css("visibility", "visible");
            }
        });
   });
});

