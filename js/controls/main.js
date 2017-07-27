var control_json;
function get_posts() {
    $.ajax({
        type: "GET",
        url: "jsons/myControlSuggestionSetPlain.json",
        dataType: "json",
        success: function (json) {
            control_json = json;
            var desc;
            var likes_len = control_json.likes.length;
            if (likes_len > 10) {
                likes_len = 10;
            }
            for (var i = 0; i < likes_len; i++) {
                switch (translate_param) {
                    case "en":
                        desc = control_json.likes[i].description_en;
                        break;
                    case "sw":
                        desc = control_json.likes[i].description_sw;
                        break;
                    case "du":
                        desc = control_json.likes[i].description_du;
                        break;
                    default:
                        desc = control_json.likes[i].description_en;
                }
                $('#container').append('<div class="mix likes' + control_json.likes[i].dimension + '"><div class="tiles_li"><p class="title">' + desc + '</p></div</div>');
            }

            if (control_json.likes.length > 0) {
                $('#likes_p').show();
                $('#pagination').twbsPagination({
                    totalPages: Math.ceil(control_json.likes.length / 10),
                    visiblePages: "5",
                    initiateStartPageClick: false,
                    onPageClick: function (event, page) {
                        $('#container').empty();
                        var start = (page - 1) * 10;
                        var end = start + 10;
                        if (end > control_json.likes.length) {
                            end = control_json.likes.length;
                        }
                        for (var i = start; i < end; i++) {
                            switch (translate_param) {
                                case "en":
                                    desc = control_json.likes[i].description_en;
                                    break;
                                case "sw":
                                    desc = control_json.likes[i].description_sw;
                                    break;
                                case "du":
                                    desc = control_json.likes[i].description_du;
                                    break;
                                default:
                                    desc = control_json.likes[i].description_en;
                            }
                            $('#container').append('<div class="mix likes' + control_json.likes[i].dimension + '"><div class="tiles_li"><p class="title">' + desc + '</p></div</div>');
                        }
                        $('#container').mixItUp('destroy').mixItUp({});
                    }
                });
            }
            else {
                $('#likes_no').show();
            }
            $('#container').mixItUp({});
        }
    });
}
$("#about").click(function () {
    $('#myModal').reveal();
});
var classes = "";
$("#buttons_upper").find('.btn_material').click(function () {
    if (!($(this).hasClass('active'))) {
        $('#likes_no,#posts_no,#likes_p,#images_no').hide();
        $('#container').empty();
        if ($('#pagination').data("twbs-pagination")) {
            $('#pagination').twbsPagination('destroy');
        }
        $("#buttons_upper").find('.btn_material').removeClass('active');
        $(this).addClass('active');
        var prefix = $(this).attr('id');
        classes = "";
        $('#buttons').find('.active').each(function (i, obj) {
            classes = classes + "." + prefix + $(this).attr('id') + ",";
        });
        if (prefix === "likes") {
            var length = 0;
            for (var i = 0; i < control_json.likes.length; i++) {
                if (classes.indexOf(control_json.likes[i].dimension) > -1) {
                    length++;
                }
            }
            if (length > 0) {
                $('#likes_p').show();
                $('#pagination').twbsPagination({
                    totalPages: Math.ceil(length / 10),
                    visiblePages: "5",
                    initiateStartPageClick: false,
                    onPageClick: function (event, page) {
                        $('#container').empty();
                        var start = (page - 1) * 10;
                        var end = start + 10;
                        if (end > length) {
                            end = length;
                        }
                        for (var i = 0, j = 0; i < control_json.likes.length; i++) {
                            if (j < start) {
                                if (classes.indexOf(control_json.likes[i].dimension) > -1) {
                                    j++;
                                }
                            }
                            else {
                                if (classes.indexOf(control_json.likes[i].dimension) > -1) {
                                    j++;
                                    var desc;
                                    switch (translate_param) {
                                        case "en":
                                            desc = control_json.likes[i].description_en;
                                            break;
                                        case "sw":
                                            desc = control_json.likes[i].description_sw;
                                            break;
                                        case "du":
                                            desc = control_json.likes[i].description_du;
                                            break;
                                        default:
                                            desc = control_json.likes[i].description_en;
                                    }
                                    $('#container').append('<div class="mix likes' + control_json.likes[i].dimension + '"><div class="tiles_li"><p class="title">' + desc + '</p></div</div>');
                                }
                                if (j === end) {
                                    i = control_json.likes.length;
                                }
                            }
                        }
                        $('#container').mixItUp('destroy').mixItUp({});
                    }
                });
                for (var i = 0, j = 0; j < 10; i++) {
                    if (i === control_json.likes.length - 1) {
                        j = 10;
                    }
                    if (classes.indexOf(control_json.likes[i].dimension) > -1) {
                        j++;
                        var desc;
                        switch (translate_param) {
                            case "en":
                                desc = control_json.likes[i].description_en;
                                break;
                            case "sw":
                                desc = control_json.likes[i].description_sw;
                                break;
                            case "du":
                                desc = control_json.likes[i].description_du;
                                break;
                            default:
                                desc = control_json.likes[i].description_en;
                        }
                        $('#container').append('<div class="mix likes' + control_json.likes[i].dimension + '"><div class="tiles_li"><p class="title">' + desc + '</p></div</div>');

                    }
                }
                $('#container').mixItUp('destroy').mixItUp({});
            }
            else {
                $('#likes_no').show();
            }
        }
        else if (prefix === "posts") {
            var length_posts = 0;
            for (var i = 0; i < control_json.posts.length; i++) {
                if (classes.indexOf(control_json.posts[i].dimension) > -1) {
                    length_posts++;
                }
            }
            if (length_posts > 0) {
                $('#pagination').twbsPagination({
                    totalPages: Math.ceil(length_posts / 10),
                    visiblePages: "5",
                    initiateStartPageClick: false,
                    onPageClick: function (event, page) {
                        $('#container').empty();
                        var start = (page - 1) * 10;
                        var end = start + 10;
                        if (end > length) {
                            end = length;
                        }

                        for (var i = 0, j = 0; i < control_json.posts.length; i++) {
                            if (j < start) {
                                if (classes.indexOf(control_json.posts[i].dimension) > -1) {
                                    j++;
                                }
                            }
                            else {
                                if (classes.indexOf(control_json.posts[i].dimension) > -1) {
                                    j++;
                                    switch (translate_param) {
                                        case "en":
                                            desc = control_json.posts[i].description_en;
                                            break;
                                        case "sw":
                                            desc = control_json.posts[i].description_sw;
                                            break;
                                        case "du":
                                            desc = control_json.posts[i].description_du;
                                            break;
                                        default:
                                            desc = control_json.posts[i].description_en;
                                    }
                                    $('#container').append('<div class="mix posts' + control_json.posts[i].dimension + '"><div class="tiles_li"><p class="title">' + desc + '</p></div></div>');
                                }
                                if (j === end) {
                                    i = control_json.posts.length;
                                }
                            }
                        }
                        $('#container').mixItUp('destroy').mixItUp({});
                    }
                });
                for (var i = 0, j = 0; j < 10; i++) {
                    if (i === control_json.posts.length - 1) {
                        j = 10;
                    }
                    if (classes.indexOf(control_json.posts[i].dimension) > -1) {
                        j++;
                        switch (translate_param) {
                            case "en":
                                desc = control_json.posts[i].description_en;
                                break;
                            case "sw":
                                desc = control_json.posts[i].description_sw;
                                break;
                            case "du":
                                desc = control_json.posts[i].description_du;
                                break;
                            default:
                                desc = control_json.posts[i].description_en;
                        }
                        $('#container').append('<div class="mix posts' + control_json.posts[i].dimension + '"><div class="tiles_li"><p class="title">' + desc + '</p></div></div>');

                    }
                }
                $('#container').mixItUp('destroy').mixItUp({});
            }
            else {
                $('#posts_no').show();
            }
        }
        else {
            var length_images = 0;
            for (var i = 0; i < control_json.images.length; i++) {
                if (classes.indexOf(control_json.images[i].dimension) > -1) {
                    length_images++;
                }
            }
            if (length_images > 0) {
                $('#pagination').twbsPagination({
                    totalPages: Math.ceil(length_images / 10),
                    visiblePages: "5",
                    initiateStartPageClick: false,
                    onPageClick: function (event, page) {
                        $('#container').empty();
                        var start = (page - 1) * 10;
                        var end = start + 10;
                        if (end > length) {
                            end = length;
                        }
                        for (var i = 0, j = 0; i < control_json.images.length; i++) {
                            if (j < start) {
                                if (classes.indexOf(control_json.images[i].dimension) > -1) {
                                    j++;
                                }
                            }
                            else {
                                if (classes.indexOf(control_json.images[i].dimension) > -1) {
                                    j++;
                                    switch (translate_param) {
                                        case "en":
                                            desc = control_json.images[i].description_en;
                                            break;
                                        case "sw":
                                            desc = control_json.images[i].description_sw;
                                            break;
                                        case "du":
                                            desc = control_json.images[i].description_du;
                                            break;
                                        default:
                                            desc = control_json.images[i].description_en;
                                    }
                                    $('#container').append('<div class="mix posts' + control_json.images[i].dimension + '"><div class="tiles_li"><p class="title">' + desc + '</p><img style="width: 350px" src="../img/' + control_json.images[i].id + '"></div></div>');
                                }
                                if (j === end) {
                                    i = control_json.images.length;
                                }
                            }
                        }
                        $('#container').mixItUp('destroy').mixItUp({});
                    }
                });
                for (var i = 0, j = 0; j < 10; i++) {
                    if (i === control_json.images.length - 1) {
                        j = 10;
                    }
                    if (classes.indexOf(control_json.images[i].dimension) > -1) {
                        j++;
                        switch (translate_param) {
                            case "en":
                                desc = control_json.images[i].description_en;
                                break;
                            case "sw":
                                desc = control_json.images[i].description_sw;
                                break;
                            case "du":
                                desc = control_json.images[i].description_du;
                                break;
                            default:
                                desc = control_json.images[i].description_en;
                        }
                        $('#container').append('<div class="mix posts' + control_json.images[i].dimension + '"><div class="tiles_li"><p class="title">' + desc + '</p><img style="width: 350px" src="../img/' + control_json.images[i].id + '"></div></div>');
                    }
                }
                $('#container').mixItUp('destroy').mixItUp({});
            }
            else {
                $('#images_no').show();
            }
        }
    }
});

$("#buttons").find('.btn_material').click(function () {
    $(this).toggleClass('active');
    var prefix = $("#buttons_upper").find('.active').attr('id');
    classes = "";
    $('#buttons').find('.active').each(function (i, obj) {
        classes = classes + "." + prefix + $(this).attr('id') + ",";
    });
    $('#likes_no,#posts_no,#likes_p,#images_no').hide();
    $('#container').empty();
    if ($('#pagination').data("twbs-pagination")) {
        $('#pagination').twbsPagination('destroy');
    }
    if (prefix === "likes") {
        var length = 0;
        for (var i = 0; i < control_json.likes.length; i++) {
            if (classes.indexOf(control_json.likes[i].dimension) > -1) {
                length++;
            }
        }
        if (length > 0) {
            $('#likes_p').show();
            $('#pagination').twbsPagination({
                totalPages: Math.ceil(length / 10),
                visiblePages: "5",
                initiateStartPageClick: false,
                onPageClick: function (event, page) {
                    $('#container').empty();
                    var start = (page - 1) * 10;
                    var end = start + 10;
                    if (end > length) {
                        end = length;
                    }
                    for (var i = 0, j = 0; i < control_json.likes.length; i++) {
                        if (j < start) {
                            if (classes.indexOf(control_json.likes[i].dimension) > -1) {
                                j++;
                            }
                        }
                        else {
                            if (classes.indexOf(control_json.likes[i].dimension) > -1) {
                                j++;
                                var desc;
                                switch (translate_param) {
                                    case "en":
                                        desc = control_json.likes[i].description_en;
                                        break;
                                    case "sw":
                                        desc = control_json.likes[i].description_sw;
                                        break;
                                    case "du":
                                        desc = control_json.likes[i].description_du;
                                        break;
                                    default:
                                        desc = control_json.likes[i].description_en;
                                }
                                $('#container').append('<div class="mix likes' + control_json.likes[i].dimension + '"><div class="tiles_li"><p class="title">' + desc + '</p></div</div>');

                            }
                            if (j === end) {
                                i = control_json.likes.length;
                            }
                        }
                    }
                    $('#container').mixItUp('destroy').mixItUp({});
                }
            });
            for (var i = 0, j = 0; j < 10; i++) {
                if (i === control_json.likes.length - 1) {
                    j = 10;
                }
                if (classes.indexOf(control_json.likes[i].dimension) > -1) {
                    j++;
                    var desc;
                    switch (translate_param) {
                        case "en":
                            desc = control_json.likes[i].description_en;
                            break;
                        case "sw":
                            desc = control_json.likes[i].description_sw;
                            break;
                        case "du":
                            desc = control_json.likes[i].description_du;
                            break;
                        default:
                            desc = control_json.likes[i].description_en;
                    }
                    $('#container').append('<div class="mix likes' + control_json.likes[i].dimension + '"><div class="tiles_li"><p class="title">' + desc + '</p></div</div>');
                }
            }
            $('#container').mixItUp('destroy').mixItUp({});
        }
        else {
            $('#likes_no').show();
        }
    }
    else if (prefix === "posts") {
        var length_posts = 0;
        for (var i = 0; i < control_json.posts.length; i++) {
            if (classes.indexOf(control_json.posts[i].dimension) > -1) {
                length_posts++;
            }
        }
        if (length_posts > 0) {
            $('#pagination').twbsPagination({
                totalPages: Math.ceil(length_posts / 10),
                visiblePages: "5",
                initiateStartPageClick: false,
                onPageClick: function (event, page) {
                    $('#container').empty();
                    var start = (page - 1) * 10;
                    var end = start + 10;
                    if (end > length) {
                        end = length;
                    }
                    for (var i = 0, j = 0; i < control_json.posts.length; i++) {
                        if (j < start) {
                            if (classes.indexOf(control_json.posts[i].dimension) > -1) {
                                j++;
                            }
                        }
                        else {
                            if (classes.indexOf(control_json.posts[i].dimension) > -1) {
                                j++;
                                for (var i = 0; i < control_json.posts.length; i++) {
                                    switch (translate_param) {
                                        case "en":
                                            desc = control_json.posts[i].description_en;
                                            break;
                                        case "sw":
                                            desc = control_json.posts[i].description_sw;
                                            break;
                                        case "du":
                                            desc = control_json.posts[i].description_du;
                                            break;
                                        default:
                                            desc = control_json.posts[i].description_en;
                                    }
                                    $('#container').append('<div class="mix posts' + control_json.posts[i].dimension + '"><div class="tiles_li"><p class="title">' + desc + '</p></div></div>');

                                }
                            }
                            if (j === end) {
                                i = control_json.posts.length;
                            }
                        }
                    }
                    $('#container').mixItUp('destroy').mixItUp({});
                }
            });
            for (var i = 0, j = 0; j < 10; i++) {
                if (i === control_json.posts.length - 1) {
                    j = 10;
                }
                if (classes.indexOf(control_json.posts[i].dimension) > -1) {
                    j++;
                    for (var i = 0; i < control_json.posts.length; i++) {
                        switch (translate_param) {
                            case "en":
                                desc = control_json.posts[i].description_en;
                                break;
                            case "sw":
                                desc = control_json.posts[i].description_sw;
                                break;
                            case "du":
                                desc = control_json.posts[i].description_du;
                                break;
                            default:
                                desc = control_json.posts[i].description_en;
                        }
                        $('#container').append('<div class="mix posts' + json.posts[i].dimension + '"><div class="tiles_li"><p class="title">' + desc + '</p></div></div>');

                    }
                }
            }
            $('#container').mixItUp('destroy').mixItUp({});
        }
        else {
            $('#posts_no').show();
        }
    }
    else {

        var length_images = 0;
        for (var i = 0; i < control_json.images.length; i++) {
            if (classes.indexOf(control_json.images[i].dimension) > -1) {
                length_images++;
            }
        }
        if (length_images > 0) {
            $('#pagination').twbsPagination({
                totalPages: Math.ceil(length_images / 10),
                visiblePages: "5",
                initiateStartPageClick: false,
                onPageClick: function (event, page) {
                    $('#container').empty();
                    var start = (page - 1) * 10;
                    var end = start + 10;
                    if (end > length) {
                        end = length;
                    }
                    for (var i = 0, j = 0; i < control_json.images.length; i++) {
                        if (j < start) {
                            if (classes.indexOf(control_json.images[i].dimension) > -1) {
                                j++;
                            }
                        }
                        else {
                            if (classes.indexOf(control_json.images[i].dimension) > -1) {
                                j++;
                                for (var i = 0; i < control_json.images.length; i++) {
                                    switch (translate_param) {
                                        case "en":
                                            desc = control_json.images[i].description_en;
                                            break;
                                        case "sw":
                                            desc = control_json.images[i].description_sw;
                                            break;
                                        case "du":
                                            desc = control_json.images[i].description_du;
                                            break;
                                        default:
                                            desc = control_json.images[i].description_en;
                                    }
                                    $('#container').append('<div class="mix posts' + control_json.images[i].dimension + '"><div class="tiles_li"><p class="title">' + desc + '</p><img style="width: 350px" src="../img/' + control_json.images[i].id + '"></div></div>');
                                }
                            }
                            if (j === end) {
                                i = control_json.images.length;
                            }
                        }
                    }
                    $('#container').mixItUp('destroy').mixItUp({});
                }
            });
            for (var i = 0, j = 0; j < 10; i++) {
                if (i === control_json.images.length - 1) {
                    j = 10;
                }
                if (classes.indexOf(control_json.images[i].dimension) > -1) {
                    j++;
                    for (var i = 0; i < control_json.images.length; i++) {
                        switch (translate_param) {
                            case "en":
                                desc = control_json.images[i].description_en;
                                break;
                            case "sw":
                                desc = control_json.images[i].description_sw;
                                break;
                            case "du":
                                desc = control_json.images[i].description_du;
                                break;
                            default:
                                desc = control_json.images[i].description_en;
                        }
                        $('#container').append('<div class="mix posts' + control_json.images[i].dimension + '"><div class="tiles_li"><p class="title">' + desc + '</p><img style="width: 350px" src="../img/' + control_json.images[i].id + '"></div></div>');
                    }
                }
            }
            $('#container').mixItUp('destroy').mixItUp({});
        }
        else {
            $('#images_no').show();
        }
    }
});

$('.user_guide').click(function () {
    $('#myModal2').reveal();
});
$('.tour_next').click(function () {
    $("#myModal2").animate({
        scrollTop: 0
    }, 100);
    $('div[id^=tour]').hide();
    $('#' + $(this).attr("data-next")).show();
});
$('.tour_prev').click(function () {
    $("#myModal2").animate({
        scrollTop: 0
    }, 100);
    $('div[id^=tour]').hide();
    $('#' + $(this).attr("data-prev")).show();
});
