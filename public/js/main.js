
$(document).ready(function() {
    $('.menu').click(toggleNav);
 
    function toggleNav() {
        $('#close').click(toggleNav);
        $('#close').toggleClass('on');
        $('.nav-main').toggleClass('open');
        $('.box-left').toggleClass('open');
        $('.nav-itm').toggleClass('open');
        $('.not-div').toggleClass('low');
    }

    $(document).scroll(fixed);
    // $(document).on('load', fixed)
    setTimeout(function() {
        $('.intro').css({'display': 'none'})
    }, 2700);
})

function fixed() {
    if(window.pageYOffset > 100) {
        $('.logo-img').addClass('fixedover');
        $('.header-main').addClass('fixedover')
        $('.search-box').css({'color': '#000'})
        $('.line').css({'background-color': '#000'})
    }else{
        $('.logo-img').removeClass('fixedover');
        $('.header-main').removeClass('fixedover')
        $('.search-box').css({'color': '#fff'})
        $('.line').css({'background-color': '#fff'})
    }
}

document.onload = fixed();