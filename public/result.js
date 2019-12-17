
$(document).ready(() => {
    $('#addbutton').click(() => {
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
                const requestURL = 'stores/' + $('#hiddenStoreId').val();
                console.log("Request url for add to db", requestURL);
                $.ajax({
                    url: requestURL,
                    type: 'GET',
                    dataType: 'json',
                    success: (result) => {
                        $('#tableBody').html("");
                        //$('#storeName').html(result[0].store_name);
                        console.log('ajax success!', result);
                        for (i=0 ; i < result.length ; i++) {
                            var num = (i + 1);
                            $('#tableBody').append('<tr><th scope="row">' + num + '</th><td class="text-left">' + result[i].item_name + 
                            '</td><td><input type="checkbox" class="checkitem" value="' + result[i].item_id + '"></td></tr>');
                        }
                        // $('#stores').prop('selectedIndex', null);
                        // $('#hiddenStoreId').attr("value", result[0].store_id);
                        // $('#adding').css("visibility", "visible");
                    }
                });
            } else {
                $('#tableBody').text("Error");
            }
        });
    });


    $('#stores').change(() => {
        const storeVal = $('#stores :selected').val();
        const storeName = $('#stores :selected').text();
        const requestURL = 'stores/' + storeVal;
        console.log("Request url", requestURL);
        $.ajax({
            url: requestURL,
            type: 'GET',
            dataType: 'json',
            success: (result) => {
                $('#tableBody').html("");
                $('#storeName').html(storeName);
                console.log('ajax success!', result);
                for (i=0 ; i < result.length ; i++) {
                    var num = (i + 1);
                    $('#tableBody').append('<tr><th scope="row">' + num + '</th><td class="text-left">' + result[i].item_name + 
                    '</td><td><input type="checkbox" class="checkitem" value="' + result[i].item_id + '"></td></tr>');
                }
                
                $('#stores').prop('selectedIndex', null);
                $('#hiddenStoreId').attr("value", storeVal);
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
                $.ajax({
                    url: requestURL,
                    type: 'GET',
                    dataType: 'json',
                    success: (result) => {
                        $('#tableBody').html("");
                        //$('#storeName').html(result[0].store_name);
                        console.log('ajax success!', result);
                        for (i=0 ; i < result.length ; i++) {
                            var num = (i + 1);
                            $('#tableBody').append('<tr><th scope="row">' + num + '</th><td class="text-left">' + result[i].item_name + 
                            '</td><td><input type="checkbox" class="checkitem" value="' + result[i].item_id + '"></td></tr>');
                        }
                        
                        // $('#stores').prop('selectedIndex', null);
                        // $('#hiddenStoreId').attr("value", result[0].store_id);
                        // $('#adding').css("visibility", "visible");
                    }
                });
            } else {
                $('#tableBody').text("Error");
            }
        });

    });
});
