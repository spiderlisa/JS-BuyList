$(function () {

    $('input').focus(function () {
        $(this).css('border-color', 'dodgerblue').css('outline', 'none');
    })
    $('input').blur(function () {
        $(this).css('border-color', 'rgba(34,36,38,.15)');
    })

    $('.add').click(function () {
        var t = $('input').val();
        if (t!="") {
            item(t);
        }
        $('input').val("");
    })

    var LIST = $('.left').find('.raised');
    var ITEM_TEMPLATE = $('.row-container').find('.empty').html();

    function item(title) {
        var node = $(ITEM_TEMPLATE);

        node.find(".left-column").text(title);

        node.find(".delete").click(function(){
            node.remove();
        });
        LIST.append(node);
    }

    $('button').focus(function() {
        this.blur();
    });
    $('button').mouseenter(function () {
        //$(this).find('.tooltip').css("opacity", "1")
        $(this).find('.tooltip').show(200);
        $(this).css('filter', 'brightness(93%)');
    })
    $('button').mouseleave(function () {
        $(this).find('.tooltip').hide(200);
        $(this).css('filter', 'brightness(100%)');
    })
    $('button').mousedown(function () {
        $(this).css('filter', 'brightness(83%)');
    })
    $('button').mouseup(function () {
        $(this).css('filter', 'brightness(93%)');
    })

})
