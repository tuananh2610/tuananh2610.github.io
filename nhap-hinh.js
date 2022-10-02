$(document).ready(function () {

    // Thêm dữ liệu
    var btn = $('#harvest-btn')
    var input = $('input')
    // console.log(input.eq(3).val())
    // console.log(btn)

    loadData()

    btn.click(function () {

        // Get StartDay
        var dateStart = new Date($('#date-start-input').val());
        var dayStart = dateStart.getDate();
        var monthStart = dateStart.getMonth() + 1;
        var yearStart = dateStart.getFullYear();
        var fullDayStart = [dayStart, monthStart, yearStart].join('/')
        // console.log(fullDayStart)

        // Get EndDay
        var dateEnd = new Date($('#date-end-input').val());
        var dayEnd = dateEnd.getDate();
        var monthEnd = dateEnd.getMonth() + 1;
        var yearEnd = dateEnd.getFullYear();
        var fullDayEnd = [dayEnd, monthEnd, yearEnd].join('/')
        // console.log(fullDayEnd)

        $.ajax({
            url: "https://62b72e0d0d4a2cd3e1a81f9e.mockapi.io/api/v1/Nhom2",
            method: 'POST',
            data: {
                name: input.eq(0).val(),
                quantity: input.eq(1).val(),
                start: fullDayStart,
                end: fullDayEnd,
            },
            success: function (result) {
                console.log(result)
                alert('Gui thanh cong')
                loadData()
            }
        })
    })

    // Show

    function loadData() {
        $.ajax({
            url: "https://62b72e0d0d4a2cd3e1a81f9e.mockapi.io/api/v1/Nhom2",
            method: 'GET',
            success: function (result) {
                var tableBody = $('#data-wrapper tbody');
                tableBody.empty();
                $(result).each(function (index, item) {
                    tableBody.append(
                        '<tr>    <td>' + item.stt + '</td>' +
                        '<td>' + item.name + '</td>' +
                        '<td>' + item.quantity + '</td>' +
                        '<td>' + item.start + '</td>' +
                        '<td>' + item.end + '</td>' +
                        '<td>' + item.state + '</td>' +
                        '<td> <button class="edit-btn" user-edit-btn onclick=editData(' + item.stt + ')> <i class="fa-solid fa-pen-to-square icon-edit"></i> </button> </td>' +
                        '<td> <button class="delete-btn" onclick=deleteData(' + item.stt + ')><i class="fa-solid fa-trash-can icon-delete"></i> </button> </td> </tr>',
                    )
                })
            }
        })
    }


    // Delete
    deleteData = function(id){
        $.ajax({
            url: `https://62b72e0d0d4a2cd3e1a81f9e.mockapi.io/api/v1/Nhom2${id}`,
            method: 'DELETE',
            success:function(){
                alert('Xoa thanh cong')
                loadData()
            }
        })

    }

    // PUT
    editData = function(id){
        $.ajax({
            url: "https://62b72e0d0d4a2cd3e1a81f9e.mockapi.io/api/v1/Nhom2",
            method: 'GET',
            success:function(result){
                // input.eq(0).val(result.name) 
                // input.eq(1).val(result.quantity) 
                input.eq(0).val(result.name)
            }
        })
    }

});

