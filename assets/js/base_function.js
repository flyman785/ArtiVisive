(function($) {
    try {
        includeHTML();
    }catch(e) {
        console.log('nessun inject di pagina')
    }

    $('.carousel-control-prev').hide();

    $('.carousel').carousel({
        interval: false
    });

    $('#artiVisiveModal').on('hidden.bs.modal', function (e) {
        $(this).find('img').remove();
    });

    $('img#imgModal').click(function (e) {
        if(e.target.tagName === "IMG" && typeof(e.target.dataset.image) !== 'undefined') {
            request(e.target);
        }
    });

    $('.carousel').bind('click', function (e) {
        if(e.target.tagName === "IMG" && typeof(e.target.dataset.image) !== 'undefined') {
            request(e.target);
        }
    });

    var openModal =  function(image_name, image_description) {
        var image = new Image();
        image.src = image_name;
        image.classList.add("img-fluid");
        image.classList.add("d-block");
        $('.modal-body').append(image);
        setTimeout(function(){
            $('#artiVisiveModal').find('.modal-title').text(image_description)
            $('#artiVisiveModal').modal('toggle');
        },300);
    };

    var request = function(target) {
        var image_name, image_description;
        $.getJSON( location.origin + "/assets/json/basic_data.json", function(json) {
            console.log( "success" );
            prop = $(target).data('image');
            image_name = json[prop].url;
            image_description = json[prop].description;
        }).fail(function() {
            console.log( "fail" );
        }).always(function() {
            console.log( "complete" );
            openModal(image_name, image_description);
        });
    }

})(jQuery);