var SearchView = function() {
  this.container = $("#results");
  $('form#search input[type=submit]').on("click", this.searchSpotify.bind(this));
}

SearchView.prototype = {
  searchSpotify: function() {
    event.preventDefault();

    var term = $("#search-keyword").val();
    var searchType = $("#search-type").val();

    this.model = new SearchModel(term, searchType);
    this.model.getResults().done( this.render.bind(this) );
  },
  render: function() {
    this.container.empty();
    this.model.results.forEach(function(result) {
      this.container.append("<li><a href='" + result.href + "'>" + result.name + "</a></li>");
    }.bind(this));

  }
}
