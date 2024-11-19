$(document).ready(function() {
    $('.carousel').slick({
        infinite: true,
        speed: 600,
        slidesToShow: 1,
        adaptiveHeight: true,
        autoplay: true,
        autoplaySpeed: 4000,
        arrows: false, // Disable arrows
        dots: false    // Disable dots
    });
});
