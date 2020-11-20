"use strict";

$(document).ready(function () {
    var total = 0;

    $("ul img").each(function () {

        var temp = this.src;


        $(this).hover(function () {
                this.src = this.id;
            },
            function () {
                this.src = temp;
            });
        $(this).click(function (evt) {


            if (this.alt === 'coffee') {
                $('#order').append($('<option>', {
                    value: 1,
                    text: "$1.75 - Coffee"
                }));
                total += 1.75;
            } else if (this.alt === 'espresso') {
                $('#order').append($('<option>', {
                    value: 1,
                    text: "$1.95 - Espresso"
                }));
                total += 1.95;
            } else if (this.alt === 'latte') {
                $('#order').append($('<option>', {
                    value: 1,
                    text: "$2.95 - Latte"
                }));
                total += 2.95;
            } else if (this.alt === 'cappuccino') {
                $('#order').append($('<option>', {
                    value: 1,
                    text: "$3.45 - Cappuccino"
                }));
                total += 3.45;
            } else if (this.alt === 'biscotti') {
                $('#order').append($('<option>', {
                    value: 1,
                    text: "$1.95 - Biscotti"
                }));
                total += 1.95;
            } else if (this.alt === 'scone') {
                $('#order').append($('<option>', {
                    value: 1,
                    text: "$2.95 - Scone"
                }));
                total += 2.95;
            }


            $("#total")[0].innerHTML = "Total: $" + Number(total).toFixed(2);


            evt.preventDefault();

        });
    });

    $("#place_order").click(function () {


        window.location.href = 'checkout.html';
    });


    $("#clear_order").click(function () {


        $('#order').empty();
        $("#total")[0].innerHTML = "&nbsp;";
        total = 0;
    });

});
