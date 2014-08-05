(function ($) {
    "use strict";
    function displayInput() {
        var paragraph = $('.js-input-paragraph>textarea').val(),
            wordsArray = paragraph.split(' ');

        function createElement(item) {
            var itemSpan = $('<span></span>').text(item + ' ');
            $('.js-dictionary-container > .js-paragraph-container').append(itemSpan);
            $('.js-dictionary-container').show();
            $('.js-input-paragraph').hide();
        }

        wordsArray.forEach(createElement);
    }

    $('.js-display').on('click', displayInput);

})(jQuery);