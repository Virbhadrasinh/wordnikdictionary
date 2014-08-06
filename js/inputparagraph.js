/*global jQuery */
(function ($) {
    "use strict";

    function displayInput() {
        /*This function will get the text from the textarea and accordingly create dictionary console paragraph
         * from where we can click on particular word and get some definitions and examples.*/

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