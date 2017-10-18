$(function () {

    var timer;
    $('button').mouseenter(function () {
        $(this).css('filter', 'brightness(93%)');
        timer = setTimeout(function () {
            $(this).find('.tooltip').css("opacity", "1")
            $(this).find('.tooltip').show(200);
        }, 1500);
    }).mouseleave(function () {
        clearTimeout(timer);
        $(this).find('.tooltip').hide(200);
        $(this).css('filter', 'brightness(100%)');
    }).mousedown(function () {
        $(this).css('filter', 'brightness(83%)');
    }).mouseup(function () {
        $(this).css('filter', 'brightness(93%)');
    });

    $('#name').focus(function () {
        $(this).css('border-color', 'dodgerblue');
    }).blur(function () {
        $(this).css('border-color', 'rgba(34,36,38,.15)');
    });


    /* Adding new item */

    $(".add").click(function () {
        var text = $("#name").val();
        if (text!="") {
            add_item(text);
            $("#name").val("").blur();
        }
    });

    $(document).keypress(function (e) {
        if (e.which == 13 && $("#name").is(":focus")) {
            var text = $("#name").val();
            if (text!="") {
                add_item(text);
                $("#name").val("").blur();
            }
        }
    })

    var LIST = $("#main-list");
    var ITEM_TEMPLATE = $(".one-item").html();
    var SMALL_ITEM_TEMPLATE = $(".small-item").html();
    var LEFT_LIST = $("#left-products");
    var BOUGHT_LIST = $("#bought-products");

    function add_item(name) {

        var bought = false;
        var fade_time = 300;
        var $item = $(ITEM_TEMPLATE);
        var $small = $(SMALL_ITEM_TEMPLATE);
        $item.find('.left-column').text(name);
        $small.find('.title').text(name);

        var quantity = 1;

        $item.find(".left-column").on('click', function () {
            $item.find(".left-column").hide();
            $item.find(".left-name").show().val(name);

            $(document).keypress(function (e) {
                if( !($("#name").is(":focus")) && ($item.find(".left-name").val()!="") ) {
                    var new_name = $item.find(".left-name").val();
                    $item.find(".left-name").hide();
                    $item.find(".left-column").text(new_name).show();
                    name = new_name;
                }
            })
        })

        $item.find('.delete').click(function () {
            $item.slideUp(fade_time, function () {
                $item.remove();
            });
            $small.fadeOut(fade_time, function () {
                $small.remove();
            });

        });

        $item.find('#plus').click(function () {
            quantity += 1;
            $small.find('.quantity-square').html(quantity);
            $item.find('.quantity-square').fadeOut(fade_time, function () {
                $item.find('.quantity-square').html(quantity);
                $item.find('.quantity-square').fadeIn(fade_time, function () {
                })
            });
            console.log(quantity)

        });
        $item.find('#minus').click(function () {
            if (quantity > 1) {
                quantity -= 1;
                $small.find('.quantity-square').html(quantity);
                $item.find('.quantity-square').fadeOut(fade_time, function () {
                    $item.find('.quantity-square').html(quantity);
                    $item.find('.quantity-square').fadeIn(fade_time, function () {
                    })
                });
            } else {
            }
            console.log(quantity)

        });

        $item.find('.buy').click(function () {
            bought = !bought;

            $item.fadeOut(fade_time, function () {
                if (bought) {
                    $item.find('.round').css('visibility', 'hidden');
                    $item.find('.delete').hide();
                    $item.find('.buy').text('Не куплено').css('float', 'right');

                    $small.fadeOut(fade_time, function () {
                        $item.find('.left-column').css('text-decoration', 'line-through');
                        $small.hide().appendTo(BOUGHT_LIST).fadeIn(fade_time);
                    });
                    $small.find('.label').css('text-decoration', 'line-through');

                } else {
                    $item.find('.round').css('visibility', 'visible');
                    $item.find('.delete').show();
                    $item.find('.buy').text('Куплено').css('float', 'left');

                    $small.fadeOut(fade_time, function () {
                        $item.find('.left-column').css('text-decoration', 'none');
                        $small.hide().appendTo(LEFT_LIST).fadeIn(fade_time);
                    });

                    $small.find('.label').css('text-decoration', 'none');

                }
                $item.fadeIn(fade_time);
            });
        });


        if (name.replace(/\s/g, '').length) {
            $item.hide().appendTo(LIST).slideDown(fade_time);
            $small.hide().appendTo(LEFT_LIST).fadeIn(fade_time);
        }
    }

})
