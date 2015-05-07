var SearchModel = function(term, type) {
  this.term = term;
  this.searchType = type;
  this.results = [];
}

SearchModel.prototype = {
  getResults: function() {
    var url = 'http://ws.spotify.com/search/1/' + this.searchType + '.json?q=' + this.term;

    return $.ajax({
      url: url,
      method: "get",
      context: this
    }).done(function(data) {
      this.results = data[this.searchType + "s"];
    });
  }
}
