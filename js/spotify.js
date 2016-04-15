$(function() {
  getApp().initPage().listen();
});

function getApp() {
  var searchTypes = defineSearchTypes();
  var form = defineForm();
  var results = defineResults();

  return {
    initPage: function() {
      form.searchType.init();
      return this;
    },
    listen: function() {
      form.element.submit(function(event) {
        event.preventDefault();
        search(searchTypes[form.searchType.val()], form.keyword.val());
      });
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
    return {
      element: element,
      searchType: searchType,
      keyword: keyword
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
        }
      };
    }

    function defineKeyword() {
      return { element: $('#search-keyword') };
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
