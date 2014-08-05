(function ($) {
    "use strict";
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
        var word = event.currentTarget.innerText.trim();

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
                words[word] = {
                    definitions: definitions,
                    examples: examples
                };

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

    $(document).on('dblclick', '.js-paragraph-container>span', defineWord);

    $('.js-reset-button').on('click', function () {
        $('.js-dictionary-container').hide();
        $('.js-input-paragraph').show();
    });

})(jQuery);