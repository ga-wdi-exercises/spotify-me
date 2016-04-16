$(function() {
  getApp().initPage().listen();
});

function getApp() {
  var searchTypes = defineSearchTypes();
  var form = defineForm();
  var results = defineResults();

  return {
    initPage: function() {
      initPage();
      return this;
    },
    listen: function() {
      listen();
      return this;
    }
  };

  function defineSearchTypes() {
    return ['artist', 'track'].map(function(name) {
      return {
        name: name,
        plural: name + 's'
      };
    });
  }

  function defineForm() {
    var element = $('#search');
    var searchType = defineSearchType();
    var keyword = defineKeyword();
    aliasVal([searchType, keyword]);
    var button = defineButton();
    return {
      element: element,
      searchType: searchType,
      keyword: keyword,
      button: button
    };

    function defineSearchType() {
      var element = $('#search-type');
      return {
        element: element,

        init: function() {
          searchTypes.forEach(function(type, index) {
            var $option = $('<option>')
              .val(index)
              .text('Search for ' + type.name);
            element.append($option);
          });
        },

        get: function() {
          return searchTypes[element.val()];
        }
      };
    }

    function defineKeyword() {
      var element = $('#search-keyword');
      return {
        element: element,
        setPlaceholder: function() {
          var name = form.searchType.get().name;
          var placeholder = name[0].toUpperCase() + name.substring(1);
          form.keyword.element.attr('placeholder', placeholder);
        }
      };
    }

    function defineButton() {
      return { element: $('#search-button') };
    }

    // For each form field, alias .element.val as .val for easy access.
    function aliasVal(fields) {
      fields.forEach(function(field) {
        field.val = function() {
          if (arguments.length)
            return field.element.val(arguments[0]);
          else
            return field.element.val();
        };
      });
    }
  }

  function defineResults() {
    var element = $('#results');
    return {
      element: element,
      clear: function() {
        element.empty();
      },
      add: function(results) {
        results.items.forEach(function(item) {
          element.append($('<li>').text(item.name));
        });
      }
    };
  }

  function initPage() {
    form.searchType.init();
    form.keyword.setPlaceholder();
  }

  function listen() {
    form.searchType.element.change(function(event) {
      form.keyword.setPlaceholder();
    });

    form.keyword.element.keyup(function(event) {
      form.button.element.prop('disabled', !form.keyword.val());
    });

    form.element.submit(function(event) {
      event.preventDefault();
      search(form.searchType.get(), form.keyword.val());
    });
  }

  function search(type, keyword) {
    results.clear();
    var url = 'https://api.spotify.com/v1/search?' + $.param({
      type: type.name,
      q: keyword
    });
    $.ajax({
      url: url,
      dataType: 'json',
      success: function(data) {
        results.add(data[type.plural]);
      }
    });
  }
}
