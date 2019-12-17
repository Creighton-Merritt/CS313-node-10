
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
        console.log("Count", count);

        // need to figure out how to get the item_id after inserting it into the database
        // $('#tableBody').append('<tr><th scope="row">' + count + '</th><td class="text-left">' + itemname + 
        // '</td><td><input type="checkbox" class="checkitem" value="' + (count - 1) + '"></td></tr>');
    } else {
        $('#tableBody').text("Error");
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
                $('#storeName').html($('#stores :selected').text());
                console.log('ajax success!', result);
                for (i=0 ; i < result.length ; i++) {
                    var num = (i + 1);
                    $('#tableBody').append('<tr><th scope="row">' + num + '</th><td class="text-left">' + result[i].item_name + 
                    '</td><td><input type="checkbox" class="checkitem" value="' + result[i].item_id + '"></td></tr>');
                }
                
                $('#stores').prop('selectedIndex', null);
                $('#hiddenStoreId').attr("value", result[0].store_id);
                $('#adding').css("visibility", "visible");
            }
        });
   });
    $('#checkall').change(function() {
        $('.checkitem').prop("checked", $(this).prop("checked"))
    })
    $('#delsel').click(function() {
        var item_ids = $('.checkitem:checked').map(function() {
            return $(this).val();
        }).get();
        
        var params = {
            item_ids: item_ids,
        };

        console.log("Delete params", params);

        $.post("/deleteFromDB", params, function(result) {
            if (result.success) {
                console.log(result);
                console.log("Deleted");
                const requestURL = 'stores/' + $('#hiddenStoreId').val();
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
                            $('#tableBody').append('<tr><th scope="row">' + num + '</th><td class="text-left">' + result[i].item_name + 
                            '</td><td><input type="checkbox" class="checkitem" value="' + result[i].item_id + '"></td></tr>');
                        }
                        
                        $('#stores').prop('selectedIndex', null);
                        $('#hiddenStoreId').attr("value", result[0].store_id);
                        $('#adding').css("visibility", "visible");
                    }
                });
            } else {
                $('#tableBody').text("Error");
            }
        });

    });
});
