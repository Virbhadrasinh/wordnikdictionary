(function ($) {
    "use strict";
    /*All constants required for make Ajax call for get definitions and examples for particular word*/
    var wordMeaningContainer = $('.js-word-container'),
        apiKey = '6b563843268cdcc64182c08da24064865d70eafbefd5579e2'.trim(),
        examplesConfig = {
            includeDuplicates: false,
            useCanonical: true,
            limit: 5,
            api_key: apiKey
        },
        definitionsConfig = {
            includeRelated: true,
            sourceDictionaries: 'all',
            useCanonical: true,
            limit: 5,
            includeTags: false,
            api_key: apiKey
        },
        words = {};

    function displayDefinitions(definitions) {
        /*This function will display all definitions for selected word which are fetched from the wordnik API*/
        var definitionsContainer = $('<div class="definitions"><h3>Definitions</h3></div>'),
            ul = $('<ul></ul>');
        definitionsContainer.append(ul);

        if (definitions.length <= 0) {
            ul.append($('<p>No definitions found.</p>'));
        } else {
            for (var i = 0; i < definitions.length; i++) {
                var li = $('<li></li>');
                li.append($('<p>' + definitions[i]['text'] + '</p>'));
                ul.append(li);
            }
        }

        return definitionsContainer;
    }

    function displayExamples(examples) {
        /*This function will display all examples for selected word which are fetched from the wordnik API*/
        var examplesContainer = $('<div class="examples"><h3>Examples</h3></div>'),
            ul = $('<ul></ul>');
        examplesContainer.append(ul);

        if (examples.length <= 0) {
            ul.append($('<p>No examples found.</p>'));
        } else {
            for (var i = 0; i < examples.length; i++) {
                var li = $('<li></li>');
                li.append($('<p>' + examples[i]['text'] + '</p>'));
                ul.append(li);
            }
        }

        return examplesContainer;
    }

    function defineWord(event) {
        /*This function will fetch definitions and examples for selected word from the wordnik API*/

        /*Selected word*/
        var word = $(event.currentTarget).html().trim();

        /*Fetch selected word details from wordnik API if the word is not there in local words variable
         * First call is for get definitions and second for the examples.
         * When response come from both the API call render fetched details for the particular word*/
        if (typeof(words[word]) === 'undefined') {
            $.when($.ajax({
                type: 'GET',
                url: 'http://api.wordnik.com:80/v4/word.json/' + word + '/definitions',
                dataType: 'json',
                data: definitionsConfig
            }), $.ajax({
                type: 'GET',
                url: 'http://api.wordnik.com:80/v4/word.json/' + word + '/examples',
                dataType: 'json',
                data: examplesConfig
            })).then(function (definitions, examples) {
                /*Add selected word to local variable*/
                words[word] = {
                    definitions: definitions,
                    examples: examples
                };

                /*Word details display logic*/
                var oldHTML = wordMeaningContainer.html();
                wordMeaningContainer.html('');

                var mainContainer = $('<div class="bs-callout bs-callout-info"></div>'),
                    definitionsContainer = displayDefinitions(definitions[0]),
                    examplesContainer = displayExamples(examples[0]['examples']);

                mainContainer.append($('<h2 class="selected-word">' + word + '</h2>'));
                mainContainer.append($('<hr>'));

                mainContainer.append(definitionsContainer);
                mainContainer.append(examplesContainer);

                wordMeaningContainer.append(mainContainer);
                wordMeaningContainer.append(oldHTML);
            });
        }
    }

    /*Double click event registration for all words of the input.*/
    $(document).on('dblclick', '.js-paragraph-container>span', defineWord);

    /*Reset input button event registration*/
    $('.js-reset-button').on('click', function () {
        $('.js-dictionary-container').hide();
        $('.js-input-paragraph').show();
    });

})(jQuery);