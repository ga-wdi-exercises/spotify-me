$(function() {
  getApp().initPage().listen();
});

function getApp() {
  var searchTypes = defineSearchTypes();
  var form = defineForm();
  var message = defineMessage();
  var results = defineResults();

  // App's API
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
        name: function() {
          return name;
        },

        plural: function() {
          return name + 's';
        }
      };
    });
  }

  function defineForm() {
    var element = $('#search');
    var searchType = defineSearchType();
    var keyword = defineKeyword();
    var button = defineButton();
    return {
      element: function() {
        return element;
      },

      searchType: function() {
        return searchType;
      },

      keyword: function() {
        return keyword;
      },

      button: function() {
        return button;
      }
    };

    function defineSearchType() {
      var element = $('#search-type');
      return {
        element: function() {
          return element;
        },

        init: function() {
          searchTypes.forEach(function(type, index) {
            var $option = $('<option>')
              .val(index)
              .text('Search for ' + type.name());
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
        element: function() {
          return element;
        },

        // Alias .element().val() as .val() for easy access.
        val: function() {
          return arguments.length ? element.val(arguments[0]) : element.val();
        },

        setPlaceholder: function() {
          var name = searchType.get().name();
          var placeholder = name[0].toUpperCase() + name.substring(1);
          element.attr('placeholder', placeholder);
        }
      };
    }

    function defineButton() {
      var element = $('#search-button');
      return {
        element: function() {
          return element;
        }
      };
    }
  }

  function defineMessage() {
    var element = $('#message');
    return {
      display: function(text) {
        element.text(text);
      },

      clear: function() {
        element.empty();
      }
    };
  }

  function defineResults() {
    var element = $('#results');
    return {
      add: function(results) {
        if (!results.items.length)
          message.display('No results');
        else {
          results.items.forEach(function(item) {
            element.append($('<li>').text(item.name));
          });
        }
      },

      clear: function() {
        element.empty();
      }
    };
  }

  function initPage() {
    form.searchType().init();
    form.keyword().setPlaceholder();
  }

  function listen() {
    form.searchType().element().change(function(event) {
      form.keyword().setPlaceholder();
    });

    form.keyword().element().keyup(function(event) {
      form.button().element().prop('disabled', !form.keyword().val());
    });

    form.element().submit(function(event) {
      event.preventDefault();
      search(form.searchType().get(), form.keyword().val());
    });
  }

  function search(type, keyword) {
    message.clear();
    results.clear();
    var url = 'https://api.spotify.com/v1/search?' + $.param({
      type: type.name(),
      q: keyword
    });
    $.ajax({
      url: url,
      dataType: 'json',
      success: function(data) {
        results.add(data[type.plural()]);
      },
      error: function() {
        message.display('Something went wrong with the search');
      },
      timeout: 3000
    });
  }
}
