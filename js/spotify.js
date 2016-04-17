$(function() {
  getApp().initPage().listen();
});

function getApp() {
  var searchTypes = defineSearchTypes();
  var form = defineForm();
  var message = defineMessage();
  var results = defineResults();
  var search = defineSearch();

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
    return ['artist', 'track', 'album', 'playlist'].map(function(name) {
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
    var list = defineList();
    var count = defineCount();
    var next = defineNext();
    return {
      add: function(results) {
        list.add(results.items);
        count.update(results);
        next.update(results);
      },

      next: function() {
        return {
          element: next.element,
          searchType: next.searchType,
          url: next.url
        };
      },

      clear: function() {
        list.clear();
        count.clear();
        next.clear();
      }
    };

    function defineList() {
      var element = $('#results-list');
      return {
        add: function(items) {
          items.forEach(function(item) {
            var $link = $('<a>')
              .attr('href', item.external_urls.spotify)
              .attr('target', '_blank')
              .text(item.name);
            var $item = $('<li>').append($link);
            element.append($item);
          });
        },

        clear: function() {
          element.empty();
        }
      };
    }

    function defineCount() {
      var element = $('#results-count');
      return {
        update: function(results) {
          var is_last_page = !results.next;
          var shown = is_last_page ? results.total : results.offset + results.limit;
          var text = 'Showing ' + shown + ' of ' + results.total;
          element.text(text);
        },

        clear: function() {
          element.empty();
        }
      };
    }

    function defineNext() {
      var element = $('#results-next'), searchType, url;
      return {
        element: function() {
          return element;
        },

        searchType: function() {
          return searchType;
        },

        url: function() {
          return url;
        },

        update: function(results) {
          element.toggle(!!results.next);
          searchType = results.type;
          url = results.next;
        },

        clear: function() {
          element.hide();
          searchType = url = undefined;
        }
      };
    }
  }

  function defineSearch() {
    return function(type) {
      return {
        byKeyword: function(keyword) {
          var url = 'https://api.spotify.com/v1/search?' + $.param({
            type: type.name(),
            q: keyword
          });
          return search(type, url);
        },

        byURL: function(url) {
          return search(type, url);
        }
      };
    };

    function search(type, url) {
      $.ajax({
        url: url,
        dataType: 'json',
        success: function(data) {
          var clean = data[type.plural()];
          clean.type = type;
          if (clean.items.length)
            results.add(clean);
          else
            message.display('No results');
        },
        error: function() {
          message.display('Something went wrong with the search');
        },
        timeout: 3000
      });
    }
  }

  function initPage() {
    form.searchType().init();
    form.keyword().setPlaceholder();
    results.next().element().hide();
  }

  function listen() {
    form.searchType().element().change(function(event) {
      form.keyword().setPlaceholder();
    });

    form.keyword().element().on('input', function(event) {
      form.button().element().prop('disabled', !form.keyword().val());
    });

    form.element().submit(function(event) {
      event.preventDefault();
      message.clear();
      results.clear();
      search(form.searchType().get()).byKeyword(form.keyword().val());
    });

    results.next().element().click(function(event) {
      event.preventDefault();
      message.clear();
      search(results.next().searchType()).byURL(results.next().url());
    });
  }
}
