
$(document).ready(() => {

    // Change list for stores on change of dropdown list
    $('#stores').change(() => {
        // Set store id and name values
        const storeVal = $('#stores :selected').val();
        const storeName = $('#stores :selected').text();

        // Request endpoint from server.js to get list for selected store
        const requestURL = 'stores/' + storeVal;

        //Use ajax to retrieve and display list without refreshing page
        $.ajax({
            url: requestURL,
            type: 'GET',
            dataType: 'json',
            success: (result) => {
                $('#tableBody').html("");
                $('#storeName').html(storeName);
                for (i=0 ; i < result.length ; i++) {
                    var num = (i + 1);
                    // Create table
                    $('#tableBody').append('<tr><th scope="row">' + num + '</th><td class="text-left">' + result[i].item_name + 
                    '</td><td><input type="checkbox" class="checkitem" value="' + result[i].item_id + '"></td></tr>');
                }
                
                // Reset store selection field
                // Unhide div where store name is dispalyed and options to add or delete items from current list
                $('#stores').prop('selectedIndex', null);
                $('#hiddenStoreId').attr("value", storeVal);
                $('#adding').css("visibility", "visible");
            }
        });
    });


    // Add to database
    $('#addbutton').click(() => {
        if($.trim($('#itemName').val()) === '') {
            alert('Please enter item');
            return;
        }
        var itemname = $("#itemName").val();
        var storeid = $("#hiddenStoreId").val();

        var params = {
            itemname: itemname,
            storeid: storeid
        };

        // Reset input field
        document.getElementById("itemName").value = "";

        // Add to the database and return updated table results.
        $.post("/addToDb", params, function(result) {
            if (result.success) {
                const requestURL = 'stores/' + $('#hiddenStoreId').val();
                $.ajax({
                    url: requestURL,
                    type: 'GET',
                    dataType: 'json',
                    success: (result) => {
                        $('#tableBody').html("");
                        for (i=0 ; i < result.length ; i++) {
                            var num = (i + 1);
                            $('#tableBody').append('<tr><th scope="row">' + num + '</th><td class="text-left">' + result[i].item_name + 
                            '</td><td><input type="checkbox" class="checkitem" value="' + result[i].item_id + '"></td></tr>');
                        }
                    }
                });
            } else {
                $('#tableBody').text("Error");
            }
        });
    })


    // listen for items being checked
    $('#checkall').change(function() {
        $('.checkitem').prop("checked", $(this).prop("checked"))
    })


    // Create array of checked items to be deleted
    $('#delsel').click(function() {
        var item_ids = $('.checkitem:checked').map(function() {
            return $(this).val();
        }).get();
        
        var params = {
            item_ids: item_ids,
        };

        const requestURL = 'stores/' + $('#hiddenStoreId').val();

        // Delete array of checked items and update table results
        $.post("/deleteFromDB", params, function(result) {
            if (result.success) {
                $.ajax({
                    url: requestURL,
                    type: 'GET',
                    dataType: 'json',
                    success: (result) => {
                        $('#tableBody').html("");
                        for (i=0 ; i < result.length ; i++) {
                            var num = (i + 1);
                            $('#tableBody').append('<tr><th scope="row">' + num + '</th><td class="text-left">' + result[i].item_name + 
                            '</td><td><input type="checkbox" class="checkitem" value="' + result[i].item_id + '"></td></tr>');
                        }
                    }
                });
            } else {
                $('#tableBody').text("Error");
            }
        });

    });
});
